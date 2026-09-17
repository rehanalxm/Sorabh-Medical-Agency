import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sorabh Medical Agency | Wholesale Medicine Distributor, Bhagalpur",
  description:
    "Sorabh Medical Agency (Proprietor: Santosh Kumar) is a leading wholesale pharmaceutical distributor in Bhagalpur, Bihar supplying Generic, Surgical, Ayurvedic, and OTC medicines to licensed retail pharmacies.",
  keywords: [
    "Sorabh Medical Agency",
    "Santosh Kumar Bhagalpur",
    "wholesale pharmaceutical distributor",
    "medicine wholesaler Bhagalpur",
    "generic medicines wholesale",
    "surgical items bulk",
    "chemist distributor Bihar",
    "Alkem Cipla Mankind wholesale",
  ],
  authors: [{ name: "Sorabh Medical Agency" }],
  openGraph: {
    title: "Sorabh Medical Agency | Wholesale Medicine Distributor, Bhagalpur",
    description:
      "Wholesale distributor of Generic, Surgical, Ayurvedic & OTC Medicines. Kotwali Chowk, Bhagalpur - 812002. Mob: 7070605245.",
    type: "website",
    locale: "en_IN",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0b1e36",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans bg-[#f8fafc] text-[#0f172a] antialiased selection:bg-[#0b1e36] selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
        <BottomNav />
      </body>
    </html>
  );
}
