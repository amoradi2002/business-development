import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prime Capital Group, Inc. | Admin Portal",
  description: "PCG Admin Dashboard — Lead management, pipeline, document vault, and AI assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
