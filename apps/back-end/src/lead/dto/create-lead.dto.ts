import { IsIn, IsISO8601, IsNumber, IsOptional, IsString, Matches, Max, MaxLength, Min } from 'class-validator';
import { LEAD_STATUSES, type LeadStatus } from '../lead.entity';

/**
 * Payload for saving or editing a lead. Every detail except the date is optional
 * because leads are often logged before the customer's name or address is known.
 */
export class CreateLeadDto {
  /** Calendar date as `YYYY-MM-DD`. */
  @IsISO8601({ strict: true })
  date!: string;

  /** Time as `HH:MM` (24-hour). */
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'time must be HH:MM' })
  @IsOptional()
  time?: string;

  @IsString()
  @IsOptional()
  @MaxLength(120)
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  phone?: string;

  @IsString()
  @IsOptional()
  @MaxLength(300)
  address?: string;

  @IsString()
  @IsOptional()
  @MaxLength(120)
  jobType?: string;

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  notes?: string;

  /** Defaults to `pending`; set `closed` or `cancelled` when entering a historic lead. */
  @IsIn(LEAD_STATUSES)
  @IsOptional()
  status?: LeadStatus;

  /** Parts cost; kept only when the status is `closed`. */
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(1_000_000)
  @IsOptional()
  partPrice?: number;

  /** Amount the customer paid; kept only when the status is `closed`. */
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(1_000_000)
  @IsOptional()
  paidPrice?: number;

  /** Call-out fee charged; kept only when the status is `closed`. */
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(1_000_000)
  @IsOptional()
  calloutPrice?: number;

  /** Why the job fell through; kept only when the status is `cancelled`. */
  @IsString()
  @IsOptional()
  @MaxLength(500)
  cancellationReason?: string;
}
