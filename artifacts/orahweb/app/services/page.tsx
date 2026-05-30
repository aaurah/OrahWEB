import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, SectionHeader } from "@/components/Layout";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "OrahWeb offers full-stack web development, design systems, performance audits, and ongoing technical partnership.",
  openGraph: {
    title: "OrahWeb Services",
    description:
      "From MVPs to enterprise platforms — see what we build.",
  },
};

const SERVICES = [
  {
    number: "01",
    title: "Web Development",
    description:
      "Custom websites and web applications built with modern frameworks like Next.js, React, and TypeScript. Server-side rendering, API integrations, CMS, and everything in between.",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    number: "02",
    title: "UI/UX Design",
    description:
      "User research, wireframes, prototypes, and polished high-fidelity designs. We use Figma to create interfaces that are both beautiful and usable.",
    tags: ["Figma", "User Research", "Design Systems", "Prototyping"],
    gradient: "from-violet-600 to-pink-500",
  },
  {
    number: "03",
    title: "Performance & SEO",
    description:
      "Technical audits, Core Web Vitals optimization, structured data, and server-side rendering strategies that push you to the top of search results.",
    tags: ["Core Web Vitals", "Lighthouse", "Schema.org", "Next.js SSR"],
    gradient: "from-emerald-600 to-blue-500",
  },
  {
    number: "04",
    title: "API & Backend",
    description:
      "RESTful and GraphQL APIs, authentication systems, database design, and cloud deployments on Vercel, AWS, and Railway.",
    tags: ["REST", "GraphQL", "Drizzle ORM", "Auth", "AWS"],
    gradient: "from-orange-500 to-rose-500",
  },
  {
    number: "05",
    title: "E-Commerce",
    description:
      "Shopify, Stripe-powered custom storefronts, inventory management, and checkout flows optimized for conversion.",
    tags: ["Shopify", "Stripe", "Next Commerce", "Subscriptions"],
    gradient: "from-teal-500 to-green-500",
  },
  {
    number: "06",
    title: "Technical Partnership",
    description:
      "Monthly retainer engagements where we act as your embedded engineering team — shipping features, fixing bugs, and keeping your stack up to date.",
    tags: ["Retainer", "Code Review", "Architecture", "Mentorship"],
    gradient: "from-blue-500 to-violet-600",
  },
];

const PROCESS = [
  { step: "01", title: "Discovery", description: "We learn your goals, users, and constraints in a focused kick-off session." },
  { step: "02", title: "Planning", description: "Architecture, timeline, and milestones aligned before a single line of code is written." },
  { step: "03", title: "Build", description: "Iterative development with weekly demos and async updates throughout." },
  { step: "04", title: "Launch", description: "Staged rollout, monitoring, and a go-live review to catch anything before your users do." },
  { step: "05", title: "Grow", description: "Post-launch support, feature iterations, and performance monitoring as your product evolves." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="What we build"
        description="From single-page marketing sites to complex multi-tenant applications — we've shipped it all. Here's what we do best."
      />

      <Section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <Card key={service.number} hover className="flex flex-col gap-5">
              <div className="flex items-start justify-between">
                <span
                  className={`text-xs font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent uppercase tracking-widest`}
                >
                  {service.number}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div className="mt-auto flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-gray-50">
        <SectionHeader
          eyebrow="How we work"
          title="Our process"
          description="Clear, predictable, and collaborative — every time."
          center
        />
        <div className="max-w-3xl mx-auto space-y-4">
          {PROCESS.map(({ step, title, description }) => (
            <div
              key={step}
              className="flex gap-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                {step}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">Not sure what you need?</h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            Let&apos;s talk. A 30-minute call is usually enough to figure out the right
            approach together.
          </p>
          <div className="mt-8">
            <Link href="/contact">
              <Button size="lg">Book a Free Call</Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
