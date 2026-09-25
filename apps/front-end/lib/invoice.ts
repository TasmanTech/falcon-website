/** A billable line as edited in the form. Numbers stay as strings while typing. */
export interface InvoiceItemDraft {
  id: string;
  title: string;
  description: string;
  quantity: string;
  rate: string;
}

/** The full invoice form state. */
export interface InvoiceDraft {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  jobAddress: string;
  technicianName: string;
  invoiceDate: string;
  dueDate: string;
  addGst: boolean;
  notes: string;
  items: InvoiceItemDraft[];
}

/** A one-tap item from the job sheet price list. `rate: 0` means priced on the day (TBD) unless `free`. */
export interface InvoicePreset {
  title: string;
  rate: number;
  description: string;
  free?: boolean;
}

/** Job sheet price list, grouped as on the paper form. */
export const PRESET_GROUPS: { label: string; presets: InvoicePreset[] }[] = [
  {
    label: "Call-out",
    presets: [
      { title: "Service Call", rate: 20, description: "Call-out, travel and initial on-site assessment." },
    ],
  },
  {
    label: "Lockout",
    presets: [
      { title: "Lockout – Standard Lock", rate: 99, description: "Non-destructive entry for a standard lock such as a cabinet or mailbox lock, with a check that the lock still works afterwards." },
      { title: "Lockout – Advanced Lock", rate: 369, description: "Non-destructive entry for an advanced lock (deadbolt/handle set, 5-pin cylinder), gaining access without damage to the door or frame, and testing that the lock still operates correctly afterwards." },
      { title: "Lockout – Secure Lock", rate: 479, description: "Entry for a secure lock (smart, restricted, electronic or 6-pin cylinder), carried out with care to protect the lock and door, followed by a function test." },
      { title: "Car Lockout / Safe Opening", rate: 0, description: "Vehicle lockout or safe opening, priced on-site according to the vehicle or safe and the method required." },
    ],
  },
  {
    label: "Lock changes",
    presets: [
      { title: "Lock Change – Standard", rate: 179, description: "Supply and fit of a standard replacement lock, including removal of the existing lock, alignment and function testing." },
      { title: "Lock Change – Advanced", rate: 365, description: "Supply and fit of an advanced replacement lock, including removal of the existing lock, door/frame adjustment as required, alignment and function testing." },
      { title: "Lock Change – Sliding Door", rate: 450, description: "Supply and fit of a replacement sliding door lock, including removal of the existing lock, alignment and function testing." },
      { title: "Fresh Installation – Standard Secure Lock", rate: 449, description: "New installation of a standard secure lock where none was fitted, including preparing the door, fitting, alignment and function testing." },
      { title: "Special Order Lock", rate: 0, description: "Supply and fit of a special order lock, priced according to the product ordered." },
      { title: "Special Adjustment", rate: 0, description: "Adjustment of the door, frame or lock hardware as required on-site." },
    ],
  },
  {
    label: "Mechanisms",
    presets: [
      { title: "Residential Mortice", rate: 799, description: "Supply and fit of a residential mortice lock mechanism, including removal of the existing mechanism, fitting, alignment and function testing." },
      { title: "Commercial Mortice", rate: 849, description: "Supply and fit of a commercial mortice lock mechanism, including removal of the existing mechanism, fitting, alignment and function testing." },
      { title: "Commercial Turnbolt", rate: 699, description: "Supply and fit of a commercial turnbolt, including fitting, alignment and function testing." },
      { title: "Trilock", rate: 899, description: "Supply and fit of a Trilock multi-point locking mechanism, including fitting, alignment and function testing." },
      { title: "Rim Lock", rate: 589, description: "Supply and fit of a rim lock mechanism, including fitting, alignment and function testing." },
      { title: "Screen Door Mortice", rate: 499, description: "Supply and fit of a screen door mortice lock, including fitting, alignment and function testing." },
      { title: "Euro Mechanism", rate: 699, description: "Supply and fit of a euro profile lock mechanism, including fitting, alignment and function testing." },
    ],
  },
  {
    label: "Extras",
    presets: [
      { title: "After-Hours Fee (after 6pm)", rate: 199, description: "Surcharge for work carried out after 6pm." },
      { title: "Weekend / Public Holiday Fee", rate: 199, description: "Surcharge for work carried out on a weekend or public holiday." },
      { title: "Early Hours Fee (before 9am)", rate: 149, description: "Surcharge for work carried out before 9am." },
      { title: "Urgency Fee", rate: 100, description: "Priority response for an urgent job." },
      { title: "Special Adjustment", rate: 150, description: "Additional adjustment of the door, frame or lock hardware required on-site." },
      { title: "Rekey", rate: 0, description: "Rekeying of the existing lock cylinder so old keys no longer operate it, including new keys." },
      { title: "Lock Fix", rate: 0, description: "Repair of the existing lock, priced according to the fault found on-site." },
    ],
  },
  {
    label: "Warranty",
    presets: [
      { title: "Installation Warranty – 90 Days", rate: 0, free: true, description: "90-day warranty on the installation work, included free of charge." },
      { title: "Installation Warranty – 12 Months", rate: 99, description: "Extended 12-month warranty on the installation work." },
      { title: "Installation Warranty – 24 Months", rate: 179, description: "Extended 24-month warranty on the installation work." },
    ],
  },
];

