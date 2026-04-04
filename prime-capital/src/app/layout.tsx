import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Prime Capital Group, Inc. | Private & Hard Money Lender",
  description:
    "Southern California's premier private and hard money lender. Bridge loans, hard money loans, HELOC, construction loans, and more. Direct lender closing in 5-7 days. Serving Burbank, Los Angeles, and all of Southern California.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-inter antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
