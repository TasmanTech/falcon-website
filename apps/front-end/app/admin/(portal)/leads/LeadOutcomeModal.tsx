"use client";

import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { roundCents } from "@/lib/invoice";
import { DEFAULT_CALLOUT_PRICE, type LeadStatusChange } from "@/lib/lead";

const inputClass =
  "block w-full h-12 rounded-xl border border-slate-300 bg-white px-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30";
const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";

/** One-tap reasons for the cancellation field; the text can still be edited. */
export const CANCELLATION_REASONS = [
  "Customer sorted it themselves",
  "Price too high",
  "Went with another company",
  "No answer or no-show",
  "Out of our area",
];

/** A price field's value: blank while empty, otherwise the typed number as text. */
const priceText = (value: number | undefined): string => (value === undefined ? "" : String(value));

/**
 * Asks for the details a status needs before it is saved: the part, paid and call-out
 * prices when closing a lead (call-out defaults to NZ$20), or the reason when cancelling one.
 * Shown as a bottom sheet on phones and a centred dialog on larger screens.
 *
 * @param {object} props - The component props.
 * @param {"closed" | "cancelled"} props.status - The status being set.
 * @param {string} [props.leadLabel] - The lead's name or phone, shown in the heading.
 * @param {LeadStatusChange} [props.initial] - Values to start from, e.g. when editing a closed lead.
 * @param {(change: LeadStatusChange) => void} props.onConfirm - Called with the completed details.
 * @param {() => void} props.onCancel - Called when the dialog is dismissed; the status is left unchanged.
 * @returns {JSX.Element} The dialog.
 */
export default function LeadOutcomeModal({
  status,
  leadLabel,
  initial,
  onConfirm,
  onCancel,
}: {
  status: "closed" | "cancelled";
  leadLabel?: string;
  initial?: LeadStatusChange;
  onConfirm: (change: LeadStatusChange) => void;
  onCancel: () => void;
}) {
  const closedInitial = initial?.status === "closed" ? initial : undefined;
  const [partPrice, setPartPrice] = useState(priceText(closedInitial?.partPrice));
  const [paidPrice, setPaidPrice] = useState(priceText(closedInitial?.paidPrice));
  const [calloutPrice, setCalloutPrice] = useState(priceText(closedInitial?.calloutPrice ?? DEFAULT_CALLOUT_PRICE));
  const [reason, setReason] = useState(initial?.status === "cancelled" ? initial.cancellationReason : "");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [onCancel]);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (status === "closed") {
      onConfirm({
        status: "closed",
        partPrice: roundCents(Number(partPrice)),
        paidPrice: roundCents(Number(paidPrice)),
        calloutPrice: roundCents(Number(calloutPrice)),
      });
    } else {
      onConfirm({ status: "cancelled", cancellationReason: reason.trim() });
    }
  };

  const title = status === "closed" ? "Close Lead" : "Cancel Lead";
  const priceInput = (id: string, label: string, value: string, onChange: (value: string) => void, autoFocus = false) => (
    <div>
      <label htmlFor={id} className={labelClass}>{label}</label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min="0"
        step="0.01"
        required
        placeholder="0.00"
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-labelledby="lead-outcome-title">
      <button type="button" aria-label="Close dialog" className="absolute inset-0 cursor-pointer bg-slate-900/50" onClick={onCancel} />
      <form
        onSubmit={submit}
        className="relative flex max-h-[85dvh] w-full max-w-lg flex-col rounded-t-3xl bg-white sm:rounded-3xl animate-card-ready animate-play"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div className="min-w-0">
            <h2 id="lead-outcome-title" className="font-montserrat text-lg font-bold text-brand-dark">
              {title}
            </h2>
            {leadLabel && <p className="truncate text-sm text-slate-500">{leadLabel}</p>}
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close"
            className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
          >
            <FiX size={22} aria-hidden />
          </button>
        </div>

        <div className="space-y-3 overflow-y-auto overscroll-contain px-5 py-4">
          {status === "closed" ? (
            <>
              {priceInput("leadPaidPrice", "Paid price ($) *", paidPrice, setPaidPrice, true)}
              {priceInput("leadPartPrice", "Part price ($) *", partPrice, setPartPrice)}
              {priceInput("leadCalloutPrice", "Call-out price ($) *", calloutPrice, setCalloutPrice)}
              <p className="text-xs text-slate-500">Enter 0 if no parts were used.</p>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="leadCancellationReason" className={labelClass}>Cancellation reason *</label>
                <textarea
                  id="leadCancellationReason"
                  rows={3}
                  required
                  maxLength={500}
                  autoFocus
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className={inputClass.replace("h-12", "min-h-20 py-3")}
                />
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Common reasons">
                {CANCELLATION_REASONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setReason(option)}
                    className="h-10 cursor-pointer rounded-full border border-slate-300 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-slate-200 px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={onCancel}
            className="h-12 cursor-pointer rounded-full border border-slate-300 bg-white font-semibold text-slate-700 hover:bg-slate-50"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={status === "cancelled" && !reason.trim()}
            className="h-12 cursor-pointer rounded-full bg-brand-accent font-bold text-brand-dark hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "closed" ? "Mark Closed" : "Mark Cancelled"}
          </button>
        </div>
      </form>
    </div>
  );
}
