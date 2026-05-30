"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/contacts", label: "Contacts" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden flex items-center gap-1 overflow-x-auto pb-1">
      {NAV_ITEMS.map((item) => {
        const isActive = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
