"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

type DomainInfo = {
  id: number;
  domain_name: string;
  tld: string;
  type: string;
  status: string;
  expires_label: string;
  purchased_at: string;
  dns_count: number;
};

const NS_RECORDS = ["ns1.orahweb.com", "ns2.orahweb.com"];

export default function DomainSettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const domainName = decodeURIComponent(params.domain as string);

  const [domain, setDomain] = useState<DomainInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [authCode, setAuthCode] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authRevealed, setAuthRevealed] = useState(false);
  const [authCopied, setAuthCopied] = useState(false);
  const [renewLoading, setRenewLoading] = useState(false);
  const [renewResult, setRenewResult] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/user/domains")
      .then((r) => r.json())
      .then((d) => {
        const found = (d.domains ?? []).find((x: DomainInfo) => x.domain_name === domainName);
        setDomain(found ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [status, domainName]);

  async function fetchAuthCode(regen = false) {
    setAuthLoading(true);
    try {
      const res = await fetch(`/api/user/authcode?domain=${encodeURIComponent(domainName)}${regen ? "&regen=1" : ""}`);
      const data = await res.json();
      setAuthCode(data.authCode);
      setAuthRevealed(true);
    } catch {}
    setAuthLoading(false);
  }

  async function renew() {
    setRenewLoading(true);
    try {
      const res = await fetch("/api/domains/renew", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: domainName }),
      });
      const data = await res.json();
      if (data.ok) {
        setRenewResult("✓ Domain renewed for 1 additional year.");
        setDomain((d) => d ? { ...d, expires_label: new Date(data.expiresAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) } : d);
      }
    } catch {}
    setRenewLoading(false);
  }

  function copyNs(ns: string) {
    navigator.clipboard.writeText(ns);
    setCopied(ns);
    setTimeout(() => setCopied(null), 2000);
  }

  function copyAuthCode() {
    if (authCode) {
      navigator.clipboard.writeText(authCode);
      setAuthCopied(true);
      setTimeout(() => setAuthCopied(false), 2000);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-violet-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!domain) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <p className="text-xl font-bold text-gray-900 mb-2">Domain not found</p>
          <p className="text-gray-500 mb-5">You don't own <code className="font-mono">{domainName}</code></p>
          <Link href="/dashboard" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}>
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const isWeb3 = domain.type === "web3";

  return (
    <>
      <div className="bg-gradient-to-br from-[#0f0c2e] via-[#231a6e] to-[#0a3a50] text-white px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-violet-300 hover:text-white text-sm mb-5 transition-colors">
            ← My Domains
          </Link>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold">{domainName}</h1>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${isWeb3 ? "bg-violet-500/30 border border-violet-400/40 text-violet-200" : "bg-blue-500/30 border border-blue-400/40 text-blue-200"}`}>
                  {isWeb3 ? "Web3" : "Traditional"}
                </span>
              </div>
              <p className="text-violet-300 text-sm">Manage settings, nameservers, and transfer options.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-5">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-bold text-gray-900 mb-4">Domain Overview</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: "Domain", value: domain.domain_name },
              { label: "Extension", value: `.${domain.tld}` },
              { label: "Type", value: isWeb3 ? "Web3 / Blockchain" : "Traditional TLD" },
              { label: "Status", value: domain.status.charAt(0).toUpperCase() + domain.status.slice(1) },
              { label: "Expires", value: domain.expires_label },
              { label: "DNS Records", value: String(domain.dns_count ?? 0) },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-0.5">{label}</p>
                <p className={`font-semibold text-sm ${value === "Active" ? "text-violet-600" : value === "Never" ? "text-indigo-600" : "text-gray-900"}`}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
              </svg>
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Nameservers</h2>
              <p className="text-xs text-gray-500 mt-0.5">Point these nameservers at your current registrar to use OrahWeb DNS</p>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            {NS_RECORDS.map((ns) => (
              <div key={ns} className="flex items-center gap-3 bg-violet-50 border border-violet-100 rounded-xl px-4 py-3">
                <code className="flex-1 font-mono text-sm text-gray-900">{ns}</code>
                <button
                  onClick={() => copyNs(ns)}
                  className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-violet-200 text-violet-700 hover:bg-violet-100 transition-colors"
                >
                  {copied === ns ? "Copied!" : "Copy"}
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400">Changes typically propagate within 24–48 hours.</p>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link
              href={`/dashboard/dns/${encodeURIComponent(domainName)}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700 hover:text-violet-900 transition-colors"
            >
              Manage DNS Records →
            </Link>
          </div>
        </div>

        {isWeb3 && (
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white text-lg shrink-0">
                ⛓
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Blockchain Resolver</h2>
                <p className="text-xs text-gray-500 mt-0.5">Link crypto wallet addresses and IPFS content to this domain</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {["ETH", "BTC", "SOL", "USDT", "USDC", "BNB"].map((c) => (
                <div key={c} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                  <span className="text-xs font-mono font-semibold text-gray-600">{c}</span>
                  <span className="text-[10px] text-gray-400">supported</span>
                </div>
              ))}
            </div>
            <Link
              href={`/dashboard/blockchain/${encodeURIComponent(domainName)}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
            >
              Manage Blockchain Resolver →
            </Link>
          </div>
        )}

        {!isWeb3 && (
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Domain Renewal</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Expires: <strong>{domain.expires_label}</strong> · Renew for 1 additional year
                </p>
              </div>
            </div>
            {renewResult && (
              <div className="mb-4 px-4 py-3 bg-violet-50 border border-violet-200 rounded-xl text-sm font-medium text-violet-700">
                {renewResult}
              </div>
            )}
            <button
              onClick={renew}
              disabled={renewLoading}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
            >
              {renewLoading ? "Renewing…" : "Renew Domain (+1 year)"}
            </button>
          </div>
        )}

        {!isWeb3 && (
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Transfer Out</h2>
                <p className="text-xs text-gray-500 mt-0.5">Get your EPP auth code to transfer this domain to another registrar</p>
              </div>
            </div>
            {!authRevealed ? (
              <button
                onClick={() => fetchAuthCode(false)}
                disabled={authLoading}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
              >
                {authLoading ? "Generating…" : "Get Auth Code (EPP)"}
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                  <code className="flex-1 font-mono text-sm text-gray-900 break-all">{authCode}</code>
                  <button
                    onClick={copyAuthCode}
                    className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-amber-200 text-amber-700 hover:bg-amber-100 transition-colors"
                  >
                    {authCopied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => fetchAuthCode(true)}
                    className="text-xs font-semibold text-amber-700 hover:text-amber-900 transition-colors"
                  >
                    ↻ Regenerate
                  </button>
                  <span className="text-xs text-gray-300">|</span>
                  <span className="text-xs text-gray-400">Valid for 14 days</span>
                </div>
                <p className="text-xs text-gray-500">Enter this code at your new registrar to complete the transfer. After transfer, this domain will no longer be managed here.</p>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-3 flex-wrap">
          <Link
            href={`/dashboard/dns/${encodeURIComponent(domainName)}`}
            className="flex-1 text-center py-3 rounded-xl text-sm font-semibold border-2 border-gray-200 text-gray-700 hover:border-violet-400 hover:text-violet-700 transition-colors"
          >
            ← DNS Records
          </Link>
          {isWeb3 && (
            <Link
              href={`/dashboard/blockchain/${encodeURIComponent(domainName)}`}
              className="flex-1 text-center py-3 rounded-xl text-sm font-semibold border-2 border-gray-200 text-gray-700 hover:border-violet-400 hover:text-violet-700 transition-colors"
            >
              ⛓ Blockchain Resolver
            </Link>
          )}
          <Link
            href="/transfer"
            className="flex-1 text-center py-3 rounded-xl text-sm font-semibold border-2 border-gray-200 text-gray-700 hover:border-violet-400 hover:text-violet-700 transition-colors"
          >
            Transfer Center →
          </Link>
        </div>
      </div>
    </>
  );
}
