import PDFDocument from 'pdfkit';
import { resolveAsset } from '../common/assets/assets.util';
import {
  BUSINESS,
  COLOURS,
  GST_RATE,
  SERVICE_DISCLAIMER,
  SERVICE_DISCLAIMER_TITLE,
} from './invoice.constants';

/** A priced invoice line, ready to print. */
export interface InvoiceLine {
  title: string;
  description?: string;
  quantity: number;
  rate: number;
  amount: number;
}

/** Everything needed to render an invoice PDF. Amounts are already calculated. */
export interface InvoiceDocument {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  jobAddress?: string;
  technicianName?: string;
  notes?: string;
  gstNumber?: string;
  items: InvoiceLine[];
  subtotal: number;
  gst: number;
  total: number;
}

const PAGE_BOTTOM = 800;
const LEFT = 50;
const RIGHT = 545;

/**
 * Formats a number as NZ currency, e.g. `1234.5` -> `NZ$1,234.50`.
 *
 * @param {number} value - The amount.
 * @returns {string} The formatted amount.
 */
export function formatMoney(value: number): string {
  return `NZ$${value.toLocaleString('en-NZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Formats a `YYYY-MM-DD` calendar date as e.g. `25 Sep 2026`.
 * Parsed and formatted in UTC so the calendar day never shifts with the server timezone.
 *
 * @param {string} isoDate - The calendar date.
 * @returns {string} The formatted date.
 */
export function formatInvoiceDate(isoDate: string): string {
  return new Date(`${isoDate.slice(0, 10)}T00:00:00Z`).toLocaleDateString('en-NZ', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/**
 * Formats a quantity without trailing zeros, e.g. `1` -> `1`, `1.5` -> `1.5`.
 */
function formatQuantity(value: number): string {
  return value.toLocaleString('en-NZ', { maximumFractionDigits: 2 });
}

/**
 * Renders a Falcon Access invoice as an A4 PDF.
 * Layout: brand badge and invoice number, business and bank details, dates and balance due,
 * bill-to and job address, an itemised table, totals, then notes.
 *
 * @param {InvoiceDocument} invoice - The calculated invoice.
 * @returns {Promise<Buffer>} The PDF bytes.
 */
export function renderInvoicePdf(invoice: InvoiceDocument): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 50, bottom: 40, left: LEFT, right: 50 },
      info: { Title: `Invoice ${invoice.invoiceNumber}`, Author: BUSINESS.legalName },
    });
    const chunks: Buffer[] = [];
    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    // --- Header: brand badge (left) and invoice number (right) ---
    const badgePath = resolveAsset('invoice-badge.png');
    if (badgePath) {
      doc.image(badgePath, LEFT, 40, { width: 200, height: 70 });
    } else {
      doc.roundedRect(LEFT, 40, 200, 70, 8).fill(COLOURS.brandDark);
    }
    doc
      .fillColor('white')
      .font('Helvetica-Bold')
      .fontSize(14)
      .text('FALCON ACCESS', LEFT + 72, 60, { lineBreak: false });
    doc
      .font('Helvetica')
      .fontSize(7)
      .text('REPAIR & MAINTENANCE', LEFT + 72, 79, { characterSpacing: 1, lineBreak: false });

    doc
      .fillColor(COLOURS.text)
      .font('Helvetica')
      .fontSize(30)
      .text('INVOICE', 300, 42, { width: RIGHT - 300, align: 'right' });
    doc
      .fillColor(COLOURS.muted)
      .fontSize(12)
      .text(`# ${invoice.invoiceNumber}`, 300, 78, { width: RIGHT - 300, align: 'right' });

    // --- Business and bank details (left) ---
    doc.fillColor(COLOURS.text).font('Helvetica-Bold').fontSize(10);
    doc.text(BUSINESS.legalName.toUpperCase(), LEFT, 135, { width: 250 });
    doc.font('Helvetica');
    if (invoice.gstNumber) doc.text(`GST ${invoice.gstNumber}`, { width: 250 });
    doc.text(BUSINESS.phone, { width: 250 });
    doc.text(BUSINESS.website, { width: 250 });
    doc.moveDown(0.8);
    doc.text(`Bank: ${BUSINESS.bankName}`, { width: 250 });
    doc.text(`Account Name: ${BUSINESS.accountName}`, { width: 250 });
    doc.text(`Account Number: ${BUSINESS.accountNumber}`, { width: 250 });
    const businessBottom = doc.y;

    // --- Dates and balance due (right) ---
    const summaryRow = (label: string, value: string, y: number): void => {
      doc.fillColor(COLOURS.muted).font('Helvetica').fontSize(10);
      doc.text(label, 330, y, { width: 110, align: 'right' });
      doc.fillColor(COLOURS.text).text(value, 450, y, { width: 90, align: 'right' });
    };
    summaryRow('Date:', formatInvoiceDate(invoice.invoiceDate), 140);
    summaryRow('Due Date:', formatInvoiceDate(invoice.dueDate), 162);
    doc.roundedRect(320, 182, RIGHT + 5 - 320, 26, 4).fill(COLOURS.tint);
    doc.fillColor(COLOURS.brandDark).font('Helvetica-Bold').fontSize(12);
    doc.text('Balance Due:', 330, 190, { width: 110, align: 'right' });
    doc.text(formatMoney(invoice.total), 440, 190, { width: 100, align: 'right' });

    // --- Bill to / job address ---
    const partiesTop = Math.max(businessBottom, 215) + 18;
    doc.fillColor(COLOURS.muted).font('Helvetica').fontSize(10);
    doc.text('Bill To:', LEFT, partiesTop);
    doc.fillColor(COLOURS.text).font('Helvetica-Bold').text(invoice.clientName, LEFT, partiesTop + 16, { width: 220 });
    doc.font('Helvetica');
    if (invoice.clientPhone) doc.text(invoice.clientPhone, { width: 220 });
    doc.text(invoice.clientEmail, { width: 220 });
    let partiesBottom = doc.y;

    if (invoice.jobAddress) {
      doc.fillColor(COLOURS.muted).font('Helvetica').text('Job Address:', 300, partiesTop);
      doc
        .fillColor(COLOURS.text)
        .font('Helvetica-Bold')
        .text(invoice.jobAddress, 300, partiesTop + 16, { width: RIGHT - 300 });
      partiesBottom = Math.max(partiesBottom, doc.y);
    }

    // --- Items table ---
    const COL_QTY = 350;
    const COL_RATE = { x: 400, width: 70 };
    const COL_AMOUNT = { x: 475, width: 65 };

    const drawTableHeader = (y: number): number => {
      doc.roundedRect(LEFT - 5, y, RIGHT - LEFT + 10, 24, 4).fill(COLOURS.brandDark);
      doc.fillColor('white').font('Helvetica').fontSize(10);
      doc.text('Item', LEFT + 10, y + 7);
      doc.text('Quantity', COL_QTY, y + 7);
      doc.text('Rate', COL_RATE.x, y + 7, { width: COL_RATE.width, align: 'right' });
      doc.text('Amount', COL_AMOUNT.x, y + 7, { width: COL_AMOUNT.width, align: 'right' });
      return y + 36;
    };

    let y = drawTableHeader(partiesBottom + 30);

    for (const item of invoice.items) {
      doc.font('Helvetica-Bold').fontSize(10);
      const titleHeight = doc.heightOfString(item.title, { width: 280 });
      doc.font('Helvetica').fontSize(9.5);
      const descriptionHeight = item.description
        ? doc.heightOfString(item.description, { width: RIGHT - LEFT - 10, lineGap: 2 }) + 3
        : 0;

      if (y + titleHeight + descriptionHeight > PAGE_BOTTOM) {
        doc.addPage();
        y = drawTableHeader(50);
      }

      doc.fillColor(COLOURS.text).font('Helvetica-Bold').fontSize(10);
      doc.text(item.title, LEFT + 10, y, { width: 280 });
      doc.font('Helvetica');
      doc.text(formatQuantity(item.quantity), COL_QTY, y);
      doc.text(formatMoney(item.rate), COL_RATE.x, y, { width: COL_RATE.width, align: 'right' });
      doc.text(formatMoney(item.amount), COL_AMOUNT.x, y, { width: COL_AMOUNT.width, align: 'right' });
      y += titleHeight + 3;

      if (item.description) {
        doc.fillColor(COLOURS.muted).fontSize(9.5);
        doc.text(item.description, LEFT + 10, y, { width: RIGHT - LEFT - 10, lineGap: 2 });
        y += descriptionHeight;
      }
      y += 12;
    }

    // --- Totals ---
    const totalRows: [string, string][] = [['Subtotal:', formatMoney(invoice.subtotal)]];
    if (invoice.gst > 0) totalRows.push([`GST (${GST_RATE * 100}%):`, formatMoney(invoice.gst)]);

    if (y + 30 + totalRows.length * 22 + 26 > PAGE_BOTTOM) {
      doc.addPage();
      y = 50;
    }
    y += 24;
    doc.moveTo(320, y - 10).lineTo(RIGHT, y - 10).lineWidth(0.5).strokeColor('#E5E7EB').stroke();
    for (const [label, value] of totalRows) {
      summaryRow(label, value, y);
      y += 22;
    }
    doc.fillColor(COLOURS.brandDark).font('Helvetica-Bold').fontSize(12);
    doc.text('Total:', 330, y, { width: 110, align: 'right' });
    doc.text(formatMoney(invoice.total), 440, y, { width: 100, align: 'right' });
    y += 50;

    // --- Notes ---
    const width = RIGHT - LEFT;
    const noteParagraphs = [
      ...SERVICE_DISCLAIMER,
      ...(invoice.notes?.trim() ? [invoice.notes.trim()] : []),
      ...(invoice.technicianName?.trim() ? [`Technician: ${invoice.technicianName.trim()}`] : []),
      'Thank you for doing business with us',
    ];
    doc.font('Helvetica').fontSize(10);
    const notesHeight =
      40 +
      noteParagraphs.reduce((sum, p) => sum + doc.heightOfString(p, { width, lineGap: 2 }) + 10, 0);
    if (y + notesHeight > PAGE_BOTTOM) {
      doc.addPage();
      y = 50;
    }

    doc.fillColor(COLOURS.muted).text('Notes:', LEFT, y, { width });
    doc.moveDown(0.4);
    doc.fillColor(COLOURS.text).text(SERVICE_DISCLAIMER_TITLE, { width });
    for (const paragraph of noteParagraphs) {
      doc.text(paragraph, { width, lineGap: 2 });
      doc.moveDown(0.8);
    }

    doc.end();
  });
}
