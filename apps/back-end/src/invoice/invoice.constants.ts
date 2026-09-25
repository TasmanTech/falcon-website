/** Business details printed on every invoice. */
export const BUSINESS = {
  legalName: 'Falcon Access Limited',
  tradingName: 'Falcon Access',
  phone: '+64 9 243 1404',
  website: 'falconaccess.co.nz',
  bankName: 'ASB',
  accountName: 'Falcon Access Limited',
  accountNumber: '12-3083-0866910-00',
} as const;

/** NZ GST rate, applied on top of the subtotal when an invoice opts in. */
export const GST_RATE = 0.15;

/** Printed under "Notes" on every invoice, before any job-specific notes. */
export const SERVICE_DISCLAIMER_TITLE = 'Invoice Summary / Service Disclaimer';
export const SERVICE_DISCLAIMER = [
  'The service was carried out following customer approval of the quoted price prior to commencement of work. Final pricing is based on an on-site assessment and may vary depending on job complexity, time required, urgency, tools/equipment used, and the security level of the locking system.',
  'By proceeding with the service, the customer confirms acceptance of the service provided and the associated charges.',
];

/** Brand colours from the front-end theme (`app/globals.css`). */
export const COLOURS = {
  brandDark: '#044389',
  brandPrimary: '#5995ED',
  tint: '#EEF4FD',
  text: '#1F2937',
  muted: '#6B7280',
} as const;
