import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "HK Imaging | Aerial Cinematography",
  description:
    "Professional drone cinematography for real estate, automotive, tourism, construction, events, and marine. Based in the UK.",
  openGraph: {
    title: "HK Imaging | Aerial Cinematography",
    description:
      "Professional drone cinematography for real estate, automotive, tourism, construction, events, and marine.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-bg text-ink ${inter.variable} ${spaceGrotesk.variable}`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
