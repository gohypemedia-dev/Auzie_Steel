"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "HOME", href: "/" },
  { name: "STEEL FRAMES", href: "/steel-frames" },
  { name: "ALPHA FLOOR", href: "/alpha-floor" },
  { name: "ABOUT", href: "/about" },
  { name: "BLOG", href: "/blog" },
  { name: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      // Scrolled state
      setIsScrolled(currentScrollY > 20);

      // Always show at top of page
      if (currentScrollY <= 20) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 6) {
        // Scrolling DOWN -> hide navbar
        if (!mobileMenuOpen) {
          setIsVisible(false);
        }
      } else if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 6) {
        // Scrolling UP -> reveal navbar
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  // Transparent only at the very top of the homepage
  const isTransparent = isHomePage && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-300 ease-in-out shadow-none ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isTransparent
            ? "bg-transparent border-b border-transparent text-white"
            : "bg-slate-950/75 backdrop-blur-md border-b border-slate-800/70 text-white"
        }`}
      >
        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link
              href="/"
              onClick={() => setClickedItem(null)}
              className="flex items-center group focus:outline-none py-1"
            >
              <Image
                src="/auzie-steel-3d-logo.png"
                alt="AUZIE STEEL - LIGHT GAUGE STEEL"
                width={200}
                height={117}
                priority
                className="h-14 sm:h-16 md:h-[68px] w-auto object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navItems.map((item) => {
                const isSelected = clickedItem === item.name || (pathname === item.href && !clickedItem);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setClickedItem(item.name)}
                    className={`relative px-3.5 py-2 rounded-md text-xs font-bold font-label tracking-widest uppercase transition-all duration-200 ${
                      isSelected
                        ? "text-white font-extrabold"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.name}
                    {isSelected && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#1E63D8] rounded-full shadow-sm" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action / Phone Button + Get a Quote */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:1300647833"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold font-label text-xs tracking-wider border border-white/20 transition-all hover:scale-[1.02] backdrop-blur-sm shadow-sm"
              >
                <svg
                  className="w-3.5 h-3.5 text-[#1E63D8]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                </svg>
                <span>1300 647 833</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#1E63D8] hover:bg-blue-600 text-white font-bold font-label text-xs tracking-wider uppercase shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                GET A QUOTE
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none transition-colors"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-b border-slate-800 bg-slate-950/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-2 shadow-none">
            {navItems.map((item) => {
              const isSelected = clickedItem === item.name || (pathname === item.href && !clickedItem);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setClickedItem(item.name);
                    setMobileMenuOpen(false);
                  }}
                  className={`block px-4 py-2.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-all ${
                    isSelected
                      ? "text-[#1E63D8] bg-blue-950/40 font-extrabold"
                      : "text-white/80 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <a
                href="tel:1300647833"
                className="text-center py-2.5 rounded-lg text-xs font-bold text-white bg-white/10 uppercase tracking-wider"
              >
                📞 1300 647 833
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 rounded-lg text-xs font-bold text-white bg-[#1E63D8] uppercase tracking-wider shadow"
              >
                GET A QUOTE
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent layout jump on non-home pages */}
      {!isHomePage && <div className="h-20 w-full shrink-0" aria-hidden="true" />}
    </>
  );
}
