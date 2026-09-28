"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiEdit2, FiMapPin, FiPhone, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { refreshAccessTokenAction } from "@/app/actions/auth";
import { SessionExpiredError, formatDisplayDate } from "@/lib/invoice";
import {
  LEAD_STATUSES,
  deleteLead,
  fetchLeads,
  formatLeadTime,
  mapsLink,
  updateLeadStatus,
  type LeadStatus,
  type SavedLead,
} from "@/lib/lead";
import LeadMessage from "../LeadMessage";

/** Delay before a search is sent, so typing doesn't fire a request per keystroke. */
const SEARCH_DEBOUNCE_MS = 300;

/** Results for one search and filter, tagged with the query that produced them. */
interface LoadedPage {
  key: string;
  items: SavedLead[];
  total: number;
  page: number;
}

/**
 * Mobile-first list of saved leads. Searches by name, phone, address or job type,
 * filters by status, and lets each lead be re-statused, edited or deleted
 * (deleting asks for a second tap to confirm).
 *
 * @param {object} props - The component props.
 * @param {string} props.token - The access token for back-end requests.
 * @returns {JSX.Element} The lead history.
 */
export default function LeadHistory({ token }: { token: string }) {
  const tokenRef = useRef(token);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "">("");
  const [loaded, setLoaded] = useState<LoadedPage | null>(null);
  const [error, setError] = useState<{ message: string; sessionExpired: boolean } | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<{ lead: SavedLead; token: string } | null>(null);

  const key = `${statusFilter}|${query}`;
  const isLoading = loaded?.key !== key && !error;

  const handleError = (err: unknown) =>
    setError({
      message: err instanceof Error ? err.message : "Something went wrong. Please try again.",
      sessionExpired: err instanceof SessionExpiredError,
    });

  useEffect(() => {
    const timer = setTimeout(() => setQuery(search.trim()), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    let cancelled = false;
    const currentKey = `${statusFilter}|${query}`;
    fetchLeads({ search: query, status: statusFilter || undefined, page: 1 }, tokenRef.current, refreshAccessTokenAction)
      .then((result) => {
        if (cancelled) return;
        tokenRef.current = result.token;
        setError(null);
        setLoaded({ key: currentKey, items: result.items, total: result.total, page: 1 });
      })
      .catch((err: unknown) => {
        if (!cancelled) handleError(err);
      });
    return () => {
      cancelled = true;
    };
  }, [query, statusFilter]);

  const loadMore = async () => {
    if (!loaded) return;
    setLoadingMore(true);
    try {
      const result = await fetchLeads(
        { search: query, status: statusFilter || undefined, page: loaded.page + 1 },
        tokenRef.current,
        refreshAccessTokenAction,
      );
      tokenRef.current = result.token;
      setLoaded({ ...loaded, items: [...loaded.items, ...result.items], total: result.total, page: loaded.page + 1 });
    } catch (err) {
      handleError(err);
    } finally {
      setLoadingMore(false);
    }
  };

  /** Swaps an updated lead into the list, or drops it if it no longer matches the status filter. */
  const replaceLead = (updated: SavedLead) =>
    setLoaded((current) => {
      if (!current) return current;
      if (statusFilter && updated.status !== statusFilter) {
        return { ...current, items: current.items.filter((item) => item.id !== updated.id), total: current.total - 1 };
      }
      return { ...current, items: current.items.map((item) => (item.id === updated.id ? updated : item)) };
    });

  const changeStatus = async (lead: SavedLead, status: LeadStatus) => {
    if (status === lead.status) return;
    setBusyId(lead.id);
    setError(null);
    try {
      const { token: nextToken, ...updated } = await updateLeadStatus(lead.id, status, tokenRef.current, refreshAccessTokenAction);
      tokenRef.current = nextToken;
      replaceLead(updated);
    } catch (err) {
      handleError(err);
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (lead: SavedLead) => {
    setBusyId(lead.id);
    setError(null);
    try {
      const { token: nextToken } = await deleteLead(lead.id, tokenRef.current, refreshAccessTokenAction);
      tokenRef.current = nextToken;
      setLoaded(
        (current) =>
          current && { ...current, items: current.items.filter((item) => item.id !== lead.id), total: current.total - 1 },
      );
    } catch (err) {
      handleError(err);
    } finally {
      setBusyId(null);
      setConfirmingDeleteId(null);
    }
  };

  if (editing) {
    return (
      <LeadMessage
        token={editing.token}
        editing={editing.lead}
        onSaved={(updated) => {
          replaceLead(updated);
          setEditing(null);
        }}
        onCancel={() => setEditing(null)}
      />
    );
  }

  return (
    <div className="space-y-4 pb-10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="font-montserrat text-xl font-bold text-brand-dark">Leads</h1>
          <p className="text-sm text-slate-600">Every saved lead. Update its status, edit it or delete it.</p>
        </div>
        <Link
          href="/admin/leads"
          className="flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-brand-dark px-4 text-sm font-semibold text-white hover:opacity-90"
        >
          <FiPlus aria-hidden /> Add Lead
        </Link>
      </div>

      <div className="relative">
        <label htmlFor="lead-search" className="sr-only">
          Search leads
        </label>
        <FiSearch aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          id="lead-search"
          type="search"
          inputMode="search"
          autoComplete="off"
          placeholder="Name, phone, address or job type"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
        />
      </div>

      <div role="group" aria-label="Filter by status" className="grid grid-cols-4 gap-1 rounded-full bg-slate-200 p-1">
        {[{ value: "" as const, label: "All" }, ...LEAD_STATUSES].map((option) => (
          <button
            key={option.value || "all"}
            type="button"
            aria-pressed={statusFilter === option.value}
            onClick={() => setStatusFilter(option.value)}
            className={`h-9 rounded-full text-xs font-semibold sm:text-sm ${
              statusFilter === option.value ? "bg-white text-brand-dark" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

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

      {isLoading && (
        <div className="space-y-3 animate-pulse" aria-label="Loading leads">
          {[0, 1, 2].map((row) => (
            <div key={row} className="h-28 rounded-2xl bg-slate-200" />
          ))}
        </div>
      )}

      {!isLoading && loaded && loaded.items.length === 0 && (
        <p className="rounded-2xl border border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500">
          {query || statusFilter ? "No leads match." : "No leads have been saved yet."}
        </p>
      )}

      {!isLoading && loaded && loaded.items.length > 0 && (
        <>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {loaded.total} lead{loaded.total === 1 ? "" : "s"}
          </p>
          <ul className="space-y-3">
            {loaded.items.map((lead) => {
              const status = LEAD_STATUSES.find((option) => option.value === lead.status) ?? LEAD_STATUSES[0];
              const label = lead.name || lead.phone || "Unnamed lead";
              const busy = busyId === lead.id;
              return (
                <li key={lead.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-900">{label}</p>
                      <p className="text-sm text-slate-500">
                        {formatDisplayDate(lead.date)}
                        {lead.time && ` · ${formatLeadTime(lead.time)}`}
                        {lead.jobType && ` · ${lead.jobType}`}
                      </p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${status.badgeClass}`}>
                      {status.label}
                    </span>
                  </div>

                  {(lead.phone || lead.address) && (
                    <div className="mt-2 space-y-1 text-sm">
                      {lead.phone && (
                        <a href={`tel:${lead.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-brand-dark">
                          <FiPhone aria-hidden size={14} /> {lead.phone}
                        </a>
                      )}
                      {lead.address && (
                        <a
                          href={mapsLink(lead.address)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-brand-dark"
                        >
                          <FiMapPin aria-hidden size={14} className="shrink-0" /> <span className="truncate">{lead.address}</span>
                        </a>
                      )}
                    </div>
                  )}
                  {lead.notes && <p className="mt-2 whitespace-pre-line text-sm text-slate-600">{lead.notes}</p>}

                  <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
                    <label htmlFor={`status-${lead.id}`} className="sr-only">
                      Status for {label}
                    </label>
                    <select
                      id={`status-${lead.id}`}
                      value={lead.status}
                      disabled={busy}
                      onChange={(e) => changeStatus(lead, e.target.value as LeadStatus)}
                      className="h-10 min-w-0 flex-1 rounded-full border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 disabled:opacity-60"
                    >
                      {LEAD_STATUSES.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setEditing({ lead, token: tokenRef.current })}
                      disabled={busy}
                      aria-label={`Edit ${label}`}
                      className="flex h-10 items-center gap-1.5 rounded-full border border-slate-300 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                    >
                      <FiEdit2 aria-hidden size={14} /> Edit
                    </button>
                    {confirmingDeleteId === lead.id ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setConfirmingDeleteId(null)}
                          disabled={busy}
                          className="flex h-10 items-center rounded-full px-3 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                        >
                          Keep
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(lead)}
                          disabled={busy}
                          className="flex h-10 items-center rounded-full bg-red-600 px-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                        >
                          {busy ? "Deleting…" : "Delete"}
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmingDeleteId(lead.id)}
                        disabled={busy}
                        aria-label={`Delete ${label}`}
                        className="flex h-10 w-10 items-center justify-center rounded-full text-red-600 hover:bg-red-50 disabled:opacity-60"
                      >
                        <FiTrash2 aria-hidden size={16} />
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          {loaded.items.length < loaded.total && (
            <button
              type="button"
              onClick={loadMore}
              disabled={loadingMore}
              className="h-12 w-full rounded-full border border-slate-300 bg-white font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingMore ? "Loading…" : "Load More"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
