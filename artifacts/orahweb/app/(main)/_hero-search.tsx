"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const POPULAR_TLDS = [".crypto", ".web3", ".nft", ".wallet", ".dao", ".com", ".io", ".ai"];

export function HeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const name = query.trim().toLowerCase().replace(/^https?:\/\//, "").split(".")[0];
    if (!name) return;
    router.push(`/admin/domains?q=${encodeURIComponent(name)}`);
  }

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your perfect domain..."
          className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-blue-200/70 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent backdrop-blur-sm"
        />
        <button
          type="submit"
          className="px-6 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-violet-900/40 whitespace-nowrap"
        >
          Search
        </button>
      </form>
      <div className="mt-4 flex flex-wrap gap-2 items-center">
        <span className="text-xs text-blue-300/70">Popular:</span>
        {POPULAR_TLDS.map((tld) => (
          <button
            key={tld}
            type="button"
            onClick={() => {
              const name = tld.replace(".", "");
              router.push(`/admin/domains?q=${name}`);
            }}
            className="text-xs text-blue-300 hover:text-white transition-colors font-mono"
          >
            {tld}
          </button>
        ))}
      </div>
    </div>
  );
}
