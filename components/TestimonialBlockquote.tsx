"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ReviewItem {
  id: string;
  name: string;
  role: string;
  company: string;
  city: string;
  state: string;
  avatar: string;
  rating: number;
  content: string;
}

const reviewsData: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Brett O'Connor",
    role: "Framing Contractor",
    company: "O'Connor Structural Framing",
    city: "Adelaide",
    state: "SA",
    avatar: "/builder-ammon-bingham.jpg",
    rating: 5,
    content:
      "Colour-coded framing packs arrive crane-lifted right onto the slab. We stood a 450m² two-storey frame in just four days with a 3-man crew. Zero timber twist.",
  },
  {
    id: "rev-2",
    name: "Marcus Vance",
    role: "Custom Home Builder",
    company: "Adelaide Hills Developments",
    city: "Adelaide Hills",
    state: "SA",
    avatar: "/builder-david-demaio.jpg",
    rating: 5,
    content:
      "100% non-combustible compliance for strict BAL-FZ bushfire zones. Auzie Steel's TRUECORE® framing gave our clients total peace of mind against ember attack and termites.",
  },
  {
    id: "rev-3",
    name: "Sarah Thompson",
    role: "Senior Project Manager",
    company: "Pinnacle Built Group",
    city: "Melbourne",
    state: "VIC",
    avatar: "/builder-ryan-klosterman.jpg",
    rating: 5,
    content:
      "Auzie Steel's pre-punched framing saved us weeks of on-site coordination. The millimetre CAD automation features and pre-drilled service holes are an absolute game-changer.",
  },
  {
    id: "rev-4",
    name: "Michael Chen",
    role: "BIM & Structural Engineer",
    company: "Chen Engineering Consultants",
    city: "Sydney",
    state: "NSW",
    avatar: "/builder-david-demaio.jpg",
    rating: 5,
    content:
      "The engineering team's ability to analyze framing loads and provide instant structural CAD insights is unmatched. It's like having a master structural engineer on site 24/7.",
  },
  {
    id: "rev-5",
    name: "Ammon Bingham",
    role: "Lead Construction Director",
    company: "Apex Urban Builders",
    city: "Barossa Valley",
    state: "SA",
    avatar: "/builder-ammon-bingham.jpg",
    rating: 5,
    content:
      "Working with Auzie Steel makes a tough business a little bit easier. The framing packs arrived pre-punched with service holes, perfectly square, saving our carpenters weeks.",
  },
  {
    id: "rev-6",
    name: "Ryan Klosterman",
    role: "Managing Director",
    company: "Klosterman Commercial & Hybrid",
    city: "Brisbane",
    state: "QLD",
    avatar: "/builder-ryan-klosterman.jpg",
    rating: 5,
    content:
      "Auzie Steel offers the best communication and service of any manufacturer we've partnered with. We can't find a better design-build partner for our framing.",
  },
];

// Constellation avatar positions (x%, y%) matching Ayya Tech exact points
const constellationCoords: [number, number][] = [
  [10, 18],
  [25, 60],
  [47, 28],
  [67, 65],
  [83, 20],
  [88, 66],
];

// Australian Flag Component
function AustralianFlag({ className = "" }: { className?: string }) {
  return (
    <svg
      width="18"
      height="12"
      viewBox="0 0 60 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        borderRadius: "2px",
        boxShadow: "0 0 0 1px rgba(18, 29, 80, 0.15)",
        flexShrink: 0,
        display: "inline-block",
        verticalAlign: "middle",
        overflow: "hidden",
      }}
      aria-label="Flag of Australia"
    >
      <rect width="60" height="40" fill="#00008B" />
      <g clipPath="url(#auFlagClip)">
        <rect width="30" height="20" fill="#012169" />
        <path d="M0 0L30 20M30 0L0 20" stroke="#FFFFFF" strokeWidth="4" />
        <path d="M0 0L30 20M30 0L0 20" stroke="#C8102E" strokeWidth="2" />
        <path d="M15 0V20M0 10H30" stroke="#FFFFFF" strokeWidth="6" />
        <path d="M15 0V20M0 10H30" stroke="#C8102E" strokeWidth="3.5" />
      </g>
      <defs>
        <clipPath id="auFlagClip">
          <rect width="30" height="20" />
        </clipPath>
      </defs>
      <circle cx="15" cy="30" r="4" fill="#FFFFFF" />
      <circle cx="45" cy="8" r="1.8" fill="#FFFFFF" />
      <circle cx="51" cy="14" r="1.8" fill="#FFFFFF" />
      <circle cx="45" cy="22" r="1.8" fill="#FFFFFF" />
      <circle cx="39" cy="16" r="1.8" fill="#FFFFFF" />
      <circle cx="47" cy="17" r="1.2" fill="#FFFFFF" />
    </svg>
  );
}

