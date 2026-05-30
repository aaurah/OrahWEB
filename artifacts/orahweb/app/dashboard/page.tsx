"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/Card";

type Domain = {
  id: number;
  domain_name: string;
  tld: string;
  type: string;
  status: string;
  expires_label: string;
  dns_count: number;
  purchased_at: string;
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/dashboard");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/user/domains")
        .then((r) => r.json())
        .then((d) => { setDomains(d.domains ?? []); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const web3Count = domains.filter((d) => d.type === "web3").length;

  return (
    <>
      <div className="bg-gradient-to-br from-blue-950 via-indigo-900 to-violet-900 text-white px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-blue-300 text-sm font-medium mb-1">My Domains</p>
            <h1 className="text-3xl font-bold">{session?.user?.name ?? "User"}</h1>
            <p className="text-blue-300 text-sm mt-1">{session?.user?.email}</p>
          </div>
          <Link
            href="/domains"
            className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-white text-blue-700 font-semibold text-sm hover:bg-blue-50 transition-colors shadow-sm"
          >
            + Register Domain
          </Link>
        </div>
      </div>

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Domains", value: loading ? "—" : domains.length },
              { label: "Web3 Domains", value: loading ? "—" : web3Count },
              { label: "Traditional", value: loading ? "—" : domains.length - web3Count },
              { label: "DNS Records", value: loading ? "—" : domains.reduce((s, d) => s + (d.dns_count ?? 0), 0) },
            ].map(({ label, value }) => (
              <Card key={label} padding="md">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{label}</p>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
              </Card>
            ))}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">My Domains</h2>
            <Card padding="sm" className="overflow-hidden">
              {loading ? (
                <div className="flex items-center justify-center py-16 text-gray-400 text-sm gap-2">
                  <svg className="animate-spin w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Loading your domains…
                </div>
              ) : domains.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-medium mb-1">No domains yet</p>
                  <p className="text-sm text-gray-400 mb-5">Search and register your first domain to get started.</p>
                  <Link
                    href="/domains"
                    className="inline-flex items-center px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
                  >
                    Search Domains
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        {["Domain", "Type", "DNS Records", "Expires", "Status", ""].map((h) => (
                          <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {domains.map((d) => (
                        <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-4">
                            <span className="font-semibold text-gray-900">{d.domain_name}</span>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              d.type === "web3"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-gray-100 text-gray-600"
                            }`}>
                              {d.type === "web3" ? "Web3" : "Traditional"}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-gray-500">{d.dns_count ?? 0} records</td>
                          <td className="px-5 py-4">
                            <span className={d.expires_label === "Never" ? "text-emerald-600 font-medium" : "text-gray-500"}>
                              {d.expires_label}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                              Active
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <Link
                              href={`/dashboard/dns/${encodeURIComponent(d.domain_name)}`}
                              className="text-xs text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap"
                            >
                              Manage DNS →
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>

          {!loading && domains.length > 0 && (
            <div className="bg-blue-50 border border-blue-100 rounded-2xl px-6 py-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-blue-900 mb-1">Point your domain to OrahWeb nameservers</p>
                  <p className="text-sm text-blue-700 mb-3">
                    To use DNS management, log in to your previous registrar and set these nameservers:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["ns1.orahweb.com", "ns2.orahweb.com"].map((ns) => (
                      <code key={ns} className="bg-white border border-blue-200 text-blue-800 text-sm font-mono px-3 py-1.5 rounded-lg">
                        {ns}
                      </code>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
