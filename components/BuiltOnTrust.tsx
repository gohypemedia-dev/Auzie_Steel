"use client";

import Image from "next/image";

export default function BuiltOnTrust() {
  const cards = [
    {
      number: "01",
      title: "End-to-End Service",
      description:
        "We offer a specialised, all-encompassing design to delivery service that gives you peace of mind that your frame will be delivered on site within your timeframes. We make this a priority, as we have a long-standing depth of experience in the local building industry.",
      image: "/built-on-trust-delivery.jpg",
      alt: "End-to-end delivery service with steel frame structure on logistics truck",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 8h4" />
          <path d="M2 11h3" />
          <path d="M16 8h4l3 4.5v5.5h-2" />
          <circle cx="18" cy="18" r="2" />
          <path d="M16 18H9" />
          <circle cx="7" cy="18" r="2" />
          <path d="M5 18H2v-7h14v7" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Australian Standards",
      description:
        "Every steel frame we produce is manufactured to exceed Australian Standards.",
      image: "/built-on-trust-standards.jpg",
      alt: "Australian Standards certified light gauge steel frame stud",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Direct from Manufacturer",
      description:
        "When you work with us, you deal directly with the manufacturer. This minimises delays and unnecessary costs.",
      image: "/built-on-trust-manufacturer.jpg",
      alt: "Direct from manufacturer facility with steel trusses and frames",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 20h20" />
          <path d="M4 20V9l5 4V9l5 4V4l6 4v12" />
          <line x1="8" y1="16" x2="8.01" y2="16" strokeWidth="2" />
          <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" />
          <line x1="16" y1="16" x2="16.01" y2="16" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative w-full bg-slate-950 text-white py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden select-none border-b border-slate-800/80">
      {/* Background Architectural Ambient Light & Subtle Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(30,99,216,0.18),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-16 md:mb-20">
          {/* Main Primary Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-heading font-black uppercase tracking-tight text-white leading-[1.12]">
            WHY CHOOSE AUZIE STEEL
          </h2>

          {/* Secondary Heading (White + Electric Blue Accent) */}
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-heading font-black uppercase tracking-tight leading-snug mt-2.5 sm:mt-3">
            <span className="text-slate-200">BUILT ON TRUST, </span>
            <span className="text-[#3B82F6]">ENGINEERED FOR EXCELLENCE</span>
          </h3>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-5 text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl sm:max-w-3xl mx-auto font-normal">
            At Auzie Steel, we deliver more than just steel frames — we deliver peace
            of mind, quality and direct value. Here&apos;s why you can count on us:
          </p>
        </div>

        {/* 3 Cards Grid: Desktop side-by-side, mobile stacked */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-stretch">
          {cards.map((card) => (
            <div
              key={card.number}
              className="group bg-slate-900/85 backdrop-blur-md rounded-[16px] border border-slate-800/90 p-6 sm:p-7 md:p-8 flex flex-col justify-between shadow-[0_12px_32px_rgba(0,0,0,0.45)] hover:shadow-[0_20px_50px_rgba(30,99,216,0.25)] hover:border-[#3B82F6] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Card Top: Icon, Step Number, Heading & Paragraph */}
              <div>
                {/* Header row: Icon Badge + Heading */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl bg-slate-800/90 text-[#3B82F6] border border-slate-700/80 flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-[#1E63D8] group-hover:text-white group-hover:border-blue-400">
                    {card.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-[13px] font-mono font-bold text-[#3B82F6] tracking-wider">
                        {card.number}
                      </span>
                      <span className="w-6 h-[1.5px] bg-slate-700 group-hover:bg-[#3B82F6] transition-colors" />
                    </div>
                    <h4 className="font-sans font-bold text-base sm:text-lg uppercase text-white tracking-tight leading-tight mt-0.5 group-hover:text-[#3B82F6] transition-colors">
                      {card.title}
                    </h4>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-[13.5px] sm:text-[14px] leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>

              {/* Card Bottom: Rounded Image */}
              <div className="mt-7 pt-1">
                <div className="relative w-full aspect-[16/10.1] rounded-[10px] overflow-hidden bg-slate-800 border border-slate-700/60 shadow-inner">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
