import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { Admin } from '../admin/admin.entity';
import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL } from './auth.constants';

/** Claims carried by both access and refresh tokens. */
export interface AuthTokenPayload {
  /** The admin's ID. */
  sub: string;
  email: string;
  role: 'ADMIN';
  type: 'access' | 'refresh';
  /** Fingerprint of the admin's password hash; changing the password revokes old refresh tokens. */
  pwv?: string;
}

/** A freshly issued token pair. */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/** Compared against when the email is unknown, so both failure paths take as long. */
const DUMMY_HASH = '$2b$12$jywah9Ab7VbUs3yPIUbu1O/KK7YJkAQpoequfpL62irmHElM3eHrO';

/**
 * Authenticates admins (stored in the `admin` table) and issues JWT access/refresh tokens.
 *
 * Refresh tokens are stateless, signed with `JWT_REFRESH_SECRET`, and are invalidated by
 * rotating that secret, changing the admin's password, or deleting the admin.
 */
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  /**
   * Checks an admin's credentials and issues a token pair.
   *
   * @param {string} email - The submitted email address.
   * @param {string} password - The submitted plain text password.
   * @returns {Promise<AuthTokens>} Access and refresh tokens.
   * @throws {UnauthorizedException} If the credentials do not match.
   */
  async login(email: string, password: string): Promise<AuthTokens> {
    const admin = await this.adminRepository.findOne({ where: { email: email.trim().toLowerCase() } });

    // Always run bcrypt so an unknown email takes as long as a wrong password
    const passwordMatches = await bcrypt.compare(password, admin?.passwordHash ?? DUMMY_HASH);

    if (!admin || !passwordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.issueTokens(admin);
  }

  /**
   * Exchanges a valid refresh token for a new token pair (rotation).
   *
   * @param {string | undefined} refreshToken - The refresh token from the HttpOnly cookie.
   * @returns {Promise<AuthTokens>} New access and refresh tokens.
   * @throws {UnauthorizedException} If the token is missing, invalid, expired or revoked.
   */
  async refresh(refreshToken: string | undefined): Promise<AuthTokens> {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }

    let payload: AuthTokenPayload;
    try {
      payload = await this.jwtService.verifyAsync<AuthTokenPayload>(refreshToken, {
        secret: this.requireConfig('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const admin = await this.adminRepository.findOne({ where: { id: payload.sub } });
    if (!admin || payload.pwv !== this.passwordFingerprint(admin.passwordHash)) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.issueTokens(admin);
  }

  /**
   * Verifies an access token sent as a Bearer token.
   *
   * @param {string} accessToken - The raw JWT.
   * @returns {Promise<AuthTokenPayload>} The verified claims.
   * @throws {UnauthorizedException} If the token is invalid, expired or not an access token.
   */
  async verifyAccessToken(accessToken: string): Promise<AuthTokenPayload> {
    let payload: AuthTokenPayload;
    try {
      payload = await this.jwtService.verifyAsync<AuthTokenPayload>(accessToken, {
        secret: this.requireConfig('JWT_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }
    if (payload.type !== 'access' || payload.role !== 'ADMIN') {
      throw new UnauthorizedException('Invalid access token');
    }
    return payload;
  }

  private async issueTokens(admin: Admin): Promise<AuthTokens> {
    const base = { sub: admin.id, email: admin.email, role: 'ADMIN' as const };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { ...base, type: 'access' },
        { secret: this.requireConfig('JWT_SECRET'), expiresIn: ACCESS_TOKEN_TTL },
      ),
      this.jwtService.signAsync(
        { ...base, type: 'refresh', pwv: this.passwordFingerprint(admin.passwordHash) },
        { secret: this.requireConfig('JWT_REFRESH_SECRET'), expiresIn: REFRESH_TOKEN_TTL },
      ),
    ]);
    return { accessToken, refreshToken };
  }

  private passwordFingerprint(passwordHash: string): string {
    return crypto.createHash('sha256').update(passwordHash).digest('hex').slice(0, 16);
  }

  private requireConfig(key: string): string {
    const value = this.configService.get<string>(key);
    if (!value) {
      this.logger.error(`${key} is not configured; admin login is disabled`);
      throw new InternalServerErrorException('Admin login is not configured');
    }
    return value;
  }
}
