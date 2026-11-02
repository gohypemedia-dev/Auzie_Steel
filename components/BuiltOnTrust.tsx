"use client";

import Image from "next/image";
import Link from "next/link";

interface FeatureBlock {
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  linkText: string;
  href: string;
}

export default function BuiltOnTrust() {
  const blocks: FeatureBlock[] = [
    {
      number: "01",
      title: "End-to-End Service",
      description:
        "We offer a specialised, all-encompassing design to delivery service that gives you peace of mind that your frame will be delivered on site within your timeframes. We make this a priority, as we have a long-standing depth of experience in the local building industry.",
      image: "/vp_pemb.jpg",
      alt: "Contemporary corporate building with warm copper-toned tower and expansive glass facade",
      linkText: "Explore Delivery Logistics",
      href: "/contact",
    },
    {
      number: "02",
      title: "Australian Standards",
      description:
        "Every steel frame we produce is manufactured to exceed Australian Standards.",
      image: "/vp_hybrid.jpg",
      alt: "Contemporary architectural building with bold black structural metal framing at dusk",
      linkText: "View Structural Standards",
      href: "/steel-frames",
    },
    {
      number: "03",
      title: "Direct from Manufacturer",
      description:
        "When you work with us, you deal directly with the manufacturer. This minimises delays and unnecessary costs.",
      image: "/vp_retrofit.jpg",
      alt: "Precision commercial structural standing seam envelope and wall solutions",
      linkText: "Speak with Engineering",
      href: "/contact",
    },
  ];

  return (
    <section
      id="why-choose-auzie-steel"
      className="w-full bg-[#f7f4f0] text-[#202020] py-20 sm:py-24 lg:py-28 select-none overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
        {/* ===================================================================
            1. SECTION HEADER: Centered Main Heading
            =================================================================== */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20 lg:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-sans font-medium uppercase tracking-tight text-[#0F1114] leading-[1.1]">
            WHY CHOOSE AUZIE STEEL?
          </h2>
        </div>

        {/* ===================================================================
            2. THREE ALTERNATING VISUAL BLOCKS (Exact Varco Pruden Left-Right)
            =================================================================== */}
        <div className="space-y-20 sm:space-y-24 lg:space-y-32">
          {blocks.map((block, idx) => {
            const isReverse = idx % 2 === 1;

            return (
              <div
                key={block.number}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-16 xl:gap-20 items-center"
              >
                {/* Content Column (50% on desktop) */}
                <div
                  className={`lg:col-span-6 flex flex-col justify-center ${
                    isReverse ? "lg:order-2 lg:pl-4 xl:pl-8" : "lg:order-1 lg:pr-4 xl:pr-8"
                  }`}
                >
                  {/* Title (Exact Varco Pruden h3 style) */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-sans font-medium text-[#202020] leading-[1.12] tracking-tight mb-4 sm:mb-6">
                    {block.title}
                  </h3>

                  {/* Description Paragraph */}
                  <p className="text-base sm:text-lg text-[#4b5563] leading-[1.68] font-normal mb-8 max-w-xl">
                    {block.description}
                  </p>

                  {/* Button (Exact Varco Pruden .btn--black-outline-black Pill) */}
                  <div>
                    <Link
                      href={block.href}
                      className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-[#202020] text-[#202020] hover:bg-[#202020] hover:text-white font-medium text-sm tracking-wide transition-all duration-200 active:scale-95 shadow-sm"
                    >
                      <span>{block.linkText}</span>
                    </Link>
                  </div>
                </div>

                {/* 1:1 Square Image Column (50% on desktop) */}
                <div
                  className={`lg:col-span-6 flex justify-center ${
                    isReverse ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="relative w-full aspect-square max-w-[540px] lg:max-w-none overflow-hidden bg-white shadow-sm border border-[#e5e0d8]">
                    <Image
                      src={block.image}
                      alt={block.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      quality={90}
                      priority={idx === 0}
                      className="object-cover object-center scale-[1.03]"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
