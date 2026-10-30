import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-300 rounded-t-[32px] sm:rounded-t-[48px] border-t border-slate-800/90 relative overflow-hidden shadow-2xl pt-16 sm:pt-20 pb-6 sm:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ===================================================================
            TOP NAVIGATION GRID: 5 COLUMNS (Matching Reference Design)
            =================================================================== */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 sm:pb-16">
          
          {/* Column 1: Company */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-semibold text-white tracking-wide">
              Company
            </h3>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors duration-200">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/#why-choose-steel" className="hover:text-white transition-colors duration-200">
                  Why Choose Steel
                </Link>
              </li>
              <li>
                <Link href="/#projects-gallery" className="hover:text-white transition-colors duration-200">
                  Projects Gallery
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors duration-200">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-white transition-colors duration-200">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Products & Systems */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-semibold text-white tracking-wide">
              Products
            </h3>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/steel-frames" className="hover:text-white transition-colors duration-200">
                  Prefabricated Wall Frames
                </Link>
              </li>
              <li>
                <Link href="/steel-frames" className="hover:text-white transition-colors duration-200">
                  Engineered Roof Trusses
                </Link>
              </li>
              <li>
                <Link href="/alpha-floor" className="hover:text-white transition-colors duration-200">
                  Alpha Floor Joist Systems
                </Link>
              </li>
              <li>
                <Link href="/alpha-floor" className="hover:text-white transition-colors duration-200">
                  Acoustic Floor Solutions
                </Link>
              </li>
              <li>
                <Link href="/steel-frames" className="hover:text-white transition-colors duration-200">
                  Custom CAD/BIM Detailing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-semibold text-white tracking-wide">
              Resources
            </h3>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/blog" className="hover:text-white transition-colors duration-200">
                  Blog &amp; News
                </Link>
              </li>
              <li>
                <Link href="/steel-frames" className="hover:text-white transition-colors duration-200">
                  Technical Specifications
                </Link>
              </li>
              <li>
                <Link href="/#projects-gallery" className="hover:text-white transition-colors duration-200">
                  Media &amp; Case Studies
                </Link>
              </li>
              <li>
                <Link href="/steel-frames" className="hover:text-white transition-colors duration-200">
                  Truecore® 50-Yr Warranty
                </Link>
              </li>
              <li>
                <Link href="/steel-frames" className="hover:text-white transition-colors duration-200">
                  AS/NZS 4600 &amp; NCC 2022
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-semibold text-white tracking-wide">
              Legal
            </h3>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors duration-200">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors duration-200">
                  Terms of use
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors duration-200">
                  Acceptance policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div className="space-y-4 col-span-2 sm:col-span-1">
            <h3 className="text-sm sm:text-base font-semibold text-white tracking-wide">
              Contact
            </h3>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-slate-400">
              <li>
                <a
                  href="mailto:sales@ogsteel.com.au"
                  className="hover:text-white transition-colors duration-200 break-all"
                >
                  sales@ogsteel.com.au
                </a>
              </li>
              <li>
                <a
                  href="tel:1300647833"
                  className="hover:text-white transition-colors duration-200 font-mono text-sm"
                >
                  1300 647 833
                </a>
              </li>
              <li className="text-slate-400">
                <span>07000-AUZIESTEEL</span>
              </li>
              <li className="pt-1 text-slate-400 text-xs">
                <span>Adelaide, South Australia</span>
              </li>
            </ul>
          </div>

        </div>

        {/* ===================================================================
            DIVIDER LINE
            =================================================================== */}
        <div className="w-full h-px bg-slate-800/90 mb-8 sm:mb-10" />

        {/* ===================================================================
            ADDRESS, COPYRIGHT & SOCIAL ICONS ROW
            =================================================================== */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 sm:pb-12">
          
          {/* Address & Copyright */}
          <div className="space-y-2 text-xs sm:text-sm text-slate-400">
            <p className="text-slate-300 font-medium">
              Auzie Steel HQ, 14 Bishopstone Road, Davoren Park, South Australia 5113.
            </p>
            <p className="text-slate-500 text-xs">
              © 2026 Auzie Steel. All rights reserved. · Website by{" "}
              <span className="text-slate-300 font-semibold">Go Hype Media</span>
            </p>
          </div>

          {/* Social Media Circular Icon Pills (Matching Reference Icons) */}
          <div className="flex items-center gap-3">
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-slate-950 flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* X (formerly Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-slate-950 flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-slate-950 flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-slate-950 flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
          </div>

        </div>

      </div>

      {/* ===================================================================
          GIANT BRAND WATERMARK (End-to-End Across Full Width, Symmetrical & Fully Uncut)
          =================================================================== */}
      <div className="relative w-full overflow-hidden select-none pointer-events-none pt-2 sm:pt-4 -mb-1 sm:-mb-2 px-2 sm:px-4">
        <svg
          viewBox="0 0 1100 135"
          className="w-full h-auto block select-none pointer-events-none"
          preserveAspectRatio="none"
        >
          <text
            x="550"
            y="118"
            textAnchor="middle"
            className="font-heading font-black fill-white/[0.08] uppercase"
            style={{
              fontFamily: "var(--font-archivo-black), sans-serif",
              fontSize: "130px",
            }}
            textLength="1040"
            lengthAdjust="spacingAndGlyphs"
          >
            AUZIE STEEL
          </text>
        </svg>
      </div>

    </footer>
  );
}