/** NZ GST rate. */
export const GST_RATE = 0.15;

/**
 * Parses a numeric form field, treating blanks and junk as 0.
 *
 * @param {string} value - The raw input value.
 * @returns {number} The parsed number.
 */
export function toNumber(value: string): number {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

/** Rounds to whole cents. */
export function roundCents(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Calculates the line amounts and totals exactly as the back-end does.
 *
 * @param {InvoiceItemDraft[]} items - The items.
 * @param {boolean} addGst - Whether to add 15% GST on top.
 * @returns The subtotal, GST and total, in dollars.
 */
export function calculateTotals(items: InvoiceItemDraft[], addGst: boolean) {
  const subtotal = roundCents(
    items.reduce((sum, item) => sum + roundCents(toNumber(item.quantity) * toNumber(item.rate)), 0),
  );
  const gst = addGst ? roundCents(subtotal * GST_RATE) : 0;
  return { subtotal, gst, total: roundCents(subtotal + gst) };
}

/**
 * Formats a number as NZ currency, e.g. `1234.5` -> `$1,234.50`.
 *
 * @param {number} value - The amount.
 * @returns {string} The formatted amount.
 */
export function formatMoney(value: number): string {
  return value.toLocaleString("en-NZ", { style: "currency", currency: "NZD" });
}

/**
 * Formats a `YYYY-MM-DD` calendar date as `DD/MM/YYYY`.
 *
 * @param {string} isoDate - The calendar date.
 * @returns {string} The NZ-formatted date.
 */
export function formatDisplayDate(isoDate: string): string {
  const [year, month, day] = isoDate.slice(0, 10).split("-");
  return year && month && day ? `${day}/${month}/${year}` : isoDate;
}

/**
 * Today's calendar date in New Zealand as `YYYY-MM-DD` (for `<input type="date">`).
 *
 * @returns {string} The date.
 */
export function todayInNz(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Pacific/Auckland" }).format(new Date());
}

/**
 * Creates an empty item, optionally filled from a preset.
 *
 * @param {InvoicePreset} [preset] - The preset to copy.
 * @returns {InvoiceItemDraft} The new item.
 */
export function createItem(preset?: InvoicePreset): InvoiceItemDraft {
  return {
    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Math.random()),
    title: preset?.title ?? "",
    description: preset?.description ?? "",
    quantity: "1",
    rate: preset && (preset.rate > 0 || preset.free) ? String(preset.rate) : "",
  };
}

/**
 * Creates a blank invoice dated today.
 *
 * @returns {InvoiceDraft} The empty draft.
 */
export function createEmptyDraft(): InvoiceDraft {
  return {
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    jobAddress: "",
    technicianName: "",
    invoiceDate: todayInNz(),
    dueDate: "",
    addGst: false,
    notes: "",
    items: [],
  };
}

/**
 * Converts the form state into the back-end `CreateInvoiceDto` payload.
 *
 * @param {InvoiceDraft} draft - The form state.
 * @returns The request body.
 */
export function toInvoicePayload(draft: InvoiceDraft) {
  const optional = (value: string) => value.trim() || undefined;
  return {
    clientName: draft.clientName.trim(),
    clientEmail: draft.clientEmail.trim(),
    clientPhone: optional(draft.clientPhone),
    jobAddress: optional(draft.jobAddress),
    technicianName: optional(draft.technicianName),
    invoiceDate: optional(draft.invoiceDate),
    dueDate: optional(draft.dueDate),
    addGst: draft.addGst,
    notes: optional(draft.notes),
    items: draft.items.map((item) => ({
      title: item.title.trim(),
      description: optional(item.description),
      quantity: roundCents(toNumber(item.quantity)),
      rate: roundCents(toNumber(item.rate)),
    })),
  };
}

/** A PDF returned by the back-end. */
export interface InvoicePdf {
  blob: Blob;
  fileName: string;
  invoiceNumber: string;
}

/** Thrown when the session has ended and the admin must log in again. */
export class SessionExpiredError extends Error {
  constructor() {
    super("Your session has ended. Your draft is saved — log in again to continue.");
    this.name = "SessionExpiredError";
  }
}

/**
 * Reads the filename from a Content-Disposition header, falling back when absent.
 *
 * @param {Response} res - The response.
 * @param {string} fallback - Used when no filename is present.
 * @returns {string} The filename.
 */
export function getDownloadFileName(res: Response, fallback: string): string {
  const header = res.headers.get("Content-Disposition");
  if (!header) return fallback;
  const encoded = header.match(/filename\*=UTF-8''([^;]+)/i);
  if (encoded) return decodeURIComponent(encoded[1]);
  const plain = header.match(/filename="?([^";]+)"?/i);
  return plain ? plain[1] : fallback;
}

