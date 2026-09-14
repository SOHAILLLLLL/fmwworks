import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const stampFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-stamp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "fmwworks — Garage Tracker",
  description: "Internal tracker for incoming cars, installed parts, and outgoing income.",
};

export const viewport: Viewport = {
  themeColor: "#f2efe8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${stampFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
