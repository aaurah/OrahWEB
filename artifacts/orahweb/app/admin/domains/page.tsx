import type { Metadata } from "next";
import { getOrders } from "@/lib/domain-store";
import { DomainSearch } from "./_domain-search";

export const metadata: Metadata = { title: "Domains" };

export default async function AdminDomainsPage() {
  const initialOrders = getOrders();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Buy a Domain</h1>
        <p className="text-sm text-gray-500 mt-1">
          Search and register domains at cost — registry wholesale pricing, no markup.
        </p>
      </div>
      <DomainSearch initialOrders={initialOrders} />
    </div>
  );
}
