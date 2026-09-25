import { describe, it, expect, jest } from '@jest/globals';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';

function contextWith(headers: Record<string, string>): { context: ExecutionContext; request: Record<string, unknown> } {
  const request: Record<string, unknown> = { headers };
  const context = { switchToHttp: () => ({ getRequest: () => request }) } as unknown as ExecutionContext;
  return { context, request };
}

describe('JwtAuthGuard', () => {
  const payload = { sub: 'admin', email: 'a@b.co', role: 'ADMIN', type: 'access' };
  const verifyAccessToken = jest.fn<(...args: unknown[]) => Promise<unknown>>(() => Promise.resolve(payload));
  const authService = { verifyAccessToken } as unknown as AuthService;
  const guard = new JwtAuthGuard(authService);

  it('allows a valid Bearer token and attaches the claims', async () => {
    const { context, request } = contextWith({ authorization: 'Bearer good' });
    await expect(guard.canActivate(context)).resolves.toBe(true);
    expect(verifyAccessToken).toHaveBeenCalledWith('good');
    expect(request.user).toEqual(payload);
  });

  it('rejects a missing header', async () => {
    await expect(guard.canActivate(contextWith({}).context)).rejects.toThrow(UnauthorizedException);
  });

  it('rejects a non-Bearer scheme', async () => {
    await expect(guard.canActivate(contextWith({ authorization: 'Basic abc' }).context)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
