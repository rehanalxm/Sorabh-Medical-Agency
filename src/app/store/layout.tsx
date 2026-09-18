import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wholesale Store & Medicine Catalog",
  description:
    "Browse and order Generic, Surgical, Ayurvedic, and OTC medicines at wholesale depot rates from Saurav Medical Agency, Bhagalpur.",
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
