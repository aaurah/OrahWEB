import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "My Domains — Dashboard",
  description: "Manage your OrahWeb domains, DNS settings, and crypto wallet addresses.",
  robots: { index: false, follow: false },
};

const MY_DOMAINS = [
  {
    name: "satoshi.crypto",
    type: "web3",
    chain: "Ethereum",
    status: "active",
    expires: "Never",
    wallets: 3,
    ipfs: true,
  },
  {
    name: "myproject.web3",
    type: "web3",
    chain: "Polygon",
    status: "active",
    expires: "Never",
    wallets: 1,
    ipfs: false,
  },
  {
    name: "coolbrand.dao",
    type: "web3",
    chain: "Ethereum",
    status: "active",
    expires: "Never",
    wallets: 2,
    ipfs: true,
  },
  {
    name: "mysite.com",
    type: "traditional",
    chain: "DNS",
    status: "active",
    expires: "Jun 15, 2026",
    wallets: 0,
    ipfs: false,
  },
  {
    name: "devtools.io",
    type: "traditional",
    chain: "DNS",
    status: "expiring",
    expires: "Jun 30, 2025",
    wallets: 0,
    ipfs: false,
  },
];

const QUICK_STATS = [
  { label: "Total Domains", value: "5" },
  { label: "Web3 Domains", value: "3" },
  { label: "Linked Wallets", value: "6" },
  { label: "IPFS Sites", value: "2" },
];

const WALLET_RECORDS = [
  { coin: "ETH", address: "0x742d...3b4f", domain: "satoshi.crypto" },
  { coin: "BTC", address: "bc1q...9mh2", domain: "satoshi.crypto" },
  { coin: "SOL", address: "7Xf9...kQ2n", domain: "satoshi.crypto" },
  { coin: "ETH", address: "0x9a3c...8e1d", domain: "myproject.web3" },
];

const ACTIVITY = [
  { action: "DNS record updated", domain: "mysite.com", time: "2 hours ago" },
  { action: "Wallet address linked (SOL)", domain: "satoshi.crypto", time: "1 day ago" },
  { action: "IPFS hash updated", domain: "coolbrand.dao", time: "3 days ago" },
  { action: "Domain transferred out", domain: "oldname.nft", time: "1 week ago" },
];

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/dashboard");
  }

  return (
    <>
      <div className="bg-gradient-to-br from-blue-950 via-indigo-900 to-violet-900 text-white px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-blue-300 text-sm font-medium mb-1">My Domains</p>
            <h1 className="text-3xl font-bold">{session.user?.name ?? "User"}</h1>
            <p className="text-blue-300 text-sm mt-1">{session.user?.email}</p>
          </div>
          <button className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-white text-blue-700 font-semibold text-sm hover:bg-blue-50 transition-colors shadow-sm">
            + Register Domain
          </button>
        </div>
      </div>

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_STATS.map(({ label, value }) => (
              <Card key={label} padding="md">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{label}</p>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
              </Card>
            ))}
          </div>

          {MY_DOMAINS.some((d) => d.status === "expiring") && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-amber-800">Domain expiring soon</p>
                <p className="text-sm text-amber-700 mt-0.5">
                  <strong>devtools.io</strong> expires on Jun 30, 2025. Renew now to avoid losing it.
                </p>
              </div>
              <button className="ml-auto shrink-0 px-4 py-1.5 rounded-lg bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition-colors">
                Renew
              </button>
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">My Domains</h2>
            <Card padding="sm" className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      {["Domain", "Type", "Network", "Wallets", "Expires", "Status", ""].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {MY_DOMAINS.map((d) => (
                      <tr key={d.name} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">{d.name}</span>
                            {d.ipfs && (
                              <span className="text-[10px] font-bold bg-violet-50 text-violet-600 px-1.5 py-0.5 rounded uppercase">
                                IPFS
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            d.type === "web3"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-gray-100 text-gray-600"
                          }`}>
                            {d.type === "web3" ? "Web3" : "Traditional"}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-gray-500">{d.chain}</td>
                        <td className="px-5 py-4">
                          {d.wallets > 0 ? (
                            <span className="font-medium text-gray-900">{d.wallets} linked</span>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <span className={d.expires === "Never" ? "text-emerald-600 font-medium" : d.status === "expiring" ? "text-amber-600 font-semibold" : "text-gray-500"}>
                            {d.expires}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                            d.status === "active"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}>
                            {d.status === "expiring" ? "Expiring soon" : "Active"}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Wallet Records</h2>
              <Card padding="sm" className="divide-y divide-gray-50">
                {WALLET_RECORDS.map((w, i) => (
                  <div key={i} className="flex items-center justify-between px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-violet-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                        {w.coin}
                      </div>
                      <div>
                        <p className="font-mono text-sm text-gray-900">{w.address}</p>
                        <p className="text-xs text-gray-400">{w.domain}</p>
                      </div>
                    </div>
                    <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                      Edit
                    </button>
                  </div>
                ))}
                <div className="px-5 py-3">
                  <button className="text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors">
                    + Add wallet record
                  </button>
                </div>
              </Card>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <Card padding="sm" className="divide-y divide-gray-50">
                {ACTIVITY.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 px-5 py-3.5">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{a.action}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {a.domain} · {a.time}
                      </p>
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
