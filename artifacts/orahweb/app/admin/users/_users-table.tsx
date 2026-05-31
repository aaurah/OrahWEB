"use client";

import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/Card";
import type { ManagedUser } from "@/lib/user-store";

type Filter = "all" | "admin" | "user" | "banned";

const FILTER_LABELS: Record<Filter, string> = {
  all: "All",
  admin: "Admin",
  user: "User",
  banned: "Banned",
};

function Avatar({ user }: { user: ManagedUser }) {
  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 ${
        user.banned
          ? "bg-gradient-to-br from-gray-400 to-gray-500"
          : user.role === "admin"
          ? "bg-gradient-to-br from-violet-500 to-blue-600"
          : "bg-gradient-to-br from-blue-400 to-blue-500"
      }`}
    >
      {user.name[0]}
    </div>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function UsersTable({
  initialUsers,
  currentUserId,
}: {
  initialUsers: ManagedUser[];
  currentUserId: string;
}) {
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [pending, setPending] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const stats = useMemo(
    () =>
      users.reduce(
        (acc, u) => {
          acc.total++;
          if (u.role === "admin") acc.admins++;
          if (u.banned) acc.banned++;
          return acc;
        },
        { total: 0, admins: 0, banned: 0 }
      ),
    [users]
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return users.filter((u) => {
      const matchesQuery =
        !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      const matchesFilter =
        filter === "all" ||
        (filter === "banned" ? u.banned : !u.banned && u.role === filter);
      return matchesQuery && matchesFilter;
    });
  }, [users, query, filter]);

  const filterCounts: Record<Filter, number> = {
    all: users.length,
    admin: users.filter((u) => u.role === "admin" && !u.banned).length,
    user: users.filter((u) => u.role === "user" && !u.banned).length,
    banned: users.filter((u) => u.banned).length,
  };

  async function handleAction(
    userId: string,
    patch: { role?: "admin" | "user"; banned?: boolean }
  ) {
    setPending(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Update failed");
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, ...patch } : u)));
      const actionLabel =
        patch.banned === true
          ? "User banned"
          : patch.banned === false
          ? "User unbanned"
          : patch.role === "admin"
          ? "Promoted to admin"
          : "Demoted to user";
      setToast({ msg: actionLabel, ok: true });
    } catch (err) {
      setToast({ msg: err instanceof Error ? err.message : "Update failed", ok: false });
    } finally {
      setPending(null);
    }
  }

  return (
    <>
      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium border flex items-center gap-2.5 ${
            toast.ok
              ? "bg-green-50 text-green-800 border-green-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          {toast.ok ? (
            <svg className="w-4 h-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          {toast.msg}
        </div>
      )}

      <div className="space-y-6 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-sm text-gray-500 mt-1">
              {stats.total} registered {stats.total === 1 ? "account" : "accounts"}
            </p>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-700 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Demo mode
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card padding="md">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Total Users</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </Card>
          <Card padding="md">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Admins</p>
            <p className="text-3xl font-bold text-violet-700">{stats.admins}</p>
          </Card>
          <Card padding="md">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Banned</p>
            <p className={`text-3xl font-bold ${stats.banned > 0 ? "text-red-600" : "text-gray-400"}`}>
              {stats.banned}
            </p>
          </Card>
        </div>

        {/* Search + Filters */}
        <div className="space-y-3">
          <div className="relative">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex gap-1.5 flex-wrap">
            {(Object.keys(FILTER_LABELS) as Filter[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  filter === f
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-700"
                }`}
              >
                {FILTER_LABELS[f]}
                <span
                  className={`ml-1.5 text-xs ${
                    filter === f ? "text-blue-200" : "text-gray-400"
                  }`}
                >
                  {filterCounts[f]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <Card padding="md">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <svg className="w-10 h-10 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              <p className="text-sm">No users match your search</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3 pr-4">
                      User
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3 pr-4 hidden sm:table-cell">
                      Role
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3 pr-4 hidden sm:table-cell">
                      Status
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3 pr-4 hidden lg:table-cell">
                      Joined
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3 hidden lg:table-cell">
                      Last Login
                    </th>
                    <th className="text-right text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((user) => {
                    const isSelf = user.id === currentUserId;
                    const isLoading = pending === user.id;
                    return (
                      <tr key={user.id} className={isSelf ? "bg-blue-50/40" : ""}>
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-3">
                            <Avatar user={user} />
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                {isSelf && (
                                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                                    You
                                  </span>
                                )}
                                {user.banned && (
                                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-red-100 text-red-600">
                                    Banned
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-400">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 pr-4 hidden sm:table-cell">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                              user.role === "admin"
                                ? "bg-violet-50 text-violet-700 border-violet-200"
                                : "bg-gray-100 text-gray-600 border-gray-200"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 pr-4 hidden sm:table-cell">
                          {user.banned ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                              banned
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                              active
                            </span>
                          )}
                        </td>
                        <td className="py-4 pr-4 hidden lg:table-cell">
                          <p className="text-sm text-gray-500">{formatDate(user.createdAt)}</p>
                        </td>
                        <td className="py-4 pr-4 hidden lg:table-cell">
                          <p className="text-sm text-gray-500">
                            {user.lastLoginAt ? formatRelative(user.lastLoginAt) : "—"}
                          </p>
                        </td>
                        <td className="py-4 text-right">
                          {isSelf ? (
                            <span className="text-xs text-gray-400 italic">—</span>
                          ) : (
                            <div className="flex items-center justify-end gap-2 flex-wrap">
                              {/* Role toggle */}
                              <button
                                type="button"
                                disabled={isLoading}
                                onClick={() =>
                                  handleAction(user.id, {
                                    role: user.role === "admin" ? "user" : "admin",
                                  })
                                }
                                className="text-xs font-medium px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50 transition-colors disabled:opacity-50"
                              >
                                {isLoading
                                  ? "…"
                                  : user.role === "admin"
                                  ? "Demote"
                                  : "Make Admin"}
                              </button>
                              {/* Ban toggle */}
                              <button
                                type="button"
                                disabled={isLoading}
                                onClick={() =>
                                  handleAction(user.id, { banned: !user.banned })
                                }
                                className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-colors disabled:opacity-50 ${
                                  user.banned
                                    ? "border-green-200 text-green-700 hover:bg-green-50"
                                    : "border-red-200 text-red-600 hover:bg-red-50"
                                }`}
                              >
                                {isLoading ? "…" : user.banned ? "Unban" : "Ban"}
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-blue-900 mb-1">
            Connect a real database
          </h3>
          <p className="text-sm text-blue-700 leading-relaxed">
            A <code className="font-mono text-xs bg-blue-100 px-1 py-0.5 rounded">users</code> table is defined in the shared schema. Set{" "}
            <code className="font-mono text-xs bg-blue-100 px-1 py-0.5 rounded">DATABASE_URL</code>{" "}
            and run{" "}
            <code className="font-mono text-xs bg-blue-100 px-1 py-0.5 rounded">pnpm --filter @workspace/db run push</code>{" "}
            to migrate.
          </p>
        </div>
      </div>
    </>
  );
}
