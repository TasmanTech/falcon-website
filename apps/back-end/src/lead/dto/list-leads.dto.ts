import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { LEAD_STATUSES, type LeadStatus } from '../lead.entity';

/**
 * Query parameters for `GET /leads`.
 */
export class ListLeadsDto {
  /** Matches name, phone, address or job type (case-insensitive). */
  @IsString()
  @IsOptional()
  @MaxLength(100)
  search?: string;

  @IsIn(LEAD_STATUSES)
  @IsOptional()
  status?: LeadStatus;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  pageSize?: number;
}
