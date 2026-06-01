"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

type CryptoRecord = { id: number; coin: string; network: string; address: string };

const COINS = [
  { symbol: "ETH", name: "Ethereum", networks: ["ERC-20 (Ethereum)", "Polygon", "Arbitrum", "Optimism"], color: "from-indigo-400 to-indigo-600", icon: "Ξ" },
  { symbol: "BTC", name: "Bitcoin", networks: ["Bitcoin Mainnet", "Lightning Network"], color: "from-orange-400 to-orange-600", icon: "₿" },
  { symbol: "SOL", name: "Solana", networks: ["Solana Mainnet"], color: "from-purple-400 to-purple-600", icon: "◎" },
  { symbol: "USDT", name: "Tether", networks: ["ERC-20 (Ethereum)", "TRC-20 (Tron)", "BEP-20 (BSC)", "Polygon"], color: "from-teal-400 to-teal-600", icon: "₮" },
  { symbol: "USDC", name: "USD Coin", networks: ["ERC-20 (Ethereum)", "Polygon", "Solana", "Arbitrum"], color: "from-blue-400 to-blue-600", icon: "◈" },
  { symbol: "BNB", name: "BNB Chain", networks: ["BEP-20 (BSC)", "BEP-2"], color: "from-yellow-400 to-yellow-600", icon: "B" },
  { symbol: "MATIC", name: "Polygon", networks: ["Polygon Mainnet", "ERC-20 (Ethereum)"], color: "from-violet-400 to-violet-600", icon: "⬡" },
  { symbol: "XRP", name: "Ripple", networks: ["XRP Ledger"], color: "from-sky-400 to-sky-600", icon: "✕" },
  { symbol: "LTC", name: "Litecoin", networks: ["Litecoin Mainnet"], color: "from-slate-400 to-slate-600", icon: "Ł" },
  { symbol: "DOGE", name: "Dogecoin", networks: ["Dogecoin Mainnet"], color: "from-amber-400 to-amber-600", icon: "Ð" },
  { symbol: "ADA", name: "Cardano", networks: ["Cardano Mainnet"], color: "from-blue-500 to-cyan-600", icon: "₳" },
  { symbol: "AVAX", name: "Avalanche", networks: ["C-Chain", "X-Chain"], color: "from-red-400 to-red-600", icon: "A" },
];

