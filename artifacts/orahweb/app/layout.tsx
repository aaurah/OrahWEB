import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://orahweb.com"),
  title: {
    default: "OrahWeb — Own Your Domain Forever",
    template: "%s | OrahWeb",
  },
  description:
    "Register blockchain and traditional domains on OrahWeb. Web3 domains you truly own — no renewals, no censorship. Search .crypto, .web3, .nft, .dao and 180+ more.",
  keywords: ["web3 domains", "blockchain domains", "domain registrar", "crypto domain", "nft domain", "unstoppable domains alternative", "OrahWeb"],
  authors: [{ name: "OrahWeb" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://orahweb.com",
    siteName: "OrahWeb",
    title: "OrahWeb — Own Your Domain Forever",
    description: "Blockchain and traditional domains. Your name. Your rules. Forever.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "OrahWeb — Domain Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OrahWeb — Own Your Domain Forever",
    description: "Blockchain and traditional domains. No renewals on Web3 domains.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
