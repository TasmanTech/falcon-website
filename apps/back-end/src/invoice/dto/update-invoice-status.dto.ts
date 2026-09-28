import { IsBoolean } from 'class-validator';

/**
 * Payload for `PATCH /invoices/:id/status`.
 */
export class UpdateInvoiceStatusDto {
  /** True once the customer has paid in full; false to mark it unpaid again. */
  @IsBoolean()
  paid!: boolean;
}
