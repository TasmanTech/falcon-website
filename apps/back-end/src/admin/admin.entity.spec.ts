import 'reflect-metadata';
import { describe, it, expect } from '@jest/globals';
import { getMetadataArgsStorage } from 'typeorm';
import { Admin } from './admin.entity';

describe('Admin entity', () => {
  it('maps to the admin table with a unique email', () => {
    const storage = getMetadataArgsStorage();
    expect(storage.tables.find((table) => table.target === Admin)?.name).toBe('admin');
    const email = storage.columns.find((column) => column.target === Admin && column.propertyName === 'email');
    expect(email?.options.unique).toBe(true);
  });
});
