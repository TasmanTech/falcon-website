/**
 * NZ phone number checks for the contact form. Accepts mobiles (02x), landlines
 * (03, 04, 06, 07, 09) and 0800 / 0508 numbers, written in national form or with
 * a +64 / 0064 prefix, with any spaces, dashes, dots or brackets.
 */

/**
 * Rewrites a number in national form with separators removed, e.g.
 * `+64 21 123 4567` → `0211234567`. Anything that isn't an NZ prefix is left alone.
 *
 * @param {string} raw - The number as entered.
 * @returns {string} The compact national number.
 */
export function toNationalNzPhone(raw: string): string {
  return raw.replace(/[\s\-.()]/g, '').replace(/^(?:\+|00)?640?(?=\d)/, '0');
}

/**
 * Whether the number is a valid NZ mobile, landline or toll-free number.
 *
 * @param {string} raw - The number as entered.
 * @returns {boolean} True when it's a valid NZ number.
 */
export function isValidNzPhone(raw: string): boolean {
  const national = toNationalNzPhone(raw);
  return /^02\d{7,9}$/.test(national) || /^0[34679][2-9]\d{6}$/.test(national) || /^0(?:800|508)\d{6,7}$/.test(national);
}

/**
 * Formats a valid NZ number in +64 form for tap-to-call links, e.g.
 * `021 123 4567` → `+64211234567`. Toll-free numbers keep their national form
 * because they can't be dialled from overseas.
 *
 * @param {string} raw - The number as entered.
 * @returns {string} The formatted number.
 */
export function formatNzPhone(raw: string): string {
  const national = toNationalNzPhone(raw);
  return /^0(?:800|508)/.test(national) ? national : `+64${national.slice(1)}`;
}
