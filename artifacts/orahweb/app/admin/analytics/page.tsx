import type { Metadata } from "next";
import { AdminAnalyticsCharts } from "@/components/admin/AdminAnalyticsCharts";

export const metadata: Metadata = {
  title: "Admin — Analytics",
  robots: { index: false, follow: false },
};

const TOP_TLDS = [
  { ext: ".crypto", count: 1204500, revenue: 24038, pct: 100 },
  { ext: ".web3", count: 892100, revenue: 8918, pct: 74 },
  { ext: ".com", count: 482000, revenue: 2406, pct: 40 },
  { ext: ".nft", count: 421000, revenue: 6311, pct: 35 },
  { ext: ".wallet", count: 382400, revenue: 4967, pct: 32 },
  { ext: ".dao", count: 214800, revenue: 5368, pct: 18 },
  { ext: ".io", count: 218400, revenue: 1745, pct: 18 },
  { ext: ".ai", count: 84200, revenue: 2103, pct: 7 },
];

const TOP_COUNTRIES = [
  { country: "United States", domains: 982000, pct: 100 },
  { country: "United Kingdom", domains: 412000, pct: 42 },
  { country: "Germany", domains: 341000, pct: 35 },
  { country: "Canada", domains: 289000, pct: 29 },
  { country: "India", domains: 241000, pct: 25 },
  { country: "Australia", domains: 198000, pct: 20 },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-gray-400 text-sm mt-1">Platform-wide metrics and trends</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "30-Day Revenue", value: "$284,310", change: "+8.7%" },
          { label: "30-Day Registrations", value: "91,204", change: "+12.4%" },
          { label: "Avg Revenue / User", value: "$0.44", change: "+3.1%" },
          { label: "Conversion Rate", value: "3.8%", change: "+0.4%" },
        ].map(({ label, value, change }) => (
          <div key={label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{label}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-emerald-400 font-semibold mt-1">{change} vs last month</p>
          </div>
        ))}
      </div>

      <AdminAnalyticsCharts />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-white mb-5">Top Extensions by Registrations</h2>
          <div className="space-y-3.5">
            {TOP_TLDS.map(({ ext, count, revenue, pct }) => (
              <div key={ext}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{ext}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>{count.toLocaleString()} domains</span>
                    <span className="text-emerald-400 font-semibold">${revenue.toLocaleString()}</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-white mb-5">Top Countries by Domain Count</h2>
          <div className="space-y-3.5">
            {TOP_COUNTRIES.map(({ country, domains, pct }, i) => (
              <div key={country}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-500 w-4">{i + 1}</span>
                    <span className="text-sm text-gray-200">{country}</span>
                  </div>
                  <span className="text-xs text-gray-400">{domains.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
