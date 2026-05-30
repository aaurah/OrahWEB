"use client";

import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const DAILY_DATA = [
  { day: "May 20", registrations: 2841, revenue: 38210 },
  { day: "May 21", registrations: 3102, revenue: 41820 },
  { day: "May 22", registrations: 2788, revenue: 36940 },
  { day: "May 23", registrations: 3521, revenue: 47280 },
  { day: "May 24", registrations: 2204, revenue: 29610 },
  { day: "May 25", registrations: 1890, revenue: 25400 },
  { day: "May 26", registrations: 3940, revenue: 52970 },
  { day: "May 27", registrations: 4102, revenue: 55140 },
  { day: "May 28", registrations: 3780, revenue: 50840 },
  { day: "May 29", registrations: 4210, revenue: 56610 },
  { day: "May 30", registrations: 3842, revenue: 51680 },
];

const TLD_DATA = [
  { ext: ".crypto", value: 1204 },
  { ext: ".web3", value: 892 },
  { ext: ".com", value: 482 },
  { ext: ".nft", value: 421 },
  { ext: ".wallet", value: 382 },
  { ext: ".dao", value: 215 },
  { ext: ".io", value: 218 },
];

const tooltipStyle = {
  backgroundColor: "#111827",
  border: "1px solid #1f2937",
  borderRadius: "12px",
  color: "#f9fafb",
  fontSize: "12px",
};

export function AdminOverviewCharts() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold text-white">Registrations & Revenue (Last 11 Days)</h2>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={DAILY_DATA} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="regGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="day" tick={{ fill: "#6b7280", fontSize: 10 }} tickLine={false} axisLine={false} />
            <YAxis yAxisId="left" tick={{ fill: "#6b7280", fontSize: 10 }} tickLine={false} axisLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: "#6b7280", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: "11px", color: "#9ca3af" }} />
            <Area yAxisId="left" type="monotone" dataKey="registrations" name="Registrations" stroke="#6366f1" strokeWidth={2} fill="url(#regGrad)" dot={false} />
            <Area yAxisId="right" type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#10b981" strokeWidth={2} fill="url(#revGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold text-white">Registrations by TLD (thousands)</h2>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={TLD_DATA} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis dataKey="ext" tick={{ fill: "#6b7280", fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}k`, "Registrations"]} />
            <Bar dataKey="value" name="Registrations (k)" radius={[6, 6, 0, 0]}
              fill="url(#barGrad)"
            >
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
