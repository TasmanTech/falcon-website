import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateLeadDto } from './dto/create-lead.dto';
import { ListLeadsDto } from './dto/list-leads.dto';
import { UpdateLeadStatusDto } from './dto/update-lead-status.dto';
import { Lead, LeadStatus } from './lead.entity';

/** A page of lead history. */
export interface LeadPage {
  items: Lead[];
  total: number;
  page: number;
  pageSize: number;
}

/** The closing prices and cancellation reason recorded with a status. */
type LeadOutcome = Pick<Lead, 'partPrice' | 'paidPrice' | 'calloutPrice' | 'cancellationReason'>;

/**
 * Keeps only the outcome fields that belong to the status: prices for `closed`, a reason
 * for `cancelled`, and nothing for `pending`, so a re-opened lead holds no stale values.
 */
function toOutcome(status: LeadStatus, dto: Partial<LeadOutcome>): LeadOutcome {
  const closed = status === 'closed';
  return {
    partPrice: closed ? (dto.partPrice ?? null) : null,
    paidPrice: closed ? (dto.paidPrice ?? null) : null,
    calloutPrice: closed ? (dto.calloutPrice ?? null) : null,
    cancellationReason: status === 'cancelled' ? dto.cancellationReason?.trim() || null : null,
  };
}

/** Converts the payload to columns, storing blank text as null. */
function toColumns(dto: CreateLeadDto): Omit<Lead, 'id' | 'createdAt' | 'updatedAt'> {
  const optional = (value?: string) => value?.trim() || null;
  const status = dto.status ?? 'pending';
  return {
    date: dto.date.slice(0, 10),
    time: optional(dto.time),
    name: optional(dto.name),
    phone: optional(dto.phone),
    address: optional(dto.address),
    jobType: optional(dto.jobType),
    notes: optional(dto.notes),
    status,
    ...toOutcome(status, dto),
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
   * Changes a lead's status, recording the closing prices or the cancellation reason with it.
   *
   * @param {string} id - The lead ID.
   * @param {UpdateLeadStatusDto} dto - The new status and its outcome details.
   * @returns {Promise<Lead>} The updated lead.
   * @throws {NotFoundException} If the lead does not exist.
   */
  async updateStatus(id: string, dto: UpdateLeadStatusDto): Promise<Lead> {
    const lead = await this.findOrThrow(id);
    Object.assign(lead, { status: dto.status, ...toOutcome(dto.status, dto) });
    this.logger.log(`Lead ${id} marked ${dto.status}`);
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
