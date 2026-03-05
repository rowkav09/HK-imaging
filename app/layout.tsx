import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "HK imaging | Professional Drone Cinematography",
  description: "HK imaging - Professional drone cinematography services. Capturing stunning perspectives with cinematic quality and natural artistry.",
};

// RootLayout: wraps all pages, sets up global fonts and analytics
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-bg text-primary ${inter.variable} ${spaceGrotesk.variable}`}>
        {/* Main app content */}
        {children}
        {/* Vercel Analytics */}
        <Analytics />
        {/* Vercel Speed Insights */}
        <SpeedInsights />
      </body>
    </html>
  );
}
