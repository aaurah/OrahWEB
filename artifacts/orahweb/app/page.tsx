"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Section, SectionHeader } from "@/components/Layout";
import { useCart } from "@/lib/cart";

const POPULAR_TLDS = [
  { ext: ".web3", price: 9.99, hot: true, color: "from-green-500 to-emerald-600" },
  { ext: ".crypto", price: 19.99, hot: true, color: "from-amber-500 to-yellow-500" },
  { ext: ".nft", price: 14.99, hot: false, color: "from-pink-500 to-rose-500" },
  { ext: ".wallet", price: 12.99, hot: false, color: "from-emerald-500 to-teal-500" },
  { ext: ".dao", price: 24.99, hot: true, color: "from-orange-500 to-amber-500" },
  { ext: ".com", price: 4.99, hot: false, color: "from-gray-600 to-gray-700" },
  { ext: ".io", price: 7.99, hot: false, color: "from-green-600 to-teal-600" },
  { ext: ".app", price: 6.99, hot: false, color: "from-lime-500 to-green-500" },
];

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "True Ownership",
    description: "Your domain lives on the blockchain. No one — not even us — can take it from you. You hold the private key, you hold the domain.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "One Payment. Forever.",
    description: "Unlike traditional domains, blockchain domains are a one-time purchase. No yearly renewal fees. Ever.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Your Crypto Identity",
    description: "Use your domain as a human-readable wallet address. Send and receive any crypto to yourname.crypto instead of a 42-character hex string.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    title: "Decentralized Websites",
    description: "Point your domain to IPFS or Arweave and host a website no one can censor, take down, or restrict. The web as it was meant to be.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Multi-Chain Support",
    description: "OrahWeb domains work across Ethereum, Polygon, and Solana. One domain, every chain.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "NFT Avatars & Profiles",
    description: "Link your NFT PFP, social handles, and on-chain identity to your domain. One profile for the entire decentralized web.",
  },
];

const STATS = [
  { value: "4.2M+", label: "Domains registered" },
  { value: "180+", label: "TLDs available" },
  { value: "650K+", label: "Active wallets" },
  { value: "$0", label: "Annual renewal for Web3 domains" },
];

const HOME_TLDS = [
  { ext: ".crypto", price: 19.99, type: "web3" },
  { ext: ".web3", price: 9.99, type: "web3" },
  { ext: ".nft", price: 14.99, type: "web3" },
  { ext: ".wallet", price: 12.99, type: "web3" },
  { ext: ".dao", price: 24.99, type: "web3" },
  { ext: ".com", price: 4.99, type: "traditional" },
  { ext: ".io", price: 7.99, type: "traditional" },
  { ext: ".app", price: 6.99, type: "traditional" },
];

function DomainSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ domain: string; available: boolean; price: number }[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { addItem, items } = useCart();
  const inCart = (domain: string) => items.some((i) => i.id === domain);

  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    const name = query.toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/\.[^.]+$/, "");
    if (!name) { setLoading(false); return; }

    const candidates = HOME_TLDS.map((t) => `${name}${t.ext}`);
    let registered = new Set<string>();
    try {
      const res = await fetch("/api/domains/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domains: candidates }),
      });
      const data = await res.json();
      registered = new Set<string>(data.registered ?? []);
    } catch { /* fail open */ }

    const takenChance = name.length <= 3 ? 0.95 : name.length <= 5 ? 0.80 : name.length <= 7 ? 0.60 : 0.35;

    setResults(
      HOME_TLDS.map((t) => {
        const domain = `${name}${t.ext}`;
        if (registered.has(domain)) return { domain, available: false, price: t.price };
        if (t.type === "web3") return { domain, available: true, price: t.price };
        return { domain, available: Math.random() > takenChance, price: t.price };
      })
    );
    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={search} className="flex gap-2">
        <div className="relative flex-1">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your perfect domain..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder-blue-200 text-lg focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/15 transition-all"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="px-8 py-4 bg-white text-blue-700 hover:bg-blue-50 font-semibold rounded-2xl shadow-lg text-base"
          loading={loading}
        >
          Search
        </Button>
      </form>

      {results && (
        <div className="mt-4 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {results.map(({ domain, available, price }) => (
            <div
              key={domain}
              className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${available ? "bg-emerald-400" : "bg-gray-300"}`} />
                <span className="font-semibold text-gray-900">{domain}</span>
                {!available && <span className="text-xs text-gray-400 font-medium">Taken</span>}
              </div>
              {available ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-800">${price}</span>
                  {inCart(domain) ? (
                    <span className="px-4 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-semibold flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Added
                    </span>
                  ) : (
                    <button
                      onClick={() => addItem({ id: domain, domain, price })}
                      className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                    >
                      Add
                    </button>
                  )}
                </div>
              ) : (
                <button className="px-4 py-1.5 rounded-lg border border-gray-200 text-gray-500 text-xs font-medium hover:bg-gray-100 transition-colors">
                  Make offer
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#052e16] via-green-900 to-[#064e3b] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(22,163,74,0.5),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(5,150,105,0.4),_transparent_60%)]" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-widest uppercase text-green-200 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Web3 Domains Now Available
          </span>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            Your name.
            <br />
            <span className="bg-gradient-to-r from-green-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
              Your domain. Forever.
            </span>
          </h1>

          <p className="mt-6 text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
            Register blockchain and traditional domains. Own your identity on the
            decentralized web — no renewals, no censorship, no middlemen.
          </p>

          <div className="mt-10">
            <DomainSearch />
          </div>

          <p className="mt-5 text-sm text-green-300">
            Popular:{" "}
            {[".crypto", ".web3", ".nft", ".wallet", ".dao"].map((ext) => (
              <button
                key={ext}
                className="mx-1 hover:text-white underline underline-offset-2 transition-colors"
              >
                {ext}
              </button>
            ))}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      <Section className="bg-gray-50 pt-10 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-amber-500 bg-clip-text text-transparent">
                {value}
              </div>
              <div className="mt-1 text-sm text-gray-500 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <SectionHeader
          eyebrow="Browse Extensions"
          title="Find your perfect ending"
          description="From blockchain-native Web3 extensions to classic TLDs — we have every domain you need."
          center
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {POPULAR_TLDS.map(({ ext, price, hot, color }) => (
            <div
              key={ext}
              className="group relative bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-green-100 transition-all duration-300 cursor-pointer"
            >
              {hot && (
                <span className="absolute -top-2 -right-2 text-[10px] font-bold bg-gradient-to-r from-orange-400 to-rose-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wide">
                  Hot
                </span>
              )}
              <div
                className={`inline-flex w-12 h-12 rounded-xl bg-gradient-to-br ${color} items-center justify-center text-white font-bold text-lg mb-3 group-hover:scale-110 transition-transform`}
              >
                {ext[1].toUpperCase()}
              </div>
              <div className="font-bold text-gray-900 text-lg">{ext}</div>
              <div className="text-sm text-gray-500 mt-1">
                From <span className="font-semibold text-gray-700">${price}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/domains">
            <Button variant="outline" size="lg">
              View all 180+ extensions
            </Button>
          </Link>
        </div>
      </Section>

      <Section className="bg-gray-50">
        <SectionHeader
          eyebrow="Why OrahWeb"
          title="The future of domain ownership"
          description="OrahWeb goes beyond DNS. We're building the identity layer of the decentralized internet."
          center
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <Card key={f.title} hover className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 flex items-center justify-center text-green-600">
                {f.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{f.title}</h3>
                <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{f.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 rounded-3xl p-12 sm:p-16 text-center text-white shadow-2xl shadow-green-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1),_transparent_60%)]" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Claim your name before someone else does.
            </h2>
            <p className="mt-4 text-green-100 text-lg max-w-xl mx-auto">
              Over 50,000 domains are registered every day. Yours might not be
              available tomorrow.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link href="/domains">
                <Button className="bg-white text-green-700 hover:bg-green-50 shadow-lg px-8 py-3.5 text-base font-semibold rounded-xl">
                  Search Domains
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  variant="outline"
                  className="border-white/40 text-white bg-transparent hover:bg-white/10 hover:border-white px-8 py-3.5 text-base rounded-xl"
                >
                  See Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
