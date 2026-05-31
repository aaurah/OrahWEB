"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { TLDS } from "@/lib/domain-store";
import type { DomainOrder } from "@/lib/domain-store";

interface DomainResult {
  tld: string;
  domain: string;
  available: boolean;
  price: number;
  renewalPrice: number;
  category: string;
}

type Category = "all" | "popular" | "tech" | "business" | "creative";

const CATEGORY_LABELS: Record<Category, string> = {
  all: "All TLDs",
  popular: "Popular",
  tech: "Tech",
  business: "Business",
  creative: "Creative",
};

const ORDER_STATUS_STYLES: Record<DomainOrder["status"], string> = {
  processing: "bg-amber-50 text-amber-700 border-amber-200",
  active:     "bg-green-50 text-green-700 border-green-200",
  failed:     "bg-red-50 text-red-600 border-red-200",
};

export function DomainSearch({ initialOrders }: { initialOrders: DomainOrder[] }) {
  const [query, setQuery] = useState("");
  const [searchName, setSearchName] = useState("");
  const [results, setResults] = useState<DomainResult[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [category, setCategory] = useState<Category>("all");
  const [purchasing, setPurchasing] = useState<{ name: string; tld: string } | null>(null);
  const [years, setYears] = useState(1);
  const [orders, setOrders] = useState<DomainOrder[]>(initialOrders);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  function parseName(raw: string): string {
    return raw.trim().toLowerCase().replace(/^https?:\/\//, "").split(".")[0];
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const name = parseName(query);
    if (!name) return;
    setSearching(true);
    setSearchError("");
    setResults(null);
    setSearchName(name);
    setCategory("all");
    try {
      const res = await fetch(`/api/admin/domains/check?name=${encodeURIComponent(name)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Search failed");
      setResults(data.results);
    } catch (err) {
      setSearchError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setSearching(false);
    }
  }

  async function handlePurchase() {
    if (!purchasing) return;
    try {
      const res = await fetch("/api/admin/domains/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: purchasing.name, tld: purchasing.tld, years }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Order failed");
      setOrders((prev) => [data.order, ...prev]);
      setToast({ msg: `${purchasing.name}.${purchasing.tld} ordered — demo mode, not charged`, ok: true });
    } catch (err) {
      setToast({ msg: err instanceof Error ? err.message : "Order failed", ok: false });
    } finally {
      setPurchasing(null);
      setYears(1);
    }
  }

  const tldPrice = purchasing
    ? TLDS.find((t) => t.tld === purchasing.tld)?.price ?? 0
    : 0;

  const filtered =
    results?.filter((r) => category === "all" || r.category === category) ?? [];

  const availableCount = results?.filter((r) => r.available).length ?? 0;

  return (
    <>
      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium border flex items-center gap-2.5 transition-all ${
            toast.ok
              ? "bg-green-50 text-green-800 border-green-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          {toast.ok ? (
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          {toast.msg}
        </div>
      )}

      {/* Purchase modal */}
      {purchasing && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Confirm Purchase</h3>
            <p className="text-sm text-gray-500 mb-5">
              Demo mode — no payment is processed.
            </p>
            <div className="bg-gray-50 rounded-xl px-4 py-3 mb-5 space-y-1">
              <p className="text-base font-semibold text-gray-900">
                {purchasing.name}.{purchasing.tld}
              </p>
              <p className="text-xs text-gray-500">
                ${tldPrice.toFixed(2)}/yr · cost-to-cost registry rate
              </p>
            </div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registration period
              </label>
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3, 5].map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => setYears(y)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                      years === y
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    {y} yr
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between mb-5 border-t border-gray-100 pt-4">
              <span className="text-sm font-medium text-gray-700">Total</span>
              <span className="text-xl font-bold text-gray-900">
                ${(tldPrice * years).toFixed(2)}
              </span>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="md"
                className="flex-1"
                onClick={() => { setPurchasing(null); setYears(1); }}
              >
                Cancel
              </Button>
              <Button size="md" className="flex-1" onClick={handlePurchase}>
                Place Order
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8 max-w-6xl">
        {/* Search */}
        <Card padding="lg">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">Domain Search</h2>
              <p className="text-xs text-gray-400">Prices shown are registry cost — no markup</p>
            </div>
          </div>
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="yourbrand (or yourbrand.com)"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <Button type="submit" size="md" loading={searching} disabled={!query.trim()}>
              Search
            </Button>
          </form>
          {searchError && (
            <p className="mt-3 text-sm text-red-600">{searchError}</p>
          )}
        </Card>

        {/* Results */}
        {results && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Results for <span className="text-blue-600">{searchName}</span>
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {availableCount} of {results.length} TLDs available
                </p>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                      category === c
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700"
                    }`}
                  >
                    {CATEGORY_LABELS[c]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {filtered.map((r) => (
                <div
                  key={r.tld}
                  className={`bg-white rounded-xl border p-4 flex items-center justify-between gap-3 transition-all ${
                    r.available
                      ? "border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100"
                      : "border-gray-100 opacity-60"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {searchName}
                      <span className="text-gray-400">.{r.tld}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                          r.available
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {r.available ? "Available" : "Taken"}
                      </span>
                      {r.available && (
                        <span className="text-xs text-gray-400">
                          renews ${r.renewalPrice.toFixed(2)}/yr
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    {r.available ? (
                      <>
                        <p className="text-base font-bold text-gray-900">
                          ${r.price.toFixed(2)}
                          <span className="text-xs font-normal text-gray-400">/yr</span>
                        </p>
                        <button
                          type="button"
                          onClick={() => setPurchasing({ name: searchName, tld: r.tld })}
                          className="mt-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        >
                          Buy
                        </button>
                      </>
                    ) : (
                      <p className="text-sm font-bold text-gray-300">${r.price.toFixed(2)}/yr</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TLD Pricing Reference */}
        {!results && (
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-gray-900">TLD Pricing Reference</h2>
            <p className="text-sm text-gray-400 -mt-1">
              All prices are registry wholesale rates — exactly what you pay.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              {TLDS.map((t) => (
                <div
                  key={t.tld}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">.{t.tld}</p>
                    <p className="text-xs text-gray-400 capitalize mt-0.5">{t.category}</p>
                  </div>
                  <p className="text-sm font-bold text-gray-900">
                    ${t.price.toFixed(2)}
                    <span className="text-xs font-normal text-gray-400">/yr</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders */}
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900">
            Orders
            {orders.length > 0 && (
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                {orders.length}
              </span>
            )}
          </h2>
          {orders.length === 0 ? (
            <Card padding="md">
              <p className="text-sm text-gray-400 text-center py-6">
                No domain orders yet. Search for a domain above to get started.
              </p>
            </Card>
          ) : (
            <Card padding="md">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3">Domain</th>
                      <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 hidden sm:table-cell">Period</th>
                      <th className="text-right text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 hidden md:table-cell">Rate</th>
                      <th className="text-right text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3">Total</th>
                      <th className="text-right text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {orders.map((o) => (
                      <tr key={o.id} className="group">
                        <td className="py-3 font-medium text-gray-900">
                          {o.domain}.{o.tld}
                        </td>
                        <td className="py-3 text-gray-500 hidden sm:table-cell">
                          {o.years} {o.years === 1 ? "year" : "years"}
                        </td>
                        <td className="py-3 text-gray-500 text-right hidden md:table-cell">
                          ${o.pricePerYear.toFixed(2)}/yr
                        </td>
                        <td className="py-3 font-semibold text-gray-900 text-right">
                          ${o.total.toFixed(2)}
                        </td>
                        <td className="py-3 text-right">
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                              ORDER_STATUS_STYLES[o.status]
                            }`}
                          >
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
          <span className="font-semibold">Demo mode</span> — domain checks are simulated and no payment is processed. Connect a registrar API (e.g. Namecheap, Cloudflare Registrar) to enable real purchases.
        </div>
      </div>
    </>
  );
}
