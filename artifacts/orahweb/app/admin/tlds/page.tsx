"use client";

import { useState } from "react";

type TldStatus = "active" | "paused" | "hidden";

const INITIAL_TLDS: {
  id: string; ext: string; category: "web3" | "traditional";
  price: number; chain: string; registrations: number; status: TldStatus; premium: boolean;
}[] = [
  { id: "1", ext: ".crypto", category: "web3", price: 19.99, chain: "Ethereum", registrations: 1204500, status: "active", premium: true },
  { id: "2", ext: ".web3", category: "web3", price: 9.99, chain: "Polygon", registrations: 892100, status: "active", premium: false },
  { id: "3", ext: ".nft", category: "web3", price: 14.99, chain: "Polygon", registrations: 421000, status: "active", premium: false },
  { id: "4", ext: ".wallet", category: "web3", price: 12.99, chain: "Polygon", registrations: 382400, status: "active", premium: false },
  { id: "5", ext: ".dao", category: "web3", price: 24.99, chain: "Ethereum", registrations: 214800, status: "active", premium: true },
  { id: "6", ext: ".defi", category: "web3", price: 19.99, chain: "Ethereum", registrations: 89200, status: "active", premium: false },
  { id: "7", ext: ".x", category: "web3", price: 29.99, chain: "Ethereum", registrations: 62300, status: "active", premium: true },
  { id: "8", ext: ".blockchain", category: "web3", price: 34.99, chain: "Ethereum", registrations: 28400, status: "paused", premium: true },
  { id: "9", ext: ".coin", category: "web3", price: 14.99, chain: "Polygon", registrations: 41200, status: "active", premium: false },
  { id: "10", ext: ".zil", category: "web3", price: 9.99, chain: "Polygon", registrations: 18300, status: "active", premium: false },
  { id: "11", ext: ".com", category: "traditional", price: 4.99, chain: "DNS", registrations: 482000, status: "active", premium: false },
  { id: "12", ext: ".io", category: "traditional", price: 7.99, chain: "DNS", registrations: 218400, status: "active", premium: false },
  { id: "13", ext: ".ai", category: "traditional", price: 24.99, chain: "DNS", registrations: 84200, status: "active", premium: true },
  { id: "14", ext: ".app", category: "traditional", price: 6.99, chain: "DNS", registrations: 142800, status: "active", premium: false },
  { id: "15", ext: ".xyz", category: "traditional", price: 3.99, chain: "DNS", registrations: 98400, status: "active", premium: false },
  { id: "16", ext: ".new", category: "traditional", price: 14.99, chain: "DNS", registrations: 0, status: "hidden", premium: false },
];

const STATUS_STYLE: Record<TldStatus, string> = {
  active: "bg-emerald-900/40 text-emerald-400",
  paused: "bg-amber-900/40 text-amber-400",
  hidden: "bg-gray-700/50 text-gray-400",
};

export default function AdminTldsPage() {
  const [tlds, setTlds] = useState(INITIAL_TLDS);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [showAdd, setShowAdd] = useState(false);
  const [newTld, setNewTld] = useState({ ext: "", category: "web3" as "web3" | "traditional", price: "", chain: "Polygon" });

  const filtered = tlds.filter((t) =>
    !search || t.ext.includes(search.toLowerCase())
  );

  const cycleStatus = (id: string) => {
    setTlds((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const next: TldStatus = t.status === "active" ? "paused" : t.status === "paused" ? "hidden" : "active";
        return { ...t, status: next };
      })
    );
  };

  const savePrice = (id: string) => {
    setTlds((prev) => prev.map((t) => (t.id === id ? { ...t, price: editPrice } : t)));
    setEditingId(null);
  };

  const addTld = () => {
    if (!newTld.ext || !newTld.price) return;
    setTlds((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        ext: newTld.ext.startsWith(".") ? newTld.ext : "." + newTld.ext,
        category: newTld.category,
        price: parseFloat(newTld.price),
        chain: newTld.chain,
        registrations: 0,
        status: "hidden",
        premium: false,
      },
    ]);
    setNewTld({ ext: "", category: "web3", price: "", chain: "Polygon" });
    setShowAdd(false);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">TLD Manager</h1>
          <p className="text-gray-400 text-sm mt-1">Configure extensions, pricing, and availability</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          + Add Extension
        </button>
      </div>

      {showAdd && (
        <div className="bg-gray-900 border border-blue-500/30 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">Add New TLD Extension</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-gray-400 font-medium mb-1.5 block">Extension</label>
              <input
                value={newTld.ext}
                onChange={(e) => setNewTld({ ...newTld, ext: e.target.value })}
                placeholder=".xyz"
                className="w-full px-3 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 font-medium mb-1.5 block">Category</label>
              <select
                value={newTld.category}
                onChange={(e) => setNewTld({ ...newTld, category: e.target.value as "web3" | "traditional" })}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="web3">Web3</option>
                <option value="traditional">Traditional</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 font-medium mb-1.5 block">Price ($)</label>
              <input
                type="number"
                value={newTld.price}
                onChange={(e) => setNewTld({ ...newTld, price: e.target.value })}
                placeholder="9.99"
                className="w-full px-3 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 font-medium mb-1.5 block">Chain / Network</label>
              <select
                value={newTld.chain}
                onChange={(e) => setNewTld({ ...newTld, chain: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Ethereum</option>
                <option>Polygon</option>
                <option>Solana</option>
                <option>DNS</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={addTld} className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
              Add (starts as Hidden)
            </button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 text-sm hover:bg-gray-700 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="relative max-w-sm">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter extensions..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-800/50 border-b border-gray-800">
                {["Extension", "Category", "Price", "Chain", "Registrations", "Premium", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-5 py-4 font-bold text-white">{t.ext}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${t.category === "web3" ? "bg-violet-900/40 text-violet-300" : "bg-gray-800 text-gray-400"}`}>
                      {t.category === "web3" ? "Web3" : "Traditional"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {editingId === t.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(parseFloat(e.target.value))}
                          className="w-24 px-2 py-1 rounded bg-gray-800 border border-blue-500 text-white text-xs focus:outline-none"
                        />
                        <button onClick={() => savePrice(t.id)} className="text-xs text-emerald-400 hover:text-emerald-300 font-medium">Save</button>
                        <button onClick={() => setEditingId(null)} className="text-xs text-gray-500 hover:text-white font-medium">✕</button>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setEditingId(t.id); setEditPrice(t.price); }}
                        className="font-semibold text-white hover:text-blue-400 transition-colors group flex items-center gap-1"
                      >
                        ${t.price}
                        <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">{t.chain}</span>
                  </td>
                  <td className="px-5 py-4 text-gray-300 font-medium">
                    {t.registrations > 0 ? t.registrations.toLocaleString() : <span className="text-gray-600">—</span>}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => setTlds((prev) => prev.map((x) => x.id === t.id ? { ...x, premium: !x.premium } : x))}
                      className={`text-xs font-medium transition-colors ${t.premium ? "text-amber-400 hover:text-amber-300" : "text-gray-600 hover:text-gray-400"}`}
                    >
                      {t.premium ? "★ Premium" : "☆ Standard"}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLE[t.status]}`}>
                      {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => cycleStatus(t.id)}
                      className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                      Toggle Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
