import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ANM Software Solutions — We Build AI Platforms for Local Businesses",
  description:
    "Custom AI software for local businesses across every industry. Lead capture, automation, client portals, and AI chat — all built and delivered in days.",
  metadataBase: new URL("https://anmsoftwaresolutions.com"),
  openGraph: {
    title: "ANM Software Solutions — We Build AI Platforms for Local Businesses",
    description:
      "Custom AI software for local businesses across every industry. Built and delivered in days.",
    url: "https://anmsoftwaresolutions.com",
    siteName: "ANM Software Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ANM Software Solutions",
    description: "We Build AI Platforms for Local Businesses",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
