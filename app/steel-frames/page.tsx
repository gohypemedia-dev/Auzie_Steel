import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Precision Steel Frames | Auzie Steel South Australia",
  description:
    "Engineered light gauge steel wall framing, roof trusses, and modular floor cassettes roll-formed from Australian BlueScope Truecore® steel.",
};

export default function SteelFramesPage() {
  const systems = [
    {
      step: "01",
      title: "Prefabricated Wall Frames",
      description:
        "Factory-assembled wall panels fabricated to exact CAD/BIM tolerances. Pre-punched service holes eliminate onsite drilling, reducing rough-in time by up to 40%.",
      image: "/why-choose-customisable-main.jpg",
      points: [
        "Load-bearing and non-load-bearing assemblies",
        "Pre-punched wiring and plumbing conduits",
        "Guaranteed 0mm twist, warp, shrink or rot",
      ],
    },
    {
      step: "02",
      title: "Engineered Roof Trusses",
      description:
        "High-tensile lightweight roof trusses engineered to span expansive open-plan living areas without sagging or requiring costly internal load-bearing columns.",
      image: "/hero-construction.jpg",
      points: [
        "Lightweight for fast crane or manual hoisting",
        "High strength-to-weight structural capacity",
        "Non-combustible AS 3959 bushfire compliant",
      ],
    },
    {
      step: "03",
      title: "Floor Cassettes & Lintels",
      description:
        "Fully pre-engineered modular floor framing cassettes and structural lintels ready to crane directly into place, accelerating second-storey construction timelines.",
      image: "/built-on-trust-standards.jpg",
      points: [
        "Integrates seamlessly with Alpha Floor systems",
        "Squeak-free rigid underfoot stiffness",
        "Accelerated build schedules with minimal crew",
      ],
    },
  ];

  const comparisonFeatures = [
    {
      feature: "Termite & Borer Resistance",
      steel: "100% Immune — zero chemical poisons needed",
      timber: "Susceptible to infestation and structural decay",
    },
    {
      feature: "Moisture & Fungal Rot",
      steel: "Will not absorb moisture, rot, warp, or sag",
      timber: "Shrinks, bows, twists, and can foster mold",
    },
    {
      feature: "Bushfire Safety (AS 3959)",
      steel: "Non-combustible — certified for BAL-40 & BAL-FZ",
      timber: "Combustible fuel that catches fire easily",
    },
    {
      feature: "Dimensional Stability",
      steel: "Precision engineered to within 0.5mm tolerances",
      timber: "Varies with humidity and natural grain imperfections",
    },
    {
      feature: "Structural Warranty",
      steel: "50-Year BlueScope Truecore® Warranty*",
      timber: "Standard builder warranty (typically 7–10 years)",
    },
  ];

  return (
    <div className="bg-white text-[#0F1114] min-h-screen pt-20">
      {/* ===================================================================
          1. HERO HEADER SECTION (Clean Architectural Luxury)
          =================================================================== */}
      <section className="relative w-full bg-[#FAF9F6] border-b border-[#CBD5E1] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#EEF0F2] border border-[#CBD5E1]">
              <span className="text-[11px] font-bold font-label tracking-widest text-[#0F1114] uppercase">
                STRUCTURAL FRAMING SYSTEMS
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-heading font-black uppercase tracking-tight text-[#0F1114] leading-[1.12]">
              HIGH-TENSILE <span className="text-[#1E63D8]">STEEL FRAMES</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Manufactured with millimeter precision from Australian high-tensile BlueScope Truecore® steel. Perfectly straight walls, zero wood rot, non-combustible ratings, and rapid onsite assembly across South Australia.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-[#CBD5E1]/70">
            <div>
              <span className="text-2xl sm:text-3xl font-heading font-black text-[#1E63D8] block">
                50 YR
              </span>
              <span className="text-xs sm:text-sm font-sans text-slate-600 font-medium">
                BlueScope Warranty*
              </span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-heading font-black text-[#0F1114] block">
                100%
              </span>
              <span className="text-xs sm:text-sm font-sans text-slate-600 font-medium">
                Termite &amp; Rot Proof
              </span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-heading font-black text-[#0F1114] block">
                BAL-FZ
              </span>
              <span className="text-xs sm:text-sm font-sans text-slate-600 font-medium">
                Bushfire Compliant
              </span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-heading font-black text-[#1E63D8] block">
                0.5mm
              </span>
              <span className="text-xs sm:text-sm font-sans text-slate-600 font-medium">
                CNC Fabrication Tolerance
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. CORE FRAMING SYSTEMS (3 Clean Luxury Cards)
          =================================================================== */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#CBD5E1]">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#EEF0F2] border border-[#CBD5E1] mb-3">
            <span className="text-[11px] font-bold font-label tracking-widest text-[#0F1114] uppercase">
              FABRICATION CAPABILITIES
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-[#0F1114] leading-[1.14]">
            COMPLETE RESIDENTIAL &amp; <span className="text-[#1E63D8]">COMMERCIAL SYSTEMS</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Custom engineered directly from your architectural plans and pre-punched for frictionless onsite service installations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {systems.map((system) => (
            <div
              key={system.step}
              className="group bg-white rounded-[14px] border border-[#CBD5E1] p-6 sm:p-7 flex flex-col justify-between shadow-[0_4px_20px_rgba(15,17,20,0.04)] hover:shadow-[0_16px_40px_rgba(30,99,216,0.12)] hover:border-[#1E63D8] transition-all duration-300"
            >
              <div>
                <div className="relative w-full aspect-[16/10] rounded-[10px] overflow-hidden bg-slate-100 border border-[#CBD5E1]/60 mb-6">
                  <Image
                    src={system.image}
                    alt={system.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md bg-[#0F1114]/85 backdrop-blur-sm text-white text-[11px] font-mono font-bold tracking-wider">
                    {system.step}
                  </div>
                </div>

                <h3 className="font-sans font-bold text-lg sm:text-[19px] uppercase tracking-tight text-[#0F1114] group-hover:text-[#1E63D8] transition-colors leading-snug mb-2.5">
                  {system.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-5">
                  {system.description}
                </p>

                <ul className="space-y-2 text-xs sm:text-[13px] text-slate-700 font-medium">
                  {system.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#1E63D8] font-bold">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================
          3. COMPARISON SECTION: STEEL VS TIMBER (Clean Table)
          =================================================================== */}
      <section className="py-20 sm:py-24 bg-[#FAF9F6] border-b border-[#CBD5E1] px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-[#0F1114] leading-[1.14]">
              WHY STEEL OUTPERFORMS <span className="text-[#1E63D8]">TIMBER</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Compare structural reliability, maintenance costs, and builder program timelines.
            </p>
          </div>

          <div className="bg-white rounded-[14px] border border-[#CBD5E1] shadow-sm overflow-hidden">
            <div className="grid grid-cols-12 bg-[#EEF0F2] border-b border-[#CBD5E1] p-4 text-xs font-heading font-black uppercase text-[#0F1114]">
              <div className="col-span-4 sm:col-span-4">Performance Criteria</div>
              <div className="col-span-4 sm:col-span-4 text-[#1E63D8]">Auzie Steel Truecore®</div>
              <div className="col-span-4 sm:col-span-4 text-slate-500">Traditional Timber</div>
            </div>

            <div className="divide-y divide-[#E2E8F0] text-xs sm:text-sm">
              {comparisonFeatures.map((row, idx) => (
                <div key={idx} className="grid grid-cols-12 p-4 items-center hover:bg-slate-50/70 transition-colors">
                  <div className="col-span-4 font-semibold text-[#0F1114] pr-2">
                    {row.feature}
                  </div>
                  <div className="col-span-4 text-slate-800 font-medium flex items-center gap-1.5 pr-2">
                    <span className="text-[#1E63D8] font-bold">✓</span>
                    <span>{row.steel}</span>
                  </div>
                  <div className="col-span-4 text-slate-500 pr-2">
                    {row.timber}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          4. CALL TO ACTION BANNER (Matching Home Page Style)
          =================================================================== */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-950 text-white rounded-[16px] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight leading-tight">
              Ready To Build With <span className="text-[#3B82F6]">Truecore® Steel</span>?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Send through your architectural plans today for a fast, millimeter-accurate framing takeoff quote from our South Australian engineering team.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-7 py-3.5 rounded-full bg-[#1E63D8] hover:bg-[#1650B5] text-white text-xs sm:text-sm font-bold font-label tracking-wider uppercase transition-colors shadow-lg"
              >
                REQUEST A FRAMING QUOTE
              </Link>
              <Link
                href="/alpha-floor"
                className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold font-label tracking-wider uppercase transition-colors border border-white/20"
              >
                EXPLORE ALPHA FLOOR →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
