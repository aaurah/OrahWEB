"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

type Transfer = {
  id: number;
  domain_name: string;
  direction: string;
  status: string;
  created_at: string;
};

type Domain = { id: number; domain_name: string; type: string };

const STEPS_IN = [
  { n: 1, title: "Unlock domain", desc: "At your current registrar, unlock the domain and disable WHOIS privacy." },
  { n: 2, title: "Get auth code", desc: "Request the EPP/authorization code (also called transfer key) from your registrar." },
  { n: 3, title: "Submit here", desc: "Enter your domain and auth code below. Transfer typically completes in 5–7 days." },
  { n: 4, title: "Approve request", desc: "Check your email and approve the transfer request from your current registrar." },
];

export default function TransferPage() {
  const { data: session } = useSession();
  const [tab, setTab] = useState<"in" | "out">("in");

  const [inDomain, setInDomain] = useState("");
  const [inCode, setInCode] = useState("");
  const [inEmail, setInEmail] = useState("");
  const [inLoading, setInLoading] = useState(false);
  const [inResult, setInResult] = useState<{ ok: boolean; message: string } | null>(null);

  const [myDomains, setMyDomains] = useState<Domain[]>([]);
  const [outSelected, setOutSelected] = useState("");
  const [outCode, setOutCode] = useState("");
  const [outLoading, setOutLoading] = useState(false);
  const [outCopied, setOutCopied] = useState(false);

  const [transfers, setTransfers] = useState<Transfer[]>([]);

  useEffect(() => {
    if ((session?.user as { id?: string })?.id) {
      fetch("/api/user/domains")
        .then((r) => r.json())
        .then((d) => setMyDomains((d.domains ?? []).filter((x: any) => x.type === "traditional")));
      fetch("/api/transfer")
        .then((r) => r.json())
        .then((d) => setTransfers(d.transfers ?? []));
    }
  }, [session]);

  async function submitTransferIn(e: React.FormEvent) {
    e.preventDefault();
    setInLoading(true);
    setInResult(null);
    try {
      const res = await fetch("/api/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domainName: inDomain, authCode: inCode, email: inEmail, direction: "in" }),
      });
      if (res.ok) {
        const data = await res.json();
        setTransfers((t) => [data.transfer, ...t]);
        setInResult({ ok: true, message: `Transfer initiated for ${inDomain}. Check your email to approve.` });
        setInDomain(""); setInCode(""); setInEmail("");
      } else {
        setInResult({ ok: false, message: "Transfer request failed. Please try again." });
      }
    } catch {
      setInResult({ ok: false, message: "Network error. Please try again." });
    }
    setInLoading(false);
  }

  async function getOutCode() {
    if (!outSelected) return;
    setOutLoading(true);
    setOutCode("");
    try {
      const res = await fetch(`/api/user/authcode?domain=${encodeURIComponent(outSelected)}`);
      if (res.ok) {
        const data = await res.json();
        setOutCode(data.authCode);
      }
    } catch {}
    setOutLoading(false);
  }

  function copyCode() {
    navigator.clipboard.writeText(outCode);
    setOutCopied(true);
    setTimeout(() => setOutCopied(false), 2000);
  }

  const statusColor: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    processing: "bg-blue-50 text-blue-700 border-blue-200",
    completed: "bg-violet-50 text-violet-700 border-violet-200",
    failed: "bg-red-50 text-red-700 border-red-200",
    cancelled: "bg-gray-100 text-gray-600 border-gray-200",
  };

  return (
    <>
      <div className="bg-gradient-to-br from-[#0f0c2e] via-[#231a6e] to-[#0a3a50] text-white px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-widest text-violet-200 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            Domain Transfer Center
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">Transfer Domains</h1>
          <p className="text-violet-200 text-lg max-w-xl mx-auto">
            Bring your existing domains to OrahWeb, or move them to another registrar.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit">
          {(["in", "out"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                tab === t
                  ? "bg-white text-violet-700 shadow"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t === "in" ? "⬇ Transfer In" : "⬆ Transfer Out"}
            </button>
          ))}
        </div>

        {tab === "in" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STEPS_IN.map((s) => (
                <div key={s.n} className="glass-card rounded-2xl p-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm mb-3">
                    {s.n}
                  </div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">{s.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Start Transfer In</h2>
              <p className="text-sm text-gray-500 mb-6">Enter your domain and the EPP authorization code from your current registrar.</p>
              <form onSubmit={submitTransferIn} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Domain Name</label>
                  <input
                    type="text"
                    value={inDomain}
                    onChange={(e) => setInDomain(e.target.value)}
                    placeholder="example.com"
                    required
                    className="glass-input w-full px-4 py-3 rounded-xl text-sm border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">EPP / Auth Code</label>
                  <input
                    type="text"
                    value={inCode}
                    onChange={(e) => setInCode(e.target.value)}
                    placeholder="Ht#9kLm2PqWx..."
                    required
                    className="glass-input w-full px-4 py-3 rounded-xl text-sm border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition font-mono"
                  />
                  <p className="mt-1.5 text-xs text-gray-400">Get this from your current registrar's control panel.</p>
                </div>
                {!session && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Email</label>
                    <input
                      type="email"
                      value={inEmail}
                      onChange={(e) => setInEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="glass-input w-full px-4 py-3 rounded-xl text-sm border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition"
                    />
                  </div>
                )}
                {inResult && (
                  <div className={`rounded-xl px-4 py-3 text-sm font-medium ${inResult.ok ? "bg-violet-50 text-violet-700 border border-violet-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                    {inResult.ok ? "✓ " : "✗ "}{inResult.message}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={inLoading}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)", color: "#fff" }}
                >
                  {inLoading ? "Initiating Transfer…" : "Initiate Transfer →"}
                </button>
              </form>
            </div>

            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">What happens after you submit?</h3>
              <ul className="text-sm text-gray-500 space-y-1 list-disc list-inside">
                <li>We send a transfer request to your current registrar</li>
                <li>You receive an email asking to approve the transfer</li>
                <li>Standard transfers complete in <strong>5–7 business days</strong></li>
                <li>Your domain's existing DNS records are preserved</li>
                <li>You can manage DNS from OrahWeb immediately after transfer</li>
              </ul>
            </div>
          </div>
        )}

        {tab === "out" && (
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Transfer Out (Get Auth Code)</h2>
              <p className="text-sm text-gray-500 mb-6">
                Select one of your domains to generate an EPP authorization code. Use this code at your new registrar to initiate the transfer.
              </p>
              {!session ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Sign in to see your domains and generate auth codes.</p>
                  <Link href="/login" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}>
                    Sign In
                  </Link>
                </div>
              ) : myDomains.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-2">No traditional domains found.</p>
                  <p className="text-xs text-gray-400">Only traditional domains (not Web3) can be transferred out.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Domain</label>
                    <select
                      value={outSelected}
                      onChange={(e) => { setOutSelected(e.target.value); setOutCode(""); }}
                      className="glass-input w-full px-4 py-3 rounded-xl text-sm border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition"
                    >
                      <option value="">— choose a domain —</option>
                      {myDomains.map((d) => (
                        <option key={d.id} value={d.domain_name}>{d.domain_name}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={getOutCode}
                    disabled={!outSelected || outLoading}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-40"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)", color: "#fff" }}
                  >
                    {outLoading ? "Generating…" : "Generate Auth Code"}
                  </button>
                  {outCode && (
                    <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
                      <p className="text-xs font-semibold text-violet-700 uppercase tracking-wider mb-2">EPP Auth Code for {outSelected}</p>
                      <div className="flex items-center gap-3">
                        <code className="flex-1 font-mono text-sm bg-white border border-violet-200 rounded-lg px-3 py-2 text-gray-900 break-all">
                          {outCode}
                        </code>
                        <button onClick={copyCode} className="shrink-0 px-4 py-2 rounded-lg text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700 transition-colors">
                          {outCopied ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <p className="mt-3 text-xs text-violet-600">
                        ⚠ This code is valid for 14 days. Enter it at your new registrar to complete the transfer.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">Before you transfer out</h3>
              <ul className="text-sm text-gray-500 space-y-1 list-disc list-inside">
                <li>Export your DNS records — they may not transfer automatically</li>
                <li>Domain must be at least 60 days old to be eligible for transfer</li>
                <li>Transfers are free — your new registrar may charge a renewal fee</li>
                <li>Web3 domains cannot be transferred — they are permanently on-chain</li>
              </ul>
            </div>
          </div>
        )}

        {transfers.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Transfer History</h2>
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50/80 border-b border-gray-100">
                      {["Domain", "Direction", "Status", "Date"].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {transfers.map((t) => (
                      <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-3.5 font-semibold text-gray-900">{t.domain_name}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${t.direction === "in" ? "bg-blue-50 text-blue-700" : "bg-violet-50 text-violet-700"}`}>
                            {t.direction === "in" ? "⬇ Transfer In" : "⬆ Transfer Out"}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${statusColor[t.status] || "bg-gray-100 text-gray-600"}`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-gray-500">
                          {new Date(t.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
