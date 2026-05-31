export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  banned: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

const store: ManagedUser[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@orahweb.com",
    role: "admin",
    banned: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120).toISOString(),
    lastLoginAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@orahweb.com",
    role: "user",
    banned: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    lastLoginAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
];

export function getUsers(): ManagedUser[] {
  return [...store];
}

export function getUserById(id: string): ManagedUser | undefined {
  return store.find((u) => u.id === id);
}

export function updateUser(
  id: string,
  patch: Partial<Pick<ManagedUser, "role" | "banned">>
): ManagedUser | null {
  const user = store.find((u) => u.id === id);
  if (!user) return null;
  Object.assign(user, patch);
  return { ...user };
}

export function getUserStats() {
  return store.reduce(
    (acc, u) => {
      acc.total++;
      if (u.role === "admin") acc.admins++;
      if (u.banned) acc.banned++;
      return acc;
    },
    { total: 0, admins: 0, banned: 0 }
  );
}
