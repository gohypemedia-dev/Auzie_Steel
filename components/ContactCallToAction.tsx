"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ContactCallToAction() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#FAF9F6] text-[#0F1114] overflow-hidden border-t border-[#E2E8F0]">
      {/* Background Subtle Blueprint Grid Pattern (No Pink) */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Floating Split Card */}
        <div className="w-full rounded-[12px] overflow-hidden bg-white border border-[#CBD5E1] shadow-[0_20px_60px_-15px_rgba(15,17,20,0.12)] grid grid-cols-1 lg:grid-cols-12">
          
          {/* ===============================================================
              LEFT COLUMN: ARCHITECTURAL STEEL FRAME SITE PHOTOGRAPHY
              (Full-bleed real construction site steel framing photo)
              =============================================================== */}
          <div className="lg:col-span-5 relative min-h-[360px] sm:min-h-[440px] lg:min-h-[600px] overflow-hidden border-b lg:border-b-0 lg:border-r border-[#CBD5E1] bg-slate-900 group">
            <Image
              src="/call-to-enquire-steel-site.jpg"
              alt="Auzie Steel Precision Framework Construction Site"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Subtle Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />
          </div>

          {/* ===============================================================
              RIGHT COLUMN: CLEAN WHITE CALL TO ACTION & FORM SIDE
              =============================================================== */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 md:p-12 flex flex-col justify-center">
            <div className="space-y-6">
              
              {/* Header */}
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0F1114] tracking-tight leading-[1.1]">
                  Call Today To Enquire
                </h2>

                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-xl">
                  Give us a call today to find out how we can help you deliver your next project on time and on budget. We are the builder&apos;s choice in steel framing.
                </p>
              </div>

              {/* Action Buttons (Call Us · Get a Quote) */}
              <div className="pt-1 flex flex-wrap items-center gap-4">
                {/* Call Us Button (Same background color as footer: bg-slate-950) */}
                <a
                  href="tel:1300647833"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-slate-950 hover:bg-slate-900 text-white font-bold font-label text-xs sm:text-sm uppercase tracking-wider border border-slate-800 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <svg className="w-4 h-4 text-[#60A5FA]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                  </svg>
                  <span>CALL US (1300 647 833)</span>
                </a>

                {/* Get a Quote Button */}
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#1E63D8] hover:bg-[#1650B5] text-white font-bold font-label text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>GET A QUOTE</span>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>

              {/* Minimalist Contact Form (Matching Reference Input Lines) */}
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-4">
                  OR SEND A QUICK PROJECT MESSAGE:
                </p>

                {formSubmitted ? (
                  <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium">
                    ✓ Thank you! Your enquiry has been received. Our estimating team will be in touch shortly.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono font-semibold uppercase text-slate-500">
                          FIRST NAME
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="Your first name"
                          className="w-full pb-2 pt-1 border-b border-slate-300 focus:border-[#0F1114] outline-none text-sm text-[#0F1114] placeholder:text-slate-400 bg-transparent transition-colors"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono font-semibold uppercase text-slate-500">
                          LAST NAME
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="Your last name"
                          className="w-full pb-2 pt-1 border-b border-slate-300 focus:border-[#0F1114] outline-none text-sm text-[#0F1114] placeholder:text-slate-400 bg-transparent transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono font-semibold uppercase text-slate-500">
                          EMAIL ADDRESS
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com.au"
                          className="w-full pb-2 pt-1 border-b border-slate-300 focus:border-[#0F1114] outline-none text-sm text-[#0F1114] placeholder:text-slate-400 bg-transparent transition-colors"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono font-semibold uppercase text-slate-500">
                          PHONE NUMBER
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="0400 000 000"
                          className="w-full pb-2 pt-1 border-b border-slate-300 focus:border-[#0F1114] outline-none text-sm text-[#0F1114] placeholder:text-slate-400 bg-transparent transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono font-semibold uppercase text-slate-500">
                        PROJECT MESSAGE / REQUIREMENTS
                      </label>
                      <input
                        type="text"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Residential framing, Alpha Floor, roof trusses, or timeframe..."
                        className="w-full pb-2 pt-1 border-b border-slate-300 focus:border-[#0F1114] outline-none text-sm text-[#0F1114] placeholder:text-slate-400 bg-transparent transition-colors"
                      />
                    </div>

                    <div className="pt-3 flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-slate-950 hover:bg-slate-900 text-white font-bold font-label text-xs sm:text-sm uppercase tracking-wider border border-slate-800 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
                      >
                        <span>SUBMIT MESSAGE</span>
                        <svg className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </button>
                      <span className="text-[11px] font-mono text-slate-400">
                        AVERAGE RESPONSE: &lt; 2 HRS
                      </span>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

