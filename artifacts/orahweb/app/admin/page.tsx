import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminOverviewCharts } from "@/components/admin/AdminOverviewCharts";

export const metadata: Metadata = {
  title: "Admin — Overview",
  robots: { index: false, follow: false },
};

const KPI = [
  { label: "Total Domains", value: "4,218,490", delta: "+12.4%", up: true, sub: "vs last month" },
  { label: "Revenue (MTD)", value: "$284,310", delta: "+8.7%", up: true, sub: "vs last month" },
  { label: "Active Users", value: "651,204", delta: "+5.2%", up: true, sub: "vs last month" },
  { label: "Avg. Order Value", value: "$14.30", delta: "-1.1%", up: false, sub: "vs last month" },
  { label: "New Today", value: "3,842", delta: "+22%", up: true, sub: "registrations" },
  { label: "Pending Transfers", value: "127", delta: "-3", up: true, sub: "vs yesterday" },
  { label: "Open Tickets", value: "38", delta: "+5", up: false, sub: "awaiting reply" },
  { label: "Churn Rate", value: "0.8%", delta: "-0.2%", up: true, sub: "30-day rolling" },
];

const RECENT_DOMAINS = [
  { domain: "vitalik.crypto", user: "vitalik@eth.com", price: 19.99, chain: "Ethereum", time: "2 min ago" },
  { domain: "solana.dao", user: "admin@solana.com", price: 24.99, chain: "Ethereum", time: "5 min ago" },
  { domain: "moonbird.nft", user: "collector@nft.io", price: 14.99, chain: "Polygon", time: "8 min ago" },
  { domain: "defiking.web3", user: "degen@defi.xyz", price: 9.99, chain: "Polygon", time: "12 min ago" },
  { domain: "openstore.com", user: "store@gmail.com", price: 4.99, chain: "DNS", time: "15 min ago" },
  { domain: "protocol.wallet", user: "dev@protocol.io", price: 12.99, chain: "Polygon", time: "20 min ago" },
];

const SYSTEM_STATUS = [
  { service: "Domain Resolution API", status: "operational", uptime: "99.98%" },
  { service: "Ethereum RPC Node", status: "operational", uptime: "99.95%" },
  { service: "Polygon RPC Node", status: "operational", uptime: "99.99%" },
  { service: "IPFS Gateway", status: "degraded", uptime: "97.12%" },
  { service: "Payment Gateway", status: "operational", uptime: "100%" },
  { service: "Auth / Session Service", status: "operational", uptime: "99.99%" },
];

export default async function AdminOverviewPage() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string })?.role !== "admin") {
    redirect("/login?error=AccessDenied");
  }

  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Admin Overview</h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Welcome back, {session.user?.name}. Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-800 px-2.5 py-1.5 rounded-lg shrink-0">
          <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="3" />
          </svg>
          <span className="hidden sm:inline">Live · </span>Updated now
        </div>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {KPI.map(({ label, value, delta, up, sub }) => (
          <div key={label} className="bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-5">
            <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">{label}</p>
            <p className="text-lg sm:text-2xl font-bold text-white">{value}</p>
            <div className="mt-1.5 sm:mt-2 flex items-center gap-1.5 flex-wrap">
              <span className={`text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded ${up ? "bg-emerald-900/50 text-emerald-400" : "bg-red-900/30 text-red-400"}`}>
                {up ? "▲" : "▼"} {delta}
              </span>
              <span className="text-[10px] sm:text-xs text-gray-500 hidden sm:inline">{sub}</span>
            </div>
          </div>
        ))}
      </div>

      <AdminOverviewCharts />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-800 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Recent Registrations</h2>
            <a href="/admin/domains" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">View all →</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[420px]">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Domain</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">User</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Chain</th>
                  <th className="px-4 sm:px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {RECENT_DOMAINS.map((d) => (
                  <tr key={d.domain} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 sm:px-6 py-3.5">
                      <p className="text-sm font-semibold text-white">{d.domain}</p>
                      <p className="text-xs text-gray-500 sm:hidden mt-0.5">{d.user}</p>
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 hidden sm:table-cell">
                      <p className="text-xs text-gray-500">{d.user}</p>
                      <p className="text-xs text-gray-600">{d.time}</p>
                    </td>
                    <td className="px-4 sm:px-6 py-3.5">
                      <span className="text-xs font-medium text-gray-400 bg-gray-800 px-2 py-0.5 rounded">{d.chain}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 text-right">
                      <p className="text-sm font-bold text-white">${d.price}</p>
                      <p className="text-xs text-gray-600 hidden sm:block">{d.time}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-800">
            <h2 className="text-sm font-semibold text-white">System Status</h2>
          </div>
          <div className="divide-y divide-gray-800">
            {SYSTEM_STATUS.map(({ service, status, uptime }) => (
              <div key={service} className="px-4 sm:px-6 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${status === "operational" ? "bg-emerald-400" : status === "degraded" ? "bg-amber-400" : "bg-red-500"}`} />
                  <p className="text-xs text-gray-300 truncate">{service}</p>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <p className="text-xs font-mono text-gray-400">{uptime}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 sm:px-6 py-3 border-t border-gray-800">
            <p className="text-xs text-gray-500">1 service experiencing degraded performance</p>
          </div>
        </div>
      </div>
    </div>
  );
}
