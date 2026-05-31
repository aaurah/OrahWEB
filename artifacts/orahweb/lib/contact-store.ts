export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "new" | "read" | "replied";
}

export const STATUS_STYLES: Record<ContactSubmission["status"], string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  read: "bg-gray-100 text-gray-600 border-gray-200",
  replied: "bg-green-50 text-green-700 border-green-200",
};

const submissions: ContactSubmission[] = [
  {
    id: "seed-1",
    name: "Sarah Johnson",
    email: "sarah@techcorp.io",
    subject: "Enterprise website redesign",
    message:
      "Hi, we're a 200-person SaaS company looking to rebuild our marketing site. We need a modern, fast website that converts well. Budget is around $30k. Can we schedule a call?",
    createdAt: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    status: "new",
  },
  {
    id: "seed-2",
    name: "Marcus Williams",
    email: "marcus@startupventures.com",
    subject: "MVP web application build",
    message:
      "We're a seed-stage startup looking to build our MVP. We have a Figma design ready and need a team to develop the frontend and backend. Timeline is 3 months.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    status: "read",
  },
  {
    id: "seed-3",
    name: "Priya Patel",
    email: "priya@designstudio.co",
    subject: "E-commerce platform",
    message:
      "Looking to build a custom e-commerce solution for our fashion brand. We want a highly customized experience rather than Shopify. Please let me know your availability.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    status: "replied",
  },
  {
    id: "seed-4",
    name: "Tom Chen",
    email: "tom@analyticsco.com",
    subject: "Dashboard and analytics portal",
    message:
      "We need a data visualization dashboard for our clients. Complex charts, real-time updates, role-based access. Interested in a discovery call to discuss scope.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    status: "replied",
  },
];

export function addSubmission(
  data: Omit<ContactSubmission, "id" | "createdAt" | "status">
): ContactSubmission {
  const submission: ContactSubmission = {
    id: crypto.randomUUID(),
    ...data,
    createdAt: new Date().toISOString(),
    status: "new",
  };
  submissions.push(submission);
  return submission;
}

export function getSubmissions(): ContactSubmission[] {
  return [...submissions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getSubmissionById(id: string): ContactSubmission | undefined {
  return submissions.find((s) => s.id === id);
}

export function updateSubmissionStatus(
  id: string,
  status: ContactSubmission["status"]
): boolean {
  const submission = submissions.find((s) => s.id === id);
  if (!submission) return false;
  submission.status = status;
  return true;
}

export function getSubmissionStats() {
  return submissions.reduce(
    (acc, s) => {
      acc.total++;
      acc[s.status]++;
      return acc;
    },
    { total: 0, new: 0, read: 0, replied: 0 }
  );
}
