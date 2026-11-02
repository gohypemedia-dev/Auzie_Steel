"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col font-sans select-none overflow-visible">
      {/* =====================================================================
          MAIN FOOTER: ELECTRIC BLUE (#3168ff)
          ===================================================================== */}
      <section className="relative z-10 w-full bg-[#3168ff] text-white pt-14 sm:pt-16 lg:pt-18 pb-12 sm:pb-16">
        <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
          {/* Top Row: Auzie Steel Brand Header on Left (Columns 1-6),
              Columns 7-12 is the 120px space occupied by the overlapping steel photo from above! */}
          <div className="mb-10 sm:mb-12">
            <div className="flex flex-col justify-center">
              <Link href="/" className="inline-block group">
                <span className="text-3xl sm:text-4xl font-sans font-medium tracking-tight text-white uppercase block leading-none">
                  AUZIE STEEL
                </span>
                <span className="block text-white/95 text-xs sm:text-[13px] !font-sans font-medium tracking-wide mt-2">
                  Auzie Steel — Light Gauge Steel
                </span>
              </Link>
              <p className="text-white/85 text-xs sm:text-sm !font-sans font-normal mt-1.5 max-w-lg">
                We are the builder&apos;s choice in steel framing.
              </p>
            </div>

            {/* Empty space reserved on desktop for the overlapping steel photo hanging down from above */}
            </div>

          {/* 5 Clean Columns Grid (Underneath the Overlap) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-6 xl:gap-10 pt-2">
            {/* Column 1: Systems (Col 1-2) */}
            <div className="space-y-3.5">
              <h3 className="text-base !font-sans font-medium text-white tracking-tight">
                Steel Systems
              </h3>
              <ul className="space-y-2 text-sm text-white/95 !font-sans">
                <li>
                  <Link href="/steel-frames" className="hover:underline transition-colors block">
                    Light Gauge Steel Frames
                  </Link>
                </li>
                <li>
                  <Link href="/alpha-floor" className="hover:underline transition-colors block">
                    Alpha Floor System
                  </Link>
                </li>
                <li>
                  <Link href="/steel-frames" className="hover:underline transition-colors block">
                    Roof Trusses
                  </Link>
                </li>
                <li>
                  <Link href="/steel-frames" className="hover:underline transition-colors block">
                    Wall Framing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Capabilities (Col 3-4) */}
            <div className="space-y-3.5">
              <h3 className="text-base !font-sans font-medium text-white tracking-tight">
                Capabilities
              </h3>
              <ul className="space-y-2 text-sm text-white/95 !font-sans">
                <li>
                  <Link href="/steel-frames" className="hover:underline transition-colors block">
                    CAD/BIM Custom Engineering
                  </Link>
                </li>
                <li>
                  <Link href="/steel-frames" className="hover:underline transition-colors block">
                    Automated CNC Fabrication
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline transition-colors block">
                    Rapid On-Site Delivery
                  </Link>
                </li>
                <li>
                  <Link href="/steel-frames" className="hover:underline transition-colors block">
                    Australian Standards Certified
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Details & Factory Address (Col 5-8, 4 columns wide) */}
            <div className="space-y-3.5">
              <h3 className="text-base !font-sans font-medium text-white tracking-tight">
                Contact &amp; Factory
              </h3>
              <div className="space-y-3 text-sm text-white/95 !font-sans">
                {/* Phone */}
                <div>
                  <span className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-0.5">
                    Phone
                  </span>
                  <a
                    href="tel:+61434287537"
                    className="hover:underline text-base font-bold text-white tracking-wide block"
                  >
                    +61 434 287 537
                  </a>
                </div>

                {/* Email */}
                <div>
                  <span className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-0.5">
                    Email
                  </span>
                  <a
                    href="mailto:sales@ogsteel.com.au"
                    className="hover:underline text-white block break-all font-medium"
                  >
                    sales@ogsteel.com.au
                  </a>
                </div>

                {/* Address */}
                <div>
                  <span className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-0.5">
                    Factory &amp; Office
                  </span>
                  <p className="text-white/90 leading-snug font-normal">
                    23B Humphries Tce,
                    <br />
                    Kilkenny SA 5009, Australia
                  </p>
                </div>
              </div>
            </div>

            {/* Column 4: Quick Links (Col 9-10 - Directly below the steel photo!) */}
            <div className="space-y-3.5">
              <h3 className="text-base !font-sans font-medium text-white tracking-tight">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm text-white/95 !font-sans">
                <li>
                  <Link href="/#why-choose-steel" className="hover:underline transition-colors block">
                    Why Choose Steel
                  </Link>
                </li>
                <li>
                  <Link href="/#why-choose-auzie-steel" className="hover:underline transition-colors block">
                    Why Auzie Steel
                  </Link>
                </li>
                <li>
                  <Link href="/steel-frames" className="hover:underline transition-colors block">
                    Engineering Specs
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline transition-colors block">
                    Builder Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5: Enquiries (Col 11-12 - Directly below the steel photo!) */}
            <div className="space-y-3.5">
              <h3 className="text-base !font-sans font-medium text-white tracking-tight">
                Enquiries
              </h3>
              <ul className="space-y-2 text-sm text-white/95 !font-sans">
                <li>
                  <Link href="/contact" className="hover:underline transition-colors block">
                    Request a Quote
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline transition-colors block">
                    Speak with Engineering
                  </Link>
                </li>
                <li>
                  <a
                    href="tel:+61434287537"
                    className="hover:underline transition-colors block font-semibold text-white"
                  >
                    Direct: +61 434 287 537
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline transition-colors block">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* ===================================================================
              4. DIVIDER & BOTTOM ROW (Exact Copyright, Credits & Social Media)
              =================================================================== */}
          <div className="w-full h-px bg-white/20 mt-16 sm:mt-20 mb-8 sm:mb-10" />

          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 sm:gap-8 text-xs text-white/90 !font-sans">
            {/* Left: Copyright + Website Credits + Legal Links */}
            <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center gap-3 sm:gap-4 md:gap-5">
              {/* Copyright */}
              <span className="font-medium text-white">
                © 2026 Auzie Steel. All rights reserved.
              </span>

              <span className="hidden md:inline text-white/40">|</span>

              {/* Website Credits */}
              <span className="text-white/85">
                Website by <strong className="text-white font-semibold">Go Hype Media</strong>
              </span>

              <span className="hidden md:inline text-white/40">|</span>

              {/* Pipe Separated Legal Links */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-white/80">
                <Link
                  href="/contact"
                  className="hover:underline hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <span className="text-white/40">|</span>
                <Link
                  href="/contact"
                  className="hover:underline hover:text-white transition-colors"
                >
                  Terms &amp; Conditions
                </Link>
                <span className="text-white/40">|</span>
                <Link
                  href="/contact"
                  className="hover:underline hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right: Circular Social Media Icons (Facebook, Instagram, LinkedIn) */}
            <div className="flex items-center gap-3 shrink-0 self-end xl:self-auto">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-white/80 hover:bg-white hover:text-[#3168ff] text-white flex items-center justify-center transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-white/80 hover:bg-white hover:text-[#3168ff] text-white flex items-center justify-center transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-white/80 hover:bg-white hover:text-[#3168ff] text-white flex items-center justify-center transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.92 0-1.66-.74-1.66-1.66 0-.92.74-1.66 1.66-1.66.92 0 1.66.74 1.66 1.66 0 .92-.74 1.66-1.66 1.66m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
