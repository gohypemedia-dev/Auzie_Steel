import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="inline-block group focus:outline-none">
              <Image
                src="/auzie-steel-3d-logo.png"
                alt="AUZIE STEEL"
                width={180}
                height={105}
                className="h-12 sm:h-14 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Pioneering Australian engineered light gauge steel framing and innovative Alpha Floor systems for residential & commercial builds.
            </p>
            <div className="text-xs text-slate-500 uppercase">
              100% AUSTRALIAN STANDARDS COMPLIANT (AS/NZS 4600 & NCC 2022)
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-slate-200 uppercase mb-4">
              NAVIGATION
            </h3>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link href="/" className="hover:text-white transition-colors uppercase">
                  HOME
                </Link>
              </li>
              <li>
                <Link href="/steel-frames" className="hover:text-white transition-colors uppercase">
                  STEEL FRAMES
                </Link>
              </li>
              <li>
                <Link href="/alpha-floor" className="hover:text-white transition-colors uppercase">
                  ALPHA FLOOR
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors uppercase">
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors uppercase">
                  BLOG & NEWS
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors uppercase">
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-slate-200 uppercase mb-4">
              SYSTEMS & PRODUCTS
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link href="/steel-frames" className="hover:text-white transition-colors uppercase">
                  PREFABRICATED WALL FRAMES
                </Link>
              </li>
              <li>
                <Link href="/steel-frames" className="hover:text-white transition-colors uppercase">
                  ENGINEERED ROOF TRUSSES
                </Link>
              </li>
              <li>
                <Link href="/alpha-floor" className="hover:text-white transition-colors uppercase">
                  ALPHA FLOOR JOIST SYSTEMS
                </Link>
              </li>
              <li>
                <Link href="/alpha-floor" className="hover:text-white transition-colors uppercase">
                  ACOUSTIC FLOOR SOLUTIONS
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors uppercase">
                  CUSTOM ENGINEERING
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-slate-200 uppercase mb-4">
              GET IN TOUCH
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <svg className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-semibold text-slate-300">1300 647 833</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@auziesteel.com.au</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="uppercase">Sydney | Melbourne | Brisbane | Australia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 AUZIE STEEL PTY LTD. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0 uppercase">
            <Link href="/privacy" className="hover:text-slate-400">PRIVACY POLICY</Link>
            <Link href="/terms" className="hover:text-slate-400">TERMS OF SERVICE</Link>
            <Link href="/contact" className="hover:text-slate-400">SUPPORT</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
