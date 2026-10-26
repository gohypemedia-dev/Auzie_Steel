import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ALPHA FLOOR | AUZIE STEEL",
  description:
    "The Alpha Floor engineered steel joist system delivers superior long clear spans, squeak-free floors, and effortless utility ducting for Australian residential and commercial construction.",
};

export default function AlphaFloorPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Header Banner */}
      <section className="relative py-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              FLOORING INNOVATION
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              THE ALPHA FLOOR JOIST SYSTEM
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Engineered steel floor framing redefining modern architectural freedom. Long clear spans, zero squeaks, massive services access, and rapid two-man installation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-600 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold text-xl mb-6">
              01
            </div>
            <h2 className="text-xl font-bold text-white mb-3 uppercase">EXPANSIVE CLEAR SPANS</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Eliminate costly drop beams and awkward internal load-bearing posts. Alpha Floor delivers clear spans of 7+ metres with minimal deflection.
            </p>
            <div className="text-xs text-slate-400 font-semibold uppercase">
              Maximum architectural freedom for open-concept floorplans
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-600 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold text-xl mb-6">
              02
            </div>
            <h2 className="text-xl font-bold text-white mb-3 uppercase">QUIET &amp; SQUEAK-FREE</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Unlike timber that shrinks, settles, and creaks over time, our high-tensile steel joists maintain permanent dimensional rigidity and acoustic isolation.
            </p>
            <div className="text-xs text-slate-400 font-semibold uppercase">
              Engineered acoustic damping performance
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-600 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold text-xl mb-6">
              03
            </div>
            <h2 className="text-xl font-bold text-white mb-3 uppercase">INTEGRATED SERVICE WEB</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Open web openings accommodate up to 300mm HVAC ducting, plumbing lines, and electrical conduits without any drilling, cutting, or structural weakening.
            </p>
            <div className="text-xs text-slate-400 font-semibold uppercase">
              Save thousands on plumbing and electrical rough-in
            </div>
          </div>
        </div>

        {/* Specifications Box */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-8 sm:p-12 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide">TECHNICAL SPECIFICATIONS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1 uppercase">STANDARD DEPTHS</span>
              <span className="text-xl font-bold text-white uppercase">200MM, 250MM, 300MM</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1 uppercase">MAX CLEAR SPAN</span>
              <span className="text-xl font-bold text-white uppercase">UP TO 8.2 METRES</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1 uppercase">STEEL GRADE</span>
              <span className="text-xl font-bold text-white uppercase">G550 GALV / TRUECORE®</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1 uppercase">COMPLIANCE</span>
              <span className="text-xl font-bold text-white uppercase">AS/NZS 4600 &amp; NCC</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold uppercase tracking-wider text-white bg-[#020618] hover:bg-[#071e4a] border border-white/20 shadow-2xl shadow-black hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            REQUEST ALPHA FLOOR ENGINEERING TAKEOFF
          </Link>
        </div>
      </section>
    </div>
  );
}
