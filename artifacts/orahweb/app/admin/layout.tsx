import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "./_components/AdminSidebar";
import { AdminMobileNav } from "./_components/AdminMobileNav";

export const metadata: Metadata = {
  title: { template: "%s — OrahWeb Admin", default: "Admin Panel" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/admin");
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="lg:hidden flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">O</span>
              </div>
              <span className="font-bold text-gray-900">
                Orah<span className="text-blue-600">Web</span>
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 font-semibold">
                Admin
              </span>
            </div>
            <div className="hidden lg:block text-sm font-medium text-gray-400">
              Admin Panel
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900 leading-none">
                  {session.user.name}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{session.user.email}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {session.user.name?.[0]?.toUpperCase() ?? "A"}
              </div>
            </div>
          </div>
          <div className="lg:hidden mt-3">
            <AdminMobileNav />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
