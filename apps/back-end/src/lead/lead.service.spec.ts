import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { LeadService } from './lead.service';
import { Lead } from './lead.entity';

describe('LeadService', () => {
  let service: LeadService;
  const repository = {
    create: jest.fn((data: Partial<Lead>) => data),
    save: jest.fn((data: Partial<Lead>) => Promise.resolve({ id: 'lead-id', ...data })),
    findOne: jest.fn<() => Promise<Partial<Lead> | null>>(() => Promise.resolve(null)),
    findAndCount: jest.fn<(...args: unknown[]) => Promise<[Lead[], number]>>(() => Promise.resolve([[], 0])),
    delete: jest.fn<(...args: unknown[]) => Promise<{ affected?: number }>>(() => Promise.resolve({ affected: 1 })),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      providers: [LeadService, { provide: getRepositoryToken(Lead), useValue: repository }],
    }).compile();
    service = module.get(LeadService);
  });

  it('saves a new lead as pending with blanks stored as null', async () => {
    const lead = await service.create({ date: '2026-09-29', name: ' KC ', address: '  ' });
    expect(lead).toMatchObject({ date: '2026-09-29', name: 'KC', address: null, time: null, status: 'pending' });
  });

  it('saves a historic lead with the given status', async () => {
    const lead = await service.create({ date: '2026-09-01', status: 'closed' });
    expect(lead.status).toBe('closed');
  });

  it('filters by status and searches name, phone, address and job type', async () => {
    await service.list({ search: 'papakura', status: 'pending', page: 2, pageSize: 10 });

    const options = repository.findAndCount.mock.calls[0][0] as { where: Record<string, unknown>[]; skip: number };
    expect(options.where).toHaveLength(4);
    expect(options.where.every((clause) => clause.status === 'pending')).toBe(true);
    expect(options.skip).toBe(10);
  });

  it('lists everything when there is no filter', async () => {
    await service.list({});
    const options = repository.findAndCount.mock.calls[0][0] as { where: unknown };
    expect(options.where).toEqual({});
  });

  it('edits a lead and keeps its status when none is given', async () => {
    repository.findOne.mockResolvedValueOnce({ id: 'lead-id', date: '2026-09-29', name: 'KC', status: 'closed' });

    const lead = await service.update('lead-id', { date: '2026-09-30', name: 'Kerry', notes: '' });

    expect(lead).toMatchObject({ date: '2026-09-30', name: 'Kerry', notes: null, status: 'closed' });
  });

  it('throws when editing a missing lead', async () => {
    await expect(service.update('missing', { date: '2026-09-30' })).rejects.toThrow(NotFoundException);
  });

  it('changes the status', async () => {
    repository.findOne.mockResolvedValueOnce({ id: 'lead-id', status: 'pending' });
    await expect(service.updateStatus('lead-id', 'cancelled')).resolves.toMatchObject({ status: 'cancelled' });
  });

  it('throws when changing a missing lead', async () => {
    await expect(service.updateStatus('missing', 'closed')).rejects.toThrow(NotFoundException);
  });

  it('deletes a lead', async () => {
    await service.remove('lead-id');
    expect(repository.delete).toHaveBeenCalledWith('lead-id');
  });

  it('throws when deleting a missing lead', async () => {
    repository.delete.mockResolvedValueOnce({ affected: 0 });
    await expect(service.remove('missing')).rejects.toThrow(NotFoundException);
  });
});
