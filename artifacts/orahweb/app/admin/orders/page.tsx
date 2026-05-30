"use client";

import { useState } from "react";

type OrderStatus = "completed" | "pending" | "refunded" | "failed";

const ORDERS: {
  id: string; domain: string; user: string; email: string;
  amount: number; method: string; status: OrderStatus; date: string; chain: string;
}[] = [
  { id: "ORD-8821", domain: "satoshi.crypto", user: "Alex Chen", email: "alex@crypto.io", amount: 19.99, method: "Card", status: "completed", date: "May 30, 2025", chain: "Ethereum" },
  { id: "ORD-8820", domain: "moonbird.nft", user: "Sara Kim", email: "sara@nft.art", amount: 14.99, method: "ETH", status: "completed", date: "May 30, 2025", chain: "Polygon" },
  { id: "ORD-8819", domain: "newdomain.x", user: "Tom Wu", email: "tom@web.io", amount: 29.99, method: "Card", status: "pending", date: "May 29, 2025", chain: "Ethereum" },
  { id: "ORD-8818", domain: "defiking.web3", user: "Raj Patel", email: "raj@defi.xyz", amount: 9.99, method: "USDC", status: "completed", date: "May 29, 2025", chain: "Polygon" },
  { id: "ORD-8817", domain: "badsite.wallet", user: "Bad Actor", email: "spam@temp.cc", amount: 12.99, method: "Card", status: "refunded", date: "May 28, 2025", chain: "Polygon" },
  { id: "ORD-8816", domain: "openstore.com", user: "Mike Jordan", email: "mike@store.com", amount: 4.99, method: "Card", status: "completed", date: "May 28, 2025", chain: "DNS" },
  { id: "ORD-8815", domain: "protocol.wallet", user: "Dev Team", email: "dev@protocol.io", amount: 12.99, method: "ETH", status: "completed", date: "May 27, 2025", chain: "Polygon" },
  { id: "ORD-8814", domain: "glitch.nft", user: "Chloe Ng", email: "chloe@nft.co", amount: 14.99, method: "Card", status: "failed", date: "May 27, 2025", chain: "Polygon" },
  { id: "ORD-8813", domain: "big.dao", user: "Vitalik B.", email: "v@ethereum.org", amount: 24.99, method: "ETH", status: "completed", date: "May 26, 2025", chain: "Ethereum" },
  { id: "ORD-8812", domain: "dev.app", user: "Dev Team", email: "dev@protocol.io", amount: 6.99, method: "Card", status: "completed", date: "May 26, 2025", chain: "DNS" },
];

const STATUS_STYLE: Record<OrderStatus, string> = {
  completed: "bg-emerald-900/40 text-emerald-400",
  pending: "bg-amber-900/40 text-amber-400",
  refunded: "bg-blue-900/40 text-blue-400",
  failed: "bg-red-900/40 text-red-400",
};

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");

  const filtered = ORDERS.filter((o) => {
    const matchSearch =
      !search ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.domain.includes(search.toLowerCase()) ||
      o.user.toLowerCase().includes(search.toLowerCase());
    return matchSearch && (statusFilter === "all" || o.status === statusFilter);
  });

  const totalRevenue = ORDERS.filter((o) => o.status === "completed").reduce((s, o) => s + o.amount, 0);
  const totalRefunds = ORDERS.filter((o) => o.status === "refunded").reduce((s, o) => s + o.amount, 0);

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Orders & Transactions</h1>
        <p className="text-gray-400 text-sm mt-1">All domain purchase transactions</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: `$${totalRevenue.toFixed(2)}`, color: "text-emerald-400" },
          { label: "Total Orders", value: ORDERS.length.toString(), color: "text-white" },
          { label: "Refunds", value: `$${totalRefunds.toFixed(2)}`, color: "text-blue-400" },
          { label: "Failed", value: ORDERS.filter((o) => o.status === "failed").length.toString(), color: "text-red-400" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order ID, domain, or customer..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["all", "completed", "pending", "refunded", "failed"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all capitalize ${statusFilter === s ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}
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
                {["Order ID", "Domain", "Customer", "Amount", "Payment", "Chain", "Date", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map((o) => (
                <tr key={o.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-5 py-4 font-mono text-blue-400 text-xs">{o.id}</td>
                  <td className="px-5 py-4 font-semibold text-white">{o.domain}</td>
                  <td className="px-5 py-4">
                    <p className="text-gray-200">{o.user}</p>
                    <p className="text-xs text-gray-500">{o.email}</p>
                  </td>
                  <td className="px-5 py-4 font-bold text-white">${o.amount.toFixed(2)}</td>
                  <td className="px-5 py-4">
                    <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">{o.method}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">{o.chain}</span>
                  </td>
                  <td className="px-5 py-4 text-gray-400 whitespace-nowrap">{o.date}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLE[o.status]}`}>
                      {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-3">
                      <button className="text-xs text-blue-400 hover:text-blue-300 font-medium">View</button>
                      {o.status === "completed" && (
                        <button className="text-xs text-amber-400 hover:text-amber-300 font-medium">Refund</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-gray-800 flex items-center justify-between">
          <p className="text-xs text-gray-500">Showing {filtered.length} of {ORDERS.length} orders</p>
          <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium">
            Export CSV →
          </button>
        </div>
      </div>
    </div>
  );
}
