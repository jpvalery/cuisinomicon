import type { Metadata } from "next";
import { Almendra } from "next/font/google";
import Script from "next/script";
import type React from "react";
import Footer from "../components/Footer";
import "./globals.css";

const almendra = Almendra({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-almendra",
});

export const metadata: Metadata = {
  title: "Recipe Collection",
  description: "A curated collection of delicious recipes",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${almendra.variable} antialiased`}>
      <body className="bg-stone-100 text-stone-950 font-serif">
        {children}
        <Footer />
      </body>
      <Script
        data-website-id="2025ac19-430a-4360-b22d-12870aa0c4b5"
        src="https://analytics.jpvalery.com/script.js"
        strategy="afterInteractive"
      />
    </html>
  );
}
