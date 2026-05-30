"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { useCart } from "@/lib/cart";

const ALL_TLDS = [
  { ext: ".crypto", price: 19.99, category: "web3", desc: "The original Web3 identity domain", hot: true },
  { ext: ".web3", price: 9.99, category: "web3", desc: "For the next generation of the internet", hot: true },
  { ext: ".nft", price: 14.99, category: "web3", desc: "Perfect for NFT creators and collectors", hot: false },
  { ext: ".wallet", price: 12.99, category: "web3", desc: "Your universal crypto payment address", hot: false },
  { ext: ".dao", price: 24.99, category: "web3", desc: "Decentralized autonomous organization identity", hot: true },
  { ext: ".defi", price: 19.99, category: "web3", desc: "Decentralized finance protocols and apps", hot: false },
  { ext: ".blockchain", price: 34.99, category: "web3", desc: "Premium blockchain identity", hot: false },
  { ext: ".zil", price: 9.99, category: "web3", desc: "Zilliqa blockchain domains", hot: false },
  { ext: ".x", price: 29.99, category: "web3", desc: "Unstoppable Web3 identity", hot: false },
  { ext: ".coin", price: 14.99, category: "web3", desc: "Cryptocurrency identity", hot: false },
  { ext: ".com", price: 4.99, category: "traditional", desc: "The most trusted TLD in the world", hot: false },
  { ext: ".io", price: 7.99, category: "traditional", desc: "Favorite of tech startups", hot: false },
  { ext: ".app", price: 6.99, category: "traditional", desc: "Perfect for mobile and web apps", hot: false },
  { ext: ".dev", price: 5.99, category: "traditional", desc: "For developers and dev tools", hot: false },
  { ext: ".ai", price: 24.99, category: "traditional", desc: "For artificial intelligence companies", hot: true },
  { ext: ".xyz", price: 3.99, category: "traditional", desc: "The next generation TLD", hot: false },
  { ext: ".org", price: 4.99, category: "traditional", desc: "For nonprofits and communities", hot: false },
  { ext: ".net", price: 4.99, category: "traditional", desc: "Network and infrastructure brands", hot: false },
  { ext: ".co", price: 8.99, category: "traditional", desc: "Short, memorable alternative to .com", hot: false },
  { ext: ".tech", price: 9.99, category: "traditional", desc: "Technology companies and products", hot: false },
  { ext: ".store", price: 7.99, category: "traditional", desc: "E-commerce and retail brands", hot: false },
  { ext: ".club", price: 3.99, category: "traditional", desc: "Communities and membership sites", hot: false },
];

const CATEGORIES = [
  { id: "all", label: "All Extensions" },
  { id: "web3", label: "Web3 / Blockchain" },
  { id: "traditional", label: "Traditional" },
];

export default function DomainsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [results, setResults] = useState<{ domain: string; available: boolean; price: number }[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { addItem, items } = useCart();

  const inCart = (domain: string) => items.some((i) => i.id === domain);

  const filtered = ALL_TLDS.filter(
    (t) => category === "all" || t.category === category
  );

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const name = query.toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/\.[^.]+$/, "");
      setResults(
        ALL_TLDS.map((t) => ({
          domain: `${name}${t.ext}`,
          available: Math.random() > 0.35,
          price: t.price,
        }))
      );
      setLoading(false);
    }, 900);
  };

  const handleAddToCart = (domain: string, price: number) => {
    addItem({ id: domain, domain, price });
  };

  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-indigo-900 to-violet-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(124,58,237,0.4),_transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Find your domain</h1>
          <p className="text-blue-200 text-lg mb-8">
            Search across 180+ extensions — Web3 blockchain domains and traditional TLDs.
          </p>
          <form onSubmit={search} className="flex gap-3 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. myname, satoshi, web3brand…"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all text-lg"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="px-6 py-4 rounded-xl bg-white text-blue-900 font-bold text-base hover:bg-blue-50 transition-colors shadow-lg disabled:opacity-70 whitespace-nowrap"
            >
              {loading ? "Searching…" : "Search"}
            </Button>
          </form>
          <p className="mt-4 text-blue-300 text-sm">
            Type your name above → click Search → pick your domains → add to cart → pay with Stripe
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {["satoshi", "myname", "web3brand", "cryptoking"].map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => {
                  setQuery(ex);
                  setTimeout(() => {
                    const name = ex.toLowerCase();
                    setLoading(true);
                    setTimeout(() => {
                      setResults(
                        ALL_TLDS.map((t) => ({
                          domain: `${name}${t.ext}`,
                          available: Math.random() > 0.35,
                          price: t.price,
                        }))
                      );
                      setLoading(false);
                    }, 600);
                  }, 0);
                }}
                className="px-3 py-1.5 rounded-full bg-white/10 text-blue-200 text-xs font-medium hover:bg-white/20 transition-colors border border-white/10"
              >
                Try "{ex}"
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {results ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Results for <span className="text-blue-600">"{query}"</span>
                </h2>
                <button
                  onClick={() => { setResults(null); setQuery(""); }}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Clear results
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {results.map(({ domain, available, price }) => (
                  <div
                    key={domain}
                    className={`flex items-center justify-between bg-white rounded-xl border px-5 py-4 transition-all ${
                      available
                        ? "border-gray-100 hover:border-blue-200 hover:shadow-md"
                        : "border-gray-100 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2.5 h-2.5 rounded-full ${available ? "bg-emerald-400" : "bg-gray-300"}`} />
                      <span className="font-semibold text-gray-900">{domain}</span>
                    </div>
                    {available ? (
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-900 text-sm">${price}</span>
                        {inCart(domain) ? (
                          <span className="px-3.5 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-semibold flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Added
                          </span>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(domain, price)}
                            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                          >
                            Add to cart
                          </button>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                        Taken
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">All extensions</h2>
                  <p className="text-gray-500 text-sm mt-1">{filtered.length} extensions available</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCategory(c.id)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        category === c.id
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map(({ ext, price, desc, hot, category: cat }) => (
                  <div
                    key={ext}
                    className="relative bg-white rounded-2xl border border-gray-100 p-5 hover:border-blue-200 hover:shadow-lg transition-all duration-200 group cursor-pointer"
                  >
                    {hot && (
                      <span className="absolute top-3 right-3 text-[10px] font-bold bg-gradient-to-r from-orange-400 to-rose-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wide">
                        Hot
                      </span>
                    )}
                    <div className="flex items-start gap-3">
                      <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white ${
                        cat === "web3"
                          ? "bg-gradient-to-br from-violet-500 to-blue-600"
                          : "bg-gradient-to-br from-gray-600 to-gray-800"
                      }`}>
                        {ext.replace(".", "").slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="font-bold text-gray-900 text-lg">{ext}</span>
                          {cat === "web3" && (
                            <span className="text-xs text-violet-600 font-semibold bg-violet-50 px-1.5 py-0.5 rounded">
                              Web3
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-sm font-bold text-gray-900">
                            ${price}
                            <span className="text-xs font-normal text-gray-400">
                              {cat === "web3" ? " one-time" : "/yr"}
                            </span>
                          </span>
                          <button
                            onClick={() => {
                              setQuery(ext.replace(".", ""));
                              search({ preventDefault: () => {} } as any);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-semibold"
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
