import type { Metadata } from "next";
import { Card } from "@/components/Card";

export const metadata: Metadata = { title: "Users" };

const DEMO_USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@orahweb.com",
    role: "admin",
    status: "active",
    lastLogin: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@orahweb.com",
    role: "user",
    status: "active",
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function AdminUsersPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-sm text-gray-500 mt-1">
            {DEMO_USERS.length} registered {DEMO_USERS.length === 1 ? "account" : "accounts"}
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
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3 pr-4">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3">
                  Last Login
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {DEMO_USERS.map((user) => (
                <tr key={user.id} className="group">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
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
                  <td className="py-4 pr-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <p className="text-sm text-gray-600">{formatDate(user.lastLogin)}</p>
                  </td>
                </tr>
              ))}
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
          and update <code className="font-mono text-xs bg-blue-100 px-1 py-0.5 rounded">lib/db/src/schema/index.ts</code>{" "}
          with a users table to enable full user management.
        </p>
      </div>
    </div>
  );
}
