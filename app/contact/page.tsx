"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
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
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Header Banner */}
      <section className="relative py-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              GET IN TOUCH
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              CONTACT AUZIE STEEL
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Upload your plans for a fast, obligation-free framing takeoff estimate or speak directly with our structural engineering team.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details & Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
              <h2 className="text-2xl font-bold text-white uppercase tracking-wide">DIRECT CONTACTS</h2>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium uppercase">PHONE SUPPORT</span>
                    <a href="tel:1300647833" className="text-base font-bold text-white hover:text-slate-300 transition-colors uppercase">
                      1300 647 833
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium uppercase">EMAIL ENQUIRIES</span>
                    <a href="mailto:info@auziesteel.com.au" className="text-base font-bold text-white hover:text-slate-300 transition-colors">
                      info@auziesteel.com.au
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium uppercase">NATIONAL MANUFACTURING &amp; DISTRIBUTION</span>
                    <span className="text-sm text-slate-300 uppercase">
                      DISTRIBUTION ACROSS NSW, VIC, QLD, SA &amp; WA
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium uppercase">FACTORY &amp; OFFICE HOURS</span>
                    <span className="text-sm text-slate-300 uppercase">
                      MONDAY - FRIDAY: 7:00 AM - 5:00 PM AEST
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-2 uppercase">NEED A FAST TAKEOFF?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Email your architectural drawings in PDF or CAD format to our estimation team at <strong>plans@auziesteel.com.au</strong> for a 24-48 hour turnaround.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 sm:p-10 shadow-xl">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white uppercase">THANK YOU FOR REACHING OUT!</h3>
                  <p className="text-slate-300 max-w-md mx-auto text-sm">
                    We have received your enquiry. An Auzie Steel engineering consultant will contact you within 1 business day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2.5 rounded-lg bg-[#020618] text-white border border-white/20 text-sm font-semibold hover:bg-[#071e4a] uppercase"
                  >
                    SUBMIT ANOTHER ENQUIRY
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white uppercase tracking-wide">REQUEST A QUOTE OR CONSULTATION</h2>
                    <p className="text-sm text-slate-400 mt-1">
                      Fill out the form below and we will get back to you promptly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-white/50 transition-colors text-sm"
                        placeholder="e.g. John Smith"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                        PHONE NUMBER *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-white/50 transition-colors text-sm"
                        placeholder="e.g. 0412 345 678"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-white/50 transition-colors text-sm"
                        placeholder="john@example.com.au"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                        SYSTEM OF INTEREST
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-white/50 transition-colors text-sm uppercase"
                      >
                        <option value="Steel Frames">STEEL FRAMES (WALL &amp; ROOF)</option>
                        <option value="Alpha Floor">ALPHA FLOOR JOIST SYSTEM</option>
                        <option value="Complete Package">COMPLETE PACKAGE (FRAMES + ALPHA FLOOR)</option>
                        <option value="Commercial Project">COMMERCIAL / MULTI-RESIDENTIAL</option>
                        <option value="General Inquiry">GENERAL TECHNICAL INQUIRY</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                      PROJECT DETAILS OR REQUIREMENTS
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-white/50 transition-colors text-sm"
                      placeholder="Please share details such as project location, square meterage, single or two-storey, timeline..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-base font-bold uppercase tracking-wider text-white bg-[#020618] hover:bg-[#071e4a] border border-white/20 shadow-2xl shadow-black hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                  >
                    SUBMIT REQUEST
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
