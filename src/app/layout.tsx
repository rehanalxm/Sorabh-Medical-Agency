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
  title: {
    default: "Sorabh Medical Agency | Wholesale Pharmaceutical Distributor & Stockist, Bhagalpur",
    template: "%s | Sorabh Medical Agency",
  },
  description:
    "Sorabh Medical Agency (Proprietor: Santosh Kumar) — Leading wholesale pharmaceutical distributor & authorized medicine stockist in Bhagalpur, Bihar. Supplying genuine Generic, Ethical, Surgical, Ayurvedic, and OTC formulations to licensed retail pharmacies at direct depot PTR rates.",
  keywords: [
    "Sorabh Medical Agency",
    "Santosh Kumar Bhagalpur",
    "wholesale medicine distributor Bhagalpur",
    "pharma stockist Bihar",
    "wholesale pharmaceutical distributor",
    "generic medicines wholesale",
    "surgical items bulk supply",
    "chemist distributor Bhagalpur",
    "Alkem Cipla Mankind wholesale stockist",
    "Kotwali Chowk pharma agency",
  ],
  authors: [{ name: "Sorabh Medical Agency" }],
  openGraph: {
    title: "Sorabh Medical Agency | Wholesale Pharmaceutical Distributor, Bhagalpur",
    description:
      "Direct wholesale distributor of Generic, Surgical, Ayurvedic & OTC Medicines for licensed retail pharmacies. Kotwali Chowk, Bhagalpur - 812002. Mob: 7070605245.",
    type: "website",
    locale: "en_IN",
    siteName: "Sorabh Medical Agency",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-icon.png",
  },
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
    <html lang="en" className={`${inter.variable} overflow-x-hidden max-w-full`}>
      <body className="min-h-screen flex flex-col font-sans bg-[#f8fafc] text-[#0f172a] antialiased selection:bg-[#0b1e36] selection:text-white overflow-x-hidden w-full max-w-full">
        <Header />
        <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
        <Footer />
        <FloatingActions />
        <BottomNav />
      </body>
    </html>
  );
}
