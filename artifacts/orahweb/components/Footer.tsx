import Link from "next/link";

const FOOTER_LINKS = {
  Domains: [
    { label: "Search Domains", href: "/domains" },
    { label: "Web3 Extensions", href: "/domains?category=web3" },
    { label: "Traditional TLDs", href: "/domains?category=traditional" },
    { label: "Pricing", href: "/pricing" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "/contact" },
  ],
  Developers: [
    { label: "API Docs", href: "#" },
    { label: "SDK", href: "#" },
    { label: "Smart Contracts", href: "#" },
    { label: "GitHub", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const CHAINS = ["Ethereum", "Polygon", "Solana"];

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="font-bold text-xl text-white">
                Orah<span className="text-blue-400">Web</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-xs">
              The domain platform for the decentralized web. Own your name forever — on blockchain and beyond.
            </p>
            <div className="mt-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Supported chains</p>
              <div className="flex gap-2 flex-wrap">
                {CHAINS.map((c) => (
                  <span key={c} className="text-xs bg-gray-800 text-gray-300 px-2.5 py-1 rounded-full">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-white text-sm font-semibold mb-4">{group}</h3>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">&copy; {new Date().getFullYear()} OrahWeb, Inc. All rights reserved.</p>
          <p className="text-xs">Not financial advice. Domains are digital assets.</p>
        </div>
      </div>
    </footer>
  );
}
