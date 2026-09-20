import { describe, it, expect, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactModule } from './contact.module';
import { ConfigModule } from '@nestjs/config';

describe('ContactModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), ContactModule],
    }).compile();
  });

  it('should compile the module', () => {
    expect(module).toBeDefined();
  });
});
