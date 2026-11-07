import type { Metadata } from "next";
import { conferFontVariables } from "@/components/sites/proximata/fonts";
import "./globals.css";

const description =
  "Join First AI Summit 2026 for three days of talks, workshops, and connections in San Francisco.";

export const metadata: Metadata = {
  title: "First AI Summit 2026 | San Francisco",
  description,
  openGraph: {
    type: "website",
    title: "First AI Summit 2026 | San Francisco",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "First AI Summit 2026 | San Francisco",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${conferFontVariables} antialiased`}>
      <body className="min-h-full bg-black font-vietnam text-white">{children}</body>
    </html>
  );
}
