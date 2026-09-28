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
  "Car lockout",
  "Lock change",
  "Lock repair",
  "Rekey",
  "Lock installation",
  "Smart lock installation",
  "Car key replacement",
  "Safe opening",
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
