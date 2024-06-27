import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ACBUD - Feedback on your journeys",
  description: "ACBUD is a platform for sharing feedback on your journeys.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="viewport-fit=cover"></meta>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
