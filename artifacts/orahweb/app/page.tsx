import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Card, CardHeader } from "@/components/Card";
import { Section, SectionHeader } from "@/components/Layout";

export const metadata: Metadata = {
  title: "OrahWeb — Modern Digital Solutions",
  description:
    "OrahWeb builds fast, beautiful, and scalable websites and web applications for ambitious businesses.",
};

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Blazing Fast",
    description:
      "Every site we build is optimized for Core Web Vitals — sub-second load times that keep users engaged.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Secure by Design",
    description:
      "Authentication, authorization, and data protection built into every layer of your application.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: "Pixel-Perfect Design",
    description:
      "Fully responsive, accessible interfaces that look stunning on every screen size and device.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Built to Scale",
    description:
      "Architecture that grows with your business — from MVP to millions of users without a rebuild.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: "SEO Optimized",
    description:
      "Structured metadata, server-side rendering, and semantic HTML that search engines love.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Ongoing Support",
    description:
      "We don't disappear after launch. Dedicated support, updates, and improvements for the long term.",
  },
];

const STATS = [
  { value: "150+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "5x", label: "Average ROI" },
  { value: "< 1s", label: "Avg. Load Time" },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-violet-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(124,58,237,0.4),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(37,99,235,0.4),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-40">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-widest uppercase text-blue-200 mb-8">
              Next.js 14 · TypeScript · Tailwind
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              We build the web
              <br />
              <span className="bg-gradient-to-r from-blue-300 to-violet-300 bg-clip-text text-transparent">
                your users love.
              </span>
            </h1>
            <p className="mt-8 text-xl text-blue-100 leading-relaxed max-w-xl">
              OrahWeb crafts fast, modern, and scalable digital products — from
              marketing sites to complex web applications.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/services">
                <Button size="lg" variant="primary">
                  Explore Services
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:border-white hover:bg-white/10 bg-transparent"
                >
                  Talk to Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      <Section className="bg-white pt-10 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                {value}
              </div>
              <div className="mt-1 text-sm text-gray-500 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-gray-50">
        <SectionHeader
          eyebrow="Why OrahWeb"
          title="Everything you need to succeed online"
          description="We combine technical excellence with design precision to deliver websites and apps that drive real results."
          center
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <Card key={feature.title} hover className="flex flex-col gap-4">
              <CardHeader
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-3xl p-12 sm:p-16 text-center text-white shadow-2xl shadow-blue-200">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ready to build something great?
          </h2>
          <p className="mt-4 text-blue-100 text-lg max-w-xl mx-auto">
            Let&apos;s talk about your project. No commitment, no pressure —
            just a conversation.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg"
              >
                Start a Project
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white bg-transparent hover:bg-white/10 hover:border-white"
              >
                Learn About Us
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
