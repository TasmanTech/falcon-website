import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, ValueTransformer } from 'typeorm';

/** Postgres returns `decimal` columns as strings; convert them back to numbers. */
const decimalToNumber: ValueTransformer = {
  to: (value: number) => value,
  from: (value: string | null) => (value === null ? null : Number(value)),
};

/** A stored invoice line (amount already calculated). */
export interface StoredInvoiceItem {
  title: string;
  description?: string;
  quantity: number;
  rate: number;
  amount: number;
}

/**
 * A sent invoice. The PDF itself lives in invoice storage (the Cloud Storage volume
 * mount in production); `fileName` is relative to that directory.
 */
@Entity('invoice')
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 32 })
  invoiceNumber!: string;

  @Column({ type: 'varchar', length: 120 })
  clientName!: string;

  @Index()
  @Column({ type: 'varchar', length: 254 })
  clientEmail!: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  clientPhone?: string | null;

  @Column({ type: 'varchar', length: 300, nullable: true })
  jobAddress?: string | null;

  @Column({ type: 'varchar', length: 80, nullable: true })
  technicianName?: string | null;

  @Column({ type: 'date' })
  invoiceDate!: string;

  @Column({ type: 'date' })
  dueDate!: string;

  @Column({ type: 'jsonb' })
  items!: StoredInvoiceItem[];

  @Column({ type: 'decimal', precision: 10, scale: 2, transformer: decimalToNumber })
  subtotal!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, transformer: decimalToNumber })
  gst!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, transformer: decimalToNumber })
  total!: number;

  @Column({ type: 'text', nullable: true })
  notes?: string | null;

  /** PDF filename inside invoice storage; also the download filename. */
  @Column({ type: 'varchar', length: 200 })
  fileName!: string;

  /** Set once the email to the client has been accepted by the mail server. */
  @Column({ type: 'timestamptz', nullable: true })
  emailedAt?: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
