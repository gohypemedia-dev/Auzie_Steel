"use client";

import Image from "next/image";
import Link from "next/link";

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  iconSvg: React.ReactNode;
  imageSrc: string;
}

const features: FeatureItem[] = [
  {
    id: "customisable",
    title: "Customisable",
    description: "We can manufacture any design created by an architect.",
    iconBg: "bg-sky-100",
    iconBorder: "border-sky-200",
    iconColor: "text-sky-600",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3v6h6" />
      </svg>
    ),
    imageSrc: "/why-choose-customisable-main.jpg",
  },
  {
    id: "durable",
    title: "Durable",
    description: "Our steel frames will not rot, warp, twist or attract termites.",
    iconBg: "bg-amber-100",
    iconBorder: "border-amber-200",
    iconColor: "text-amber-600",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    imageSrc: "/why-choose-durable-main.jpg",
  },
  {
    id: "fire-retardant",
    title: "Fire Retardant",
    description:
      "Steel is a naturally non-combustible material, ideal for housing frames, especially in fire-prone areas.",
    iconBg: "bg-rose-100",
    iconBorder: "border-rose-200",
    iconColor: "text-rose-600",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343a7.975 7.975 0 012.344 5.657c0 2.122-.849 4.156-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
    imageSrc: "/why-choose-fire-main.jpg",
  },
  {
    id: "easy-transportation",
    title: "Easy Transportation",
    description:
      "Our lightweight steel frames are easy to transport, and installation needs less manpower and minimal manual labour.",
    iconBg: "bg-emerald-100",
    iconBorder: "border-emerald-200",
    iconColor: "text-emerald-600",
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth={2} stroke="currentColor" fill="none" />
      </svg>
    ),
    imageSrc: "/why-choose-transport-main.jpg",
  },
];

export default function WhyChooseSteel() {
  return (
    <section className="relative py-24 sm:py-32 bg-white text-slate-800 overflow-hidden border-b border-slate-200">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#020618] leading-[1.15]">
            WHY CHOOSE <span className="text-[#1E63D8]">STEEL FRAMES</span>
            <br />
            FOR YOUR NEXT PROJECT
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            Engineered for durability, speed, and architectural freedom.
          </p>
        </div>

        {/* 2 Cards Per Row Product Grid (Grid cols 1 on mobile, 2 on tablet & desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="rounded-[12px] bg-white border border-slate-200/90 hover:border-[#1E63D8]/40 shadow-lg shadow-slate-200/60 hover:shadow-2xl hover:shadow-[#1E63D8]/10 overflow-hidden transition-all duration-300 group flex flex-col hover:-translate-y-1"
            >
              {/* Product Card Image (Top) */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-slate-100">
                <Image
                  src={feature.imageSrc}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Product Card Content (Bottom Text) */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3.5 mb-3">
                    {/* Distinctive Circular Icon Badge */}
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 border ${feature.iconBg} ${feature.iconBorder} ${feature.iconColor} shadow-sm group-hover:scale-105 transition-transform`}
                    >
                      {feature.iconSvg}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black uppercase text-[#020618] tracking-tight group-hover:text-[#1E63D8] transition-colors">
                      {feature.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-action Button */}
        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full text-sm sm:text-base font-bold text-white bg-[#1E63D8] hover:bg-[#1650b5] shadow-xl shadow-[#1E63D8]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Get a Quote
          </Link>
        </div>

      </div>
    </section>
  );
}
