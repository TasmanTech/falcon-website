import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn, ValueTransformer } from 'typeorm';

/** Where a lead is up to. New leads start as `pending`. */
export const LEAD_STATUSES = ['pending', 'closed', 'cancelled'] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

/** Postgres returns `decimal` columns as strings; convert them back to numbers. */
const decimalToNumber: ValueTransformer = {
  to: (value: number | null) => value,
  from: (value: string | null) => (value === null ? null : Number(value)),
};

/**
 * A job enquiry recorded from the admin portal's lead form, either as it comes in
 * or entered afterwards as a historic lead.
 */
@Entity('lead')
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  /** Calendar date of the job or enquiry as `YYYY-MM-DD`. */
  @Index()
  @Column({ type: 'date' })
  date!: string;

  /** Appointment time as `HH:MM`, if one was booked. */
  @Column({ type: 'varchar', length: 5, nullable: true })
  time?: string | null;

  @Column({ type: 'varchar', length: 120, nullable: true })
  name?: string | null;

  @Column({ type: 'varchar', length: 40, nullable: true })
  phone?: string | null;

  @Column({ type: 'varchar', length: 300, nullable: true })
  address?: string | null;

  @Column({ type: 'varchar', length: 120, nullable: true })
  jobType?: string | null;

  @Column({ type: 'text', nullable: true })
  notes?: string | null;

  @Index()
  @Column({ type: 'varchar', length: 16, default: 'pending' })
  status!: LeadStatus;

  /** What the parts cost, recorded when the lead is closed. */
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, transformer: decimalToNumber })
  partPrice?: number | null;

  /** What the customer paid, recorded when the lead is closed. */
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, transformer: decimalToNumber })
  paidPrice?: number | null;

  /** The call-out fee charged, recorded when the lead is closed. */
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, transformer: decimalToNumber })
  calloutPrice?: number | null;

  /** Why the job fell through, recorded when the lead is cancelled. */
  @Column({ type: 'varchar', length: 500, nullable: true })
  cancellationReason?: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
