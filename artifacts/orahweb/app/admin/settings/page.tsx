"use client";

import { useState } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

const SETTINGS_GROUPS = [
  {
    title: "Site Identity",
    fields: [
      { key: "siteName", label: "Site Name", value: "OrahWeb", type: "text" },
      { key: "tagline", label: "Tagline", value: "We build the web your users love.", type: "text" },
      { key: "contactEmail", label: "Contact Email", value: "hello@orahweb.com", type: "email" },
    ],
  },
  {
    title: "SEO",
    fields: [
      { key: "metaTitle", label: "Default Meta Title", value: "OrahWeb — Modern Digital Solutions", type: "text" },
      { key: "metaDescription", label: "Default Meta Description", value: "OrahWeb builds fast, beautiful, and scalable websites and web applications for ambitious businesses.", type: "textarea" },
    ],
  },
  {
    title: "Features",
    fields: [
      { key: "contactFormEnabled", label: "Contact Form", value: "true", type: "toggle" },
      { key: "maintenanceMode", label: "Maintenance Mode", value: "false", type: "toggle" },
    ],
  },
];

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Site configuration and feature flags.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700 font-medium">
        Demo mode — settings are not persisted. Connect a database or config store to save changes.
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {SETTINGS_GROUPS.map((group) => (
          <Card key={group.title} padding="lg">
            <h2 className="text-base font-semibold text-gray-900 mb-5">{group.title}</h2>
            <div className="space-y-5">
              {group.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      defaultValue={field.value}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    />
                  ) : field.type === "toggle" ? (
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          field.value === "true" ? "bg-blue-600" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                            field.value === "true" ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                      <span className="text-sm text-gray-600">
                        {field.value === "true" ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      defaultValue={field.value}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}

        <div className="flex items-center justify-between">
          <div>
            {saved && (
              <span className="text-sm text-green-600 font-medium flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Settings saved (demo — not persisted)
              </span>
            )}
          </div>
          <Button type="submit" size="md">
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
