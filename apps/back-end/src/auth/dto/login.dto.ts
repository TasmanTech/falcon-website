import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * Credentials submitted to `POST /auth/login`.
 */
export class LoginDto {
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  password!: string;
}
