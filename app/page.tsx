import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import PartnerBrandsStrip from "@/components/PartnerBrandsStrip";
import WhatWeDo from "@/components/WhatWeDo";
import WhyChooseSteelFrames from "@/components/WhyChooseSteelFrames";
import WhyChooseSteel from "@/components/WhyChooseSteel";
import BuiltOnTrust from "@/components/BuiltOnTrust";
import IndustriesAtWork from "@/components/IndustriesAtWork";
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

      {/* 4. Why Choose Steel Frame (Slide Up Stacking Cards) */}
      <WhyChooseSteelFrames />

      {/* 5. Why Light Gauge Steel (Dual Parallax Stream Cards) */}
      <WhyChooseSteel />

      {/* 6. Why Choose Auzie Steel? Built on Trust, Engineered for Excellence (3-Card Layout) */}
      <BuiltOnTrust />

      {/* 7. Industries at Work (6-Industry Cards Grid) */}
      <IndustriesAtWork />

      {/* 8. Full-Width Builder Testimonial Blockquote */}
      <TestimonialBlockquote />

      {/* 9. Call To Action & Contact Section (Split Card Design directly above footer) */}
      <ContactCallToAction />
    </div>
  );
}
