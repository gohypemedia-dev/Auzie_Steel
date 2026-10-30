import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog & Industry Insights | Auzie Steel South Australia",
  description:
    "Explore engineering guides, builder cost comparisons, and technical insights on light gauge steel framing and Alpha Floor systems.",
};

const articles = [
  {
    id: 1,
    title: "Steel Framing vs Timber: Complete Builder Cost & Durability Breakdown",
    category: "Cost & Durability",
    date: "October 18, 2026",
    readTime: "5 Min Read",
    image: "/why-choose-transport-main.jpg",
    excerpt:
      "A deep dive into initial framing costs vs total lifecycle savings, zero termite callbacks, rapid trade rough-ins, and the 50-year BlueScope Truecore® warranty advantage.",
  },
  {
    id: 2,
    title: "Why Alpha Floor Joists Are Replacing Engineered Timber I-Joists",
    category: "Alpha Floor",
    date: "October 02, 2026",
    readTime: "4 Min Read",
    image: "/what-we-do-fabrications.jpg",
    excerpt:
      "Explore how 7-metre clear spans, zero-squeak dimensional stability, and large factory-punched HVAC duct apertures are revolutionizing double-storey residential construction.",
  },
  {
    id: 3,
    title: "Building in Bushfire Attack Zones: Achieving BAL-40 & BAL-FZ Compliance",
    category: "Building Regulations",
    date: "September 24, 2026",
    readTime: "6 Min Read",
    image: "/why-choose-fire-main.jpg",
    excerpt:
      "How non-combustible light gauge steel framing simplifies National Construction Code (NCC) bushfire regulations and protects homes in Adelaide Hills and regional SA.",
  },
  {
    id: 4,
    title: "Accelerating Rough-In: How Pre-Punched Service Holes Save Days Onsite",
    category: "Trade Efficiency",
    date: "September 11, 2026",
    readTime: "3 Min Read",
    image: "/built-on-trust-standards.jpg",
    excerpt:
      "Electricians and plumbers share their experience with factory-punched service holes that eliminate hole-saw drilling and preserve structural framing integrity.",
  },
  {
    id: 5,
    title: "Ending Floor Squeaks Permanently: The Science of Steel Joist Rigidity",
    category: "Engineering Insights",
    date: "August 28, 2026",
    readTime: "4 Min Read",
    image: "/who-we-are-modern-building.jpg",
    excerpt:
      "Timber floor joists dry out, shrink, and loosen fasteners over time. Learn why high-tensile steel joists stay dimensionally unyielding for the lifetime of the home.",
  },
  {
    id: 6,
    title: "3D CAD/BIM Detailing: How Digital Twins Prevent Onsite Framing Clashes",
    category: "Digital Detailing",
    date: "August 15, 2026",
    readTime: "5 Min Read",
    image: "/what-we-do-custom-designs.jpg",
    excerpt:
      "Discover how automated FRAMECAD CNC roll-forming directly from digital architectural models prevents costly onsite structural modifications and trade re-work.",
  },
];

export default function BlogPage() {
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
                INDUSTRY INSIGHTS &amp; GUIDES
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-heading font-black uppercase tracking-tight text-[#0F1114] leading-[1.12]">
              THE AUZIE STEEL <span className="text-[#1E63D8]">KNOWLEDGE HUB</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Practical construction advice, builder cost breakdowns, and technical engineering insights on light gauge steel framing and Alpha Floor systems across South Australia.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. FEATURED ARTICLE BANNER
          =================================================================== */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#CBD5E1]">
        <div className="group bg-white rounded-[16px] border border-[#CBD5E1] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#1E63D8] transition-all duration-300 grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[360px] lg:min-h-[420px] bg-slate-100">
            <Image
              src="/call-to-enquire-steel-site.jpg"
              alt="Featured Article: Steel Framing vs Timber"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#1E63D8] text-white text-[11px] font-bold font-label tracking-widest uppercase">
              FEATURED GUIDE
            </div>
          </div>

          <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                <span>COST &amp; DURABILITY</span>
                <span>•</span>
                <span>OCTOBER 18, 2026</span>
                <span>•</span>
                <span>5 MIN READ</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-[#0F1114] group-hover:text-[#1E63D8] transition-colors leading-snug">
                Steel Framing vs Timber: Complete Builder Cost &amp; Durability Breakdown
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Compare direct material pricing, trade rough-in speeds, termite eradication costs, and zero-callback warranties. Discover why more South Australian builders are switching to Truecore® steel.
              </p>
            </div>

            <div className="pt-6">
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold font-label tracking-wider text-[#1E63D8] uppercase group-hover:translate-x-1 transition-transform">
                READ FULL ARTICLE →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          3. ALL ARTICLES GRID (3 Columns)
          =================================================================== */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#CBD5E1]">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-[#0F1114]">
            LATEST <span className="text-[#1E63D8]">TECHNICAL ARTICLES</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group bg-white rounded-[14px] border border-[#CBD5E1] p-5 sm:p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(15,17,20,0.04)] hover:shadow-[0_16px_40px_rgba(30,99,216,0.12)] hover:border-[#1E63D8] transition-all duration-300"
            >
              <div>
                <div className="relative w-full aspect-[16/10] rounded-[10px] overflow-hidden bg-slate-100 border border-[#CBD5E1]/60 mb-5">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-[#0F1114]/85 backdrop-blur-sm text-white text-[11px] font-mono font-bold tracking-wider">
                    {article.category}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-2">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-sans font-bold text-base sm:text-[17px] uppercase tracking-tight text-[#0F1114] group-hover:text-[#1E63D8] transition-colors leading-snug mb-3">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-5">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between">
                <span className="text-xs font-bold font-label tracking-wider text-[#1E63D8] uppercase group-hover:translate-x-0.5 transition-transform">
                  READ ARTICLE →
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===================================================================
          4. CALL TO ACTION BANNER
          =================================================================== */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-950 text-white rounded-[16px] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight leading-tight">
              Have A Custom Project <span className="text-[#3B82F6]">In Mind</span>?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Send your CAD or PDF building plans to our engineering team for an exact structural framing and Alpha Floor takeoff estimate.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-7 py-3.5 rounded-full bg-[#1E63D8] hover:bg-[#1650B5] text-white text-xs sm:text-sm font-bold font-label tracking-wider uppercase transition-colors shadow-lg"
              >
                SUBMIT PLANS FOR ESTIMATE
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
