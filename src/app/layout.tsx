import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vitti Builders Limited | Premium Apartments & Land Shares in Bangladesh",
  description: "Vitti Builders Limited is a premier real estate developer and land development company in Bangladesh. We build high-quality multi-storied residential apartments, commercial plazas, and offer secure land shares with complete transparency under the Companies Act 1994.",
  keywords: "Vitti Builders, Real Estate Bangladesh, Land Share Dhaka, Buy Flat Dhaka, Mirpur Apartment, Uttar Khan Plots, Joint Venture Landowner, Dhaka Cantonment Commercial, Bangladesh Developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
