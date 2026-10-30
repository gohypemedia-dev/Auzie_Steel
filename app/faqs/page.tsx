import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Auzie Steel South Australia",
  description:
    "Common questions answered about light gauge steel framing, BlueScope Truecore® steel, Alpha Floor joist spans, and bushfire compliance.",
};

const faqs = [
  {
    q: "How does the cost of light gauge steel compare to timber framing?",
    a: "While raw material prices fluctuate, steel framing provides substantial total project cost savings. Steel frames never warp, shrink, twist, or rot, eliminating costly callouts to plane bowed studs or repair cracked cornice plasterboard. Furthermore, factory pre-punched service holes accelerate rough-in trades by up to 40%.",
  },
  {
    q: "What warranty comes with Auzie Steel frames?",
    a: "Auzie Steel exclusively manufactures from genuine Australian BlueScope Truecore® steel. When installed in accordance with BlueScope guidelines, residential structural framing is backed by an eligible warranty of up to 50 years.",
  },
  {
    q: "Are steel frames certified for bushfire zones (BAL ratings)?",
    a: "Yes. Steel is inherently non-combustible and will not ignite or feed a fire. Auzie Steel frames are compliant with AS 3959 standards for construction in bushfire-prone zones, including BAL-40 and BAL-FZ (FlameZone) applications.",
  },
  {
    q: "How do electricians and plumbers run cabling and pipes through steel?",
    a: "Every Auzie Steel framing member features pre-punched service holes with flared edges. Grommets and isolators are clipped into place, allowing electricians and plumbers to pull cabling and water lines smoothly without drilling or compromising structural member capacity.",
  },
  {
    q: "What makes Alpha Floor joists superior to timber I-joists?",
    a: "Alpha Floor joists deliver spans of 7+ metres without intermediate load-bearing drop beams. Furthermore, steel joists never shrink or loosen fasteners as moisture levels change, permanently eliminating squeaky floors.",
  },
  {
    q: "Can standard drywall and external cladding be fixed to steel frames?",
    a: "Yes. Standard plasterboard, fibre-cement sheets, brick veneer ties, and composite cladding systems fix directly into steel framing using self-drilling tek screws with standard cordless drivers.",
  },
];

export default function FaqsPage() {
  return (
    <div className="bg-white text-[#0F1114] min-h-screen pt-20">
      {/* Header */}
      <section className="relative w-full bg-[#FAF9F6] border-b border-[#CBD5E1] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#EEF0F2] border border-[#CBD5E1]">
              <span className="text-[11px] font-bold font-label tracking-widest text-[#0F1114] uppercase">
                FREQUENTLY ASKED QUESTIONS
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-heading font-black uppercase tracking-tight text-[#0F1114] leading-[1.12]">
              QUESTIONS &amp; <span className="text-[#1E63D8]">ANSWERS</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Clear answers to the most common questions builders, architects, and homeowners ask about Auzie Steel framing systems.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Grid */}
      <section className="py-20 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[14px] border border-[#CBD5E1] p-6 sm:p-8 shadow-[0_4px_20px_rgba(15,17,20,0.03)] hover:border-[#1E63D8] transition-colors"
            >
              <h2 className="font-sans font-bold text-base sm:text-lg uppercase tracking-tight text-[#0F1114] mb-3 flex items-start gap-3">
                <span className="text-[#1E63D8] font-mono">Q.</span>
                <span>{faq.q}</span>
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed pl-7 font-normal">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-16 text-center bg-[#FAF9F6] rounded-[16px] border border-[#CBD5E1] p-8 sm:p-10">
          <h3 className="font-heading font-black text-xl uppercase text-[#0F1114] mb-2">
            STILL HAVE QUESTIONS?
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
            Our Adelaide technical detailing team is available to discuss your specific engineering and structural requirements.
          </p>
          <Link
            href="/contact"
            className="inline-block px-7 py-3 rounded-full bg-[#1E63D8] hover:bg-[#1650B5] text-white text-xs sm:text-sm font-bold font-label tracking-wider uppercase transition-colors shadow-md"
          >
            CONTACT OUR TEAM
          </Link>
        </div>
      </section>
    </div>
  );
}

