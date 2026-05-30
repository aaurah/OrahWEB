"use client";

import {
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const MONTHLY = [
  { month: "Dec", revenue: 198400, registrations: 62100, users: 8200 },
  { month: "Jan", revenue: 212800, registrations: 68400, users: 9800 },
  { month: "Feb", revenue: 221300, registrations: 71200, users: 10200 },
  { month: "Mar", revenue: 248900, registrations: 79800, users: 12400 },
  { month: "Apr", revenue: 261400, registrations: 83600, users: 13100 },
  { month: "May", revenue: 284310, registrations: 91204, users: 14800 },
];

const CHAIN_DATA = [
  { name: "Ethereum", value: 42, color: "#6366f1" },
  { name: "Polygon", value: 38, color: "#8b5cf6" },
  { name: "DNS (Traditional)", value: 18, color: "#0ea5e9" },
  { name: "Solana", value: 2, color: "#10b981" },
];

const PAYMENT_DATA = [
  { name: "Credit/Debit Card", value: 61, color: "#6366f1" },
  { name: "ETH", value: 18, color: "#f59e0b" },
  { name: "USDC", value: 13, color: "#10b981" },
  { name: "Other Crypto", value: 8, color: "#8b5cf6" },
];

const HOURLY = [
  { hour: "00", searches: 820, conversions: 31 },
  { hour: "03", searches: 440, conversions: 12 },
  { hour: "06", searches: 680, conversions: 24 },
  { hour: "09", searches: 1820, conversions: 72 },
  { hour: "12", searches: 2410, conversions: 104 },
  { hour: "15", searches: 2890, conversions: 128 },
  { hour: "18", searches: 3210, conversions: 148 },
  { hour: "21", searches: 2140, conversions: 91 },
];

const tooltipStyle = {
  backgroundColor: "#111827",
  border: "1px solid #1f2937",
  borderRadius: "12px",
  color: "#f9fafb",
  fontSize: "12px",
};

function PieLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }: {
  cx: number; cy: number; midAngle: number;
  innerRadius: number; outerRadius: number; percent: number;
}) {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export function AdminAnalyticsCharts() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-white mb-6">Monthly Revenue & Registrations (6-Month Trend)</h2>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={MONTHLY} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="revAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="regAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis yAxisId="rev" tick={{ fill: "#6b7280", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <YAxis yAxisId="reg" orientation="right" tick={{ fill: "#6b7280", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: "11px", color: "#9ca3af" }} />
              <Area yAxisId="rev" type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#6366f1" strokeWidth={2.5} fill="url(#revAreaGrad)" dot={{ fill: "#6366f1", r: 4 }} />
              <Area yAxisId="reg" type="monotone" dataKey="registrations" name="Registrations" stroke="#10b981" strokeWidth={2.5} fill="url(#regAreaGrad)" dot={{ fill: "#10b981", r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-white mb-6">Registrations by Chain</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={CHAIN_DATA} cx="50%" cy="50%" outerRadius={80} dataKey="value" labelLine={false} label={PieLabel}>
                {CHAIN_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, ""]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-2">
            {CHAIN_DATA.map(({ name, value, color }) => (
              <div key={name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-gray-400">{name}</span>
                </div>
                <span className="font-semibold text-gray-200">{value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-white mb-6">Searches vs Conversions (by Hour of Day)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={HOURLY} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="hour" tick={{ fill: "#6b7280", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}:00`} />
              <YAxis yAxisId="s" tick={{ fill: "#6b7280", fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis yAxisId="c" orientation="right" tick={{ fill: "#6b7280", fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: "11px", color: "#9ca3af" }} />
              <Line yAxisId="s" type="monotone" dataKey="searches" name="Searches" stroke="#6366f1" strokeWidth={2} dot={false} />
              <Line yAxisId="c" type="monotone" dataKey="conversions" name="Conversions" stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="5 3" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-white mb-6">Payment Methods (% of orders)</h2>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={PAYMENT_DATA} cx="50%" cy="50%" innerRadius={40} outerRadius={75} dataKey="value" labelLine={false} label={PieLabel}>
                {PAYMENT_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, ""]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {PAYMENT_DATA.map(({ name, value, color }) => (
              <div key={name} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                <span className="text-gray-400 truncate">{name}</span>
                <span className="font-semibold text-gray-200 ml-auto">{value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
