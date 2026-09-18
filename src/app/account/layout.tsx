import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retailer Account & Order History",
  description:
    "Manage your retail chemist trade profile, drug license details, wholesale past invoices, and repeat orders with Sorabh Medical Agency.",
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
