"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

type DnsRecord = {
  id: number;
  record_type: string;
  name: string;
  value: string;
  ttl: number;
};

type DomainInfo = {
  domain_name: string;
  type: string;
  status: string;
  expires_label?: string;
};

const RECORD_TYPES = ["A", "AAAA", "CNAME", "MX", "TXT", "NS", "SRV"];

const TYPE_COLORS: Record<string, string> = {
  A: "bg-blue-100 text-blue-700",
  AAAA: "bg-indigo-100 text-indigo-700",
  CNAME: "bg-violet-100 text-violet-700",
  MX: "bg-amber-100 text-amber-700",
  TXT: "bg-gray-100 text-gray-700",
  NS: "bg-emerald-100 text-emerald-700",
  SRV: "bg-pink-100 text-pink-700",
};

export default function DnsManagementPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const domainName = decodeURIComponent(params.domain as string);

  const [domain, setDomain] = useState<DomainInfo | null>(null);
  const [records, setRecords] = useState<DnsRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [form, setForm] = useState({
    recordType: "A",
    name: "@",
    value: "",
    ttl: 3600,
  });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login?callbackUrl=/dashboard");
  }, [status, router]);

  const fetchData = () => {
    if (status !== "authenticated") return;
    fetch(`/api/user/dns?domain=${encodeURIComponent(domainName)}`)
      .then((r) => {
        if (!r.ok) throw new Error("Domain not found");
        return r.json();
      })
      .then((d) => {
        setDomain(d.domain);
        setRecords(d.records ?? []);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  };

  useEffect(() => { fetchData(); }, [status, domainName]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/user/dns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domainName, ...form }),
    });
    if (res.ok) {
      setForm({ recordType: "A", name: "@", value: "", ttl: 3600 });
      setShowForm(false);
      fetchData();
    }
    setSaving(false);
  };

  const handleDelete = async (recordId: number) => {
    setDeleting(recordId);
    await fetch(
      `/api/user/dns?domain=${encodeURIComponent(domainName)}&recordId=${recordId}`,
      { method: "DELETE" }
    );
    setRecords((r) => r.filter((rec) => rec.id !== recordId));
    setDeleting(null);
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <p className="text-gray-500 mb-4">{error}</p>
          <Link href="/dashboard" className="text-blue-600 hover:underline font-medium">← Back to dashboard</Link>
        </div>
      </div>
    );
  }

  const nsRecords = records.filter((r) => r.record_type === "NS");
  const otherRecords = records.filter((r) => r.record_type !== "NS");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Header */}
        <div>
          <Link href="/dashboard" className="text-sm text-gray-400 hover:text-gray-600 transition-colors mb-4 inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            My Domains
          </Link>
          <div className="flex items-center justify-between mt-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{domainName}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${domain?.type === "web3" ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                  {domain?.type === "web3" ? "Web3" : "Traditional"}
                </span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">Active</span>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              + Add Record
            </button>
          </div>
        </div>

        {/* Nameservers panel */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-1">Nameservers</h2>
          <p className="text-sm text-gray-500 mb-4">
            Point your domain to these nameservers at your current registrar to activate OrahWeb DNS management.
          </p>
          <div className="space-y-2">
            {["ns1.orahweb.com", "ns2.orahweb.com"].map((ns) => (
              <div key={ns} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </span>
                  <code className="font-mono text-sm text-gray-800">{ns}</code>
                </div>
                <button
                  onClick={() => copy(ns)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors px-2 py-1"
                >
                  {copied === ns ? "Copied!" : "Copy"}
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">DNS changes can take up to 24–48 hours to propagate globally.</p>
        </div>

        {/* Add Record Form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-blue-200 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Add DNS Record</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                  <select
                    value={form.recordType}
                    onChange={(e) => setForm({ ...form, recordType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {RECORD_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="@ or subdomain"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Value</label>
                  <input
                    required
                    value={form.value}
                    onChange={(e) => setForm({ ...form, value: e.target.value })}
                    placeholder={form.recordType === "A" ? "e.g. 192.168.1.1" : form.recordType === "CNAME" ? "e.g. target.example.com" : "Record value"}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-36">
                  <label className="block text-xs font-medium text-gray-600 mb-1">TTL (seconds)</label>
                  <input
                    type="number"
                    value={form.ttl}
                    onChange={(e) => setForm({ ...form, ttl: parseInt(e.target.value) || 3600 })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2 mt-5">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {saving ? "Saving…" : "Save Record"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* DNS Records */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">DNS Records</h2>
            <span className="text-xs text-gray-400">{records.length} record{records.length !== 1 ? "s" : ""}</span>
          </div>

          {records.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm">
              No DNS records yet. Add your first record above.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {["Type", "Name", "Value", "TTL", ""].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[...otherRecords, ...nsRecords].map((rec) => (
                    <tr key={rec.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${TYPE_COLORS[rec.record_type] ?? "bg-gray-100 text-gray-600"}`}>
                          {rec.record_type}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-mono text-gray-700">{rec.name}</td>
                      <td className="px-5 py-3.5 font-mono text-gray-500 max-w-xs">
                        <span className="truncate block max-w-[200px]" title={rec.value}>{rec.value}</span>
                      </td>
                      <td className="px-5 py-3.5 text-gray-400">{rec.ttl}s</td>
                      <td className="px-5 py-3.5">
                        <button
                          onClick={() => handleDelete(rec.id)}
                          disabled={deleting === rec.id}
                          className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors disabled:opacity-40"
                        >
                          {deleting === rec.id ? "Deleting…" : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Common record examples */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-3">Common Record Types</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { type: "A", desc: "Points domain to an IPv4 address", example: "76.76.21.21" },
              { type: "CNAME", desc: "Alias to another domain name", example: "cname.vercel-dns.com" },
              { type: "MX", desc: "Mail server for email routing", example: "mail.example.com" },
              { type: "TXT", desc: "Verification and SPF records", example: "v=spf1 include:..." },
            ].map(({ type, desc, example }) => (
              <div key={type} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                <span className={`text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5 ${TYPE_COLORS[type] ?? "bg-gray-100 text-gray-600"}`}>
                  {type}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-700">{desc}</p>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">{example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
