import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateLeadDto } from './dto/create-lead.dto';
import { ListLeadsDto } from './dto/list-leads.dto';
import { Lead, LeadStatus } from './lead.entity';

/** A page of lead history. */
export interface LeadPage {
  items: Lead[];
  total: number;
  page: number;
  pageSize: number;
}

/** Converts the payload to columns, storing blank text as null. */
function toColumns(dto: CreateLeadDto): Omit<Lead, 'id' | 'createdAt' | 'updatedAt'> {
  const optional = (value?: string) => value?.trim() || null;
  return {
    date: dto.date.slice(0, 10),
    time: optional(dto.time),
    name: optional(dto.name),
    phone: optional(dto.phone),
    address: optional(dto.address),
    jobType: optional(dto.jobType),
    notes: optional(dto.notes),
    status: dto.status ?? 'pending',
  };
}

/**
 * Stores leads logged from the admin portal and tracks their status.
 */
@Injectable()
export class LeadService {
  private readonly logger = new Logger(LeadService.name);

  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  /**
   * Saves a lead. Status defaults to `pending`.
   *
   * @param {CreateLeadDto} dto - The lead details.
   * @returns {Promise<Lead>} The saved lead.
   */
  async create(dto: CreateLeadDto): Promise<Lead> {
    const lead = await this.leadRepository.save(this.leadRepository.create(toColumns(dto)));
    this.logger.log(`Lead ${lead.id} saved as ${lead.status}`);
    return lead;
  }

  /**
   * Lists leads by job date, newest first, optionally filtered by status and search text.
   *
   * @param {ListLeadsDto} query - Search text, status and paging.
   * @returns {Promise<LeadPage>} One page of leads.
   */
  async list(query: ListLeadsDto): Promise<LeadPage> {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 20;
    const search = query.search?.trim();
    const pattern = search ? `%${search.replace(/[\\%_]/g, (c) => `\\${c}`)}%` : undefined;
    const base: FindOptionsWhere<Lead> = query.status ? { status: query.status } : {};

    const [items, total] = await this.leadRepository.findAndCount({
      where: pattern
        ? (['name', 'phone', 'address', 'jobType'] as const).map((field) => ({ ...base, [field]: ILike(pattern) }))
        : base,
      order: { date: 'DESC', time: 'DESC', createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { items, total, page, pageSize };
  }

  /**
   * Replaces a lead's details. A missing status keeps the current one.
   *
   * @param {string} id - The lead ID.
   * @param {CreateLeadDto} dto - The full, edited lead.
   * @returns {Promise<Lead>} The updated lead.
   * @throws {NotFoundException} If the lead does not exist.
   */
  async update(id: string, dto: CreateLeadDto): Promise<Lead> {
    const lead = await this.findOrThrow(id);
    Object.assign(lead, toColumns({ ...dto, status: dto.status ?? lead.status }));
    return this.leadRepository.save(lead);
  }

  /**
   * Changes a lead's status.
   *
   * @param {string} id - The lead ID.
   * @param {LeadStatus} status - The new status.
   * @returns {Promise<Lead>} The updated lead.
   * @throws {NotFoundException} If the lead does not exist.
   */
  async updateStatus(id: string, status: LeadStatus): Promise<Lead> {
    const lead = await this.findOrThrow(id);
    lead.status = status;
    return this.leadRepository.save(lead);
  }

  /**
   * Deletes a lead permanently.
   *
   * @param {string} id - The lead ID.
   * @returns {Promise<void>}
   * @throws {NotFoundException} If the lead does not exist.
   */
  async remove(id: string): Promise<void> {
    const result = await this.leadRepository.delete(id);
    if (!result.affected) throw new NotFoundException('Lead not found');
    this.logger.log(`Lead ${id} deleted`);
  }

  private async findOrThrow(id: string): Promise<Lead> {
    const lead = await this.leadRepository.findOne({ where: { id } });
    if (!lead) throw new NotFoundException('Lead not found');
    return lead;
  }
}
