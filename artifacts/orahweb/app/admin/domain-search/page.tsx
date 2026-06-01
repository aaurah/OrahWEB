"use client";

import { useState, useMemo } from "react";

const TLDS = [
  { ext: ".crypto",     category: "web3",         price: 19.99, chain: "Ethereum" },
  { ext: ".web3",       category: "web3",         price: 9.99,  chain: "Polygon"  },
  { ext: ".nft",        category: "web3",         price: 14.99, chain: "Polygon"  },
  { ext: ".wallet",     category: "web3",         price: 12.99, chain: "Polygon"  },
  { ext: ".dao",        category: "web3",         price: 24.99, chain: "Ethereum" },
  { ext: ".defi",       category: "web3",         price: 19.99, chain: "Ethereum" },
  { ext: ".x",          category: "web3",         price: 29.99, chain: "Ethereum" },
  { ext: ".coin",       category: "web3",         price: 14.99, chain: "Polygon"  },
  { ext: ".zil",        category: "web3",         price: 9.99,  chain: "Polygon"  },
  { ext: ".blockchain", category: "web3",         price: 34.99, chain: "Ethereum" },
  { ext: ".com",        category: "traditional",  price: 4.99,  chain: "DNS"      },
  { ext: ".io",         category: "traditional",  price: 7.99,  chain: "DNS"      },
  { ext: ".ai",         category: "traditional",  price: 24.99, chain: "DNS"      },
  { ext: ".app",        category: "traditional",  price: 6.99,  chain: "DNS"      },
  { ext: ".xyz",        category: "traditional",  price: 3.99,  chain: "DNS"      },
  { ext: ".net",        category: "traditional",  price: 4.99,  chain: "DNS"      },
  { ext: ".org",        category: "traditional",  price: 4.99,  chain: "DNS"      },
];

type Result = {
  domain: string;
  ext: string;
  category: string;
  price: number;
  chain: string;
  available: boolean;
};

function randomAvailable() {
  return Math.random() > 0.35;
}

function generateResults(name: string): Result[] {
  const seed = name.length;
  return TLDS.map((t, i) => ({
    domain: name + t.ext,
    ext: t.ext,
    category: t.category,
    price: t.price,
    chain: t.chain,
    available: (seed + i) % 3 !== 0,
  }));
}

const CHAIN_COLORS: Record<string, string> = {
  Ethereum: "bg-blue-900/50 text-blue-300",
  Polygon:  "bg-violet-900/50 text-violet-300",
  DNS:      "bg-gray-700/60 text-gray-300",
  Solana:   "bg-green-900/50 text-green-300",
};

