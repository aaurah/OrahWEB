"use client";

import { useState } from "react";

type UserRole = "admin" | "user" | "banned";

const MOCK_USERS: {
  id: string; name: string; email: string; role: UserRole;
  domains: number; spent: number; joined: string; lastLogin: string; verified: boolean;
}[] = [
  { id: "1", name: "Admin User", email: "admin@orahweb.com", role: "admin", domains: 12, spent: 489.50, joined: "Jan 1, 2024", lastLogin: "Today", verified: true },
  { id: "2", name: "Jane Doe", email: "jane@orahweb.com", role: "user", domains: 5, spent: 124.90, joined: "Feb 14, 2024", lastLogin: "2 days ago", verified: true },
  { id: "3", name: "Alex Chen", email: "alex@crypto.io", role: "user", domains: 28, spent: 1204.20, joined: "Mar 8, 2023", lastLogin: "Yesterday", verified: true },
  { id: "4", name: "Sara Kim", email: "sara@nft.art", role: "user", domains: 9, spent: 224.85, joined: "Apr 22, 2024", lastLogin: "3 days ago", verified: true },
  { id: "5", name: "Bad Actor", email: "spam@temp.cc", role: "banned", domains: 0, spent: 12.99, joined: "May 1, 2025", lastLogin: "May 3, 2025", verified: false },
  { id: "6", name: "Raj Patel", email: "raj@defi.xyz", role: "user", domains: 7, spent: 174.93, joined: "Jan 30, 2024", lastLogin: "1 week ago", verified: true },
  { id: "7", name: "Chloe Ng", email: "chloe@nft.co", role: "user", domains: 3, spent: 59.97, joined: "Dec 15, 2023", lastLogin: "Today", verified: true },
  { id: "8", name: "Tom Wu", email: "tom@web.io", role: "user", domains: 1, spent: 29.99, joined: "May 28, 2025", lastLogin: "Today", verified: false },
  { id: "9", name: "Lisa Monroe", email: "lisa@old.net", role: "user", domains: 2, spent: 15.98, joined: "Jun 10, 2021", lastLogin: "6 months ago", verified: true },
  { id: "10", name: "Dev Team", email: "dev@protocol.io", role: "user", domains: 15, spent: 642.85, joined: "Nov 1, 2023", lastLogin: "Yesterday", verified: true },
];

const ROLE_STYLE: Record<UserRole, string> = {
  admin: "bg-blue-900/40 text-blue-300",
  user: "bg-gray-800 text-gray-300",
  banned: "bg-red-900/40 text-red-400",
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | UserRole>("all");

  const filtered = MOCK_USERS.filter((u) => {
    const matchSearch =
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const totalSpend = MOCK_USERS.reduce((sum, u) => sum + u.spent, 0);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-gray-400 text-sm mt-1">
            {MOCK_USERS.length} registered accounts · ${totalSpend.toLocaleString("en-US", { minimumFractionDigits: 2 })} total revenue
          </p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
          + Invite User
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Users", value: MOCK_USERS.length },
          { label: "Verified", value: MOCK_USERS.filter((u) => u.verified).length },
          { label: "Banned", value: MOCK_USERS.filter((u) => u.role === "banned").length },
        ].map(({ label, value }) => (
          <div key={label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 text-center">
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">{label}</p>
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
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "admin", "user", "banned"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all capitalize ${roleFilter === r ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-800/50 border-b border-gray-800">
                {["User", "Role", "Domains", "Total Spent", "Joined", "Last Login", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium text-white">{u.name}</p>
                        <p className="text-xs text-gray-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ROLE_STYLE[u.role]}`}>
                      {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-300 font-medium">{u.domains}</td>
                  <td className="px-5 py-4 text-gray-300 font-semibold">${u.spent.toFixed(2)}</td>
                  <td className="px-5 py-4 text-gray-400 whitespace-nowrap">{u.joined}</td>
                  <td className="px-5 py-4 text-gray-400 whitespace-nowrap">{u.lastLogin}</td>
                  <td className="px-5 py-4">
                    {u.verified ? (
                      <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </span>
                    ) : (
                      <span className="text-xs text-amber-400 font-medium">Unverified</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-3">
                      <button className="text-xs text-blue-400 hover:text-blue-300 font-medium">View</button>
                      {u.role !== "banned" ? (
                        <button className="text-xs text-red-500 hover:text-red-400 font-medium">Ban</button>
                      ) : (
                        <button className="text-xs text-emerald-500 hover:text-emerald-400 font-medium">Unban</button>
                      )}
                      <button className="text-xs text-gray-500 hover:text-white font-medium">Edit Role</button>
                    </div>
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
