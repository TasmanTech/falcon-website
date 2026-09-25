import { describe, it, expect, afterEach } from '@jest/globals';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {
  deleteInvoiceFile,
  getInvoiceStorageDir,
  readInvoiceFile,
  resolveInvoiceFile,
  writeInvoiceFile,
} from './invoice-storage';

describe('invoice-storage', () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('uses the bucket mount on Cloud Run', () => {
    delete process.env.INVOICE_STORAGE_DIR;
    process.env.K_SERVICE = 'falcon-backend-service';
    expect(getInvoiceStorageDir()).toBe(path.join('/app', 'data', 'invoices'));
  });

  it('uses data/invoices under the working directory locally', () => {
    delete process.env.INVOICE_STORAGE_DIR;
    delete process.env.K_SERVICE;
    expect(getInvoiceStorageDir()).toBe(path.join(process.cwd(), 'data', 'invoices'));
  });

  it('prefers INVOICE_STORAGE_DIR when set', () => {
    process.env.INVOICE_STORAGE_DIR = '/mnt/invoices';
    expect(getInvoiceStorageDir()).toBe(path.resolve('/mnt/invoices'));
  });

  it('refuses file names that escape the storage directory', () => {
    expect(() => resolveInvoiceFile('../secrets.pdf')).toThrow();
  });

  it('writes, reads and deletes a PDF', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'falcon-storage-'));
    process.env.INVOICE_STORAGE_DIR = path.join(dir, 'nested');

    await writeInvoiceFile('a.pdf', Buffer.from('%PDF-a'));
    expect((await readInvoiceFile('a.pdf'))?.toString()).toBe('%PDF-a');

    await deleteInvoiceFile('a.pdf');
    expect(await readInvoiceFile('a.pdf')).toBeNull();

    fs.rmSync(dir, { recursive: true, force: true });
  });
});
