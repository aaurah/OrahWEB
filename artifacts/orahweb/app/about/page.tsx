import type { Metadata } from "next";
import { PageHero, Section, SectionHeader } from "@/components/Layout";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about OrahWeb — our story, our team, and the values that drive everything we build.",
  openGraph: {
    title: "About OrahWeb",
    description:
      "We're a team of designers and engineers passionate about the open web.",
  },
};

const TEAM = [
  {
    name: "Sarah Orahmian",
    role: "Founder & CEO",
    bio: "15 years of experience building digital products for startups and Fortune 500s. Believer in the open web.",
    initials: "SO",
    color: "from-blue-500 to-violet-500",
  },
  {
    name: "James Keller",
    role: "Lead Engineer",
    bio: "Full-stack generalist. Previously at Vercel and Stripe. Obsessed with performance and developer experience.",
    initials: "JK",
    color: "from-emerald-500 to-blue-500",
  },
  {
    name: "Mia Chen",
    role: "Head of Design",
    bio: "Product designer with a background in cognitive psychology. If users don't love it, we aren't done.",
    initials: "MC",
    color: "from-rose-500 to-orange-500",
  },
  {
    name: "David Park",
    role: "Backend Architect",
    bio: "Infrastructure and API specialist. Builds systems that scale reliably from day one to day one million.",
    initials: "DP",
    color: "from-violet-500 to-pink-500",
  },
];

const VALUES = [
  {
    title: "Craft over quantity",
    description:
      "We take on fewer projects so we can do exceptional work on each one. Quality is not negotiable.",
  },
  {
    title: "Transparent by default",
    description:
      "No surprises — honest timelines, open communication, and proactive updates throughout every engagement.",
  },
  {
    title: "Long-term thinking",
    description:
      "We build for maintainability and growth, not the shortest path to launch. Future you will thank us.",
  },
  {
    title: "User obsession",
    description:
      "Every decision is filtered through one question: does this make the user's experience better?",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="We're OrahWeb."
        description="A small team of engineers and designers on a mission to make the web faster, more beautiful, and more human."
      />

      <Section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">
              Our Story
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Built by builders, for builders
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                OrahWeb started in 2018 with a simple frustration: most agencies
                treated web development as a commodity. Ship it, bill it, move on.
                We believed the web deserved better.
              </p>
              <p>
                We started small — just a founder and a text editor — and grew
                slowly, taking on only projects we genuinely cared about. That
                discipline paid off. Our work speaks for itself, and our clients
                keep coming back.
              </p>
              <p>
                Today we&apos;re a tight-knit team of eight, working across time zones
                on products used by thousands of people every day. We still move
                slowly, deliberately, and with care.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "2018", label: "Founded" },
              { value: "150+", label: "Projects" },
              { value: "8", label: "Team members" },
              { value: "12", label: "Countries served" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100"
              >
                <div className="text-3xl font-bold text-gray-900">{value}</div>
                <div className="text-sm text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-gray-50">
        <SectionHeader
          eyebrow="Our Values"
          title="What we stand for"
          description="These aren't posters on a wall — they're the principles that guide every decision we make."
          center
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {VALUES.map((v) => (
            <Card key={v.title} hover>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{v.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <SectionHeader
          eyebrow="The Team"
          title="The people behind the work"
          description="Small by design. Every person on our team works directly on client projects — no account managers, no middle layers."
          center
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member) => (
            <Card key={member.name} hover className="text-center">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-xl mx-auto mb-4`}
              >
                {member.initials}
              </div>
              <h3 className="font-semibold text-gray-900">{member.name}</h3>
              <p className="text-xs font-medium text-blue-600 mt-1 mb-3">{member.role}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
