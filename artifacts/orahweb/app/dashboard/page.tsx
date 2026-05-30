import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Section } from "@/components/Layout";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your OrahWeb account dashboard.",
  robots: { index: false, follow: false },
};

const STATS = [
  { label: "Active Projects", value: "3", change: "+1 this month", up: true },
  { label: "Open Tickets", value: "7", change: "-2 this week", up: false },
  { label: "Uptime", value: "99.9%", change: "Last 30 days", up: true },
  { label: "Team Members", value: "8", change: "Across 3 timezones", up: true },
];

const RECENT_ACTIVITY = [
  { action: "Deployment successful", project: "orahweb.com v2.1.4", time: "2 min ago", type: "success" },
  { action: "New contact form submission", project: "Jane Smith — Enterprise inquiry", time: "14 min ago", type: "info" },
  { action: "SSL certificate renewed", project: "*.orahweb.com", time: "1 hour ago", type: "success" },
  { action: "Performance alert resolved", project: "API latency spike — P50 back to normal", time: "3 hours ago", type: "warning" },
  { action: "Database backup completed", project: "Daily snapshot · 2.4 GB", time: "6 hours ago", type: "success" },
];

const PROJECTS = [
  { name: "OrahWeb v2.2", status: "In Progress", progress: 68, due: "Jun 15" },
  { name: "Client Portal MVP", status: "Review", progress: 92, due: "Jun 8" },
  { name: "API v3 Migration", status: "Planning", progress: 15, due: "Jul 1" },
];

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/dashboard");
  }

  return (
    <>
      <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-violet-900 text-white px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-blue-300 text-sm font-medium mb-2">Welcome back</p>
          <h1 className="text-3xl font-bold">{session.user?.name ?? "User"}</h1>
          <p className="text-blue-200 text-sm mt-1">{session.user?.email}</p>
        </div>
      </div>

      <Section className="bg-gray-50 pt-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {STATS.map(({ label, value, change, up }) => (
            <Card key={label} padding="md">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {label}
              </p>
              <p className="text-3xl font-bold text-gray-900">{value}</p>
              <p
                className={`text-xs mt-1 font-medium ${
                  up ? "text-green-600" : "text-rose-600"
                }`}
              >
                {change}
              </p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Projects</h2>
            <div className="space-y-3">
              {PROJECTS.map((project) => (
                <Card key={project.name} padding="md" hover>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{project.name}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Due {project.due}</p>
                    </div>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        project.status === "In Progress"
                          ? "bg-blue-50 text-blue-700"
                          : project.status === "Review"
                          ? "bg-violet-50 text-violet-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-violet-600 h-1.5 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <p className="text-right text-xs text-gray-400 mt-1">{project.progress}%</p>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <Card padding="md" className="divide-y divide-gray-100">
              {RECENT_ACTIVITY.map((item, i) => (
                <div key={i} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                  <div
                    className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                      item.type === "success"
                        ? "bg-green-500"
                        : item.type === "warning"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.action}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">{item.project}</p>
                    <p className="text-xs text-gray-300 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
