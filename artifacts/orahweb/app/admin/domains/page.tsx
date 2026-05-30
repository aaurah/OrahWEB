"use client";

import { useState } from "react";

type Status = "active" | "expired" | "suspended" | "pending";

const MOCK_DOMAINS: {
  id: string; domain: string; owner: string; email: string; chain: string;
  status: Status; registered: string; expires: string; price: number; wallets: number;
}[] = [
  { id: "1", domain: "satoshi.crypto", owner: "Alex Chen", email: "alex@crypto.io", chain: "Ethereum", status: "active", registered: "Jan 12, 2024", expires: "Never", price: 19.99, wallets: 3 },
  { id: "2", domain: "moonbird.nft", owner: "Sara Kim", email: "sara@nft.art", chain: "Polygon", status: "active", registered: "Feb 3, 2024", expires: "Never", price: 14.99, wallets: 1 },
  { id: "3", domain: "vitalik.dao", owner: "Vitalik B.", email: "v@ethereum.org", chain: "Ethereum", status: "active", registered: "Mar 22, 2023", expires: "Never", price: 24.99, wallets: 5 },
  { id: "4", domain: "openstore.com", owner: "Mike Jordan", email: "mike@store.com", chain: "DNS", status: "active", registered: "Sep 1, 2023", expires: "Sep 1, 2025", price: 4.99, wallets: 0 },
  { id: "5", domain: "defiking.web3", owner: "Raj Patel", email: "raj@defi.xyz", chain: "Polygon", status: "active", registered: "Apr 15, 2024", expires: "Never", price: 9.99, wallets: 2 },
  { id: "6", domain: "badactor.wallet", owner: "Unknown", email: "anon@temp.com", chain: "Polygon", status: "suspended", registered: "May 1, 2024", expires: "Never", price: 12.99, wallets: 0 },
  { id: "7", domain: "oldsite.io", owner: "Lisa Monroe", email: "lisa@old.net", chain: "DNS", status: "expired", registered: "Jun 10, 2022", expires: "Jun 10, 2024", price: 7.99, wallets: 0 },
  { id: "8", domain: "newdomain.x", owner: "Tom Wu", email: "tom@web.io", chain: "Ethereum", status: "pending", registered: "May 29, 2025", expires: "Never", price: 29.99, wallets: 0 },
  { id: "9", domain: "protocol.wallet", owner: "Dev Team", email: "dev@protocol.io", chain: "Polygon", status: "active", registered: "Nov 8, 2023", expires: "Never", price: 12.99, wallets: 4 },
  { id: "10", domain: "mynft.crypto", owner: "Chloe Ng", email: "chloe@nft.co", chain: "Ethereum", status: "active", registered: "Dec 1, 2023", expires: "Never", price: 19.99, wallets: 1 },
];

const STATUS_COLORS: Record<Status, string> = {
  active: "bg-emerald-900/40 text-emerald-400",
  expired: "bg-gray-700/50 text-gray-400",
  suspended: "bg-red-900/40 text-red-400",
  pending: "bg-amber-900/40 text-amber-400",
};

export default function AdminDomainsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | Status>("all");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = MOCK_DOMAINS.filter((d) => {
    const matchSearch =
      !search ||
      d.domain.includes(search.toLowerCase()) ||
      d.owner.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || d.status === filter;
    return matchSearch && matchFilter;
  });

  const toggleSelect = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const toggleAll = () =>
    setSelected(selected.length === filtered.length ? [] : filtered.map((d) => d.id));

  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Domain Registry</h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">{MOCK_DOMAINS.length.toLocaleString()} total domains</p>
        </div>
        <div className="flex gap-3">
          {selected.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{selected.length} selected</span>
              <button className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-medium hover:bg-red-700 transition-colors">Suspend</button>
              <button className="px-3 py-1.5 rounded-lg bg-gray-700 text-white text-xs font-medium hover:bg-gray-600 transition-colors">Export</button>
            </div>
          )}
          <button className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
            + Register Domain
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by domain, owner, or email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "active", "suspended", "expired", "pending"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all capitalize ${filter === s ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-800/50 border-b border-gray-800">
                <th className="px-5 py-3.5 text-left w-10">
                  <input
                    type="checkbox"
                    checked={selected.length === filtered.length && filtered.length > 0}
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 accent-blue-600"
                  />
                </th>
                {["Domain", "Owner", "Chain", "Wallets", "Registered", "Expires", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map((d) => (
                <tr key={d.id} className={`hover:bg-gray-800/30 transition-colors ${selected.includes(d.id) ? "bg-blue-950/20" : ""}`}>
                  <td className="px-5 py-4">
                    <input
                      type="checkbox"
                      checked={selected.includes(d.id)}
                      onChange={() => toggleSelect(d.id)}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-700 accent-blue-600"
                    />
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-semibold text-white">{d.domain}</span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-gray-200 text-sm">{d.owner}</p>
                    <p className="text-gray-500 text-xs">{d.email}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">{d.chain}</span>
                  </td>
                  <td className="px-5 py-4 text-gray-400 text-center">{d.wallets || "—"}</td>
                  <td className="px-5 py-4 text-gray-400 whitespace-nowrap">{d.registered}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold ${d.expires === "Never" ? "text-emerald-400" : "text-gray-400"}`}>
                      {d.expires}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[d.status]}`}>
                      {d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium">Edit</button>
                      <button className="text-xs text-gray-500 hover:text-red-400 transition-colors font-medium">Suspend</button>
                      <button className="text-xs text-gray-500 hover:text-white transition-colors font-medium">Transfer</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-gray-800 flex items-center justify-between">
          <p className="text-xs text-gray-500">Showing {filtered.length} of {MOCK_DOMAINS.length} domains</p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg bg-gray-800 text-gray-400 text-xs hover:bg-gray-700 hover:text-white transition-colors">← Prev</button>
            <button className="px-3 py-1.5 rounded-lg bg-gray-800 text-gray-400 text-xs hover:bg-gray-700 hover:text-white transition-colors">Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
