import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateLeadDto } from './dto/create-lead.dto';
import { ListLeadsDto } from './dto/list-leads.dto';
import { UpdateLeadStatusDto } from './dto/update-lead-status.dto';
import { Lead } from './lead.entity';
import { LeadPage, LeadService } from './lead.service';

/**
 * Admin-only lead history routes.
 */
@Controller('leads')
@UseGuards(JwtAuthGuard)
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  /**
   * Lists leads, newest job date first.
   *
   * @param {ListLeadsDto} query - Optional search text, status filter and paging.
   * @returns {Promise<LeadPage>} One page of leads.
   */
  @Get()
  async list(@Query() query: ListLeadsDto): Promise<LeadPage> {
    return this.leadService.list(query);
  }

  /**
   * Saves a new or historic lead.
   *
   * @param {CreateLeadDto} dto - The lead details.
   * @returns {Promise<Lead>} The saved lead.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateLeadDto): Promise<Lead> {
    return this.leadService.create(dto);
  }

  /**
   * Replaces a lead's details.
   *
   * @param {string} id - The lead ID.
   * @param {CreateLeadDto} dto - The full, edited lead.
   * @returns {Promise<Lead>} The updated lead.
   */
  @Put(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: CreateLeadDto): Promise<Lead> {
    return this.leadService.update(id, dto);
  }

  /**
   * Changes a lead's status.
   *
   * @param {string} id - The lead ID.
   * @param {UpdateLeadStatusDto} dto - The new status.
   * @returns {Promise<Lead>} The updated lead.
   */
  @Patch(':id/status')
  async updateStatus(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateLeadStatusDto,
  ): Promise<Lead> {
    return this.leadService.updateStatus(id, dto.status);
  }

  /**
   * Deletes a lead.
   *
   * @param {string} id - The lead ID.
   * @returns {Promise<void>}
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.leadService.remove(id);
  }
}
