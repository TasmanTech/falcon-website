"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiDownload, FiSearch } from "react-icons/fi";
import { refreshAccessTokenAction } from "@/app/actions/auth";
import {
  SessionExpiredError,
  downloadBlob,
  fetchInvoiceHistory,
  fetchStoredInvoicePdf,
  formatDisplayDate,
  formatMoney,
  type InvoiceSummary,
} from "@/lib/invoice";

/** Delay before a search is sent, so typing doesn't fire a request per keystroke. */
const SEARCH_DEBOUNCE_MS = 300;

/** Results for one search, tagged with the query that produced them. */
interface LoadedPage {
  query: string;
  items: InvoiceSummary[];
  total: number;
  page: number;
}

/**
 * Mobile-first list of sent invoices. Searches by customer name, email or invoice
 * number, loads 20 at a time, and downloads the stored PDF when a row is tapped.
 *
 * @param {object} props - The component props.
 * @param {string} props.token - The access token for back-end requests.
 * @returns {JSX.Element} The invoice history.
 */
export default function InvoiceHistory({ token }: { token: string }) {
  const tokenRef = useRef(token);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [loaded, setLoaded] = useState<LoadedPage | null>(null);
  const [error, setError] = useState<{ message: string; sessionExpired: boolean } | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const isLoading = loaded?.query !== query && !error;

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
    fetchInvoiceHistory({ search: query, page: 1 }, tokenRef.current, refreshAccessTokenAction)
      .then((result) => {
        if (cancelled) return;
        tokenRef.current = result.token;
        setError(null);
        setLoaded({ query, items: result.items, total: result.total, page: 1 });
      })
      .catch((err: unknown) => {
        if (!cancelled) handleError(err);
      });
    return () => {
      cancelled = true;
    };
  }, [query]);

  const loadMore = async () => {
    if (!loaded) return;
    setLoadingMore(true);
    try {
      const result = await fetchInvoiceHistory(
        { search: loaded.query, page: loaded.page + 1 },
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

  const download = async (invoice: InvoiceSummary) => {
    setDownloadingId(invoice.id);
    setError(null);
    try {
      const result = await fetchStoredInvoicePdf(invoice.id, tokenRef.current, refreshAccessTokenAction);
      tokenRef.current = result.token;
      downloadBlob(result.blob, result.fileName);
    } catch (err) {
      handleError(err);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="space-y-4 pb-10">
      <div>
        <h1 className="font-montserrat text-xl font-bold text-brand-dark">Invoice History</h1>
        <p className="text-sm text-slate-600">Every invoice sent from the portal. Tap one to download it.</p>
      </div>

      <div className="relative">
        <label htmlFor="invoice-search" className="sr-only">
          Search invoices
        </label>
        <FiSearch aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          id="invoice-search"
          type="search"
          inputMode="search"
          autoComplete="off"
          placeholder="Name, email or invoice number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
        />
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
        <div className="space-y-3 animate-pulse" aria-label="Loading invoices">
          {[0, 1, 2].map((row) => (
            <div key={row} className="h-20 rounded-2xl bg-slate-200" />
          ))}
        </div>
      )}

      {!isLoading && loaded && loaded.items.length === 0 && (
        <p className="rounded-2xl border border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500">
          {loaded.query ? `No invoices match “${loaded.query}”.` : "No invoices have been sent yet."}
        </p>
      )}

      {!isLoading && loaded && loaded.items.length > 0 && (
        <>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {loaded.total} invoice{loaded.total === 1 ? "" : "s"}
          </p>
          <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {loaded.items.map((invoice) => (
              <li key={invoice.id}>
                <button
                  type="button"
                  onClick={() => download(invoice)}
                  disabled={downloadingId !== null}
                  aria-label={`Download ${invoice.invoiceNumber} for ${invoice.clientName}`}
                  className="flex min-h-20 w-full items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 active:bg-slate-100 disabled:cursor-not-allowed"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="truncate font-semibold text-slate-900">{invoice.clientName}</span>
                      <span className="shrink-0 font-bold text-brand-dark">{formatMoney(invoice.total)}</span>
                    </div>
                    <p className="truncate text-sm text-slate-500">
                      {invoice.invoiceNumber} · {formatDisplayDate(invoice.invoiceDate)}
                    </p>
                    <p className="truncate text-xs text-slate-400">{invoice.clientEmail}</p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-brand-dark">
                    {downloadingId === invoice.id ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-dark border-t-transparent" aria-label="Downloading" />
                    ) : (
                      <FiDownload aria-hidden size={18} />
                    )}
                  </span>
                </button>
              </li>
            ))}
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