// 5 Stars Component (Lucide Star styled in #ec4621 matching Ayya Tech)
function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-[3px] text-[#ec4621]" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: rating }, (_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
          aria-hidden="true"
        >
          <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
        </svg>
      ))}
    </div>
  );
}

// Avatar image with monogram fallback
function ReviewerAvatar({ review }: { review: ReviewItem }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    const initials = review.name
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("");
    return <span className="font-bold text-sm tracking-wide">{initials}</span>;
  }

  return (
    <Image
      src={review.avatar}
      alt={review.name}
      width={56}
      height={56}
      className="object-cover rounded-full w-full h-full"
      onError={() => setHasError(true)}
    />
  );
}

// Typewriter Quote Animation for Floating Bubble
function TypewriterQuote({ text }: { text: string }) {
  const [length, setLength] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = window.setInterval(() => {
      current += 1;
      setLength(current);
      if (current >= text.length) {
        window.clearInterval(interval);
      }
    }, 22);

    return () => window.clearInterval(interval);
  }, [text]);

  return (
    <p className="relative my-2.5 text-[12.5px] leading-relaxed text-[#121d50]">
      <span className="opacity-0 block">{text}</span>
      <span className="absolute inset-0 block text-[#121d50]">
        {text.slice(0, length)}
        {length < text.length && (
          <span className="text-[#1f45e4] font-bold animate-pulse">|</span>
        )}
      </span>
    </p>
  );
}

