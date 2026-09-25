import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { REFRESH_COOKIE, REFRESH_TOKEN_MAX_AGE_MS, refreshCookieOptions } from './auth.constants';

/**
 * Authentication routes for the admin portal.
 * Access tokens are returned in the body; refresh tokens travel in an HttpOnly cookie.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Logs the admin in. Throttled (see AuthModule) to slow down password guessing.
   *
   * @param {LoginDto} dto - The submitted credentials.
   * @param {Response} res - Used to set the refresh token cookie.
   * @returns {Promise<{ accessToken: string }>} The access token.
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ThrottlerGuard)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string }> {
    const tokens = await this.authService.login(dto.email, dto.password);
    res.cookie(REFRESH_COOKIE, tokens.refreshToken, {
      ...refreshCookieOptions(),
      maxAge: REFRESH_TOKEN_MAX_AGE_MS,
    });
    return { accessToken: tokens.accessToken };
  }

  /**
   * Rotates the refresh token cookie and returns a new access token.
   *
   * @param {Request} req - Carries the refresh token cookie.
   * @param {Response} res - Used to set the rotated refresh token cookie.
   * @returns {Promise<{ accessToken: string }>} The new access token.
   */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string }> {
    const cookies = req.cookies as Record<string, string | undefined> | undefined;
    const tokens = await this.authService.refresh(cookies?.[REFRESH_COOKIE]);
    res.cookie(REFRESH_COOKIE, tokens.refreshToken, {
      ...refreshCookieOptions(),
      maxAge: REFRESH_TOKEN_MAX_AGE_MS,
    });
    return { accessToken: tokens.accessToken };
  }

  /**
   * Clears the refresh token cookie.
   *
   * @param {Response} res - Used to clear the cookie.
   * @returns {{ success: boolean }} Success status.
   */
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response): { success: boolean } {
    res.clearCookie(REFRESH_COOKIE, refreshCookieOptions());
    return { success: true };
  }
}
