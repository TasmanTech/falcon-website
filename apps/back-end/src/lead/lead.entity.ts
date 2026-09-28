import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

/** Where a lead is up to. New leads start as `pending`. */
export const LEAD_STATUSES = ['pending', 'closed', 'cancelled'] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

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

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