export default function TestimonialBlockquote() {
  const [activeBubble, setActiveBubble] = useState<string | null>(null);

  return (
    <section
      id="reviews"
      className="relative w-full bg-white text-[#121d50] py-16 sm:py-20 md:py-24 overflow-hidden select-none border-t border-b border-[#e5e9f1]"
      aria-labelledby="reviews-heading"
    >
      {/* ===================================================================
          1. HEADER (100% Ayya Tech typography & styling)
          =================================================================== */}
      <header className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h2
          id="reviews-heading"
          className="text-[#121d50] font-bold tracking-[-0.055em] text-[32px] sm:text-[44px] md:text-[54px] lg:text-[64px] leading-[1.08] m-0"
        >
          Trusted by Builders,
          <br />
          <em className="text-[#1f45e4] font-serif font-normal italic inline-block mt-2">
            proven on site
          </em>
        </h2>
        <p className="mt-5 text-[#121d50] opacity-85 text-[16px] sm:text-[17px] leading-relaxed max-w-[560px] mx-auto font-normal">
          Real feedback from South Australian builders, architects, and structural contractors who build with Auzie Steel
        </p>
      </header>

      {/* ===================================================================
          2. CONSTELLATION WAVES & INTERACTIVE FLOATING AVATARS
          =================================================================== */}
      <div
        className="relative max-w-[1440px] h-[200px] sm:h-[260px] mx-auto mt-3 sm:mt-5 overflow-visible"
        onKeyDown={(e) => {
          if (e.key === "Escape") setActiveBubble(null);
        }}
      >
        {/* 10 SVG Wave Lines (Exact Ayya Tech curve formulas) */}
        <svg
          className="absolute inset-0 w-full h-full fill-none stroke-[#1f45e4] stroke-[1.2px] opacity-15 pointer-events-none"
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {Array.from({ length: 10 }, (_, t) => (
            <path
              key={t}
              d={`M-100 ${20 + 35 * t} Q 360 ${-30 + 30 * t}, 720 ${
                20 + 35 * t
              } T 1540 ${20 + 35 * t}`}
            />
          ))}
        </svg>

        {/* 6 Floating interactive avatar nodes */}
        {reviewsData.map((item, idx) => {
          const coords = constellationCoords[idx % constellationCoords.length];
          const isOpen = activeBubble === item.id;
          const isRightSide = coords[0] > 60;

          return (
            <div
              key={item.id}
              className="absolute z-10 will-change-transform floating-node"
              style={
                {
                  left: `${coords[0]}%`,
                  top: `${coords[1]}%`,
                  "--delay": `${-0.8 * idx}s`,
                  zIndex: isOpen ? 50 : 10,
                  animationPlayState: isOpen ? "paused" : "running",
                } as React.CSSProperties
              }
              onMouseEnter={() => setActiveBubble(item.id)}
              onMouseLeave={() => setActiveBubble(null)}
            >
              {/* Avatar circle button */}
              <button
                type="button"
                className={`relative w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] rounded-full border-[3px] border-white flex items-center justify-center shrink-0 cursor-pointer shadow-[0_3px_14px_rgba(18,29,80,0.12)] transition-transform duration-200 hover:scale-105 ${
                  idx % 2 === 1
                    ? "bg-[#fff0e9] text-[#ba3619]"
                    : "bg-[#e9efff] text-[#0e33cb]"
                }`}
                aria-label={`Read ${item.name}'s review`}
                aria-expanded={isOpen}
                aria-controls={`bubble-${item.id}`}
                onClick={() =>
                  setActiveBubble(isOpen ? null : item.id)
                }
                onFocus={() => setActiveBubble(item.id)}
                onBlur={() => setActiveBubble(null)}
              >
                <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                  <ReviewerAvatar review={item} />
                </div>
              </button>

              {/* Popover Bubble */}
              {isOpen && (
                <div
                  id={`bubble-${item.id}`}
                  className={`absolute top-full mt-2.5 w-[270px] sm:w-[290px] p-4 bg-white border border-[#e4e9f8] rounded-[18px] shadow-[0_16px_40px_rgba(18,29,80,0.18)] z-50 text-left pointer-events-auto transition-all duration-200 ${
                    isRightSide ? "right-0" : "left-0"
                  }`}
                >
                  {/* Bubble header: Stars + Location Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <StarRating rating={item.rating} />
                    <div className="inline-flex items-center gap-1.5 text-[11px] text-[#475569]">
                      <AustralianFlag />
                      <span>
                        {item.city},{" "}
                        <strong className="text-[#0e33cb] font-bold">
                          {item.state}
                        </strong>
                      </span>
                    </div>
                  </div>

                  {/* Typewriter quote */}
                  <TypewriterQuote text={item.content} />

                  {/* Reviewer info */}
                  <strong className="block text-[13px] font-bold text-[#121d50] mt-2 leading-tight">
                    {item.name}
                  </strong>
                  <span className="block text-[11.5px] text-[#4b5565] opacity-85 mt-0.5 leading-tight">
                    {item.role} • {item.company}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ===================================================================
          3. MARQUEE VIEWPORT & DUAL-GROUP TRACK (100% Ayya Tech infinite glide)
          =================================================================== */}
      <div
        className="w-full relative overflow-hidden py-6 sm:py-8 mask-edges group/viewport"
        tabIndex={0}
        role="region"
        aria-label="Client reviews, scroll horizontally to explore"
      >
        <div className="flex w-max marquee-track group-hover/viewport:pause-marquee">
          {/* Duplicate groups [0, 1] for 100% seamless, glitch-free infinite marquee */}
          {[0, 1].map((groupIndex) => (
            <ul
              key={groupIndex}
              className="flex items-stretch gap-6 pr-6 m-0 list-none shrink-0"
              aria-hidden={groupIndex === 1 ? true : undefined}
            >
              {reviewsData.map((item) => (
                <li
                  key={`${groupIndex}-${item.id}`}
                  className="w-[330px] sm:w-[380px] md:w-[410px] shrink-0 p-6 sm:p-7 rounded-[28px] bg-gradient-to-br from-white via-white to-[#f5f7fc] border border-[#e5e9f1] shadow-[0_10px_25px_-16px_rgba(18,29,80,0.18)] hover:-translate-y-1 hover:shadow-[0_16px_32px_-12px_rgba(18,29,80,0.22)] hover:border-[#cbd5e1] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Card Header: 5 Stars + Australian Location Badge */}
                    <div className="flex items-center justify-between gap-3 w-full mb-5">
                      <StarRating rating={item.rating} />
                      <div className="inline-flex items-center gap-1.5 text-[11.5px] text-[#475569]">
                        <AustralianFlag />
                        <span>
                          {item.city},{" "}
                          <strong className="text-[#0e33cb] font-bold">
                            {item.state}
                          </strong>
                        </span>
                      </div>
                    </div>

                    {/* Card Quote */}
                    <blockquote className="text-[#121d50] text-[15px] sm:text-[15.5px] leading-[1.72] font-normal not-italic my-4">
                      &ldquo;{item.content}&rdquo;
                    </blockquote>
                  </div>

                  {/* Card Person Footer: Avatar + Name + Role + Company */}
                  <div className="flex items-center gap-3.5 mt-6 pt-2">
                    <span
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white shadow-[0_2px_8px_rgba(18,29,80,0.12)] shrink-0 overflow-hidden flex items-center justify-center bg-[#e9efff] text-[#0e33cb]"
                      aria-hidden="true"
                    >
                      <ReviewerAvatar review={item} />
                    </span>
                    <div className="flex flex-col min-w-0">
                      <strong className="text-[14px] sm:text-[14.5px] font-bold text-[#121d50] leading-tight truncate">
                        {item.name}
                      </strong>
                      <span className="text-[12px] sm:text-[12.5px] text-[#4b5565] opacity-90 leading-tight mt-0.5 truncate">
                        {item.role}
                      </span>
                      <span className="text-[11.5px] sm:text-[12px] font-semibold text-[#121d50] opacity-85 leading-tight mt-0.5 truncate">
                        {item.company}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* ===================================================================
          4. FOOTER (Avatar Stack + "Precision built together / Partnerships that last")
          =================================================================== */}
      <div className="flex items-center justify-center gap-4 sm:gap-5 px-4 pt-3 sm:pt-4 text-center">
        <div className="flex pl-2" aria-hidden="true">
          {reviewsData.slice(0, 4).map((item) => (
            <span
              key={`footer-${item.id}`}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-[0_2px_8px_rgba(18,29,80,0.1)] -ml-2.5 overflow-hidden flex items-center justify-center bg-[#e9efff] text-[#0e33cb] shrink-0"
            >
              <ReviewerAvatar review={item} />
            </span>
          ))}
        </div>
        <p className="text-[12.5px] sm:text-[13px] leading-[1.6] text-[#121d50] text-left">
          Precision built together
          <br />
          <strong className="font-bold text-[#121d50]">
            Partnerships that last
          </strong>
        </p>
      </div>

      {/* Scoped CSS for Keyframes & Marquee Effects */}
      <style jsx>{`
        @keyframes ayyaFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-14px);
          }
        }

        @keyframes ayyaMarquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .floating-node {
          animation: ayyaFloat 5s ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }

        .marquee-track {
          animation: ayyaMarquee 85s linear infinite;
        }

        .group\\/viewport:hover .marquee-track,
        .marquee-track:hover {
          animation-play-state: paused;
        }

        .mask-edges {
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0%,
            #000 5%,
            #000 95%,
            transparent 100%
          );
          mask-image: linear-gradient(
            90deg,
            transparent 0%,
            #000 5%,
            #000 95%,
            transparent 100%
          );
        }

        @media (max-width: 640px) {
          .marquee-track {
            animation-duration: 65s;
          }
        }
      `}</style>
    </section>
  );
}
