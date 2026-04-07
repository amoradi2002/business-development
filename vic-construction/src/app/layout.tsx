import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "VIC Construction, Inc. | Built Right. Built to Last. | Los Angeles",
  description:
    "Premium outdoor construction across Los Angeles. Patios, decks, outdoor kitchens, pergolas, retaining walls, fencing. Licensed, insured, and ready to build.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
