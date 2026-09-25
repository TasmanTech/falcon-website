import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

/**
 * One line on an invoice. Amounts are calculated server-side from quantity and rate.
 */
export class InvoiceItemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title!: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(10_000)
  quantity!: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(1_000_000)
  rate!: number;
}

/**
 * Payload for generating (and optionally emailing) a Falcon Access invoice.
 */
export class CreateInvoiceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  clientName!: string;

  @IsEmail()
  @MaxLength(254)
  clientEmail!: string;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  clientPhone?: string;

  /** Where the work was carried out; printed as "Job Address". */
  @IsString()
  @IsOptional()
  @MaxLength(300)
  jobAddress?: string;

  @IsString()
  @IsOptional()
  @MaxLength(80)
  technicianName?: string;

  /** Calendar date of the invoice as `YYYY-MM-DD`. Defaults to today (NZ time). */
  @IsISO8601({ strict: true })
  @IsOptional()
  invoiceDate?: string;

  /** Calendar due date as `YYYY-MM-DD`. Defaults to the invoice date. */
  @IsISO8601({ strict: true })
  @IsOptional()
  dueDate?: string;

  /** Adds 15% GST on top of the item subtotal. Requires `GST_NUMBER` to be configured. */
  @IsBoolean()
  @IsOptional()
  addGst?: boolean;

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  notes?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDto)
  items!: InvoiceItemDto[];
}
