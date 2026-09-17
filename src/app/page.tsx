import React from "react";
import { HeroSection } from "@/components/sections/hero-section";
import { BrandsSection } from "@/components/sections/brands-section";
import { OwnerSection } from "@/components/sections/owner-section";
import { CredentialsSection } from "@/components/sections/credentials-section";
import { ValuePropSection } from "@/components/sections/value-prop-section";
import { ProductsPreviewSection } from "@/components/sections/products-preview-section";
import { JourneySection } from "@/components/sections/journey-section";
import { CTASection } from "@/components/sections/cta-section";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Split-screen Hero with Owner Photo Frame Showcase */}
      <HeroSection />

      {/* 2. Trusted Brands / Manufacturer Logos Grid */}
      <BrandsSection />

      {/* 3. About Owner Profile, Biography & Story */}
      <OwnerSection />

      {/* 4. Trust & Credentials with Document Lightbox Modal */}
      <CredentialsSection />

      {/* 5. Why Partner With Us (6 B2B Value Propositions) */}
      <ValuePropSection />

      {/* 6. Wholesale Categories Preview */}
      <ProductsPreviewSection />

      {/* 7. Business Journey Timeline */}
      <JourneySection />

      {/* 8. Strong Partnership Final CTA */}
      <CTASection />
    </div>
  );
}
