import type { Metadata } from "next";
import { getSubmissions, getSubmissionStats } from "@/lib/contact-store";
import { Card } from "@/components/Card";

export const metadata: Metadata = { title: "Overview" };

function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

const STATUS_STYLES = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  read: "bg-gray-100 text-gray-600 border-gray-200",
  replied: "bg-green-50 text-green-700 border-green-200",
};

export default async function AdminOverviewPage() {
  const stats = getSubmissionStats();
  const recentContacts = getSubmissions().slice(0, 5);

  const STAT_CARDS = [
    {
      label: "Total Inquiries",
      value: stats.total,
      sub: "All time",
      color: "text-gray-900",
      badge: null,
    },
    {
      label: "New",
      value: stats.new,
      sub: "Awaiting review",
      color: "text-blue-700",
      badge: stats.new > 0 ? "action needed" : null,
    },
    {
      label: "Read",
      value: stats.read,
      sub: "In progress",
      color: "text-gray-700",
      badge: null,
    },
    {
      label: "Replied",
      value: stats.replied,
      sub: "Closed",
      color: "text-green-700",
      badge: null,
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
        <p className="text-sm text-gray-500 mt-1">
          Site activity and contact pipeline at a glance.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ label, value, sub, color, badge }) => (
          <Card key={label} padding="md">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              {label}
            </p>
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <p className="text-xs text-gray-400">{sub}</p>
              {badge && (
                <span className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  {badge}
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Recent Contacts</h2>
            <a
              href="/admin/contacts"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View all →
            </a>
          </div>
          <div className="space-y-3">
            {recentContacts.length === 0 ? (
              <Card padding="md">
                <p className="text-sm text-gray-400 text-center py-4">
                  No contact submissions yet.
                </p>
              </Card>
            ) : (
              recentContacts.map((contact) => (
                <Card key={contact.id} padding="md" hover>
                  <a href={`/admin/contacts?id=${contact.id}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-gray-900">
                            {contact.name}
                          </p>
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                              STATUS_STYLES[contact.status]
                            }`}
                          >
                            {contact.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{contact.subject}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{contact.email}</p>
                      </div>
                      <span className="text-xs text-gray-400 shrink-0 mt-0.5">
                        {formatRelativeTime(contact.createdAt)}
                      </span>
                    </div>
                  </a>
                </Card>
              ))
            )}
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a href="/admin/contacts">
              <Card padding="md" hover>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Review Contacts</p>
                    <p className="text-xs text-gray-400">
                      {stats.new} new {stats.new === 1 ? "message" : "messages"}
                    </p>
                  </div>
                </div>
              </Card>
            </a>
            <a href="/admin/users">
              <Card padding="md" hover>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Manage Users</p>
                    <p className="text-xs text-gray-400">View accounts &amp; roles</p>
                  </div>
                </div>
              </Card>
            </a>
            <a href="/admin/settings">
              <Card padding="md" hover>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Settings</p>
                    <p className="text-xs text-gray-400">Site configuration</p>
                  </div>
                </div>
              </Card>
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Card padding="md" hover>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">View Live Site</p>
                    <p className="text-xs text-gray-400">Opens in new tab</p>
                  </div>
                </div>
              </Card>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
