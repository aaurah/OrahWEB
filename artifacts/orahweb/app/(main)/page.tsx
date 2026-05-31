import type { Metadata } from "next";
import Link from "next/link";
import { TLDS } from "@/lib/domain-store";
import { HeroSearch } from "./_hero-search";

export const metadata: Metadata = {
  title: "OrahWeb — Your name. Your domain. Forever.",
  description:
    "Register blockchain and traditional domains. Own your identity on the decentralized web — no renewals, no censorship, no middlemen.",
};

const STATS = [
  { value: "4.2M+", label: "Domains registered" },
  { value: "180+", label: "TLDs available" },
  { value: "650K+", label: "Active wallets" },
  { value: "$0", label: "Annual renewal for Web3 domains" },
];

const WEB3_TLDS = [
  { tld: ".crypto", desc: "The original Web3 standard", price: "Free forever", web3: true },
  { tld: ".wallet", desc: "Your payment identity", price: "Free forever", web3: true },
  { tld: ".nft", desc: "For creators & collectors", price: "Free forever", web3: true },
  { tld: ".dao", desc: "Decentralized organizations", price: "Free forever", web3: true },
  { tld: ".web3", desc: "The next internet", price: "Free forever", web3: true },
  { tld: ".blockchain", desc: "Immutable identity", price: "Free forever", web3: true },
];

const TRADITIONAL_FEATURED = TLDS.filter((t) =>
  ["com", "io", "ai", "dev", "app", "co"].includes(t.tld)
);

export default function HomePage() {
  return (
    <div className="bg-gray-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950 via-blue-950 to-gray-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(120,40,200,0.5),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_50%,rgba(37,99,235,0.2),transparent)]" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-semibold tracking-widest uppercase mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Web3 Domains Now Available
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6">
            Your name.
            <br />
            <span className="text-white">Your domain. </span>
            <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
              Forever.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-blue-200/80 leading-relaxed max-w-2xl mx-auto mb-12">
            Register blockchain and traditional domains. Own your identity on
            the decentralized web — no renewals, no censorship, no middlemen.
          </p>

          {/* Search */}
          <div className="flex justify-center">
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900/60 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  {value}
                </div>
                <div className="mt-1.5 text-sm text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse Extensions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-4">
            Browse Extensions
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Find your perfect ending
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            From blockchain-native Web3 extensions to classic TLDs — we have
            every domain you need.
          </p>
        </div>

        {/* Web3 TLDs */}
        <div className="mb-10">
          <h3 className="text-xs font-bold tracking-widest uppercase text-violet-400 mb-4">
            Web3 · Blockchain
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {WEB3_TLDS.map(({ tld, desc, price }) => (
              <div
                key={tld}
                className="bg-gray-900 border border-violet-500/20 rounded-xl p-4 hover:border-violet-400/50 hover:bg-gray-800 transition-all group"
              >
                <p className="text-lg font-bold text-violet-300 group-hover:text-violet-200 mb-1">
                  {tld}
                </p>
                <p className="text-xs text-gray-500 mb-2 leading-snug">{desc}</p>
                <p className="text-xs font-semibold text-green-400">{price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Traditional TLDs */}
        <div>
          <h3 className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-4">
            Traditional · Classic
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {TRADITIONAL_FEATURED.map((t) => (
              <div
                key={t.tld}
                className="bg-gray-900 border border-blue-500/20 rounded-xl p-4 hover:border-blue-400/50 hover:bg-gray-800 transition-all group"
              >
                <p className="text-lg font-bold text-blue-300 group-hover:text-blue-200 mb-1">
                  .{t.tld}
                </p>
                <p className="text-xs text-gray-500 mb-2">{t.category}</p>
                <p className="text-xs font-semibold text-gray-300">
                  ${t.price.toFixed(2)}/yr
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Web3 */}
      <section className="bg-gray-900/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase text-green-400 mb-4">
              Why Web3 Domains
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Own it. Forever.
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Traditional domains are rented. Web3 domains are yours — stored on
              the blockchain, controlled by your wallet.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: "🔐",
                title: "Self-Sovereign",
                desc: "Your private key, your domain. No registrar can take it away.",
              },
              {
                icon: "♾️",
                title: "No Renewals",
                desc: "Pay once, own forever. No annual fees, no expiry, no surprises.",
              },
              {
                icon: "🌐",
                title: "Censorship-Resistant",
                desc: "Stored on a public blockchain. No single entity controls it.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-gray-900 border border-white/5 rounded-2xl p-8 text-center"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-gradient-to-r from-violet-900/60 to-blue-900/60 border border-violet-500/20 rounded-3xl p-12 sm:p-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Claim your Web3 identity today
          </h2>
          <p className="text-blue-200/80 text-lg max-w-xl mx-auto mb-8">
            Search your name across hundreds of TLDs — Web3 and traditional.
            No account required to browse.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-violet-900/40"
            >
              Get in Touch
            </Link>
            <Link
              href="/admin/domains"
              className="px-7 py-3.5 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Browse Domains
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
