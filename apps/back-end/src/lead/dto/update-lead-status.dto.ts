import { IsIn, IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, ValidateIf } from 'class-validator';
import { LEAD_STATUSES, type LeadStatus } from '../lead.entity';

const isClosed = (dto: UpdateLeadStatusDto) => dto.status === 'closed';

/**
 * Payload for `PATCH /leads/:id/status`. Closing a lead requires the part, paid and
 * call-out prices; cancelling one requires a reason.
 */
export class UpdateLeadStatusDto {
  @IsIn(LEAD_STATUSES)
  status!: LeadStatus;

  @ValidateIf(isClosed)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(1_000_000)
  partPrice?: number;

  @ValidateIf(isClosed)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(1_000_000)
  paidPrice?: number;

  @ValidateIf(isClosed)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(1_000_000)
  calloutPrice?: number;

  @ValidateIf((dto: UpdateLeadStatusDto) => dto.status === 'cancelled')
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  cancellationReason?: string;
}
