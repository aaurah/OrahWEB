import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/Layout";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for Web3 blockchain domains and traditional TLDs. One-time fees, no renewals for blockchain domains.",
};

const PLANS = [
  {
    name: "Starter",
    description: "Perfect for individuals exploring Web3 identity.",
    price: 9.99,
    period: "one-time per domain",
    highlight: false,
    features: [
      "1 Web3 domain (any .web3 or .nft)",
      "Crypto wallet address linking",
      "IPFS website hosting",
      "Multi-chain support",
      "No renewal fees — ever",
      "Basic DNS management",
      "Email support",
    ],
    cta: "Get Started",
    href: "/domains",
  },
  {
    name: "Builder",
    description: "For developers and creators who want premium extensions.",
    price: 49.99,
    period: "one-time per domain",
    highlight: true,
    badge: "Most Popular",
    features: [
      "1 premium Web3 domain (.crypto, .dao, .x)",
      "Everything in Starter",
      "Priority DNS propagation",
      "Subdomain management (unlimited)",
      "NFT avatar & profile linking",
      "Social handle integration",
      "Advanced analytics",
      "Priority support",
    ],
    cta: "Start Building",
    href: "/domains",
  },
  {
    name: "Enterprise",
    description: "For protocols, DAOs, and organizations at scale.",
    price: null,
    period: "custom pricing",
    highlight: false,
    features: [
      "Bulk domain registration (10+)",
      "Custom TLD minting",
      "Dedicated account manager",
      "SLA-backed uptime guarantee",
      "Custom resolver deployment",
      "API access & webhooks",
      "White-label options",
      "24/7 dedicated support",
    ],
    cta: "Contact Sales",
    href: "/contact",
  },
];

const DOMAIN_PRICES = [
  { ext: ".web3", price: 9.99, type: "One-time", chain: "Polygon" },
  { ext: ".crypto", price: 19.99, type: "One-time", chain: "Ethereum" },
  { ext: ".nft", price: 14.99, type: "One-time", chain: "Polygon" },
  { ext: ".wallet", price: 12.99, type: "One-time", chain: "Polygon" },
  { ext: ".dao", price: 24.99, type: "One-time", chain: "Ethereum" },
  { ext: ".x", price: 29.99, type: "One-time", chain: "Ethereum" },
  { ext: ".com", price: 4.99, type: "Per year", chain: "DNS" },
  { ext: ".io", price: 7.99, type: "Per year", chain: "DNS" },
  { ext: ".ai", price: 24.99, type: "Per year", chain: "DNS" },
  { ext: ".app", price: 6.99, type: "Per year", chain: "DNS" },
  { ext: ".dev", price: 5.99, type: "Per year", chain: "DNS" },
  { ext: ".xyz", price: 3.99, type: "Per year", chain: "DNS" },
];

const FAQS = [
  {
    q: "Do Web3 domains really never need renewal?",
    a: "Yes. When you register a blockchain domain through OrahWeb, it's minted as an NFT to your wallet. The token lives on-chain indefinitely — there are no annual fees, no expiration, and no renewals required.",
  },
  {
    q: "What chains do you support?",
    a: "OrahWeb supports Ethereum mainnet, Polygon, and Solana. Each TLD is deployed on a specific chain — most .web3, .nft, .wallet domains live on Polygon (low fees), while .crypto and .dao are on Ethereum.",
  },
  {
    q: "Can I use my domain as a crypto payment address?",
    a: "Absolutely. You can map your domain to any wallet addresses — BTC, ETH, SOL, USDC, and 300+ other currencies. Anyone can send you crypto by typing yourname.crypto instead of a long hex address.",
  },
  {
    q: "What if I want to sell my domain later?",
    a: "Since your domain is an NFT, you can list it on any NFT marketplace (OpenSea, Blur, etc.) or transfer it directly to another wallet. You retain full ownership and control.",
  },
  {
    q: "Can I host a decentralized website?",
    a: "Yes. Point your domain to an IPFS or Arweave content hash and you have a fully decentralized website — hosted on a peer-to-peer network, immune to takedowns and censorship.",
  },
];

export default function PricingPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-[#052e16] via-green-900 to-[#064e3b] text-white text-center px-4 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(22,163,74,0.4),_transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold">Simple, honest pricing</h1>
          <p className="mt-5 text-lg text-blue-100 leading-relaxed">
            Web3 domains are a one-time purchase — no renewals, no surprises.
            Traditional domains renew annually at the same rate you register.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </div>

      <Section className="bg-gray-50 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.highlight
                  ? "bg-gradient-to-b from-green-600 to-emerald-700 text-white shadow-2xl shadow-green-300 scale-105"
                  : "bg-white border border-gray-100 shadow-sm text-gray-900"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold bg-gradient-to-r from-orange-400 to-rose-500 text-white px-4 py-1 rounded-full uppercase tracking-wide whitespace-nowrap">
                  {plan.badge}
                </span>
              )}

              <div className="mb-6">
                <h3 className={`font-bold text-xl ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mt-1 ${plan.highlight ? "text-blue-100" : "text-gray-500"}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                {plan.price ? (
                  <>
                    <span className={`text-4xl font-bold ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                      ${plan.price}
                    </span>
                    <span className={`text-sm ml-2 ${plan.highlight ? "text-blue-200" : "text-gray-400"}`}>
                      {plan.period}
                    </span>
                  </>
                ) : (
                  <span className={`text-3xl font-bold ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                    Custom
                  </span>
                )}
              </div>

              <ul className="space-y-2.5 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <svg
                      className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? "text-blue-200" : "text-blue-500"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={plan.highlight ? "text-blue-50" : "text-gray-600"}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href}>
                <Button
                  className={`w-full py-3 rounded-xl font-semibold ${
                    plan.highlight
                      ? "bg-white text-green-700 hover:bg-green-50"
                      : "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <SectionHeader
          eyebrow="Domain Prices"
          title="Per-extension pricing"
          description="All Web3 domains are one-time purchases. Traditional TLDs renew annually."
          center
        />
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-3.5 font-semibold text-gray-500 uppercase text-xs tracking-wider">Extension</th>
                  <th className="text-left px-6 py-3.5 font-semibold text-gray-500 uppercase text-xs tracking-wider">Price</th>
                  <th className="text-left px-6 py-3.5 font-semibold text-gray-500 uppercase text-xs tracking-wider">Billing</th>
                  <th className="text-left px-6 py-3.5 font-semibold text-gray-500 uppercase text-xs tracking-wider">Network</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {DOMAIN_PRICES.map(({ ext, price, type, chain }) => (
                  <tr key={ext} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-bold text-gray-900">{ext}</span>
                      {chain !== "DNS" && (
                        <span className="ml-2 text-xs text-violet-600 font-medium bg-violet-50 px-1.5 py-0.5 rounded">
                          Web3
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">${price}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        type === "One-time"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{chain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section className="bg-gray-50">
        <SectionHeader eyebrow="FAQ" title="Common questions" center />
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map(({ q, a }) => (
            <Card key={q} padding="lg">
              <h3 className="font-semibold text-gray-900 text-base mb-2">{q}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
