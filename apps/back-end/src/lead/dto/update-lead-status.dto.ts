import { IsIn } from 'class-validator';
import { LEAD_STATUSES, type LeadStatus } from '../lead.entity';

/**
 * Payload for `PATCH /leads/:id/status`.
 */
export class UpdateLeadStatusDto {
  @IsIn(LEAD_STATUSES)
  status!: LeadStatus;
}
