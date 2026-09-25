import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ThrottlerModule } from '@nestjs/throttler';
import type { Request, Response } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  const authService = {
    login: jest.fn<(...args: unknown[]) => Promise<unknown>>(() => Promise.resolve({ accessToken: 'access', refreshToken: 'refresh' })),
    refresh: jest.fn<(...args: unknown[]) => Promise<unknown>>(() => Promise.resolve({ accessToken: 'access-2', refreshToken: 'refresh-2' })),
  };
  const cookie = jest.fn();
  const clearCookie = jest.fn();
  const res = { cookie, clearCookie } as unknown as Response;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      imports: [ThrottlerModule.forRoot([{ ttl: 60_000, limit: 5 }])],
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();
    controller = module.get(AuthController);
  });

  it('login returns the access token and sets the refresh cookie', async () => {
    const result = await controller.login({ email: 'a@b.co', password: 'pw' }, res);

    expect(authService.login).toHaveBeenCalledWith('a@b.co', 'pw');
    expect(result).toEqual({ accessToken: 'access' });
    expect(cookie).toHaveBeenCalledWith(
      'refreshToken',
      'refresh',
      expect.objectContaining({ httpOnly: true, sameSite: 'lax' }),
    );
  });

  it('refresh reads the cookie and rotates it', async () => {
    const req = { cookies: { refreshToken: 'refresh' } } as unknown as Request;

    const result = await controller.refresh(req, res);

    expect(authService.refresh).toHaveBeenCalledWith('refresh');
    expect(result).toEqual({ accessToken: 'access-2' });
    expect(cookie).toHaveBeenCalledWith('refreshToken', 'refresh-2', expect.any(Object));
  });

  it('logout clears the refresh cookie', () => {
    expect(controller.logout(res)).toEqual({ success: true });
    expect(clearCookie).toHaveBeenCalledWith('refreshToken', expect.objectContaining({ httpOnly: true }));
  });
});
