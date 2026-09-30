"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle,
  Calendar
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBooking } from "@/context/BookingContext";
import { servicesData, ServiceDetail } from "@/data/servicesData";

export default function TreatmentsPage() {
  const { openBooking } = useBooking();
  const [treatmentsList, setTreatmentsList] = useState<ServiceDetail[]>(servicesData);

  useEffect(() => {
    fetch("/api/treatments")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.treatments && data.treatments.length > 0) {
          setTreatmentsList(data.treatments);
        }
      })
      .catch((err) => console.error("Could not fetch dynamic treatments:", err));
  }, []);

  const faqs = [
    {
      q: "Will I need to take psychiatric medication permanently?",
      a: "No. Most psychiatric treatments are prescribed for a defined duration to restore neurochemical balance. Once symptoms stabilize and recovery is maintained, medication is gradually tapered under medical supervision."
    },
    {
      q: "Are psychiatric medications addictive or habit-forming?",
      a: "Standard psychiatric medications—including modern SSRIs, mood stabilizers, and antipsychotics—are not addictive and do not cause cravings. When temporary sleep medicines are required, strict monitoring is maintained."
    },
    {
      q: "What is the difference between a Psychiatrist and a Psychologist?",
      a: "A Psychiatrist (like Dr. Bhoomi Raval) is a qualified medical doctor (MBBS, MD) who can diagnose medical and psychiatric conditions, order lab tests, prescribe medications, and provide psychotherapy. A Psychologist provides therapy but cannot prescribe medication."
    },
    {
      q: "Can I receive care if I live outside Rajkot?",
      a: "Yes. MANAM provides secure, confidential Online Video Consultations for individuals residing across India and internationally, adhering to telemedicine clinical standards."
    }
  ];

  return (
    <main className="relative min-h-screen bg-brand-bg text-[#1D2A3A]">
      <Navbar onOpenBooking={() => openBooking("in-person")} />

      {/* Hero Header Section - Color 1 (#F7F3EA) */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-brand-bg border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE2D3] border border-[#DDD4C5]">
                <span className="w-2 h-2 rounded-full bg-brand-sage" />
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-brand-sage uppercase">
                  CLINICAL TREATMENTS
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#162534] font-normal leading-[1.15]">
                Comprehensive Psychiatric Treatments & Interventions
              </h1>

              <p className="text-base sm:text-lg text-[#4B5A6A] font-light leading-relaxed max-w-xl">
                At MANAM, care looks beyond symptoms to understand the complete individual. Explore our specialized psychiatric treatments below for detailed clinical protocols, indications, and care journeys.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => openBooking("in-person")}
                  className="px-7 py-3.5 rounded-xl bg-brand-sage hover:bg-[#1E3E30] text-white text-sm font-medium tracking-wide shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Consultation</span>
                </button>

                <button
                  onClick={() => openBooking("online")}
                  className="px-6 py-3.5 rounded-xl bg-[#FAF7F2] hover:bg-white text-brand-sage border border-[#DDD4C5] text-sm font-medium tracking-wide shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                >
                  Online Video Consultation
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-[#E3DDCF] text-xs text-[#526272]">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="text-brand-sage">✓</span> Evidence-Based Medicine
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="text-brand-sage">✓</span> Confidential & Compassionate
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="text-brand-sage">✓</span> MD Gold Medalist Care
                </span>
              </div>
            </div>

            {/* Right Column: Knowledgeable Graphical Mental Health Artwork */}
            <div className="lg:col-span-5">
              <div className="p-4 sm:p-5 rounded-3xl bg-[#FAF7F2] border border-[#DDD4C5] shadow-sm">
                <div className="relative aspect-16/11 w-full rounded-2xl overflow-hidden border border-[#E8E2D5] bg-brand-bg">
                  <Image
                    src="/assets/graphical_untangling_mind.webp"
                    alt="Untangling the Mind: Cognitive and Emotional Clarity"
                    fill
                    priority
                    className="object-contain p-3"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>

                <div className="mt-4 px-2">
                  <div className="flex items-center justify-between text-xs text-brand-sage font-semibold mb-1">
                    <span className="uppercase tracking-wider">The Healing Principle</span>
                    <span className="text-[11px] text-[#7A8998] font-normal">MANAM Insights</span>
                  </div>
                  <h3 className="font-serif text-lg text-[#162534] font-medium leading-snug">
                    From Cognitive Overwhelm to Structured Clarity
                  </h3>
                  <p className="text-xs text-[#526272] font-light mt-1 leading-relaxed">
                    Psychiatric assessment and therapy gently untangle the knots of anxiety, biological stress, and negative thoughts into calm, sustainable emotional flow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments Visual Directory Grid - Color 2 (#ECE4D7) */}
      <section className="py-20 md:py-28 bg-[#ECE4D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 pb-6 border-b border-[#DDD4C5]">
            <div>
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-brand-sage uppercase block mb-2">
                TREATMENT DIRECTORY
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#162534] font-normal">
                Explore Our Clinical Treatments
              </h2>
            </div>
            <p className="text-sm text-[#556575] font-light max-w-md">
              Click on any treatment card to view in-depth details, clinical indications, step-by-step care journeys, and dedicated FAQs.
            </p>
          </div>

          {/* 8 Treatments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {treatmentsList.map((treatment, index) => (
              <motion.div
                key={treatment.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
                className="rounded-3xl bg-[#FAF7F2] border border-[#DDD4C5] shadow-xs hover:shadow-md hover:border-brand-sage/40 transition-all overflow-hidden group cursor-pointer"
              >
                <Link
                  href={`/treatments/${treatment.slug}`}
                  className="flex flex-col justify-between h-full w-full"
                >
                  <div>
                    {/* Treatment Image with subtle zoom on hover */}
                    <div className="block relative aspect-16/10 w-full overflow-hidden bg-[#EAE2D3]">
                      <Image
                        src={treatment.image}
                        alt={treatment.altText}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {/* Badge Overlay */}
                      <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-xs text-brand-sage text-xs font-semibold shadow-xs">
                        <span>{treatment.num}</span>
                        <span>•</span>
                        <span>{treatment.category}</span>
                      </div>
                    </div>

                    {/* Treatment Information */}
                    <div className="p-6 sm:p-8">
                      <h3 className="font-serif text-2xl sm:text-[26px] text-[#162534] font-medium leading-snug group-hover:text-brand-sage transition-colors mb-2">
                        {treatment.title}
                      </h3>

                      <p className="text-sm sm:text-base text-[#4E5C6C] font-light leading-relaxed mb-6">
                        {treatment.summary}
                      </p>

                      {/* Key Highlights / Badges */}
                      <div className="space-y-2.5 pt-4 border-t border-[#E8E2D5]">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#69798A] block">
                          Treatment Highlights
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {treatment.keyHighlights.slice(0, 3).map((hl, hIdx) => (
                            <span
                              key={hIdx}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#EFE9DF] text-xs text-[#2A3B4D] font-light"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand-sage shrink-0" />
                              <span>{hl}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Clinical Supervision & Action Link */}
                  <div className="px-6 py-4 sm:px-8 sm:py-5 bg-[#F4EEE2] border-t border-[#DDD4C5] flex items-center justify-between">
                    <span className="text-xs text-[#5D6D7D] font-light truncate max-w-[200px] sm:max-w-xs">
                      Supervised by <strong>Dr. Bhoomi Raval</strong>
                    </span>

                    <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-sage group-hover:text-[#18392C] group-hover:translate-x-1 transition-all">
                      <span>View Protocol</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Callout Banner - Color 3 (#FAF7F2) */}
      <section className="py-20 bg-[#FAF7F2] border-t border-[#DDD4C5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#EAE2D3] text-brand-sage mb-2">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#162534] font-normal">
            Individualized Clinical Recovery
          </h2>
          <p className="text-base sm:text-lg text-[#4B5A6A] font-light leading-relaxed max-w-2xl mx-auto">
            Every mind is unique. There is no one-size-fits-all treatment at MANAM. Psychiatric care, neurochemical stabilization, and psychotherapy are customized to your exact history, temperament, and goals.
          </p>
          <div className="pt-4">
            <button
              onClick={() => openBooking("in-person")}
              className="px-8 py-4 rounded-xl bg-brand-sage hover:bg-[#1E3E30] text-white text-sm font-medium tracking-wide shadow-sm hover:shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Schedule Your Treatment Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Universal Psychiatric FAQs Section */}
      <section className="py-20 md:py-24 bg-[#ECE4D7] border-t border-[#DDD4C5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#DDD4C5] text-xs font-semibold tracking-wider text-brand-sage uppercase mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FREQUENT QUESTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#162534] font-normal">
              Common Questions About Psychiatric Treatments
            </h2>
            <p className="text-sm text-[#556575] font-light mt-2">
              Transparent, evidence-based answers to help eliminate stigma and uncertainty.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#DDD4C5] shadow-2xs space-y-2"
              >
                <h3 className="font-serif text-lg text-[#162534] font-medium flex items-start gap-2.5">
                  <span className="text-brand-sage font-bold text-base">Q.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm sm:text-base text-[#4E5C6C] font-light leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
