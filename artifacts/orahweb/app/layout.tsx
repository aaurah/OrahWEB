import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://orahweb.com"),
  title: {
    default: "OrahWeb — Modern Digital Solutions",
    template: "%s | OrahWeb",
  },
  description:
    "OrahWeb delivers cutting-edge web development, design, and digital strategy solutions for businesses ready to grow.",
  keywords: ["web development", "digital agency", "UI/UX design", "OrahWeb"],
  authors: [{ name: "OrahWeb Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://orahweb.com",
    siteName: "OrahWeb",
    title: "OrahWeb — Modern Digital Solutions",
    description:
      "OrahWeb delivers cutting-edge web development, design, and digital strategy.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OrahWeb",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OrahWeb — Modern Digital Solutions",
    description: "Cutting-edge web development and digital strategy.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
