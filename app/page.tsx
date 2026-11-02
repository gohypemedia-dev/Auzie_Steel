import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import PartnerBrandsStrip from "@/components/PartnerBrandsStrip";
import WhatWeDo from "@/components/WhatWeDo";
import TestimonialBlockquote from "@/components/TestimonialBlockquote";
import ContactCallToAction from "@/components/ContactCallToAction";

export default function Home() {
  return (
    <div className="bg-white text-slate-900 overflow-x-clip">
      {/* 1. Hero Section with Background Video & Cinematic Typography */}
      <Hero />

      {/* 2. Intro Section with Split Doors & Who We Are */}
      <IntroSection />

      {/* 2.5 Industry Partner Trust Marquee Strip */}
      <PartnerBrandsStrip />

      {/* 3. Services / Capabilities (Frame-by-Frame Canvas Animation) */}
      <WhatWeDo />

      {/* 4. Full-Width Builder Testimonial Blockquote */}
      <TestimonialBlockquote />

      {/* 5. Call To Action & Contact Section (Split Card Design directly above footer) */}
      <ContactCallToAction />
    </div>
  );
}
