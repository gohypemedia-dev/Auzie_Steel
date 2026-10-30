import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Alpha Floor Joist System | Auzie Steel South Australia",
  description:
    "The Alpha Floor engineered steel joist system delivers long clear spans, squeak-free acoustic performance, and large integrated service ducts.",
};

export default function AlphaFloorPage() {
  const advantages = [
    {
      step: "01",
      title: "Expansive Clear Spans",
      description:
        "Eliminate expensive structural steel drop beams and intrusive internal load-bearing posts. Alpha Floor delivers unobstructed clear spans of 7+ metres with minimal deflection.",
      image: "/why-choose-durable-main.jpg",
      points: [
        "Enables modern open-concept ground floor layouts",
        "Significantly reduces structural engineer foundation costs",
        "Higher stiffness-to-weight ratio than timber I-joists",
      ],
    },
    {
      step: "02",
      title: "Permanently Squeak-Free",
      description:
        "Timber joists shrink as they dry, causing nails to pop and floorboards to squeak over time. Steel joists maintain dimensional stability forever with zero moisture contraction.",
      image: "/what-we-do-fabrications.jpg",
      points: [
        "Zero warranty callbacks for floor squeaks",
        "Rigid, silent, solid concrete-like underfoot feel",
        "50-Year structural durability peace of mind",
      ],
    },
    {
      step: "03",
      title: "Integrated Service Pass-Through",
      description:
        "Engineered with large factory-punched web apertures, allowing plumbers, HVAC ducting, and electricians to run services seamlessly through the floor zone without drilling.",
      image: "/built-on-trust-delivery.jpg",
      points: [
        "Fits standard 150mm & 200mm air conditioning ducts",
        "Zero onsite cutting or structural weakening of joists",
        "Cuts subfloor rough-in trade hours in half",
      ],
    },
  ];

  const specs = [
    { depth: "200mm", span: "Up to 5.2m", weight: "4.8 kg/m", services: "140mm circular & oblong" },
    { depth: "250mm", span: "Up to 6.4m", weight: "5.6 kg/m", services: "180mm circular & oblong" },
    { depth: "300mm", span: "Up to 7.8m", weight: "6.4 kg/m", services: "220mm circular & oblong" },
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
                ENGINEERED FLOORING INNOVATION
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-heading font-black uppercase tracking-tight text-[#0F1114] leading-[1.12]">
              THE ALPHA FLOOR <span className="text-[#1E63D8]">JOIST SYSTEM</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Engineered light gauge steel floor joists redefining architectural freedom. Long clear spans, zero squeaks, massive services access, and rapid two-man installation for Australian multi-storey builds.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-[#CBD5E1]/70">
            <div>
              <span className="text-2xl sm:text-3xl font-heading font-black text-[#1E63D8] block">
                7.8M
              </span>
              <span className="text-xs sm:text-sm font-sans text-slate-600 font-medium">
                Maximum Clear Span
              </span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-heading font-black text-[#0F1114] block">
                ZERO
              </span>
              <span className="text-xs sm:text-sm font-sans text-slate-600 font-medium">
                Creaks, Squeaks &amp; Shrinkage
              </span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-heading font-black text-[#0F1114] block">
                220mm
              </span>
              <span className="text-xs sm:text-sm font-sans text-slate-600 font-medium">
                HVAC Service Apertures
              </span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-heading font-black text-[#1E63D8] block">
                2-MAN
              </span>
              <span className="text-xs sm:text-sm font-sans text-slate-600 font-medium">
                Rapid Crane-Free Install
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. CORE ADVANTAGES (3 Cards Grid)
          =================================================================== */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#CBD5E1]">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#EEF0F2] border border-[#CBD5E1] mb-3">
            <span className="text-[11px] font-bold font-label tracking-widest text-[#0F1114] uppercase">
              STRUCTURAL ADVANTAGES
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-[#0F1114] leading-[1.14]">
            BUILT FOR SILENT, <span className="text-[#1E63D8]">UNCOMPROMISED FLOORS</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Designed specifically to replace fragile timber I-joists and complex open-web trusses with a cleaner, faster steel framing solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {advantages.map((item) => (
            <div
              key={item.step}
              className="group bg-white rounded-[14px] border border-[#CBD5E1] p-6 sm:p-7 flex flex-col justify-between shadow-[0_4px_20px_rgba(15,17,20,0.04)] hover:shadow-[0_16px_40px_rgba(30,99,216,0.12)] hover:border-[#1E63D8] transition-all duration-300"
            >
              <div>
                <div className="relative w-full aspect-[16/10] rounded-[10px] overflow-hidden bg-slate-100 border border-[#CBD5E1]/60 mb-6">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md bg-[#0F1114]/85 backdrop-blur-sm text-white text-[11px] font-mono font-bold tracking-wider">
                    {item.step}
                  </div>
                </div>

                <h3 className="font-sans font-bold text-lg sm:text-[19px] uppercase tracking-tight text-[#0F1114] group-hover:text-[#1E63D8] transition-colors leading-snug mb-2.5">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-5">
                  {item.description}
                </p>

                <ul className="space-y-2 text-xs sm:text-[13px] text-slate-700 font-medium">
                  {item.points.map((pt, i) => (
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
          3. TECHNICAL SPECIFICATIONS TABLE
          =================================================================== */}
      <section className="py-20 sm:py-24 bg-[#FAF9F6] border-b border-[#CBD5E1] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-[#0F1114] leading-[1.14]">
              ALPHA FLOOR <span className="text-[#1E63D8]">TECHNICAL DATA</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              High-tensile G550 galvanised steel profile specifications engineered to Australian Standards AS/NZS 4600.
            </p>
          </div>

          <div className="bg-white rounded-[14px] border border-[#CBD5E1] shadow-sm overflow-hidden">
            <div className="grid grid-cols-4 bg-[#EEF0F2] border-b border-[#CBD5E1] p-4 text-xs font-heading font-black uppercase text-[#0F1114]">
              <div>Joist Profile</div>
              <div>Typical Span</div>
              <div>Weight</div>
              <div>Service Apertures</div>
            </div>

            <div className="divide-y divide-[#E2E8F0] text-xs sm:text-sm">
              {specs.map((row, idx) => (
                <div key={idx} className="grid grid-cols-4 p-4 items-center hover:bg-slate-50/70 transition-colors">
                  <div className="font-bold text-[#0F1114]">
                    Alpha {row.depth}
                  </div>
                  <div className="text-slate-800 font-medium text-[#1E63D8]">
                    {row.span}
                  </div>
                  <div className="text-slate-600">
                    {row.weight}
                  </div>
                  <div className="text-slate-700">
                    {row.services}
                  </div>
                </div>
              ))}
            </div>
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
              Upgrade Your Next Build To <span className="text-[#3B82F6]">Alpha Floor</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Our engineering team can review your architectural plans and supply an engineered layout with complete span tables and joist layouts.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-7 py-3.5 rounded-full bg-[#1E63D8] hover:bg-[#1650B5] text-white text-xs sm:text-sm font-bold font-label tracking-wider uppercase transition-colors shadow-lg"
              >
                REQUEST ALPHA FLOOR QUOTE
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
