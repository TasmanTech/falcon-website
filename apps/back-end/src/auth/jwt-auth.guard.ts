import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService, AuthTokenPayload } from './auth.service';

/** An Express request that has passed {@link JwtAuthGuard}. */
export type AuthenticatedRequest = Request & { user: AuthTokenPayload };

/**
 * Protects admin routes. Requires a valid access token in the
 * `Authorization: Bearer <token>` header and attaches its claims to `req.user`.
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  /**
   * @param {ExecutionContext} context - The Nest execution context.
   * @returns {Promise<boolean>} True when the token is valid.
   * @throws {UnauthorizedException} If the header is missing or the token is invalid.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const [scheme, token] = request.headers.authorization?.split(' ') ?? [];

    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Missing access token');
    }

    request.user = await this.authService.verifyAccessToken(token);
    return true;
  }
}
