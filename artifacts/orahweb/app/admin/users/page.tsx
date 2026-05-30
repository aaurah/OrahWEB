"use client";

import { useState, useEffect } from "react";

type UserRole = "admin" | "user" | "banned";

type DbUser = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  verified: boolean;
  joined: string;
  last_login: string | null;
};

const ROLE_STYLE: Record<UserRole, string> = {
  admin: "bg-blue-900/40 text-blue-300",
  user: "bg-gray-800 text-gray-300",
  banned: "bg-red-900/40 text-red-400",
};

function formatLastLogin(raw: string | null): string {
  if (!raw) return "Never";
  const d = new Date(raw);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<DbUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | UserRole>("all");

  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((data) => {
        setUsers(data.users ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = users.filter((u) => {
    const matchSearch =
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const totalUsers = users.length;
  const verifiedCount = users.filter((u) => u.verified).length;
  const bannedCount = users.filter((u) => u.role === "banned").length;

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-gray-400 text-sm mt-1">
            {loading ? "Loading…" : `${totalUsers} registered account${totalUsers !== 1 ? "s" : ""}`}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-800 px-3 py-2 rounded-lg">
          <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="3" />
          </svg>
          Live · PostgreSQL
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Users", value: totalUsers },
          { label: "Verified", value: verifiedCount },
          { label: "Banned", value: bannedCount },
        ].map(({ label, value }) => (
          <div key={label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 text-center">
            <p className="text-3xl font-bold text-white">{loading ? "—" : value}</p>
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
            placeholder="Search by name or email…"
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
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-500 text-sm">
            <svg className="animate-spin w-5 h-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Loading users from database…
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-sm">
            {search || roleFilter !== "all" ? "No users match your filter." : "No users yet."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-800/50 border-b border-gray-800">
                  {["User", "Role", "Joined", "Last Login", "Status", "Actions"].map((h) => (
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
                          {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
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
                    <td className="px-5 py-4 text-gray-400 whitespace-nowrap">{u.joined}</td>
                    <td className="px-5 py-4 text-gray-400 whitespace-nowrap">{formatLastLogin(u.last_login)}</td>
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
                        <button className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors">View</button>
                        {u.role !== "banned" ? (
                          <button className="text-xs text-red-500 hover:text-red-400 font-medium transition-colors">Ban</button>
                        ) : (
                          <button className="text-xs text-emerald-500 hover:text-emerald-400 font-medium transition-colors">Unban</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
