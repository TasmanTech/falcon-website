---
name: admin-portal
description: >-
  Rules for the private admin portal (invoices and leads) in `apps/front-end/app/admin/(portal)` and the
  matching `invoice/` and `lead/` back-end modules. Use when changing invoice or lead forms, history
  screens, PDFs or the emails sent to customers.
---

# Admin Portal (Invoices & Leads)

The portal is a private, phone-first tool the Falcon Access team uses on the job. Pages live in
`apps/front-end/app/admin/(portal)/`, shared logic in `apps/front-end/lib/invoice.ts` and `lib/lead.ts`,
and the API in `apps/back-end/src/invoice/` and `src/lead/` (both guarded by `JwtAuthGuard`).

## Invoices
- **Flow**: fill in → review → send. "Preview PDF" renders a `DRAFT` PDF without storing or emailing it.
  The form draft is kept in `localStorage` until the invoice is sent.
- **Required fields**: only the client name and at least one item. Email, phone, job address,
  technician, dates and notes are optional. Mark required labels with ` *` and optional ones without.
- **Email is optional**:
  - With an email: the PDF is stored, the record saved, then emailed to the client with a BCC to
    `SMTP_FROM`, and `emailedAt` is set. If the email fails, the record and PDF are removed so History
    only holds invoices that were really sent.
  - Without an email: the PDF and record are stored and nothing is emailed (`emailedAt` stays null and
    `clientEmail` is stored as `''`). The UI says "Save Invoice" / "Invoice saved" instead of "Send".
  - The PDF, review step and History omit the email line when there isn't one.
  - The DTO validates the email only when one is supplied (`@ValidateIf` + `@IsEmail`).
- **Title case**: the client name, job address and technician are passed through `toTitleCase`
  (`lib/invoice.ts`) when the field loses focus and again in `toInvoicePayload`. It capitalises the
  first letter of each word and keeps capitals the user typed (McDonald, RD 2); an all-caps value is
  normalised ("JERRY LI" → "Jerry Li"). Reuse it for any new name or address field.
- **Paid invoices**: `paid: true` shows a zero balance on the PDF and the email leaves out the bank
  details. Changing the status later re-renders the stored PDF but never emails the customer again.
- **Numbers and files**: invoice numbers are `FA-YYMMDD-XXX`. PDFs are written to
  `INVOICE_STORAGE_DIR` and are never overwritten; deleted invoices keep their PDF, so a reused
  number is regenerated.
- **Money and dates**: amounts are calculated on the server from quantity × rate, GST is 15% and
  needs `GST_NUMBER`, money shows as `NZ$` in emails, and dates show as DD/MM/YYYY (NZ time).
- **Schema**: TypeORM runs with `synchronize: true`. Prefer changes that do not need a column
  migration (e.g. store `''` rather than making an existing column nullable).

## Leads
- Leads build a message that the team pastes into Telegram (`buildLeadMessage`). Keep the template
  layout, including the non-breaking space after each emoji and the blank starred lines at the end.
- Phone numbers go through `formatLeadPhone` and come out as `+64211234567` with **no spaces**, so
  Telegram links the whole number. Do not reintroduce spaced formatting there.
- Saved leads appear in Leads → History with a status badge (`LEAD_STATUSES`) and can be deleted.

## Testing
- Front end: extend `InvoiceForm.test.tsx`, `InvoiceHistory.test.tsx`, `LeadMessage.test.tsx`,
  `LeadHistory.test.tsx` and `lib/*.test.ts`. Find inputs by their exact label text (e.g. `'Email'`,
  `'Name *'`) so a wrong required marker fails the test.
- Back end: extend `invoice.service.spec.ts`, `create-invoice.dto.spec.ts`, `invoice-pdf.spec.ts` and
  `lead.service.spec.ts`.
