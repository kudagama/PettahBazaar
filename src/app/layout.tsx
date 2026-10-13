import type { Metadata, Viewport } from "next";
import { MarketplaceProvider } from "@/context/MarketplaceContext";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "PettahBazaar – Find Local Products & Merchants in Pettah, Colombo",
  description:
    "Discover and compare products from local merchants in Pettah, Sri Lanka's busiest shopping hub. Find shoes, clothing, electronics and more with real-time prices and shop locations.",
  keywords: "Pettah, Colombo, Sri Lanka, shopping, shoes, merchants, local market, prices",
  openGraph: {
    title: "PettahBazaar – Pettah's Digital Market",
    description: "Find products from local Pettah merchants with prices, reviews, and map navigation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Sora:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="min-h-screen bg-[#0a0a0a]">
        <MarketplaceProvider>
          {children}
        </MarketplaceProvider>
      </body>
    </html>
  );
}
