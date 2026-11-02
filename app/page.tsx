import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import PartnerBrandsStrip from "@/components/PartnerBrandsStrip";
import WhatWeDo from "@/components/WhatWeDo";
import WhyChooseSteelFrames from "@/components/WhyChooseSteelFrames";
import WhyChooseSteel from "@/components/WhyChooseSteel";
import BuiltOnTrust from "@/components/BuiltOnTrust";
import IndustriesAtWork from "@/components/IndustriesAtWork";
import TestimonialBlockquote from "@/components/TestimonialBlockquote";

export default function Home() {
  return (
    <div className="bg-white text-slate-900 overflow-x-clip">
      {/* 1. Hero Section with Cinematic Typography & Curved Mask */}
      <Hero />

      {/* 2. Intro Section with Line-by-Line Reveals & Architectural Mask */}
      <IntroSection />

      {/* 2.5 Industry Partner Trust Marquee Strip */}
      <PartnerBrandsStrip />

      {/* 3. Services / Capabilities (Frame-by-Frame Canvas Animation) */}
      <WhatWeDo />

      {/* 4. Why Choose Steel Frames For Your Next Project (Slide Up Stacking Cards) */}
      <WhyChooseSteelFrames />

      {/* 5. Why Light Gauge Steel (Dual Parallax Stream Cards) */}
      <WhyChooseSteel />

      {/* 6. Why Choose Auzie Steel? Built on Trust, Engineered for Excellence (3-Card Layout) */}
      <BuiltOnTrust />

      {/* 7. Industries at Work (Exact Varco Pruden 6-Industry Cards Grid) */}
      <IndustriesAtWork />

      {/* 8. Testimonials / Builder Feedback (Exact Varco Pruden Blockquote With Image Slider) */}
      <TestimonialBlockquote />
    </div>
  );
}
