import type { Metadata } from "next";
import { Noto_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./components/auth/SessionWrapper";
import RecoilContextProvider from "./components/db/RecoilContextProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const noto_sans = Noto_Sans({ subsets: ["latin"] });
const playfair_display = Playfair_Display({ subsets: ["latin"]});

export const metadata: Metadata = {
  title: "ACBUD - Feedback on your journeys",
  description: "ACBUD is a platform for sharing feedback on your journeys.",
  authors: [{ name: "Job Siemerink", url: "https://jobsie.me" }],
  openGraph: {
    type: "website",
    siteName: "ACBUD", 
    url: "https://acbud.jobsie.me/",
    title: "ACBUD - Feedback on your journeys",
    description: "ACBUD is a platform for sharing feedback on your journeys.",
    images: [
      {
        url: "https://acbud.jobsie.me/logo-text.svg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://acbud.jobsie.me/",
    creator: "@jobsie",
  },
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
          <body className={`${noto_sans.className} subpixel-antialiased`}>
            {children}
            <SpeedInsights />
            <Analytics />
          </body>
        </html>
      </RecoilContextProvider>
    </SessionWrapper>
  );
}
