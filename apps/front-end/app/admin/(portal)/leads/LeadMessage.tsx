"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { FiCheck, FiCopy, FiRotateCcw, FiSave, FiX } from "react-icons/fi";
import { refreshAccessTokenAction } from "@/app/actions/auth";
import { SessionExpiredError, todayInNz } from "@/lib/invoice";
import {
  JOB_TYPES,
  LEAD_STATUSES,
  buildLeadMessage,
  mapsLink,
  saveLead,
  toLeadDraft,
  type LeadDraft,
  type LeadStatus,
  type SavedLead,
} from "@/lib/lead";

const inputClass =
  "block w-full h-12 rounded-xl border border-slate-300 bg-white px-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30";
const textareaClass = inputClass.replace("h-12", "min-h-20 py-3");
const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";

const emptyLead = (): LeadDraft => ({
  date: todayInNz(),
  time: "",
  name: "",
  phone: "",
  address: "",
  jobType: "",
  notes: "",
});

/**
 * Copies text to the clipboard, falling back to a hidden textarea where the
 * Clipboard API is blocked.
 */
async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
}

/**
 * Lead form: fill in the customer's details, copy a formatted message to paste
 * into the team's Telegram chat, and save the lead to history. Past leads can be
 * entered with a Closed or Cancelled status; new leads default to Pending.
 *
 * When `editing` is given, the form opens with that lead's details and saving
 * updates it instead of creating a new one.
 *
 * @param {object} props - The component props.
 * @param {string} props.token - The access token for back-end requests.
 * @param {SavedLead} [props.editing] - A saved lead to edit.
 * @param {(lead: SavedLead) => void} [props.onSaved] - Called after an edit is saved.
 * @param {() => void} [props.onCancel] - Called when an edit is abandoned.
 * @returns {JSX.Element} The lead form.
 */
