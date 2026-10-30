"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectType: "Steel Frames",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
                DIRECT FACTORY COMMUNICATION
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-heading font-black uppercase tracking-tight text-[#0F1114] leading-[1.12]">
              CONTACT <span className="text-[#1E63D8]">AUZIE STEEL</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Speak directly with our Adelaide structural engineering team, upload your plans for an obligation-free framing takeoff estimate, or visit our manufacturing facility.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. CONTACT DETAILS & FORM SPLIT GRID
          =================================================================== */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Direct Factory Contacts */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-[16px] border border-[#CBD5E1] p-7 sm:p-8 shadow-[0_4px_24px_rgba(15,17,20,0.04)] space-y-7">
              <div>
                <span className="text-xs font-mono font-bold text-[#1E63D8] uppercase tracking-wider block mb-1">
                  DIRECT ACCESS
                </span>
                <h2 className="text-xl sm:text-2xl font-heading font-black uppercase tracking-tight text-[#0F1114]">
                  SOUTH AUSTRALIA OFFICE
                </h2>
              </div>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#EEF0F2] text-[#1E63D8] border border-[#CBD5E1] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase text-slate-500 block">Phone</span>
                    <a href="tel:1300000000" className="text-base font-bold text-[#0F1114] hover:text-[#1E63D8] transition-colors">
                      1300 AUZIE STEEL
                    </a>
                    <span className="text-xs text-slate-500 block mt-0.5">Mon–Fri: 7:00 AM – 5:00 PM ACST</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#EEF0F2] text-[#1E63D8] border border-[#CBD5E1] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase text-slate-500 block">Email Quotes &amp; Plans</span>
                    <a href="mailto:info@auziesteel.com.au" className="text-base font-bold text-[#0F1114] hover:text-[#1E63D8] transition-colors">
                      info@auziesteel.com.au
                    </a>
                    <span className="text-xs text-slate-500 block mt-0.5">Estimated turnaround: 24–48 hours</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#EEF0F2] text-[#1E63D8] border border-[#CBD5E1] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase text-slate-500 block">Manufacturing Plant</span>
                    <span className="text-base font-bold text-[#0F1114] block">
                      Adelaide, South Australia
                    </span>
                    <span className="text-xs text-slate-500 block mt-0.5">Serving Greater Adelaide &amp; Regional SA</span>
                  </div>
                </div>
              </div>

              {/* Service Areas */}
              <div className="pt-4 border-t border-[#E2E8F0]">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                  DAILY DELIVERY COVERAGE:
                </span>
                <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-700">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100">Adelaide Metro</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100">Adelaide Hills</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100">Barossa Valley</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100">Fleurieu Peninsula</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100">Regional SA</span>
                </div>
              </div>
            </div>

            {/* Visual Photo Card */}
            <div className="relative w-full aspect-[16/10] rounded-[16px] overflow-hidden bg-slate-100 border border-[#CBD5E1] shadow-sm">
              <Image
                src="/built-on-trust-delivery.jpg"
                alt="Auzie Steel site delivery truck"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: High-Conversion Quote & Plan Submission Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[16px] border border-[#CBD5E1] p-7 sm:p-10 md:p-12 shadow-[0_4px_24px_rgba(15,17,20,0.04)]">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 flex items-center justify-center mx-auto text-2xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-2xl font-heading font-black uppercase text-[#0F1114]">
                    PLANS RECEIVED
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you! Our engineering takeoff team has received your project details. We will review your plans and contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-[#EEF0F2] text-xs font-bold font-label uppercase text-[#0F1114] hover:bg-slate-200 transition-colors"
                  >
                    SEND ANOTHER INQUIRY
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-[#0F1114]">
                      REQUEST A FRAMING ESTIMATE
                    </h2>
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
                      Fill out the form below and attach your plans for a fast, millimeter-accurate quote.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold font-label uppercase text-slate-700 block mb-1.5">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="John"
                        className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] text-sm text-[#0F1114] placeholder:text-slate-400 focus:outline-none focus:border-[#1E63D8] focus:ring-1 focus:ring-[#1E63D8] transition-all bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold font-label uppercase text-slate-700 block mb-1.5">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Smith"
                        className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] text-sm text-[#0F1114] placeholder:text-slate-400 focus:outline-none focus:border-[#1E63D8] focus:ring-1 focus:ring-[#1E63D8] transition-all bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold font-label uppercase text-slate-700 block mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@builder.com.au"
                        className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] text-sm text-[#0F1114] placeholder:text-slate-400 focus:outline-none focus:border-[#1E63D8] focus:ring-1 focus:ring-[#1E63D8] transition-all bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold font-label uppercase text-slate-700 block mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0400 000 000"
                        className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] text-sm text-[#0F1114] placeholder:text-slate-400 focus:outline-none focus:border-[#1E63D8] focus:ring-1 focus:ring-[#1E63D8] transition-all bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold font-label uppercase text-slate-700 block mb-1.5">
                      Project Framing System *
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] text-sm text-[#0F1114] focus:outline-none focus:border-[#1E63D8] focus:ring-1 focus:ring-[#1E63D8] transition-all bg-white"
                    >
                      <option value="Steel Frames">Prefabricated Wall Frames &amp; Roof Trusses</option>
                      <option value="Alpha Floor">Alpha Floor Joist System</option>
                      <option value="Full Package">Complete Frame + Alpha Floor Package</option>
                      <option value="Custom BIM">Custom CAD/BIM Detailing Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold font-label uppercase text-slate-700 block mb-1.5">
                      Project Description &amp; Site Location
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Single storey or double storey, site suburb, anticipated start date..."
                      className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] text-sm text-[#0F1114] placeholder:text-slate-400 focus:outline-none focus:border-[#1E63D8] focus:ring-1 focus:ring-[#1E63D8] transition-all bg-white resize-none"
                    />
                  </div>

                  {/* Plan Upload Drag & Drop Area */}
                  <div className="border-2 border-dashed border-[#CBD5E1] hover:border-[#1E63D8] rounded-xl p-5 text-center cursor-pointer transition-colors bg-slate-50/70">
                    <svg className="w-8 h-8 mx-auto text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-xs sm:text-sm font-semibold text-[#0F1114] block">
                      Attach Architectural Plans (PDF, DWG, DXF)
                    </span>
                    <span className="text-xs text-slate-500 block mt-0.5">
                      Click to browse or drag files here (Max 50MB)
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#1E63D8] hover:bg-[#1650B5] text-white text-xs sm:text-sm font-bold font-label tracking-wider uppercase transition-colors shadow-lg"
                  >
                    SUBMIT PLANS FOR ESTIMATE →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
