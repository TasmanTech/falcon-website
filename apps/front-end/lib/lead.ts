import { authorisedFetch, type TokenRefresher } from "./invoice";

/**
 * Builds the lead message the team pastes into Telegram. The layout mirrors the
 * lead template: a non-breaking space follows each emoji, and the starred lines at
 * the bottom are left blank for the tech to fill in after the job.
 */

export interface LeadDraft {
  date: string;
  time: string;
  name: string;
  phone: string;
  address: string;
  jobType: string;
  notes: string;
}

/** Suggestions for the job type field, matching the services on the site. */
export const JOB_TYPES = [
  "House lockout",
  "Bedroom lockout",
  "Car lockout",
  "Lock change",
  "Lock repair",
  "Key jammed",
  "Barrel stuck",
  "Door handle / knob",
  "Ranch slider",
  "Handle fitting (customer supplied)",
  "Rekey",
  "Key cutting",
  "Lock installation",
  "Smart lock installation",
  "Car key replacement",
  "Safe opening",
  "Box opening (no drilling)",
  "Other",
];

const NBSP = " ";
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Formats a date input value for the message, e.g. `2026-09-28` → `Mon 28/09/2026`.
 *
 * @param {string} isoDate - The `YYYY-MM-DD` date.
 * @returns {string} The formatted date, or an empty string.
 */
export function formatLeadDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return "";
  const weekday = DAYS[new Date(year, month - 1, day).getDay()];
  return `${weekday} ${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`;
}

/**
 * Formats a time input value for the message, e.g. `14:30` → `2:30pm`.
 *
 * @param {string} time - The `HH:MM` time.
 * @returns {string} The formatted time, or an empty string.
 */
export function formatLeadTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes) || !time) return "";
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")}${hours >= 12 ? "pm" : "am"}`;
}

/**
 * Rewrites NZ mobile and landline numbers in +64 form so Telegram reliably makes
 * them tap-to-call, e.g. `021 123 4567` → `+64 21 123 4567`. Anything else
 * (0800 numbers, overseas numbers, typos) is returned as typed.
 *
 * @param {string} raw - The number as entered.
 * @returns {string} The formatted number.
 */
export function formatLeadPhone(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, "");
  let local: string;
  if (/^0[234679]\d{6,9}$/.test(digits)) local = digits.slice(1);
  else if (/^\+?64[234679]\d{6,9}$/.test(digits)) local = digits.replace(/^\+?64/, "");
  else return raw.trim();

  const area = local.startsWith("2") ? local.slice(0, 2) : local.slice(0, 1);
  const rest = local.slice(area.length);
  const split = rest.length > 7 ? 4 : 3;
  return `+64 ${area} ${rest.slice(0, split)} ${rest.slice(split)}`;
}

/**
 * A Google Maps search link for the address. Needs no API key.
 *
 * @param {string} address - The job address.
 * @returns {string} The link, or an empty string when there's no address.
 */
