import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  buildLeadMessage,
  formatLeadDate,
  formatLeadPhone,
  formatLeadTime,
  mapsLink,
  saveLead,
  toLeadStatusChange,
  updateLeadStatus,
  type SavedLead,
} from './lead';

describe('formatLeadPhone', () => {
  it.each([
    ['021 123 4567', '+64211234567'],
    ['0211234567', '+64211234567'],
    ['022 1234 5678', '+642212345678'],
    ['027-123-456', '+6427123456'],
    ['09 555 1234', '+6495551234'],
    ['+64 21 123 4567', '+64211234567'],
    ['64211234567', '+64211234567'],
  ])('puts %s in +64 form with no spaces', (input, expected) => {
    expect(formatLeadPhone(input)).toBe(expected);
  });

  it('strips spaces from 0800 and unrecognised numbers', () => {
    expect(formatLeadPhone('0800 123 456')).toBe('0800123456');
    expect(formatLeadPhone(' +61 412-345 678 ')).toBe('+61412345678');
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
        '📱 Phone: +64211234567',
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

const savedLead: SavedLead = {
  id: 'lead-1',
  date: '2026-10-22',
  time: null,
  name: 'Kerry',
  phone: null,
  address: null,
  jobType: null,
  notes: null,
  status: 'pending',
  partPrice: null,
  paidPrice: null,
  calloutPrice: null,
  cancellationReason: null,
  createdAt: '2026-10-22T00:00:00.000Z',
  updatedAt: '2026-10-22T00:00:00.000Z',
};

describe('toLeadStatusChange', () => {
  it('keeps the prices of a closed lead', () => {
    expect(toLeadStatusChange({ ...savedLead, status: 'closed', partPrice: 35, paidPrice: 180, calloutPrice: 20 })).toEqual({
      status: 'closed',
      partPrice: 35,
      paidPrice: 180,
      calloutPrice: 20,
    });
  });

  it('keeps the reason of a cancelled lead', () => {
    expect(toLeadStatusChange({ ...savedLead, status: 'cancelled', cancellationReason: 'Too far' })).toEqual({
      status: 'cancelled',
      cancellationReason: 'Too far',
    });
    expect(toLeadStatusChange(savedLead)).toEqual({ status: 'pending' });
  });

  it('returns null for leads closed or cancelled before the details were recorded', () => {
    expect(toLeadStatusChange({ ...savedLead, status: 'closed' })).toBeNull();
    expect(toLeadStatusChange({ ...savedLead, status: 'cancelled' })).toBeNull();
  });
});

describe('lead API', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('sends the closing prices with a status change', async () => {
    const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValue(new Response(JSON.stringify(savedLead)));

    await updateLeadStatus('lead-1', { status: 'closed', partPrice: 35, paidPrice: 180, calloutPrice: 20 }, 't', vi.fn());

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toMatch(/\/leads\/lead-1\/status$/);
    expect(JSON.parse(init.body as string)).toEqual({ status: 'closed', partPrice: 35, paidPrice: 180, calloutPrice: 20 });
  });

  it('saves a lead with its cancellation reason', async () => {
    const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValue(new Response(JSON.stringify(savedLead)));
    const draft = { date: '2026-10-22', time: '', name: 'Kerry', phone: '', address: '', jobType: '', notes: '' };

    await saveLead(draft, { status: 'cancelled', cancellationReason: 'Found a key' }, undefined, 't', vi.fn());

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(JSON.parse(init.body as string)).toMatchObject({ name: 'Kerry', status: 'cancelled', cancellationReason: 'Found a key' });
  });
});
