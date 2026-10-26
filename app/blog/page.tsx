import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BLOG & INDUSTRY INSIGHTS | AUZIE STEEL",
  description:
    "Explore the latest insights, engineering guides, and expert advice on light-gauge steel framing, Alpha Floor joist technology, and modern construction methods.",
};

const articles = [
  {
    id: 1,
    title: "STEEL FRAMING VS TIMBER: COMPLETE BUILDER'S COST & DURABILITY COMPARISON",
    category: "FRAMING GUIDE",
    date: "OCTOBER 18, 2026",
    excerpt:
      "Analyze the total project lifecycle costs, construction speed, termite immunity, and zero-callout benefits of steel framing over traditional timber studs.",
    readTime: "5 MIN READ",
  },
  {
    id: 2,
    title: "WHY ALPHA FLOOR JOISTS ARE REPLACING ENGINEERED TIMBER I-JOISTS",
    category: "ALPHA FLOOR",
    date: "OCTOBER 02, 2026",
    excerpt:
      "Discover how large integrated service duct openings and squeak-free structural stiffness make Alpha Floor joists the first choice for modern two-storey homes.",
    readTime: "4 MIN READ",
  },
  {
    id: 3,
    title: "BUILDING IN BUSHFIRE-PRONE ZONES: BAL-40 & BAL-FZ COMPLIANCE",
    category: "REGULATIONS & SAFETY",
    date: "SEPTEMBER 24, 2026",
    excerpt:
      "How non-combustible Truecore® steel frames provide superior safety and simplify National Construction Code compliance in Australian bushfire attack levels.",
    readTime: "6 MIN READ",
  },
  {
    id: 4,
    title: "ACCELERATING ROUGH-IN: HOW PRE-PUNCHED HOLES SAVE DAYS ON SITE",
    category: "CONSTRUCTION TIPS",
    date: "SEPTEMBER 11, 2026",
    excerpt:
      "Plumbers and electricians share why factory-punched service holes eliminate drilling hassle and ensure structural integrity remains uncompromised.",
    readTime: "3 MIN READ",
  },
  {
    id: 5,
    title: "ENDING FLOOR SQUEAKS PERMANENTLY WITH ENGINEERED STEEL FRAMING",
    category: "TECHNICAL SPECS",
    date: "AUGUST 29, 2026",
    excerpt:
      "Floor squeaks are the #1 homeowner complaint. Here is the engineering science of how steel floor joists and proper fastening eliminate timber shrink clicks.",
    readTime: "5 MIN READ",
  },
  {
    id: 6,
    title: "THE ULTIMATE GUIDE TO ACOUSTIC PERFORMANCE IN MULTI-STOREY STEEL FRAMING",
    category: "ENGINEERING",
    date: "AUGUST 15, 2026",
    excerpt:
      "Learn how to achieve exceptional acoustic ratings (Rw + Ctr) between floors and party walls using modern steel framing assemblies.",
    readTime: "7 MIN READ",
  },
];

export default function BlogPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Header Banner */}
      <section className="relative py-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              INDUSTRY KNOWLEDGE &amp; ENGINEERING GUIDES
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              AUZIE STEEL BLOG
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Stay ahead with expert articles on modern methods of construction (MMC), steel framing best practices, and Alpha Floor engineering innovations.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="flex flex-col justify-between rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-600 p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="px-2.5 py-1 rounded-md bg-white/10 text-white font-semibold border border-white/20 uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="text-slate-500 uppercase">{article.readTime}</span>
                </div>
                <h2 className="text-lg font-bold text-white mb-3 hover:text-slate-300 transition-colors uppercase leading-snug">
                  {article.title}
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <span className="uppercase">{article.date}</span>
                <span className="text-white font-semibold inline-flex items-center gap-1 group uppercase tracking-wider">
                  READ ARTICLE
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter / Consultation CTA */}
        <div className="mt-20 p-8 sm:p-12 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white uppercase tracking-wide">
            HAVE A SPECIFIC ENGINEERING OR FRAMING QUESTION?
          </h3>
          <p className="text-slate-300 max-w-xl mx-auto text-sm">
            Speak directly with our technical design team to review your architectural plans.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-[#020618] hover:bg-[#071e4a] border border-white/20 shadow-2xl shadow-black transition-colors"
            >
              CONTACT OUR ENGINEERS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
