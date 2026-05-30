import bcrypt from "bcryptjs";

export type AppUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "user";
};

export const registeredUsers: AppUser[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@orahweb.com",
    passwordHash: bcrypt.hashSync("password123", 10),
    role: "admin",
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@orahweb.com",
    passwordHash: bcrypt.hashSync("password123", 10),
    role: "user",
  },
];
