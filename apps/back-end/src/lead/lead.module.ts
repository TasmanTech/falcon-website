import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { LeadController } from './lead.controller';
import { Lead } from './lead.entity';
import { LeadService } from './lead.service';

/**
 * Lead history for the admin portal: saving, editing, changing status and deleting leads.
 */
@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Lead])],
  controllers: [LeadController],
  providers: [LeadService],
})
export class LeadModule {}