export default function LeadMessage({
  token,
  editing,
  onSaved,
  onCancel,
}: {
  token: string;
  editing?: SavedLead;
  onSaved?: (lead: SavedLead) => void;
  onCancel?: () => void;
}) {
  const tokenRef = useRef(token);
  const [lead, setLead] = useState<LeadDraft>(() => (editing ? toLeadDraft(editing) : emptyLead()));
  const [status, setStatus] = useState<LeadStatus>(editing?.status ?? "pending");
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [error, setError] = useState<{ message: string; sessionExpired: boolean } | null>(null);

  const message = buildLeadMessage(lead);
  const link = mapsLink(lead.address);

  const update = (key: keyof LeadDraft, value: string) => {
    setLead((current) => ({ ...current, [key]: value }));
    setCopied(false);
    setSavedId(null);
  };

  const copy = async () => {
    await copyText(message);
    setCopied(true);
  };

  const save = async () => {
    if (!lead.date) {
      setError({ message: "Add a date before saving.", sessionExpired: false });
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const { token: nextToken, ...saved } = await saveLead(
        lead,
        status,
        editing?.id ?? savedId ?? undefined,
        tokenRef.current,
        refreshAccessTokenAction,
      );
      tokenRef.current = nextToken;
      setSavedId(saved.id);
      onSaved?.(saved);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Something went wrong. Please try again.",
        sessionExpired: err instanceof SessionExpiredError,
      });
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    setLead(emptyLead());
    setStatus("pending");
    setCopied(false);
    setSavedId(null);
    setError(null);
    window.scrollTo({ top: 0 });
  };

  return (
    <div
      className="space-y-4 pb-10"
      onKeyDown={(event) => {
        if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
          event.preventDefault();
          void copy();
        }
      }}
    >
      <div>
        <h1 className="font-montserrat text-xl font-bold text-brand-dark">{editing ? "Edit Lead" : "Lead Message"}</h1>
        <p className="text-sm text-slate-600">
          {editing
            ? "Update the details, then save your changes."
            : "Fill in the details, copy the message into Telegram, and save it to Leads."}
        </p>
      </div>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="leadDate" className={labelClass}>Date</label>
            <input id="leadDate" type="date" value={lead.date} onChange={(e) => update("date", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="leadTime" className={labelClass}>Time</label>
            <input id="leadTime" type="time" value={lead.time} onChange={(e) => update("time", e.target.value)} className={inputClass} />
          </div>
        </div>
        <div>
          <label htmlFor="leadName" className={labelClass}>Name</label>
          <input id="leadName" autoComplete="off" value={lead.name} onChange={(e) => update("name", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label htmlFor="leadPhone" className={labelClass}>Phone</label>
          <input id="leadPhone" type="tel" inputMode="tel" autoComplete="off" value={lead.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label htmlFor="leadAddress" className={labelClass}>Address</label>
          <input id="leadAddress" autoComplete="off" value={lead.address} onChange={(e) => update("address", e.target.value)} className={inputClass} />
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-block text-sm font-semibold text-brand-dark underline">
              Check on Google Maps
            </a>
          )}
        </div>
        <div>
          <label htmlFor="leadJobType" className={labelClass}>Job type</label>
          <input id="leadJobType" list="leadJobTypes" autoComplete="off" value={lead.jobType} onChange={(e) => update("jobType", e.target.value)} className={inputClass} />
          <datalist id="leadJobTypes">
            {JOB_TYPES.map((type) => (
              <option key={type} value={type} />
            ))}
          </datalist>
        </div>
        <div>
          <label htmlFor="leadNotes" className={labelClass}>Notes</label>
          <textarea id="leadNotes" rows={3} value={lead.notes} onChange={(e) => update("notes", e.target.value)} className={textareaClass} />
        </div>
        <fieldset>
          <legend className={labelClass}>Status</legend>
          <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1">
            {LEAD_STATUSES.map((option) => (
              <label
                key={option.value}
                className={`flex h-10 cursor-pointer items-center justify-center rounded-lg text-sm font-semibold ${status === option.value ? "bg-white text-brand-dark shadow-sm" : "text-slate-600"
                  }`}
              >
                <input
                  type="radio"
                  name="leadStatus"
                  value={option.value}
                  checked={status === option.value}
                  onChange={() => {
                    setStatus(option.value);
                    setSavedId(null);
                  }}
                  className="sr-only"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <h2 className="mb-3 font-montserrat text-base font-bold text-brand-dark">Preview</h2>
        <pre data-testid="lead-preview" className="whitespace-pre-wrap wrap-break-word rounded-xl bg-slate-50 p-3 font-sans text-[15px] leading-relaxed text-slate-800">
          {message}
        </pre>
      </section>

      {error && (
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error.message}
          {error.sessionExpired && (
            <Link href="/admin/login" className="mt-1 block font-semibold underline">
              Log in again
            </Link>
          )}
        </div>
      )}

      <div className="grid gap-3">
        <button
          type="button"
          onClick={copy}
          className={`flex h-12 items-center justify-center gap-2 rounded-full font-bold transition-colors ${copied ? "bg-green-600 text-white" : "bg-brand-accent text-brand-dark hover:opacity-90"
            }`}
        >
          {copied ? <FiCheck aria-hidden /> : <FiCopy aria-hidden />}
          {copied ? "Copied" : "Copy Message"}
        </button>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className={`flex h-12 items-center justify-center gap-2 rounded-full font-bold disabled:cursor-not-allowed disabled:opacity-60 ${savedId && !editing ? "bg-green-600 text-white" : "bg-brand-dark text-white hover:opacity-90"
            }`}
        >
          {savedId && !editing ? <FiCheck aria-hidden /> : <FiSave aria-hidden />}
          {saving ? "Saving…" : editing ? "Save Changes" : savedId ? "Saved to Leads" : "Save Lead"}
        </button>
        {editing ? (
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="flex h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white font-semibold text-slate-700 hover:bg-slate-50"
          >
            <FiX aria-hidden /> Cancel
          </button>
        ) : (
          <button
            type="button"
            onClick={reset}
            className="flex h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white font-semibold text-slate-700 hover:bg-slate-50"
          >
            <FiRotateCcw aria-hidden /> New Lead
          </button>
        )}
      </div>
    </div>
  );
}
