import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength, ValidateBy } from 'class-validator';
import { formatNzPhone, isValidNzPhone } from '../nz-phone';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  /** NZ mobile, landline or 0800 / 0508 number; stored in +64 form once valid. */
  @Transform(({ value }) => (typeof value === 'string' && isValidNzPhone(value) ? formatNzPhone(value) : value))
  @ValidateBy({
    name: 'isNzPhone',
    validator: {
      validate: (value: unknown) => typeof value === 'string' && isValidNzPhone(value),
      defaultMessage: () => 'phone must be a valid New Zealand phone number',
    },
  })
  phone!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  message!: string;
}
