import Link from "next/link";

const FOOTER_LINKS = {
  Domains: [
    { label: "Search Domains", href: "/admin/domains" },
    { label: "Web3 Extensions", href: "/admin/domains" },
    { label: "TLD Pricing", href: "/admin/domains" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="font-bold text-xl text-white">
                Orah<span className="text-blue-400">Web</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-xs">
              Register blockchain and traditional domains. Own your identity on
              the decentralized web — no renewals, no censorship, no middlemen.
            </p>
            <div className="mt-6 flex gap-4">
              {["Twitter", "LinkedIn", "GitHub"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-xs font-medium hover:text-white transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-white text-sm font-semibold mb-4">{group}</h3>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} OrahWeb. All rights reserved.
          </p>
          <p className="text-xs">
            Built with Next.js 14 &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