/**
 * Pulls a readable message out of a NestJS error response.
 */
async function readErrorMessage(res: Response): Promise<string> {
  const data: unknown = await res.json().catch(() => null);
  if (data && typeof data === "object" && "message" in data) {
    const { message } = data;
    if (Array.isArray(message)) return message.join(". ");
    if (typeof message === "string") return message;
  }
  return "Something went wrong. Please try again.";
}

/** Returns a new access token, or null if the session has ended. */
export type TokenRefresher = () => Promise<string | null>;

/**
 * Calls an admin back-end endpoint with the access token. If the token has expired,
 * it asks for a fresh one once and retries.
 *
 * @param {string} path - The API path, e.g. `/invoices`.
 * @param {RequestInit} init - Fetch options (the Authorization header is added).
 * @param {string} token - The current access token.
 * @param {TokenRefresher} refreshToken - Supplies a new token after a 401.
 * @returns {Promise<{ res: Response; token: string }>} The successful response and the token that worked.
 * @throws {SessionExpiredError} If the session cannot be refreshed.
 * @throws {Error} With the back-end's message for any other failure.
 */
export async function authorisedFetch(
  path: string,
  init: RequestInit,
  token: string,
  refreshToken: TokenRefresher,
): Promise<{ res: Response; token: string }> {
  const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL?.trim() || "http://localhost:3001").replace(/\/$/, "");
  const call = (accessToken: string) =>
    fetch(`${backendUrl}${path}`, {
      ...init,
      headers: { ...init.headers, Authorization: `Bearer ${accessToken}` },
    });

  let currentToken = token;
  let res = await call(currentToken);

  if (res.status === 401) {
    const fresh = await refreshToken();
    if (!fresh) throw new SessionExpiredError();
    currentToken = fresh;
    res = await call(currentToken);
    if (res.status === 401) throw new SessionExpiredError();
  }

  if (!res.ok) {
    throw new Error(await readErrorMessage(res));
  }
  return { res, token: currentToken };
}

