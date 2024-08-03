import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./components/auth/SessionWrapper";
import RecoilContextProvider from "./components/db/RecoilContextProvider";
import { Analytics } from "@vercel/analytics/react";

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
    <SessionWrapper>
      <RecoilContextProvider>
        <html className="bg-base-200" data-theme="light" lang="en">
          <meta
            name="viewport"
            content="initial-scale=1 user-scalable=no viewport-fit=cover height=device-height width=device-width"
          ></meta>
          <body className={`${inter.className}`}>
            {children} 
            <Analytics />
          </body>
        </html>
      </RecoilContextProvider>
    </SessionWrapper>
  );
}
