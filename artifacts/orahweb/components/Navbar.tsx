"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { OrahWebLogoFull } from "@/components/OrahWebLogo";

const NAV_LINKS = [
  { href: "/domains", label: "Domains" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setIsOpen } = useCart();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b shadow-sm" style={{ background: "var(--nav-bg)", borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center group">
            <OrahWebLogoFull iconSize={34} className="group-hover:opacity-90 transition-opacity" />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === href || pathname.startsWith(href + "/")
                    ? "bg-green-50 text-green-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <ThemeSwitcher />

            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 rounded-lg theme-btn transition-colors"
              aria-label="Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>

            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                    pathname === "/dashboard"
                      ? "bg-green-50 text-green-700"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  My Domains
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="px-3 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity whitespace-nowrap"
                  style={{ background: "var(--surface-3)", color: "var(--text)" }}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
                  style={{ background: "linear-gradient(135deg, #ffffff 0%, #4ade80 50%, #facc15 100%)", color: "#14532d" }}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-1">
            <ThemeSwitcher />
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors theme-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={cn("block h-0.5 rounded transition-all", menuOpen && "rotate-45 translate-y-1.5")} style={{ background: "var(--text)" }} />
                <span className={cn("block h-0.5 rounded transition-all", menuOpen && "opacity-0")} style={{ background: "var(--text)" }} />
                <span className={cn("block h-0.5 rounded transition-all", menuOpen && "-rotate-45 -translate-y-1.5")} style={{ background: "var(--text)" }} />
              </div>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 border-t space-y-1" style={{ borderColor: "var(--border-2)" }}>
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "block px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === href ? "bg-green-50 text-green-700" : "text-gray-600 hover:bg-gray-100"
                )}
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              {session ? (
                <>
                  <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="block px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100">
                    My Domains
                  </Link>
                  <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full px-4 py-2 rounded-lg text-sm font-medium text-left" style={{ background: "var(--surface-3)", color: "var(--text)" }}>
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="block px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100">
                    Sign in
                  </Link>
                  <Link href="/domains" onClick={() => setMenuOpen(false)} className="block px-4 py-2 rounded-xl text-sm font-semibold text-center hover:opacity-90" style={{ background: "linear-gradient(135deg, #ffffff 0%, #4ade80 50%, #facc15 100%)", color: "#14532d" }}>
                    Search Domains
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
