import { describe, it, expect } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Admin } from '../admin/admin.entity';

describe('AuthModule', () => {
  it('compiles and provides the auth service and guard', async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule],
    })
      .overrideProvider(getRepositoryToken(Admin))
      .useValue({})
      .compile();

    expect(module.get(AuthService)).toBeDefined();
    expect(module.get(JwtAuthGuard)).toBeDefined();
  });
});
