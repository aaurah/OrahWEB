"use client";

import { useState } from "react";
import { Section } from "@/components/Layout";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

const CONTACT_INFO = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "support@orahweb.com",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    label: "Community",
    value: "discord.gg/orahweb",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Response time",
    value: "Within 24 hours",
  },
];

const TOPICS = [
  "Domain registration question",
  "Wallet / crypto records",
  "Decentralized website hosting",
  "Transfer or recovery",
  "Enterprise / bulk domains",
  "API & developer support",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject: form.topic }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", topic: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-indigo-900 to-violet-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(124,58,237,0.3),_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-4xl sm:text-5xl font-bold">Get in touch</h1>
          <p className="mt-5 text-lg text-blue-100 max-w-xl leading-relaxed">
            Questions about domains, transfers, wallet records, or anything else — we&apos;re here to help.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </div>

      <Section className="bg-gray-50 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Contact & Support</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Whether it&apos;s a technical issue, billing question, or domain transfer — reach out and we&apos;ll sort it.
              </p>
            </div>
            {CONTACT_INFO.map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">{value}</p>
                </div>
              </div>
            ))}
            <div className="bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-100 rounded-2xl p-5">
              <p className="text-sm font-semibold text-blue-900 mb-1">Looking for docs?</p>
              <p className="text-xs text-blue-700 leading-relaxed">
                Visit our developer docs for API references, smart contract addresses, and integration guides.
              </p>
              <a href="#" className="inline-block mt-3 text-xs font-semibold text-blue-600 hover:text-blue-800 underline underline-offset-2">
                Read the docs →
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <Card padding="lg">
              {status === "success" ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message received!</h3>
                  <p className="text-gray-500 mb-6">We&apos;ll get back to you within 24 hours.</p>
                  <Button variant="outline" onClick={() => setStatus("idle")}>Send another message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Send us a message</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                      <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Smith" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jane@example.com" className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Topic <span className="text-red-500">*</span></label>
                    <select required value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className={inputClass}>
                      <option value="">Select a topic...</option>
                      {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message <span className="text-red-500">*</span></label>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Describe your question or issue in detail..." className={inputClass + " resize-none"} />
                  </div>
                  {status === "error" && (
                    <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}
                  <div className="flex justify-end pt-2">
                    <Button type="submit" size="lg" loading={status === "loading"}>Send Message</Button>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
