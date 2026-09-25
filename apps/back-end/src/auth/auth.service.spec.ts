import { describe, it, expect, beforeAll, beforeEach, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthService } from './auth.service';
import { Admin } from '../admin/admin.entity';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let config: Record<string, string | undefined>;
  let admin: Admin;
  const findOne = jest.fn<(options: { where: Partial<Admin> }) => Promise<Admin | null>>();

  beforeAll(async () => {
    admin = {
      id: 'admin-id',
      email: 'info@falconaccess.co.nz',
      passwordHash: await bcrypt.hash('correct horse', 4),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  beforeEach(async () => {
    config = { JWT_SECRET: 'access-secret', JWT_REFRESH_SECRET: 'refresh-secret' };
    findOne.mockReset();
    findOne.mockImplementation(({ where }) =>
      Promise.resolve(where.email === admin.email || where.id === admin.id ? admin : null),
    );

    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({})],
      providers: [
        AuthService,
        { provide: ConfigService, useValue: { get: (key: string) => config[key] } },
        { provide: getRepositoryToken(Admin), useValue: { findOne } },
      ],
    }).compile();

    service = module.get(AuthService);
    jwtService = module.get(JwtService);
  });

  describe('login', () => {
    it('issues tokens for valid credentials (email is case-insensitive)', async () => {
      const tokens = await service.login(' Info@FalconAccess.co.nz ', 'correct horse');

      expect(findOne).toHaveBeenCalledWith({ where: { email: 'info@falconaccess.co.nz' } });
      const access = await service.verifyAccessToken(tokens.accessToken);
      expect(access).toMatchObject({ sub: 'admin-id', email: 'info@falconaccess.co.nz', role: 'ADMIN', type: 'access' });
      expect(jwtService.verify(tokens.refreshToken, { secret: 'refresh-secret' })).toMatchObject({ type: 'refresh' });
    });

    it('rejects a wrong password', async () => {
      await expect(service.login('info@falconaccess.co.nz', 'wrong')).rejects.toThrow(UnauthorizedException);
    });

    it('rejects an unknown email', async () => {
      await expect(service.login('someone@else.com', 'correct horse')).rejects.toThrow(UnauthorizedException);
    });

    it('fails closed when the JWT secrets are not configured', async () => {
      config.JWT_SECRET = undefined;
      await expect(service.login('info@falconaccess.co.nz', 'correct horse')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('refresh', () => {
    it('rotates a valid refresh token', async () => {
      const { refreshToken } = await service.login('info@falconaccess.co.nz', 'correct horse');
      const rotated = await service.refresh(refreshToken);
      await expect(service.verifyAccessToken(rotated.accessToken)).resolves.toMatchObject({ type: 'access' });
    });

    it('rejects a missing token', async () => {
      await expect(service.refresh(undefined)).rejects.toThrow(UnauthorizedException);
    });

    it('rejects an access token used as a refresh token', async () => {
      const { accessToken } = await service.login('info@falconaccess.co.nz', 'correct horse');
      await expect(service.refresh(accessToken)).rejects.toThrow(UnauthorizedException);
    });

    it('rejects refresh tokens issued before the password changed', async () => {
      const { refreshToken } = await service.login('info@falconaccess.co.nz', 'correct horse');
      findOne.mockResolvedValue({ ...admin, passwordHash: await bcrypt.hash('new password', 4) });
      await expect(service.refresh(refreshToken)).rejects.toThrow(UnauthorizedException);
    });

    it('rejects refresh tokens for a deleted admin', async () => {
      const { refreshToken } = await service.login('info@falconaccess.co.nz', 'correct horse');
      findOne.mockResolvedValue(null);
      await expect(service.refresh(refreshToken)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('verifyAccessToken', () => {
    it('rejects a refresh token presented as an access token', async () => {
      const token = await jwtService.signAsync(
        { sub: 'admin-id', email: 'a@b.c', role: 'ADMIN', type: 'refresh' },
        { secret: 'access-secret' },
      );
      await expect(service.verifyAccessToken(token)).rejects.toThrow(UnauthorizedException);
    });

    it('rejects garbage', async () => {
      await expect(service.verifyAccessToken('not-a-jwt')).rejects.toThrow(UnauthorizedException);
    });
  });
});