/**
 * Reads a PDF response into a blob with its filename and invoice number.
 */
async function readPdf(res: Response): Promise<InvoicePdf> {
  const invoiceNumber = res.headers.get("X-Invoice-Number") ?? "DRAFT";
  return {
    blob: await res.blob(),
    fileName: getDownloadFileName(res, `Invoice_FalconAccess_${invoiceNumber}.pdf`),
    invoiceNumber,
  };
}

/**
 * POSTs an invoice to the back-end and returns the PDF.
 *
 * @param {"preview" | "send"} mode - Draft preview (not emailed or stored) or send to the client.
 * @param {InvoiceDraft} draft - The form state.
 * @param {string} token - The current access token.
 * @param {TokenRefresher} refreshToken - Supplies a new token after a 401.
 * @returns {Promise<InvoicePdf & { token: string }>} The PDF and the token that worked.
 */
export async function submitInvoice(
  mode: "preview" | "send",
  draft: InvoiceDraft,
  token: string,
  refreshToken: TokenRefresher,
): Promise<InvoicePdf & { token: string }> {
  const { res, token: currentToken } = await authorisedFetch(
    `/invoices${mode === "preview" ? "/preview" : ""}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toInvoicePayload(draft)),
    },
    token,
    refreshToken,
  );
  return { ...(await readPdf(res)), token: currentToken };
}

/** One sent invoice in the history list, as returned by `GET /invoices`. */
export interface InvoiceSummary {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  invoiceDate: string;
  total: number;
  emailedAt: string | null;
  createdAt: string;
}

/** A page of invoice history. */
export interface InvoiceHistoryPage {
  items: InvoiceSummary[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Loads a page of sent invoices, newest first.
 *
 * @param {{ search?: string; page?: number }} query - Optional search text and page number.
 * @param {string} token - The current access token.
 * @param {TokenRefresher} refreshToken - Supplies a new token after a 401.
 * @returns {Promise<InvoiceHistoryPage & { token: string }>} The page and the token that worked.
 */
export async function fetchInvoiceHistory(
  query: { search?: string; page?: number },
  token: string,
  refreshToken: TokenRefresher,
): Promise<InvoiceHistoryPage & { token: string }> {
  const params = new URLSearchParams({ page: String(query.page ?? 1), pageSize: "20" });
  if (query.search?.trim()) params.set("search", query.search.trim());
  const { res, token: currentToken } = await authorisedFetch(
    `/invoices?${params.toString()}`,
    { method: "GET" },
    token,
    refreshToken,
  );
  const data = (await res.json()) as InvoiceHistoryPage;
  return { ...data, items: data.items.map((item) => ({ ...item, total: Number(item.total) })), token: currentToken };
}

/**
 * Downloads the stored PDF of a sent invoice.
 *
 * @param {string} id - The invoice ID.
 * @param {string} token - The current access token.
 * @param {TokenRefresher} refreshToken - Supplies a new token after a 401.
 * @returns {Promise<InvoicePdf & { token: string }>} The PDF and the token that worked.
 */
export async function fetchStoredInvoicePdf(
  id: string,
  token: string,
  refreshToken: TokenRefresher,
): Promise<InvoicePdf & { token: string }> {
  const { res, token: currentToken } = await authorisedFetch(
    `/invoices/${encodeURIComponent(id)}/pdf`,
    { method: "GET" },
    token,
    refreshToken,
  );
  return { ...(await readPdf(res)), token: currentToken };
}

/**
 * Saves a blob to the device via a temporary link (works on iOS Safari and Android Chrome).
 *
 * @param {Blob} blob - The file contents.
 * @param {string} fileName - The suggested filename.
 */
export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
