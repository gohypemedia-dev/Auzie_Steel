import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "STEEL FRAMES | AUZIE STEEL",
  description:
    "Precision engineered light gauge steel wall frames, roof trusses, and structural framing solutions for residential and commercial construction.",
};

export default function SteelFramesPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Header Banner */}
      <section className="relative py-20 bg-gradient-to-b from-[#071e4a]/60 via-slate-900 to-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              STRUCTURAL FRAMING SOLUTIONS
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              HIGH-TENSILE STEEL FRAMES
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Manufactured with millimeter precision from Australian high-tensile steel. Perfectly straight walls, non-combustible ratings, and seamless installation for residential and commercial builders.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-600 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold text-xl mb-6">
              01
            </div>
            <h2 className="text-xl font-bold text-white mb-3 uppercase">WALL FRAMING SYSTEMS</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Pre-assembled wall panels engineered to exact architectural tolerances. Featuring pre-punched service holes for rapid electrical cabling and plumbing conduit.
            </p>
            <ul className="text-xs text-slate-400 space-y-2">
              <li>✓ Load-bearing &amp; non-load bearing</li>
              <li>✓ Fire-rated boundary wall assemblies</li>
              <li>✓ Multi-storey capacity</li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-600 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold text-xl mb-6">
              02
            </div>
            <h2 className="text-xl font-bold text-white mb-3 uppercase">ENGINEERED ROOF TRUSSES</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Lightweight, high-strength roof trusses designed to span expansive open plan living spaces without sagging, twisting, or requiring intermediate load-bearing columns.
            </p>
            <ul className="text-xs text-slate-400 space-y-2">
              <li>✓ High strength-to-weight ratio</li>
              <li>✓ Resists cyclone &amp; extreme wind loads</li>
              <li>✓ Easy manual lifting and placement</li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-600 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold text-xl mb-6">
              03
            </div>
            <h2 className="text-xl font-bold text-white mb-3 uppercase">FLOOR CASSETTES &amp; LINTELS</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Rapid-erect floor framing cassettes and precision lintels engineered to integrate with our Alpha Floor system or concrete subfloors.
            </p>
            <ul className="text-xs text-slate-400 space-y-2">
              <li>✓ Craneable modular floor cassettes</li>
              <li>✓ Squeak-free rigid underfoot feel</li>
              <li>✓ Accelerated build program</li>
            </ul>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-8 sm:p-12 mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center uppercase tracking-wide">
            WHY STEEL FRAMING OUTPERFORMS TRADITIONAL TIMBER
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 uppercase">
                <span>⚡</span> AUZIE STEEL FRAMES
              </h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2">✓ 100% Termite &amp; pest impervious (No chemical treatments)</li>
                <li className="flex items-center gap-2">✓ Non-combustible (BAL-40 &amp; BAL-FZ bushfire compliant)</li>
                <li className="flex items-center gap-2">✓ Guaranteed 0mm twist, warp, shrink, or buckle</li>
                <li className="flex items-center gap-2">✓ 50-Year BlueScope Steel structural warranty</li>
                <li className="flex items-center gap-2">✓ 100% recyclable environmentally sustainable</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 opacity-80">
              <h3 className="text-lg font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase">
                <span>🪵</span> TRADITIONAL TIMBER
              </h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2">✗ Vulnerable to termite degradation and rot</li>
                <li className="flex items-center gap-2">✗ Combustible fire hazard in bushfire prone zones</li>
                <li className="flex items-center gap-2">✗ Absorbs moisture, leading to plasterboard cracking</li>
                <li className="flex items-center gap-2">✗ Variable timber quality and crown issues</li>
                <li className="flex items-center gap-2">✗ Deforestation and heavy chemical treatments</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold uppercase tracking-wider text-white bg-[#020618] hover:bg-[#071e4a] border border-white/20 shadow-2xl shadow-black hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            GET A QUOTE FOR YOUR STEEL FRAMES
          </Link>
        </div>
      </section>
    </div>
  );
}
