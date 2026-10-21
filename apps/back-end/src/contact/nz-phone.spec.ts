import { describe, it, expect } from '@jest/globals';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { CreateContactDto } from './dto/create-contact.dto';
import { formatNzPhone, isValidNzPhone } from './nz-phone';

describe('isValidNzPhone', () => {
  it.each([
    '021 123 4567',
    '0211234567',
    '021 123 456',
    '022 123 4567',
    '027-123-4567',
    '029 1234 5678',
    '+64 21 123 4567',
    '+64 (0) 21 123 4567',
    '0064211234567',
    '09 243 1404',
    '(09) 243-1404',
    '+64 9 243 1404',
    '03 379 1234',
    '0800 123 456',
    '0800 1234 567',
    '0508 123 456',
  ])('accepts %s', (phone) => {
    expect(isValidNzPhone(phone)).toBe(true);
  });

  it.each([
    '',
    '123',
    '021 12',
    '021 1234 56789',
    '09 123 4567',
    '05 123 4567',
    '08 123 4567',
    '+61 412 345 678',
    '+1 415 555 0100',
    'not a number',
    '021 123 456a',
  ])('rejects %s', (phone) => {
    expect(isValidNzPhone(phone)).toBe(false);
  });
});

describe('formatNzPhone', () => {
  it('rewrites mobiles and landlines in +64 form', () => {
    expect(formatNzPhone('021 123 4567')).toBe('+64211234567');
    expect(formatNzPhone('(09) 243-1404')).toBe('+6492431404');
    expect(formatNzPhone('+64 0 21 123 4567')).toBe('+64211234567');
  });

  it('keeps toll-free numbers in national form', () => {
    expect(formatNzPhone('0800 123 456')).toBe('0800123456');
  });
});

describe('CreateContactDto phone', () => {
  const base = { name: 'John', email: 'john@example.com', message: 'Hello there, I need help' };

  it('requires a phone number', () => {
    const errors = validateSync(plainToInstance(CreateContactDto, base));
    expect(errors.map((e) => e.property)).toContain('phone');
  });

  it('rejects a non-NZ number', () => {
    const errors = validateSync(plainToInstance(CreateContactDto, { ...base, phone: '+61 412 345 678' }));
    expect(errors.map((e) => e.property)).toContain('phone');
  });

  it('accepts and normalises a valid NZ number', () => {
    const dto = plainToInstance(CreateContactDto, { ...base, phone: '021 123 4567' });
    expect(validateSync(dto)).toHaveLength(0);
    expect(dto.phone).toBe('+64211234567');
  });
});
