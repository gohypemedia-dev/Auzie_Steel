import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ABOUT US | AUZIE STEEL",
  description:
    "Learn about Auzie Steel, our Australian engineering heritage, cutting-edge roll-forming technology, and commitment to structural excellence.",
};

export default function AboutPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Header Banner */}
      <section className="relative py-20 bg-gradient-to-b from-[#071e4a]/60 via-slate-900 to-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              OUR HERITAGE &amp; VISION
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              ABOUT AUZIE STEEL
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              We are pioneers in light-gauge steel framing and innovative floor systems, dedicated to empowering Australian builders with faster, stronger, and more sustainable construction solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Story & Values */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-white uppercase">
              TRANSFORMING CONSTRUCTION WITH MILLIMETER PRECISION
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Founded to solve the persistent challenges of warping timber, rising material costs, and lengthy site framing schedules, Auzie Steel operates state-of-the-art automated CNC roll-forming lines.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Every framing member and Alpha Floor joist is engineered in advanced 3D BIM software directly from your architectural plans, roll-formed with exact service holes, inkjet-labeled, and delivered to your site ready for rapid assembly.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="border-l-2 border-white/40 pl-4">
                <span className="text-3xl font-bold text-white block uppercase">100%</span>
                <span className="text-xs text-slate-400 uppercase">AUSTRALIAN HIGH-TENSILE STEEL</span>
              </div>
              <div className="border-l-2 border-white/40 pl-4">
                <span className="text-3xl font-bold text-white block uppercase">50 YR</span>
                <span className="text-xs text-slate-400 uppercase">MATERIAL STRUCTURAL WARRANTY</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
            <h3 className="text-xl font-bold text-white uppercase">WHY BUILDERS CHOOSE AUZIE STEEL</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0 mt-0.5">✓</span>
                <div>
                  <strong className="text-white block uppercase">IN-HOUSE STRUCTURAL ENGINEERING</strong>
                  Our chartered engineering team provides certified framing plans, wind load computations, and council documentation.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0 mt-0.5">✓</span>
                <div>
                  <strong className="text-white block uppercase">NEXT-GEN ALPHA FLOOR SYSTEM</strong>
                  Our proprietary floor joist design eliminates bouncing and squeaking while cutting installation time in half.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0 mt-0.5">✓</span>
                <div>
                  <strong className="text-white block uppercase">SUSTAINABLE &amp; 100% RECYCLABLE</strong>
                  Steel framing produces virtually zero on-site timber scrap, protecting our forests and environment.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8 border-t border-slate-800">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold uppercase tracking-wider text-white bg-[#020618] hover:bg-[#071e4a] border border-white/20 shadow-2xl shadow-black hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            WORK WITH US ON YOUR NEXT BUILD
          </Link>
        </div>
      </section>
    </div>
  );
}
