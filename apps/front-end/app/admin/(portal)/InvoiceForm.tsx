"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { FiCheckCircle, FiDownload, FiEdit2, FiEye, FiList, FiPlus, FiSend, FiTrash2 } from "react-icons/fi";
import { refreshAccessTokenAction } from "@/app/actions/auth";
import {
  SessionExpiredError,
  calculateTotals,
  createEmptyDraft,
  createItem,
  downloadBlob,
  formatDisplayDate,
  formatMoney,
  roundCents,
  submitInvoice,
  toNumber,
  type InvoiceDraft,
  type InvoiceItemDraft,
  type InvoicePdf,
  type InvoicePreset,
} from "@/lib/invoice";
import PriceListSheet from "./PriceListSheet";

/** localStorage key for the unsent draft, so a reload or expired session never loses work. */
export const DRAFT_STORAGE_KEY = "falcon-admin-invoice-draft";

const inputClass =
  "block w-full h-12 rounded-xl border border-slate-300 bg-white px-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30";
const textareaClass = inputClass.replace("h-12", "min-h-20 py-3");
const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";

const subscribeToNothing = () => () => {};
const readSavedDraft = (): string | null => {
  try {
    return window.localStorage.getItem(DRAFT_STORAGE_KEY);
  } catch {
    return null;
  }
};
const writeSavedDraft = (draft: InvoiceDraft | null): void => {
  try {
    if (draft) window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    else window.localStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch {
    // Storage can be unavailable (private browsing); the draft just isn't kept
  }
};

/** True when nothing has been entered yet. */
function isPristine(draft: InvoiceDraft): boolean {
  return !draft.clientName && !draft.clientEmail && draft.items.length === 0;
}

/**
 * A white card with a heading, used to group form fields.
 */
function Section({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="font-montserrat text-base font-bold text-brand-dark">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

/**
 * Mobile-first invoice generator for the admin portal.
 *
 * Flow: fill in customer and items (from the price list or custom) → review → send.
 * Sending emails the PDF to the customer and offers it for download. A draft PDF can be
 * previewed from the review step without emailing anything. The draft is kept in
 * localStorage until sent, and an expired access token is refreshed transparently.
 *
 * @param {object} props - The component props.
 * @param {string} props.token - The access token for back-end requests.
 * @returns {JSX.Element} The invoice form.
 */
export default function InvoiceForm({ token }: { token: string }) {
  const tokenRef = useRef(token);
  const [draft, setDraft] = useState<InvoiceDraft>(createEmptyDraft);
  const [step, setStep] = useState<"edit" | "review" | "sent">("edit");
  const [isPriceListOpen, setIsPriceListOpen] = useState(false);
  const [pending, setPending] = useState<"preview" | "send" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [sent, setSent] = useState<(InvoicePdf & { total: number; email: string }) | null>(null);
  const [restoreDismissed, setRestoreDismissed] = useState(false);

  const savedDraft = useSyncExternalStore(subscribeToNothing, readSavedDraft, () => null);
  const canRestore = !restoreDismissed && savedDraft !== null && isPristine(draft) && step === "edit";

  const { subtotal, gst, total } = calculateTotals(draft.items, draft.addGst);

  useEffect(() => {
    if (step !== "sent" && !isPristine(draft)) writeSavedDraft(draft);
  }, [draft, step]);

  const update = <K extends keyof InvoiceDraft>(key: K, value: InvoiceDraft[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));

  const updateItem = (id: string, changes: Partial<InvoiceItemDraft>) =>
    setDraft((current) => ({
      ...current,
      items: current.items.map((item) => (item.id === id ? { ...item, ...changes } : item)),
    }));

  const addItem = (preset?: InvoicePreset) => {
    setDraft((current) => ({ ...current, items: [...current.items, createItem(preset)] }));
    setIsPriceListOpen(false);
  };

  const removeItem = (id: string) =>
    setDraft((current) => ({ ...current, items: current.items.filter((item) => item.id !== id) }));

  const closePriceList = useCallback(() => setIsPriceListOpen(false), []);

  const restoreDraft = () => {
    try {
      if (savedDraft) setDraft({ ...createEmptyDraft(), ...(JSON.parse(savedDraft) as Partial<InvoiceDraft>) });
    } catch {
      writeSavedDraft(null);
    }
    setRestoreDismissed(true);
  };

  const discardSavedDraft = () => {
    writeSavedDraft(null);
    setRestoreDismissed(true);
  };

  const goToReview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (draft.items.length === 0) {
      setError("Add at least one item.");
      return;
    }
    setError(null);
    setStep("review");
    window.scrollTo({ top: 0 });
  };

  const submit = async (mode: "preview" | "send") => {
    setPending(mode);
    setError(null);
    try {
      const result = await submitInvoice(mode, draft, tokenRef.current, refreshAccessTokenAction);
      tokenRef.current = result.token;
      if (mode === "preview") {
        downloadBlob(result.blob, result.fileName);
      } else {
        setSent({ ...result, total, email: draft.clientEmail.trim() });
        writeSavedDraft(null);
        setStep("sent");
        window.scrollTo({ top: 0 });
      }
    } catch (err) {
      if (err instanceof SessionExpiredError) setSessionExpired(true);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setPending(null);
    }
  };

  const startNew = () => {
    setDraft(createEmptyDraft());
    setSent(null);
    setError(null);
    setStep("edit");
  };

  const errorBanner = error && (
    <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {error}
      {sessionExpired && (
        <Link href="/admin/login" className="mt-1 block font-semibold underline">
          Log in again
        </Link>
      )}
    </div>
  );

  // --- Sent ---
  if (step === "sent" && sent) {
    return (
      <div className="space-y-4 pb-10 animate-card-ready animate-play">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
          <FiCheckCircle className="mx-auto text-green-600" size={48} aria-hidden />
          <h1 className="mt-3 font-montserrat text-xl font-bold text-brand-dark">Invoice sent</h1>
          <p className="mt-1 text-sm text-slate-600">
            <span className="font-semibold text-slate-900">{sent.invoiceNumber}</span> for{" "}
            {formatMoney(sent.total)} was emailed to <span className="break-all">{sent.email}</span>. It&apos;s saved in{" "}
            <Link href="/admin/invoices" className="font-semibold text-brand-dark underline">
              History
            </Link>{" "}
            and a copy went to the Falcon Access mailbox.
          </p>
          <div className="mt-5 grid gap-3">
            <button
              type="button"
              onClick={() => downloadBlob(sent.blob, sent.fileName)}
              className="flex h-12 items-center justify-center gap-2 rounded-full border border-slate-300 font-bold text-brand-dark hover:bg-slate-50"
            >
              <FiDownload aria-hidden /> Download PDF
            </button>
            <button
              type="button"
              onClick={startNew}
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-brand-accent font-bold text-brand-dark hover:opacity-90"
            >
              <FiPlus aria-hidden /> New Invoice
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Review ---
  if (step === "review") {
    return (
      <div className="space-y-4 pb-10 animate-card-ready animate-play">
        <div>
          <h1 className="font-montserrat text-xl font-bold text-brand-dark">Review Invoice</h1>
          <p className="text-sm text-slate-600">Check everything before it goes to the customer.</p>
        </div>

        <Section title="Customer">
          <div className="space-y-1 text-[15px]">
            <p className="font-semibold">{draft.clientName}</p>
            <p className="break-all text-slate-700">{draft.clientEmail}</p>
            {draft.clientPhone && <p className="text-slate-700">{draft.clientPhone}</p>}
            {draft.jobAddress && <p className="whitespace-pre-line text-slate-700">{draft.jobAddress}</p>}
          </div>
        </Section>

        <Section title="Items">
          <ul className="divide-y divide-slate-100">
            {draft.items.map((item) => (
              <li key={item.id} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-semibold">{item.title}</span>
                  <span className="shrink-0 font-semibold">
                    {formatMoney(roundCents(toNumber(item.quantity) * toNumber(item.rate)))}
                  </span>
                </div>
                <p className="text-sm text-slate-500">
                  {toNumber(item.quantity)} × {formatMoney(toNumber(item.rate))}
                </p>
                {item.description && <p className="mt-1 text-sm text-slate-600">{item.description}</p>}
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-1 border-t border-slate-200 pt-3 text-[15px]">
            <div className="flex justify-between text-slate-600">
              <dt>Subtotal</dt>
              <dd>{formatMoney(subtotal)}</dd>
            </div>
            {draft.addGst && (
              <div className="flex justify-between text-slate-600">
                <dt>GST (15%)</dt>
                <dd>{formatMoney(gst)}</dd>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold text-brand-dark">
              <dt>Total</dt>
              <dd>{formatMoney(total)}</dd>
            </div>
          </dl>
        </Section>

        <Section title="Job Details">
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-slate-500">Invoice date</dt>
              <dd className="font-medium">{draft.invoiceDate ? formatDisplayDate(draft.invoiceDate) : "Today"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Due date</dt>
              <dd className="font-medium">{draft.dueDate ? formatDisplayDate(draft.dueDate) : "Same as invoice date"}</dd>
            </div>
            {draft.technicianName && (
              <div>
                <dt className="text-slate-500">Technician</dt>
                <dd className="font-medium">{draft.technicianName}</dd>
              </div>
            )}
            {draft.notes && (
              <div className="col-span-2">
                <dt className="text-slate-500">Notes</dt>
                <dd className="whitespace-pre-line font-medium">{draft.notes}</dd>
              </div>
            )}
          </dl>
        </Section>

        {errorBanner}

        <div className="grid gap-3">
          <button
            type="button"
            onClick={() => submit("send")}
            disabled={pending !== null}
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-brand-accent font-bold text-brand-dark hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiSend aria-hidden /> {pending === "send" ? "Sending…" : "Send Invoice"}
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setStep("edit")}
              disabled={pending !== null}
              className="flex h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiEdit2 aria-hidden /> Edit
            </button>
            <button
              type="button"
              onClick={() => submit("preview")}
              disabled={pending !== null}
              className="flex h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiEye aria-hidden /> {pending === "preview" ? "Loading…" : "Preview PDF"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Edit ---
  return (
    <>
      <form onSubmit={goToReview} className="space-y-4 pb-32">
        <div>
          <h1 className="font-montserrat text-xl font-bold text-brand-dark">New Invoice</h1>
          <p className="text-sm text-slate-600">Add the job details, then review and send.</p>
        </div>

        {canRestore && (
          <div className="flex flex-col gap-3 rounded-2xl border border-brand-primary/30 bg-brand-primary/10 p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
            <span className="text-slate-800">You have an unsent draft.</span>
            <div className="flex gap-2">
              <button type="button" onClick={restoreDraft} className="h-10 rounded-full bg-brand-dark px-4 font-semibold text-white">
                Restore
              </button>
              <button type="button" onClick={discardSavedDraft} className="h-10 rounded-full px-4 font-semibold text-slate-700 hover:bg-white/60">
                Discard
              </button>
            </div>
          </div>
        )}

        <Section title="Customer">
          <div className="space-y-3">
            <div>
              <label htmlFor="clientName" className={labelClass}>Name *</label>
              <input id="clientName" required autoComplete="off" value={draft.clientName} onChange={(e) => update("clientName", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="clientEmail" className={labelClass}>Email *</label>
              <input id="clientEmail" type="email" inputMode="email" required autoComplete="off" value={draft.clientEmail} onChange={(e) => update("clientEmail", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="clientPhone" className={labelClass}>Phone</label>
              <input id="clientPhone" type="tel" inputMode="tel" autoComplete="off" value={draft.clientPhone} onChange={(e) => update("clientPhone", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="jobAddress" className={labelClass}>Job address</label>
              <textarea id="jobAddress" rows={2} value={draft.jobAddress} onChange={(e) => update("jobAddress", e.target.value)} className={textareaClass} />
            </div>
          </div>
        </Section>

        <Section title="Items">
          {draft.items.length === 0 && (
            <p className="mb-3 rounded-xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
              No items yet. Pick from the price list or add a custom item.
            </p>
          )}
          <ul className="space-y-3">
            {draft.items.map((item, index) => {
              const amount = roundCents(toNumber(item.quantity) * toNumber(item.rate));
              return (
                <li key={item.id} className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <label htmlFor={`title-${item.id}`} className="sr-only">Item {index + 1} name</label>
                      <input
                        id={`title-${item.id}`}
                        required
                        placeholder="Item name"
                        value={item.title}
                        onChange={(e) => updateItem(item.id, { title: e.target.value })}
                        className={`${inputClass} font-semibold`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.title || `item ${index + 1}`}`}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-red-600 hover:bg-red-50"
                    >
                      <FiTrash2 size={20} aria-hidden />
                    </button>
                  </div>
                  <label htmlFor={`description-${item.id}`} className="sr-only">Item {index + 1} description</label>
                  <textarea
                    id={`description-${item.id}`}
                    rows={2}
                    placeholder="Description (optional)"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, { description: e.target.value })}
                    className={`${textareaClass} mt-2 text-sm`}
                  />
                  <div className="mt-2 grid grid-cols-[5rem_1fr_auto] items-end gap-2">
                    <div>
                      <label htmlFor={`quantity-${item.id}`} className="mb-1 block text-xs font-semibold text-slate-500">Qty</label>
                      <input
                        id={`quantity-${item.id}`}
                        type="number"
                        inputMode="decimal"
                        min="0"
                        step="0.01"
                        required
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, { quantity: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor={`rate-${item.id}`} className="mb-1 block text-xs font-semibold text-slate-500">Rate ($)</label>
                      <input
                        id={`rate-${item.id}`}
                        type="number"
                        inputMode="decimal"
                        min="0"
                        step="0.01"
                        required
                        placeholder="0.00"
                        value={item.rate}
                        onChange={(e) => updateItem(item.id, { rate: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div className="flex h-12 min-w-20 items-center justify-end text-base font-bold text-slate-900">
                      {formatMoney(amount)}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setIsPriceListOpen(true)}
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-brand-dark font-semibold text-white hover:opacity-90"
            >
              <FiList aria-hidden /> Price List
            </button>
            <button
              type="button"
              onClick={() => addItem()}
              className="flex h-12 items-center justify-center gap-2 rounded-full border border-dashed border-slate-400 font-semibold text-slate-700 hover:bg-slate-50"
            >
              <FiPlus aria-hidden /> Custom Item
            </button>
          </div>
        </Section>

        <Section title="Job Details">
          <div className="space-y-3">
            <div>
              <label htmlFor="technicianName" className={labelClass}>Technician</label>
              <input id="technicianName" autoComplete="off" value={draft.technicianName} onChange={(e) => update("technicianName", e.target.value)} className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="invoiceDate" className={labelClass}>Invoice date</label>
                <input id="invoiceDate" type="date" value={draft.invoiceDate} onChange={(e) => update("invoiceDate", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="dueDate" className={labelClass}>Due date</label>
                <input id="dueDate" type="date" min={draft.invoiceDate || undefined} value={draft.dueDate} onChange={(e) => update("dueDate", e.target.value)} className={inputClass} />
              </div>
            </div>
            <div>
              <label htmlFor="notes" className={labelClass}>Notes for the customer</label>
              <textarea id="notes" rows={3} value={draft.notes} onChange={(e) => update("notes", e.target.value)} className={textareaClass} />
            </div>
            <label htmlFor="addGst" className="flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3">
              <span>
                <span className="block text-[15px] font-semibold text-slate-800">Add GST (15%)</span>
                <span className="block text-xs text-slate-500">Only if Falcon Access is GST registered</span>
              </span>
              <input id="addGst" type="checkbox" checked={draft.addGst} onChange={(e) => update("addGst", e.target.checked)} className="h-6 w-6 accent-brand-dark" />
            </label>
          </div>
        </Section>

        {errorBanner}

        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total{draft.addGst ? " incl. GST" : ""}</p>
              <p className="font-montserrat text-xl font-bold text-brand-dark">{formatMoney(total)}</p>
            </div>
            <button type="submit" className="h-12 rounded-full bg-brand-accent px-7 font-bold text-brand-dark hover:opacity-90">
              Review
            </button>
          </div>
        </div>
      </form>

      {isPriceListOpen && <PriceListSheet onSelect={addItem} onClose={closePriceList} />}
    </>
  );
}
