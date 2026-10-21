/**
 * Whether the number is a valid NZ mobile (02x), landline (03, 04, 06, 07, 09) or
 * 0800 / 0508 number. Accepts national form or a +64 / 0064 prefix, with any spaces,
 * dashes, dots or brackets. Mirrors the back-end check in `contact/nz-phone.ts`.
 *
 * @param {string} raw - The number as entered.
 * @returns {boolean} True when it's a valid NZ number.
 */
export function isValidNzPhone(raw: string): boolean {
  const national = raw.replace(/[\s\-.()]/g, "").replace(/^(?:\+|00)?640?(?=\d)/, "0");
  return /^02\d{7,9}$/.test(national) || /^0[34679][2-9]\d{6}$/.test(national) || /^0(?:800|508)\d{6,7}$/.test(national);
}