export default function BlockchainPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const domainName = decodeURIComponent(params.domain as string);

  const [records, setRecords] = useState<CryptoRecord[]>([]);
  const [ipfsHash, setIpfsHashState] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [ipfsSaved, setIpfsSaved] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ coin: "ETH", network: "ERC-20 (Ethereum)", address: "" });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  const fetchData = () => {
    fetch(`/api/user/blockchain?domain=${encodeURIComponent(domainName)}`)
      .then((r) => r.json())
      .then((d) => {
        setRecords(d.records ?? []);
        setIpfsHashState(d.ipfsHash ?? "");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    if (status === "authenticated") fetchData();
  }, [status, domainName]);

  function handleCoinChange(coin: string) {
    const c = COINS.find((x) => x.symbol === coin);
    setForm({ coin, network: c?.networks[0] ?? "mainnet", address: "" });
  }

  async function addRecord(e: React.FormEvent) {
    e.preventDefault();
    if (!form.address.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/user/blockchain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: domainName, coin: form.coin, network: form.network, address: form.address }),
      });
      if (res.ok) {
        fetchData();
        setShowForm(false);
        setForm({ coin: "ETH", network: "ERC-20 (Ethereum)", address: "" });
      }
    } catch {}
    setSaving(false);
  }

  async function deleteRecord(id: number) {
    setDeleting(id);
    try {
      await fetch(`/api/user/blockchain?domain=${encodeURIComponent(domainName)}&id=${id}`, { method: "DELETE" });
      setRecords((r) => r.filter((x) => x.id !== id));
    } catch {}
    setDeleting(null);
  }

  async function saveIpfs() {
    setSaving(true);
    await fetch("/api/user/blockchain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain: domainName, ipfsHash }),
    });
    setIpfsSaved(true);
    setTimeout(() => setIpfsSaved(false), 2500);
    setSaving(false);
  }

  function copyAddr(addr: string) {
    navigator.clipboard.writeText(addr);
    setCopied(addr);
    setTimeout(() => setCopied(null), 2000);
  }

  const getCoin = (symbol: string) => COINS.find((c) => c.symbol === symbol);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-violet-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  const selectedCoin = COINS.find((c) => c.symbol === form.coin);

  return (
    <>
      <div className="bg-gradient-to-br from-[#0f0c2e] via-[#231a6e] to-[#0a3a50] text-white px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-violet-300 hover:text-white text-sm mb-5 transition-colors">
            ← My Domains
          </Link>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold">{domainName}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-violet-500/30 border border-violet-400/40 text-violet-200 text-xs font-semibold">
                  Web3 · Blockchain
                </span>
              </div>
              <p className="text-violet-300 text-sm">Link wallet addresses and set resolver records for this domain.</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
            >
              {showForm ? "✕ Cancel" : "+ Add Address"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {showForm && (
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Link Wallet Address</h2>
            <form onSubmit={addRecord} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Cryptocurrency</label>
                  <select
                    value={form.coin}
                    onChange={(e) => handleCoinChange(e.target.value)}
                    className="glass-input w-full px-4 py-3 rounded-xl text-sm border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition"
                  >
                    {COINS.map((c) => (
                      <option key={c.symbol} value={c.symbol}>{c.icon} {c.name} ({c.symbol})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Network</label>
                  <select
                    value={form.network}
                    onChange={(e) => setForm({ ...form, network: e.target.value })}
                    className="glass-input w-full px-4 py-3 rounded-xl text-sm border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition"
                  >
                    {(selectedCoin?.networks ?? ["mainnet"]).map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Wallet Address</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="0x... or bc1... or your address"
                  required
                  className="glass-input w-full px-4 py-3 rounded-xl text-sm border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition font-mono"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
                >
                  {saving ? "Saving…" : "Save Address"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-3 rounded-xl font-medium text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/30 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-gray-900">Wallet Addresses</h2>
              <p className="text-xs text-gray-500 mt-0.5">People can send crypto directly to your domain name</p>
            </div>
            <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-full">{records.length} linked</span>
          </div>
          {records.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="text-4xl mb-3">🔗</div>
              <p className="font-medium text-gray-700 mb-1">No addresses linked yet</p>
              <p className="text-sm text-gray-400 mb-5">Add wallet addresses so anyone can send crypto to <strong>{domainName}</strong></p>
              <button
                onClick={() => setShowForm(true)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
              >
                + Link First Address
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {records.map((r) => {
                const coin = getCoin(r.coin);
                return (
                  <div key={r.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${coin?.color ?? "from-gray-400 to-gray-600"} flex items-center justify-center text-white font-bold text-base shrink-0`}>
                      {coin?.icon ?? r.coin[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-gray-900 text-sm">{r.coin}</span>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{r.network}</span>
                      </div>
                      <p className="text-xs font-mono text-gray-500 truncate">{r.address}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => copyAddr(r.address)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                        title="Copy address"
                      >
                        {copied === r.address ? (
                          <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={() => deleteRecord(r.id)}
                        disabled={deleting === r.id}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-lg shrink-0">
              🌐
            </div>
            <div>
              <h2 className="font-bold text-gray-900">IPFS Website / Content Hash</h2>
              <p className="text-xs text-gray-500 mt-0.5">Point your Web3 domain to a decentralized website on IPFS</p>
            </div>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              value={ipfsHash}
              onChange={(e) => setIpfsHashState(e.target.value)}
              placeholder="QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG..."
              className="glass-input flex-1 px-4 py-3 rounded-xl text-sm border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition font-mono"
            />
            <button
              onClick={saveIpfs}
              disabled={saving}
              className="px-5 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 disabled:opacity-50 whitespace-nowrap"
              style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
            >
              {ipfsSaved ? "✓ Saved" : "Save"}
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            Your IPFS hash (CID) from pinning services like Pinata, Web3.Storage, or Fleek.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <h3 className="font-semibold text-gray-900 mb-3">Blockchain Resolver Info</h3>
          <div className="space-y-2 text-sm">
            {[
              { label: "Resolver Protocol", value: "OrahWeb Resolver v2" },
              { label: "Registry", value: "Polygon Mainnet" },
              { label: "Smart Contract", value: "0x49CE...f7aB" },
              { label: "TTL", value: "Permanent (no expiry)" },
              { label: "Supported Standards", value: "ERC-721, ENS-compatible" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium text-gray-900 font-mono text-xs sm:text-sm">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 flex-wrap">
          <Link
            href={`/dashboard/dns/${encodeURIComponent(domainName)}`}
            className="flex-1 text-center py-3 rounded-xl text-sm font-semibold border-2 border-gray-200 text-gray-700 hover:border-violet-400 hover:text-violet-700 transition-colors"
          >
            ← Manage DNS
          </Link>
          <Link
            href={`/dashboard/settings/${encodeURIComponent(domainName)}`}
            className="flex-1 text-center py-3 rounded-xl text-sm font-semibold border-2 border-gray-200 text-gray-700 hover:border-violet-400 hover:text-violet-700 transition-colors"
          >
            Domain Settings →
          </Link>
        </div>
      </div>
    </>
  );
}
