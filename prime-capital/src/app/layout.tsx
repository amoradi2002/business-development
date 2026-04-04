import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "Prime Capital Group, Inc. | Private & Hard Money Lender",
  description:
    "Southern California's premier private and hard money lender. Bridge loans, hard money loans, HELOC, construction loans, and more. Direct lender closing in 5-7 days.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-inter antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
