import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Auzie Steel South Australia",
  description:
    "Learn about Auzie Steel, South Australia's leading manufacturer of high-tensile light gauge steel frames and innovative Alpha Floor joist systems.",
};

export default function AboutPage() {
  const pillars = [
    {
      step: "01",
      title: "Direct From Manufacturer",
      description:
        "When you work with Auzie Steel, you deal directly with the fabricator. This eliminates third-party broker markups, cuts communication delays, and gives builders immediate technical support.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path d="M2 20h20M4 20V9l5 4V9l5 4V4l6 4v12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      step: "02",
      title: "100% BlueScope Truecore®",
      description:
        "We exclusively roll-form from genuine Australian high-tensile BlueScope Truecore® steel. Every framing stud delivers proven structural integrity backed by an eligible 50-year warranty.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      step: "03",
      title: "Millimeter BIM Precision",
      description:
        "Every stud, truss, and joist is modeled in state-of-the-art 3D BIM software directly from your architectural plans. Machine-punched service holes ensure electrical and plumbing rough-ins glide through.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 9h18M9 21V9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      step: "04",
      title: "End-to-End Delivery",
      description:
        "Our service encompasses design detailing, precision automated roll-forming, QA assembly, and sequenced flatbed crane delivery directly to your building site across South Australia.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path d="M1 8h4M2 11h3M16 8h4l3 4.5v5.5h-2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="18" cy="18" r="2" />
          <path d="M16 18H9" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="7" cy="18" r="2" />
          <path d="M5 18H2v-7h14v7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white text-[#0F1114] min-h-screen pt-20">
      {/* ===================================================================
          1. HERO HEADER SECTION
          =================================================================== */}
      <section className="relative w-full bg-[#FAF9F6] border-b border-[#CBD5E1] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#EEF0F2] border border-[#CBD5E1]">
              <span className="text-[11px] font-bold font-label tracking-widest text-[#0F1114] uppercase">
                OUR HERITAGE &amp; MISSION
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-heading font-black uppercase tracking-tight text-[#0F1114] leading-[1.12]">
              PIONEERING PRECISION <span className="text-[#1E63D8]">STEEL ENGINEERING</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Based in Adelaide, Auzie Steel is transforming South Australia&apos;s residential and commercial building industry with millimeter-accurate light gauge steel framing and revolutionary Alpha Floor systems.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-[#CBD5E1]/70">
            <div>
              <span className="text-2xl sm:text-3xl font-heading font-black text-[#1E63D8] block">
                100%
              </span>
              <span className="text-xs sm:text-sm font-sans text-slate-600 font-medium">
                Australian Truecore® Steel
              </span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-heading font-black text-[#0F1114] block">
                ADELAIDE
              </span>
              <span className="text-xs sm:text-sm font-sans text-slate-600 font-medium">
                Locally Owned &amp; Fabricated
              </span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-heading font-black text-[#0F1114] block">
                0mm
              </span>
              <span className="text-xs sm:text-sm font-sans text-slate-600 font-medium">
                Warp, Shrink or Sag
              </span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-heading font-black text-[#1E63D8] block">
                DIRECT
              </span>
              <span className="text-xs sm:text-sm font-sans text-slate-600 font-medium">
                Manufacturer To Builder
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. COMPANY STORY & PRODUCTION EXCELLENCE
          =================================================================== */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#CBD5E1]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#EEF0F2] border border-[#CBD5E1]">
              <span className="text-[11px] font-bold font-label tracking-widest text-[#0F1114] uppercase">
                SOUTH AUSTRALIAN COMMITMENT
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-[#0F1114] leading-[1.14]">
              TRANSFORMING CONSTRUCTION WITH <span className="text-[#1E63D8]">ROBOTIC ACCURACY</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Auzie Steel was founded to solve the costly frustrations that builders face every day: twisting and bowing timber, lengthy trade delays, rising insurance premiums, and post-handover callback expenses.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Operating precision computer-controlled roll-forming equipment in Adelaide, our team translates your architectural designs directly into laser-straight structural frames, roof trusses, and Alpha Floor cassettes with zero guesswork.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 text-slate-800 text-xs font-semibold">
                ✓ AS 4600 / AS 3623 Certified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 text-slate-800 text-xs font-semibold">
                ✓ Licensed FRAMECAD Technology
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 text-slate-800 text-xs font-semibold">
                ✓ Rapid Local Delivery
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden bg-slate-100 border border-[#CBD5E1] shadow-lg">
              <Image
                src="/who-we-are-modern-building.jpg"
                alt="Auzie Steel Adelaide light gauge steel framing"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          3. OUR 4 CORE PILLARS
          =================================================================== */}
      <section className="py-20 sm:py-24 bg-[#FAF9F6] border-b border-[#CBD5E1] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#EEF0F2] border border-[#CBD5E1] mb-3">
              <span className="text-[11px] font-bold font-label tracking-widest text-[#0F1114] uppercase">
                WHY BUILDERS CHOOSE US
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-[#0F1114] leading-[1.14]">
              THE 4 PILLARS OF <span className="text-[#1E63D8]">AUZIE STEEL</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.step}
                className="group bg-white rounded-[14px] border border-[#CBD5E1] p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(15,17,20,0.04)] hover:shadow-[0_16px_40px_rgba(30,99,216,0.12)] hover:border-[#1E63D8] transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#EEF0F2] text-[#1E63D8] border border-[#CBD5E1] flex items-center justify-center shrink-0 mb-5 transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#1E63D8] group-hover:text-white">
                    {pillar.icon}
                  </div>

                  <div className="text-xs font-mono font-bold text-[#1E63D8] tracking-wider mb-1">
                    {pillar.step}
                  </div>

                  <h3 className="font-sans font-bold text-lg uppercase tracking-tight text-[#0F1114] group-hover:text-[#1E63D8] transition-colors leading-snug mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          4. CALL TO ACTION BANNER
          =================================================================== */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-950 text-white rounded-[16px] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight leading-tight">
              Partner With South Australia&apos;s <span className="text-[#3B82F6]">Premier Fabricator</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Speak directly with our Adelaide engineering and detailing team. We provide fast, obligation-free framing takeoffs and project consultations.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-7 py-3.5 rounded-full bg-[#1E63D8] hover:bg-[#1650B5] text-white text-xs sm:text-sm font-bold font-label tracking-wider uppercase transition-colors shadow-lg"
              >
                TALK TO OUR TEAM
              </Link>
              <Link
                href="/steel-frames"
                className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold font-label tracking-wider uppercase transition-colors border border-white/20"
              >
                VIEW STEEL FRAMES →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
