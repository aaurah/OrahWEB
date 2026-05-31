import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUsers } from "@/lib/user-store";
import { UsersTable } from "./_users-table";

export const metadata: Metadata = { title: "Users" };

export default async function AdminUsersPage() {
  const [session, users] = await Promise.all([
    getServerSession(authOptions),
    Promise.resolve(getUsers()),
  ]);

  return <UsersTable initialUsers={users} currentUserId={session?.user.id ?? ""} />;
}
