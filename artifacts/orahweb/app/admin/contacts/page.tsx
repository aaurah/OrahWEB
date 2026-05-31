import type { Metadata } from "next";
import Link from "next/link";
import { getSubmissions, getSubmissionStats, STATUS_STYLES } from "@/lib/contact-store";
import { formatRelativeTime } from "@/lib/utils";
import { Card } from "@/components/Card";

export const metadata: Metadata = { title: "Contacts" };

export default async function AdminContactsPage({
  searchParams,
}: {
  searchParams: { id?: string; status?: string };
}) {
  const allSubmissions = getSubmissions();
  const stats = getSubmissionStats();

  const filterStatus = searchParams.status as
    | "new"
    | "read"
    | "replied"
    | undefined;
  const filtered = filterStatus
    ? allSubmissions.filter((s) => s.status === filterStatus)
    : allSubmissions;

  const selected = searchParams.id
    ? allSubmissions.find((s) => s.id === searchParams.id)
    : filtered[0];

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Submissions</h1>
          <p className="text-sm text-gray-500 mt-1">
            {stats.total} total · {stats.new} new
          </p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(["all", "new", "read", "replied"] as const).map((s) => (
          <Link
            key={s}
            href={s === "all" ? "/admin/contacts" : `/admin/contacts?status=${s}`}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              (s === "all" && !filterStatus) || filterStatus === s
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-700"
            }`}
          >
            {s === "all" ? `All (${stats.total})` : null}
            {s === "new" ? `New (${stats.new})` : null}
            {s === "read" ? `Read (${stats.read})` : null}
            {s === "replied" ? `Replied (${stats.replied})` : null}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        <div className="lg:col-span-2 space-y-2">
          {filtered.length === 0 ? (
            <Card padding="md">
              <p className="text-sm text-gray-400 text-center py-6">
                No submissions in this category.
              </p>
            </Card>
          ) : (
            filtered.map((contact) => (
              <Link
                key={contact.id}
                href={`/admin/contacts?id=${contact.id}${
                  filterStatus ? `&status=${filterStatus}` : ""
                }`}
              >
                <Card
                  padding="md"
                  className={`cursor-pointer transition-all ${
                    selected?.id === contact.id
                      ? "ring-2 ring-blue-500 border-blue-200"
                      : "hover:border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {contact.name}
                        </p>
                        {contact.status === "new" && (
                          <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 truncate">{contact.subject}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{contact.email}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className="text-xs text-gray-400">
                        {formatRelativeTime(contact.createdAt)}
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                          STATUS_STYLES[contact.status]
                        }`}
                      >
                        {contact.status}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>

        <div className="lg:col-span-3">
          {selected ? (
            <Card padding="lg" className="sticky top-24">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selected.subject}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    From{" "}
                    <span className="font-medium text-gray-700">{selected.name}</span>{" "}
                    &lt;{selected.email}&gt;
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(selected.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border shrink-0 ${
                    STATUS_STYLES[selected.status]
                  }`}
                >
                  {selected.status}
                </span>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 mb-6">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Reply via Email
                </a>
                <div className="flex gap-2">
                  {(["new", "read", "replied"] as const)
                    .filter((s) => s !== selected.status)
                    .map((s) => (
                      <form key={s} action={`/api/admin/contacts/${selected.id}/status`} method="POST">
                        <input type="hidden" name="status" value={s} />
                        <input type="hidden" name="returnId" value={selected.id} />
                        <input type="hidden" name="returnStatus" value={filterStatus ?? ""} />
                        <button
                          type="submit"
                          className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                          Mark {s}
                        </button>
                      </form>
                    ))}
                </div>
              </div>
            </Card>
          ) : (
            <Card padding="lg" className="flex items-center justify-center py-20">
              <div className="text-center text-gray-400">
                <svg className="w-10 h-10 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <p className="text-sm">Select a message to read it</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
