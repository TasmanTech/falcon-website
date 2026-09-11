import { describe, it, expect, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactModule } from './contact.module';

describe('ContactModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ContactModule],
    }).compile();
  });

  it('should compile the module', () => {
    expect(module).toBeDefined();
  });
});
