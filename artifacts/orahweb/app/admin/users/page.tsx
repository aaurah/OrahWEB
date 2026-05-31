import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions, PUBLIC_USERS } from "@/lib/auth";
import { Card } from "@/components/Card";

export const metadata: Metadata = { title: "Users" };

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const LAST_LOGIN: Record<string, string> = {
  "1": new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  "2": new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
};

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);
  const currentUserId = session?.user.id;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-sm text-gray-500 mt-1">
            {PUBLIC_USERS.length} registered {PUBLIC_USERS.length === 1 ? "account" : "accounts"}
          </p>
        </div>
        <div className="px-4 py-2 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-700 font-medium">
          Demo mode — connect a database to manage users
        </div>
      </div>

      <Card padding="md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3 pr-4">
                  User
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3 pr-4">
                  Role
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3 pr-4 hidden sm:table-cell">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3 hidden md:table-cell">
                  Last Login
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {PUBLIC_USERS.map((user) => {
                const isCurrentUser = user.id === currentUserId;
                return (
                  <tr key={user.id} className={isCurrentUser ? "bg-blue-50/40" : "group"}>
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 ${
                            user.role === "admin"
                              ? "bg-gradient-to-br from-violet-500 to-blue-600"
                              : "bg-gradient-to-br from-blue-400 to-blue-500"
                          }`}
                        >
                          {user.name[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                            {isCurrentUser && (
                              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                                You
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
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
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        active
                      </span>
                    </td>
                    <td className="py-4 hidden md:table-cell">
                      <p className="text-sm text-gray-600">
                        {LAST_LOGIN[user.id] ? formatDate(LAST_LOGIN[user.id]) : "—"}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">
          Ready to manage real users?
        </h3>
        <p className="text-sm text-blue-700 leading-relaxed">
          Connect a PostgreSQL database via{" "}
          <code className="font-mono text-xs bg-blue-100 px-1 py-0.5 rounded">DATABASE_URL</code>{" "}
          and update{" "}
          <code className="font-mono text-xs bg-blue-100 px-1 py-0.5 rounded">lib/db/src/schema/index.ts</code>{" "}
          with a users table to enable full user management.
        </p>
      </div>
    </div>
  );
}
