import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, SectionHeader } from "@/components/Layout";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "About OrahWeb",
  description: "OrahWeb is building the identity layer of the decentralized internet — blockchain domains that you truly own, forever.",
};

const MILESTONES = [
  { year: "2020", event: "OrahWeb founded with a mission to give people true ownership of their internet identity." },
  { year: "2021", event: "Launched .crypto and .wallet extensions on Ethereum. 50,000 domains registered in the first month." },
  { year: "2022", event: "Expanded to Polygon for low-cost minting. Integrated with MetaMask, Coinbase Wallet, and Trust Wallet." },
  { year: "2023", event: "Crossed 2 million registered domains. Launched decentralized website hosting on IPFS." },
  { year: "2024", event: "Added Solana support, NFT avatar linking, and launched the OrahWeb SDK for developers." },
  { year: "2025", event: "4.2M+ domains. 180+ extensions. Used in 150+ countries. Building the next chapter." },
];

const VALUES = [
  {
    title: "Self-sovereignty first",
    description: "We believe your digital identity belongs to you — not to a corporation, a government, or us. Every design decision starts with that principle.",
    emoji: "🔐",
  },
  {
    title: "No gatekeepers",
    description: "We don't have the ability to suspend, reclaim, or modify your domain. That's not a bug — it's the point. Censorship resistance is a feature.",
    emoji: "⛓",
  },
  {
    title: "Open protocols",
    description: "Our resolvers are open source. Our smart contracts are verified and audited. Anyone can build on top of OrahWeb's infrastructure.",
    emoji: "🌐",
  },
  {
    title: "Long-term thinking",
    description: "We build for decades, not quarters. The domains registered today should work perfectly in 2050. We design for permanence.",
    emoji: "♾️",
  },
];

const TEAM = [
  { name: "Leila Orah", role: "Co-Founder & CEO", bio: "Former Ethereum Foundation. Obsessed with digital sovereignty and the open web.", initials: "LO", color: "from-violet-500 to-purple-600" },
  { name: "Marcus Webb", role: "Co-Founder & CTO", bio: "Smart contract engineer. Built DeFi protocols handling $2B+ in volume before OrahWeb.", initials: "MW", color: "from-blue-500 to-cyan-500" },
  { name: "Priya Nair", role: "Head of Product", bio: "Made Web3 products used by millions. Believes great UX is the bridge between crypto and mainstream adoption.", initials: "PN", color: "from-rose-500 to-pink-500" },
  { name: "James Osei", role: "Head of Engineering", bio: "Infrastructure architect with experience scaling systems to hundreds of millions of users at AWS.", initials: "JO", color: "from-emerald-500 to-teal-500" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="We're OrahWeb."
        description="We believe your name on the internet should belong to you — not to a registrar that can suspend it, a company that can censor it, or a government that can seize it."
      />

      <Section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div>
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">Our Mission</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
              The identity layer of the decentralized internet
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                The traditional domain name system was designed in 1983. It was brilliant for its time, but it was never built for ownership. You don&apos;t own your domain — you rent it. Every year. From a company that can take it back.
              </p>
              <p>
                OrahWeb is different. When you register a domain with us, it&apos;s minted as an NFT directly to your wallet. You hold the private key. You hold the domain. No one — not even us — has the power to change that.
              </p>
              <p>
                Beyond ownership, we&apos;re building the infrastructure for a new kind of internet identity: one that works as a crypto payment address, a decentralized website, a portable profile, and a single login for the entire Web3 ecosystem.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "4.2M+", label: "Domains Minted" },
              { value: "180+", label: "TLDs" },
              { value: "2020", label: "Founded" },
              { value: "150+", label: "Countries" },
            ].map(({ value, label }) => (
              <div key={label} className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl p-6 text-center border border-blue-100">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  {value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-gray-50">
        <SectionHeader eyebrow="Our Story" title="How we got here" center />
        <div className="max-w-3xl mx-auto">
          {MILESTONES.map(({ year, event }, i) => (
            <div key={year} className="flex gap-6 pb-8 last:pb-0">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {year.slice(2)}
                </div>
                {i < MILESTONES.length - 1 && (
                  <div className="w-0.5 flex-1 bg-gradient-to-b from-blue-200 to-violet-100 mt-2" />
                )}
              </div>
              <div className="pt-2 pb-2">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{year}</span>
                <p className="text-gray-700 mt-1 leading-relaxed">{event}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <SectionHeader eyebrow="What we believe" title="Our principles" center />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {VALUES.map((v) => (
            <Card key={v.title} hover className="flex gap-4">
              <div className="text-3xl shrink-0">{v.emoji}</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-gray-50">
        <SectionHeader eyebrow="The Team" title="Who builds OrahWeb" center />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {TEAM.map((m) => (
            <Card key={m.name} hover className="text-center">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${m.color} text-white font-bold text-xl mx-auto mb-4 flex items-center justify-center`}>
                {m.initials}
              </div>
              <h3 className="font-semibold text-gray-900">{m.name}</h3>
              <p className="text-xs font-semibold text-blue-600 mt-1 mb-3">{m.role}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{m.bio}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">Ready to own your name?</h2>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Join 650,000+ people who&apos;ve already claimed their place on the decentralized web.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link href="/domains">
              <Button size="lg">Search Domains</Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">View Pricing</Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
