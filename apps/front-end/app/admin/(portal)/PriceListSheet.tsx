"use client";

import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { PRESET_GROUPS, formatMoney, type InvoicePreset } from "@/lib/invoice";

/**
 * Bottom sheet listing the job sheet prices. Tapping an entry adds it to the invoice;
 * its price and description can still be edited afterwards.
 *
 * @param {object} props - The component props.
 * @param {(preset: InvoicePreset) => void} props.onSelect - Called with the chosen preset.
 * @param {() => void} props.onClose - Called when the sheet is dismissed.
 * @returns {JSX.Element} The sheet.
 */
export default function PriceListSheet({
  onSelect,
  onClose,
}: {
  onSelect: (preset: InvoicePreset) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-labelledby="price-list-title">
      <button type="button" aria-label="Close price list" className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
      <div className="relative flex max-h-[85dvh] w-full max-w-lg flex-col rounded-t-3xl bg-white sm:rounded-3xl animate-card-ready animate-play">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 id="price-list-title" className="font-montserrat text-lg font-bold text-brand-dark">
            Price List
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-11 w-11 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
          >
            <FiX size={22} aria-hidden />
          </button>
        </div>
        <div className="overflow-y-auto overscroll-contain px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          {PRESET_GROUPS.map((group) => (
            <section key={group.label} className="pt-4">
              <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">{group.label}</h3>
              <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200">
                {group.presets.map((preset) => (
                  <li key={`${group.label}-${preset.title}`}>
                    <button
                      type="button"
                      onClick={() => onSelect(preset)}
                      className="flex min-h-12 w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-slate-50 active:bg-slate-100"
                    >
                      <span className="text-[15px] font-medium text-slate-900">{preset.title}</span>
                      <span className="shrink-0 text-sm font-semibold text-brand-dark">
                        {preset.free ? "Free" : preset.rate > 0 ? formatMoney(preset.rate) : "TBD"}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
