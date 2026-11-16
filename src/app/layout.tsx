import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "WaveSeed Growth - AI Solutions Agency | Launching March 2, 2026",
  description: "WaveSeed Growth is an End-to-End AI Solutions Agency launching March 2, 2026. Discover intelligent marketing, automation, and business solutions powered by AI.",
  keywords: ["AI marketing agency", "End-to-end AI solutions", "AI business automation", "AI-powered marketing", "Marketing automation AI"],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "WaveSeed Growth - AI Solutions Agency",
    description: "Launching March 2, 2026. End-to-End AI Solutions for Modern Businesses.",
    url: "https://agency.waveseed.app",
    siteName: "WaveSeed Growth",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WaveSeed Growth - AI Solutions Agency",
    description: "Launching March 2, 2026. AI-Powered Growth Starts Here.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
