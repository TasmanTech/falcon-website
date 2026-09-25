import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const logger = new Logger('InvoiceStorage');

/**
 * Directory where invoice PDFs are kept.
 *
 * - `INVOICE_STORAGE_DIR` wins when set.
 * - On Cloud Run (`K_SERVICE` is set) it defaults to `/app/data/invoices`, inside the
 *   Cloud Storage bucket volume mounted at `/app/data`, so files survive redeploys.
 * - Locally it defaults to `data/invoices` under the working directory (git-ignored).
 *
 * @returns {string} The absolute storage directory.
 */
export function getInvoiceStorageDir(): string {
  const configured = process.env.INVOICE_STORAGE_DIR?.trim();
  if (configured) return path.resolve(configured);
  return process.env.K_SERVICE
    ? path.join('/app', 'data', 'invoices')
    : path.join(process.cwd(), 'data', 'invoices');
}

/**
 * Resolves a stored filename to its absolute path, refusing anything that would
 * escape the storage directory.
 *
 * @param {string} fileName - The filename recorded on the invoice.
 * @returns {string} The absolute path.
 * @throws {Error} If the name contains path segments.
 */
export function resolveInvoiceFile(fileName: string): string {
  if (path.basename(fileName) !== fileName) {
    throw new Error(`Invalid invoice file name: ${fileName}`);
  }
  return path.join(getInvoiceStorageDir(), fileName);
}

/**
 * Writes an invoice PDF to storage, creating the directory if needed.
 *
 * @param {string} fileName - The filename to store under.
 * @param {Buffer} pdf - The PDF bytes.
 * @returns {Promise<void>}
 */
export async function writeInvoiceFile(fileName: string, pdf: Buffer): Promise<void> {
  await fs.promises.mkdir(getInvoiceStorageDir(), { recursive: true });
  await fs.promises.writeFile(resolveInvoiceFile(fileName), pdf);
}

/**
 * Reads an invoice PDF from storage.
 *
 * @param {string} fileName - The stored filename.
 * @returns {Promise<Buffer | null>} The PDF bytes, or null if the file is missing.
 */
export async function readInvoiceFile(fileName: string): Promise<Buffer | null> {
  try {
    return await fs.promises.readFile(resolveInvoiceFile(fileName));
  } catch (error) {
    logger.warn(`Invoice file ${fileName} could not be read: ${(error as Error).message}`);
    return null;
  }
}

/**
 * Deletes an invoice PDF, ignoring a file that is already gone.
 *
 * @param {string} fileName - The stored filename.
 * @returns {Promise<void>}
 */
export async function deleteInvoiceFile(fileName: string): Promise<void> {
  await fs.promises.rm(resolveInvoiceFile(fileName), { force: true });
}
