import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { LeadController } from './lead.controller';
import { LeadService } from './lead.service';
import { AuthService } from '../auth/auth.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadStatusDto } from './dto/update-lead-status.dto';

describe('LeadController', () => {
  let controller: LeadController;
  const leadService = {
    list: jest.fn<(...args: unknown[]) => Promise<unknown>>(() => Promise.resolve({ items: [], total: 0, page: 1, pageSize: 20 })),
    create: jest.fn<(...args: unknown[]) => Promise<unknown>>(() => Promise.resolve({ id: 'lead-id' })),
    update: jest.fn<(...args: unknown[]) => Promise<unknown>>(() => Promise.resolve({ id: 'lead-id' })),
    updateStatus: jest.fn<(...args: unknown[]) => Promise<unknown>>(() => Promise.resolve({ id: 'lead-id', status: 'closed' })),
    remove: jest.fn<(...args: unknown[]) => Promise<unknown>>(() => Promise.resolve()),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadController],
      providers: [
        { provide: LeadService, useValue: leadService },
        { provide: AuthService, useValue: { verifyAccessToken: jest.fn() } },
      ],
    }).compile();
    controller = module.get(LeadController);
  });

  it('lists leads', async () => {
    await controller.list({ status: 'pending' });
    expect(leadService.list).toHaveBeenCalledWith({ status: 'pending' });
  });

  it('creates and updates leads', async () => {
    const dto = { date: '2026-10-22' } as CreateLeadDto;
    await controller.create(dto);
    await controller.update('lead-id', dto);

    expect(leadService.create).toHaveBeenCalledWith(dto);
    expect(leadService.update).toHaveBeenCalledWith('lead-id', dto);
  });

  it('passes the closing prices through with the status', async () => {
    const dto: UpdateLeadStatusDto = { status: 'closed', partPrice: 35, paidPrice: 180, calloutPrice: 20 };
    await expect(controller.updateStatus('lead-id', dto)).resolves.toMatchObject({ status: 'closed' });
    expect(leadService.updateStatus).toHaveBeenCalledWith('lead-id', dto);
  });

  it('deletes a lead', async () => {
    await controller.remove('lead-id');
    expect(leadService.remove).toHaveBeenCalledWith('lead-id');
  });
});
