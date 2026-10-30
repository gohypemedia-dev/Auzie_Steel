import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers | Auzie Steel South Australia",
  description:
    "Join the Auzie Steel team in Adelaide. Opportunities in 3D CAD/BIM detailing, CNC roll-forming, and light gauge steel frame assembly.",
};

const openings = [
  {
    role: "CAD / BIM Structural Detailer",
    type: "Full-Time • Adelaide",
    description:
      "Translate architectural and structural engineering plans into detailed 3D light gauge steel framing models and CNC machine code using FRAMECAD / Vertex BD.",
    requirements: ["Experience in LGS detailing", "Strong understanding of Australian Standards AS 4600", "BIM/Revit proficiency"],
  },
  {
    role: "CNC Roll-Forming Machine Operator",
    type: "Full-Time • Manufacturing Plant",
    description:
      "Operate and monitor state-of-the-art computer-controlled roll-forming production lines, ensuring tight tolerances and continuous quality control.",
    requirements: ["Machine operation experience", "High attention to detail & QA", "Forklift license preferred"],
  },
  {
    role: "Framing Panel Assembly Technician",
    type: "Full-Time • Manufacturing Plant",
    description:
      "Assemble, rivet, and bolt pre-formed steel studs into modular wall panels, roof trusses, and Alpha Floor cassettes on precision assembly jigs.",
    requirements: ["Hand/power tool proficiency", "Ability to read structural fabrication drawings", "Reliable team player"],
  },
];

export default function CareersPage() {
  return (
    <div className="bg-white text-[#0F1114] min-h-screen pt-20">
      {/* Header */}
      <section className="relative w-full bg-[#FAF9F6] border-b border-[#CBD5E1] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#EEF0F2] border border-[#CBD5E1]">
              <span className="text-[11px] font-bold font-label tracking-widest text-[#0F1114] uppercase">
                CAREERS AT AUZIE STEEL
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-heading font-black uppercase tracking-tight text-[#0F1114] leading-[1.12]">
              BUILD YOUR CAREER IN <span className="text-[#1E63D8]">STEEL INNOVATION</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Join South Australia&apos;s fastest-growing light gauge steel framing team. We offer clean, modern factory working environments, career development, and competitive remuneration.
            </p>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-20 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-[#0F1114]">
            CURRENT <span className="text-[#1E63D8]">OPENINGS</span>
          </h2>
        </div>

        <div className="space-y-6">
          {openings.map((job, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[14px] border border-[#CBD5E1] p-6 sm:p-8 shadow-[0_4px_20px_rgba(15,17,20,0.03)] hover:border-[#1E63D8] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-xl">
                <span className="text-xs font-mono font-bold text-[#1E63D8] uppercase tracking-wider block">
                  {job.type}
                </span>
                <h3 className="font-sans font-bold text-lg sm:text-xl uppercase text-[#0F1114]">
                  {job.role}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {job.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-1 text-xs text-slate-600 font-medium">
                  {job.requirements.map((req, rIdx) => (
                    <span key={rIdx} className="px-2.5 py-1 rounded-md bg-slate-100">
                      • {req}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0">
                <Link
                  href="/contact"
                  className="inline-block px-6 py-3 rounded-xl bg-[#0F1114] hover:bg-[#1E63D8] text-white text-xs font-bold font-label tracking-wider uppercase transition-colors shadow-sm"
                >
                  APPLY NOW →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

