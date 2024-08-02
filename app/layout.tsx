import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/node_modules/@glidejs/glide/dist/css/glide.core.min.css";

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
    <html className="bg-base-200" data-theme="light" lang="en">
      <meta name="viewport" content="viewport-fit=cover"></meta>
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
