import { describe, it, expect } from 'vitest';
import { buildLeadMessage, formatLeadDate, formatLeadPhone, formatLeadTime, mapsLink } from './lead';

describe('formatLeadPhone', () => {
  it.each([
    ['021 123 4567', '+64 21 123 4567'],
    ['0211234567', '+64 21 123 4567'],
    ['022 1234 5678', '+64 22 1234 5678'],
    ['027-123-456', '+64 27 123 456'],
    ['09 555 1234', '+64 9 555 1234'],
    ['+64 21 123 4567', '+64 21 123 4567'],
    ['64211234567', '+64 21 123 4567'],
  ])('puts %s in +64 form', (input, expected) => {
    expect(formatLeadPhone(input)).toBe(expected);
  });

  it('leaves 0800 and unrecognised numbers as typed', () => {
    expect(formatLeadPhone('0800 123 456')).toBe('0800 123 456');
    expect(formatLeadPhone(' +61 412 345 678 ')).toBe('+61 412 345 678');
  });
});

describe('date and time', () => {
  it('formats the date with the weekday, day first', () => {
    expect(formatLeadDate('2026-09-28')).toBe('Mon 28/09/2026');
    expect(formatLeadDate('')).toBe('');
  });

  it('formats the time in 12-hour form', () => {
    expect(formatLeadTime('14:30')).toBe('2:30pm');
    expect(formatLeadTime('00:05')).toBe('12:05am');
    expect(formatLeadTime('12:00')).toBe('12:00pm');
    expect(formatLeadTime('')).toBe('');
  });
});

describe('mapsLink', () => {
  it('builds a Google Maps search link', () => {
    expect(mapsLink('12 Queen Street, Auckland')).toBe(
      'https://www.google.com/maps/search/?api=1&query=12%20Queen%20Street%2C%20Auckland',
    );
    expect(mapsLink('  ')).toBe('');
  });
});

describe('buildLeadMessage', () => {
  it('matches the lead template line for line', () => {
    const message = buildLeadMessage({
      date: '2026-09-28',
      time: '14:30',
      name: 'Jerry Li',
      phone: '021 123 4567',
      address: '12 Queen Street, Auckland',
      jobType: 'House lockout',
      notes: 'Keys inside',
    });

    expect(message).toBe(
      [
        '📅 Date: Mon 28/09/2026 2:30pm',
        '',
        '',
        '📞 Name: Jerry Li',
        '📱 Phone: +64 21 123 4567',
        '📍 Address: 12 Queen Street, Auckland',
        '🔧 Job Type: House lockout',
        '📝 Notes: Keys inside',
        '',
        'https://www.google.com/maps/search/?api=1&query=12%20Queen%20Street%2C%20Auckland',
        '',
        '*💰 Price:',
        '*👨‍🔧 Tech:',
        '*💰 Payment Method:',
        '*🧩 Parts:',
      ].join('\n'),
    );
  });
});