export function mapsLink(address: string): string {
  const query = address.trim();
  return query ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}` : "";
}

/**
 * Assembles the full lead message.
 *
 * @param {LeadDraft} lead - The lead details.
 * @returns {string} The message, ready to paste into Telegram.
 */
export function buildLeadMessage(lead: LeadDraft): string {
  const when = [formatLeadDate(lead.date), formatLeadTime(lead.time)].filter(Boolean).join(" ");

  return [
    `📅${NBSP}Date: ${when}`,
    "",
    "",
    `📞${NBSP}Name: ${lead.name.trim()}`,
    `📱${NBSP}Phone: ${formatLeadPhone(lead.phone)}`,
    `📍${NBSP}Address: ${lead.address.trim()}`,
    `🔧${NBSP}Job Type: ${lead.jobType.trim()}`,
    `📝${NBSP}Notes: ${lead.notes.trim()}`,
    "",
    mapsLink(lead.address),
    "",
    `*💰${NBSP}Price:`,
    `*👨‍🔧${NBSP}Tech:`,
    `*💰${NBSP}Payment Method:`,
    `*🧩${NBSP}Parts:`,
  ].join("\n");
}

/** Where a lead is up to. New leads start as pending. */
export type LeadStatus = "pending" | "closed" | "cancelled";

/** Status options in display order, with their labels and badge colours. */
export const LEAD_STATUSES: { value: LeadStatus; label: string; badgeClass: string }[] = [
  { value: "pending", label: "Pending", badgeClass: "bg-amber-100 text-amber-800" },
  { value: "closed", label: "Closed", badgeClass: "bg-green-100 text-green-700" },
  { value: "cancelled", label: "Cancelled", badgeClass: "bg-slate-200 text-slate-600" },
];

/** A lead saved in history, as returned by the back-end. */
export interface SavedLead {
  id: string;
  date: string;
  time: string | null;
  name: string | null;
  phone: string | null;
  address: string | null;
  jobType: string | null;
  notes: string | null;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

/** A page of lead history. */
export interface LeadHistoryPage {
  items: SavedLead[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Converts a saved lead back into form state, for editing.
 *
 * @param {SavedLead} lead - The saved lead.
 * @returns {LeadDraft} The form values.
 */
export function toLeadDraft(lead: SavedLead): LeadDraft {
  return {
    date: lead.date.slice(0, 10),
    time: lead.time ?? "",
    name: lead.name ?? "",
    phone: lead.phone ?? "",
    address: lead.address ?? "",
    jobType: lead.jobType ?? "",
    notes: lead.notes ?? "",
  };
}

/**
 * Saves a lead: creates it, or replaces an existing one when `id` is given.
 *
 * @param {LeadDraft} lead - The form values.
 * @param {LeadStatus} status - The lead's status.
 * @param {string | undefined} id - The lead to update, or undefined to create one.
 * @param {string} token - The current access token.
 * @param {TokenRefresher} refreshToken - Supplies a new token after a 401.
 * @returns {Promise<SavedLead & { token: string }>} The saved lead and the token that worked.
 */
export async function saveLead(
  lead: LeadDraft,
  status: LeadStatus,
  id: string | undefined,
  token: string,
  refreshToken: TokenRefresher,
): Promise<SavedLead & { token: string }> {
  const optional = (value: string) => value.trim() || undefined;
  const { res, token: currentToken } = await authorisedFetch(
    id ? `/leads/${encodeURIComponent(id)}` : "/leads",
    {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: lead.date,
        time: optional(lead.time),
        name: optional(lead.name),
        phone: optional(lead.phone) && formatLeadPhone(lead.phone),
        address: optional(lead.address),
        jobType: optional(lead.jobType),
        notes: optional(lead.notes),
        status,
      }),
    },
    token,
    refreshToken,
  );
  return { ...((await res.json()) as SavedLead), token: currentToken };
}

/**
 * Loads a page of leads, newest job date first.
 *
 * @param {{ search?: string; status?: LeadStatus; page?: number }} query - Optional filters and page number.
 * @param {string} token - The current access token.
 * @param {TokenRefresher} refreshToken - Supplies a new token after a 401.
 * @returns {Promise<LeadHistoryPage & { token: string }>} The page and the token that worked.
 */
export async function fetchLeads(
  query: { search?: string; status?: LeadStatus; page?: number },
  token: string,
  refreshToken: TokenRefresher,
): Promise<LeadHistoryPage & { token: string }> {
  const params = new URLSearchParams({ page: String(query.page ?? 1), pageSize: "20" });
  if (query.search?.trim()) params.set("search", query.search.trim());
  if (query.status) params.set("status", query.status);
  const { res, token: currentToken } = await authorisedFetch(
    `/leads?${params.toString()}`,
    { method: "GET" },
    token,
    refreshToken,
  );
  return { ...((await res.json()) as LeadHistoryPage), token: currentToken };
}

/**
 * Changes a lead's status.
 *
 * @param {string} id - The lead ID.
 * @param {LeadStatus} status - The new status.
 * @param {string} token - The current access token.
 * @param {TokenRefresher} refreshToken - Supplies a new token after a 401.
 * @returns {Promise<SavedLead & { token: string }>} The updated lead and the token that worked.
 */
export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
  token: string,
  refreshToken: TokenRefresher,
): Promise<SavedLead & { token: string }> {
  const { res, token: currentToken } = await authorisedFetch(
    `/leads/${encodeURIComponent(id)}/status`,
    { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) },
    token,
    refreshToken,
  );
  return { ...((await res.json()) as SavedLead), token: currentToken };
}

/**
 * Deletes a lead permanently.
 *
 * @param {string} id - The lead ID.
 * @param {string} token - The current access token.
 * @param {TokenRefresher} refreshToken - Supplies a new token after a 401.
 * @returns {Promise<{ token: string }>} The token that worked.
 */
export async function deleteLead(id: string, token: string, refreshToken: TokenRefresher): Promise<{ token: string }> {
  const { token: currentToken } = await authorisedFetch(
    `/leads/${encodeURIComponent(id)}`,
    { method: "DELETE" },
    token,
    refreshToken,
  );
  return { token: currentToken };
}
