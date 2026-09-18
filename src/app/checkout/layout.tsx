import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wholesale Order Checkout",
  description:
    "Review your wholesale order, confirm shop delivery address, and proceed with COD or Instant UPI wholesale billing.",
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
