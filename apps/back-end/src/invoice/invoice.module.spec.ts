import { describe, it, expect } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InvoiceModule } from './invoice.module';
import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice.entity';
import { Admin } from '../admin/admin.entity';

describe('InvoiceModule', () => {
  it('compiles and provides the invoice service', async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), InvoiceModule],
    })
      .overrideProvider(getRepositoryToken(Invoice))
      .useValue({})
      .overrideProvider(getRepositoryToken(Admin))
      .useValue({})
      .compile();

    expect(module.get(InvoiceService)).toBeDefined();
  });
});
