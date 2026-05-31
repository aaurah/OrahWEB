export interface TLD {
  tld: string;
  price: number;
  renewalPrice: number;
  category: "popular" | "business" | "tech" | "creative";
}

export interface DomainOrder {
  id: string;
  domain: string;
  tld: string;
  pricePerYear: number;
  years: number;
  total: number;
  status: "processing" | "active" | "failed";
  orderedAt: string;
}

// Registry wholesale / cost-to-cost prices (USD/yr, 2024)
export const TLDS: TLD[] = [
  { tld: "com",    price: 8.39,  renewalPrice: 8.39,  category: "popular"  },
  { tld: "net",    price: 9.45,  renewalPrice: 9.45,  category: "popular"  },
  { tld: "org",    price: 9.93,  renewalPrice: 9.93,  category: "popular"  },
  { tld: "xyz",    price: 1.08,  renewalPrice: 1.08,  category: "popular"  },
  { tld: "us",     price: 6.98,  renewalPrice: 6.98,  category: "popular"  },
  { tld: "info",   price: 11.98, renewalPrice: 11.98, category: "business" },
  { tld: "co",     price: 24.98, renewalPrice: 24.98, category: "business" },
  { tld: "biz",    price: 11.98, renewalPrice: 11.98, category: "business" },
  { tld: "dev",    price: 12.00, renewalPrice: 12.00, category: "tech"     },
  { tld: "app",    price: 14.00, renewalPrice: 14.00, category: "tech"     },
  { tld: "io",     price: 31.95, renewalPrice: 31.95, category: "tech"     },
  { tld: "ai",     price: 69.00, renewalPrice: 69.00, category: "tech"     },
  { tld: "tech",   price: 37.99, renewalPrice: 37.99, category: "tech"     },
  { tld: "me",     price: 14.98, renewalPrice: 14.98, category: "creative" },
  { tld: "design", price: 35.00, renewalPrice: 35.00, category: "creative" },
  { tld: "studio", price: 23.99, renewalPrice: 23.99, category: "creative" },
  { tld: "online", price: 29.98, renewalPrice: 29.98, category: "creative" },
];

const orders: DomainOrder[] = [];

export function getOrders(): DomainOrder[] {
  return [...orders].sort(
    (a, b) => new Date(b.orderedAt).getTime() - new Date(a.orderedAt).getTime()
  );
}

export function addOrder(
  data: Omit<DomainOrder, "id" | "orderedAt" | "status">
): DomainOrder {
  const order: DomainOrder = {
    id: crypto.randomUUID(),
    ...data,
    status: "processing",
    orderedAt: new Date().toISOString(),
  };
  orders.push(order);
  return order;
}
