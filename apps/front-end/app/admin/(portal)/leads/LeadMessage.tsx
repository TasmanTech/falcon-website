"use client";

import { useState } from "react";
import { FiCheck, FiCopy, FiRotateCcw } from "react-icons/fi";
import { todayInNz } from "@/lib/invoice";
import { JOB_TYPES, buildLeadMessage, mapsLink, type LeadDraft } from "@/lib/lead";

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
 * Lead message generator: fill in the customer's details and copy a formatted
 * message to paste into the team's Telegram chat.
 *
 * @returns {JSX.Element} The generator.
 */
export default function LeadMessage() {
  const [lead, setLead] = useState<LeadDraft>(emptyLead);
  const [copied, setCopied] = useState(false);

  const message = buildLeadMessage(lead);
  const link = mapsLink(lead.address);

  const update = (key: keyof LeadDraft, value: string) => {
    setLead((current) => ({ ...current, [key]: value }));
    setCopied(false);
  };

  const copy = async () => {
    await copyText(message);
    setCopied(true);
  };

  const reset = () => {
    setLead(emptyLead());
    setCopied(false);
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
        <h1 className="font-montserrat text-xl font-bold text-brand-dark">Lead Message</h1>
        <p className="text-sm text-slate-600">Fill in the details, then copy the message into Telegram.</p>
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
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <h2 className="mb-3 font-montserrat text-base font-bold text-brand-dark">Preview</h2>
        <pre data-testid="lead-preview" className="whitespace-pre-wrap break-words rounded-xl bg-slate-50 p-3 font-sans text-[15px] leading-relaxed text-slate-800">
          {message}
        </pre>
      </section>

      <div className="grid gap-3">
        <button
          type="button"
          onClick={copy}
          className={`flex h-12 items-center justify-center gap-2 rounded-full font-bold transition-colors ${
            copied ? "bg-green-600 text-white" : "bg-brand-accent text-brand-dark hover:opacity-90"
          }`}
        >
          {copied ? <FiCheck aria-hidden /> : <FiCopy aria-hidden />}
          {copied ? "Copied" : "Copy Message"}
        </button>
        <button
          type="button"
          onClick={reset}
          className="flex h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white font-semibold text-slate-700 hover:bg-slate-50"
        >
          <FiRotateCcw aria-hidden /> New Lead
        </button>
      </div>
    </div>
  );
}
