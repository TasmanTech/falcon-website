import 'reflect-metadata';
import { describe, it, expect } from '@jest/globals';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateLeadStatusDto } from './update-lead-status.dto';

async function errorsFor(payload: Record<string, unknown>): Promise<string[]> {
  const errors = await validate(plainToInstance(UpdateLeadStatusDto, payload));
  return errors.map((error) => error.property);
}

describe('UpdateLeadStatusDto', () => {
  it('needs nothing else to re-open a lead', async () => {
    expect(await errorsFor({ status: 'pending' })).toEqual([]);
  });

  it('requires all three prices to close a lead', async () => {
    expect(await errorsFor({ status: 'closed', partPrice: 0, paidPrice: 150, calloutPrice: 20 })).toEqual([]);
    expect(await errorsFor({ status: 'closed' })).toEqual(['partPrice', 'paidPrice', 'calloutPrice']);
  });

  it('rejects negative prices and fractions of a cent', async () => {
    expect(await errorsFor({ status: 'closed', partPrice: -1, paidPrice: 10.555, calloutPrice: 20 })).toEqual([
      'partPrice',
      'paidPrice',
    ]);
  });

  it('requires a reason to cancel a lead', async () => {
    expect(await errorsFor({ status: 'cancelled', cancellationReason: 'Customer found a key' })).toEqual([]);
    expect(await errorsFor({ status: 'cancelled' })).toEqual(['cancellationReason']);
    expect(await errorsFor({ status: 'cancelled', cancellationReason: '' })).toEqual(['cancellationReason']);
  });

  it('rejects an unknown status', async () => {
    expect(await errorsFor({ status: 'done' })).toEqual(['status']);
  });
});