export default function AdminDomainSearchPage() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [categoryFilter, setCategoryFilter] = useState<"all" | "web3" | "traditional">("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(35);
  const [showAvailableOnly, setShowAvailableOnly] = useState(true);
  const [purchased, setPurchased] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSearch = () => {
    const name = query.trim().toLowerCase().replace(/\s+/g, "").replace(/\./g, "");
    if (!name) return;
    setLoading(true);
    setSelected(new Set());
    setSearched(name);
    setTimeout(() => {
      setResults(generateResults(name));
      setLoading(false);
    }, 600);
  };

  const filtered = useMemo(() => {
    return results.filter((r) => {
      if (showAvailableOnly && !r.available) return false;
      if (categoryFilter !== "all" && r.category !== categoryFilter) return false;
      if (r.price < minPrice || r.price > maxPrice) return false;
      return true;
    });
  }, [results, showAvailableOnly, categoryFilter, minPrice, maxPrice]);

  const toggleSelect = (domain: string) => {
    if (!filtered.find((r) => r.domain === domain)?.available) return;
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(domain) ? next.delete(domain) : next.add(domain);
      return next;
    });
  };

  const selectAll = () => {
    const avail = filtered.filter((r) => r.available).map((r) => r.domain);
    setSelected(new Set(avail));
  };

  const clearAll = () => setSelected(new Set());

  const selectedDomains = filtered.filter((r) => selected.has(r.domain));
  const totalCost = selectedDomains.reduce((sum, r) => sum + r.price, 0);

  const handleBulkBuy = () => {
    if (selected.size === 0) return;
    setPurchased(Array.from(selected));
    setSelected(new Set());
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <div className="p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white">Domain Search & Bulk Buy</h1>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">
          Search any name across all TLDs — select and register multiple domains at once
        </p>
      </div>

      {/* Success toast */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-right-4">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="font-semibold text-sm">{purchased.length} domain{purchased.length !== 1 ? "s" : ""} registered!</p>
            <p className="text-emerald-200 text-xs">{purchased.slice(0, 3).join(", ")}{purchased.length > 3 ? ` +${purchased.length - 3} more` : ""}</p>
          </div>
        </div>
      )}

      {/* Search bar */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <label className="block text-sm font-semibold text-white mb-3">Search domain name</label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="e.g. bitcoin, coolbrand, myapp..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={!query.trim() || loading}
            className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors shrink-0"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Checking...
              </span>
            ) : "Search All TLDs"}
          </button>
        </div>
      </div>

      {/* Filters + results */}
      {results.length > 0 && (
        <>
          {/* Filter bar */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-white">Filters &amp; Bulk Selection</h3>
            <div className="flex flex-wrap gap-4 items-end">
              {/* Category */}
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block font-medium">Category</label>
                <div className="flex gap-1.5">
                  {(["all", "web3", "traditional"] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategoryFilter(c)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                        categoryFilter === c
                          ? "bg-violet-600 text-white"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      {c === "all" ? "All" : c === "web3" ? "Web3" : "Traditional"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs text-gray-400 mb-1.5 block font-medium">
                  Price range: <span className="text-white">${minPrice.toFixed(2)} — ${maxPrice.toFixed(2)}</span>
                </label>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">$0</span>
                  <input
                    type="range"
                    min={0}
                    max={35}
                    step={0.5}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                    className="flex-1 accent-violet-500"
                  />
                  <span className="text-xs text-gray-500">$35</span>
                </div>
              </div>

              {/* Available only toggle */}
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block font-medium">Show</label>
                <button
                  onClick={() => setShowAvailableOnly((v) => !v)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    showAvailableOnly
                      ? "bg-emerald-900/50 text-emerald-400 border border-emerald-700/50"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${showAvailableOnly ? "bg-emerald-400" : "bg-gray-600"}`} />
                  {showAvailableOnly ? "Available only" : "All results"}
                </button>
              </div>

              {/* Bulk select actions */}
              <div className="flex gap-2 ml-auto">
                <button
                  onClick={selectAll}
                  className="px-3 py-1.5 rounded-lg bg-gray-800 text-gray-300 text-xs font-medium hover:bg-gray-700 hover:text-white transition-colors"
                >
                  Select all ({filtered.filter((r) => r.available).length})
                </button>
                {selected.size > 0 && (
                  <button
                    onClick={clearAll}
                    className="px-3 py-1.5 rounded-lg bg-gray-800 text-gray-400 text-xs font-medium hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Bulk buy cart */}
          {selected.size > 0 && (
            <div className="bg-gradient-to-r from-violet-900/40 to-blue-900/40 border border-violet-700/50 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">
                  {selected.size} domain{selected.size !== 1 ? "s" : ""} selected for bulk registration
                </p>
                <p className="text-violet-300 text-xs mt-0.5">
                  {selectedDomains.map((d) => d.domain).slice(0, 4).join(", ")}
                  {selected.size > 4 ? ` +${selected.size - 4} more` : ""}
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <p className="text-xs text-gray-400">Total cost</p>
                  <p className="text-xl font-bold text-white">${totalCost.toFixed(2)}</p>
                </div>
                <button
                  onClick={handleBulkBuy}
                  className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-violet-900/40"
                >
                  Register {selected.size} Domain{selected.size !== 1 ? "s" : ""}
                </button>
              </div>
            </div>
          )}

          {/* Results grid */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-800 flex items-center justify-between">
              <p className="text-xs text-gray-400">
                Showing <span className="text-white font-semibold">{filtered.length}</span> of{" "}
                <span className="text-white font-semibold">{results.length}</span> TLDs for{" "}
                <span className="text-violet-400 font-semibold">&quot;{searched}&quot;</span>
              </p>
              <p className="text-xs text-gray-500">
                {results.filter((r) => r.available).length} available out of {results.length}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800/50 border-b border-gray-800">
                    <th className="px-5 py-3 w-10" />
                    {["Domain", "Category", "Chain", "Price", "Status"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-10 text-center text-gray-500 text-sm">
                        No domains match your current filters
                      </td>
                    </tr>
                  ) : (
                    filtered.map((r) => {
                      const isSelected = selected.has(r.domain);
                      return (
                        <tr
                          key={r.domain}
                          onClick={() => r.available && toggleSelect(r.domain)}
                          className={`transition-colors ${
                            r.available ? "cursor-pointer hover:bg-gray-800/40" : "opacity-50 cursor-not-allowed"
                          } ${isSelected ? "bg-violet-950/30" : ""}`}
                        >
                          <td className="px-5 py-3.5">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              readOnly
                              disabled={!r.available}
                              className="w-4 h-4 rounded border-gray-600 bg-gray-700 accent-violet-600 cursor-pointer"
                            />
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="font-bold text-white">{searched}</span>
                            <span className="text-violet-400 font-bold">{r.ext}</span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                              r.category === "web3"
                                ? "bg-violet-900/40 text-violet-300"
                                : "bg-gray-800 text-gray-400"
                            }`}>
                              {r.category === "web3" ? "Web3" : "Traditional"}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={`text-xs px-2 py-0.5 rounded font-medium ${CHAIN_COLORS[r.chain] ?? "bg-gray-700 text-gray-300"}`}>
                              {r.chain}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="font-bold text-white text-base">${r.price.toFixed(2)}</span>
                            {r.category === "web3" && (
                              <span className="ml-1.5 text-xs text-emerald-500">one-time</span>
                            )}
                          </td>
                          <td className="px-5 py-3.5">
                            {r.available ? (
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-900/30 px-2.5 py-1 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                Available
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 bg-red-900/20 px-2.5 py-1 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                Taken
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-gray-800 flex items-center justify-between">
              <p className="text-xs text-gray-500">{filtered.filter((r) => r.available).length} available • {filtered.filter((r) => !r.available).length} taken</p>
              {selected.size > 0 && (
                <p className="text-xs text-violet-400 font-medium">{selected.size} selected — ${totalCost.toFixed(2)} total</p>
              )}
            </div>
          </div>
        </>
      )}

      {/* Empty state */}
      {results.length === 0 && !loading && (
        <div className="bg-gray-900 border border-gray-800 border-dashed rounded-2xl py-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gray-800 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-gray-400 font-medium">Search for a domain name above</p>
          <p className="text-gray-600 text-sm mt-1">We&apos;ll check availability across all {TLDS.length} TLDs instantly</p>
        </div>
      )}
    </div>
  );
}
