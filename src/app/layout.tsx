import type { Metadata, Viewport } from "next";
import { brandColors } from "@/components/sites/proximata/brand-colors";
import { event } from "@/components/sites/proximata/content/event";
import { fontVariables } from "@/components/sites/proximata/fonts";
import "./globals.css";

const title = `${event.fullName} · proximata × START Vienna × HOIV`;

/** Absolute base for link previews; set NEXT_PUBLIC_SITE_URL once the domain is known. */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const ogImage = {
  url: "/sites/proximata/images/og/building-better-worlds.jpg",
  width: 1200,
  height: 630,
  alt: "Building Better Worlds: a 24h hackathon in Vienna, 13–14 Nov 2026, by proximata × START Vienna × HOIV",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: event.description,
  openGraph: {
    type: "website",
    title,
    description: event.description,
    images: [ogImage],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: event.description,
    images: [ogImage.url],
  },
};

export const viewport: Viewport = {
  themeColor: brandColors.ink,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} antialiased`}>
      <body className="min-h-full bg-ink font-mono text-white">{children}</body>
    </html>
  );
}
