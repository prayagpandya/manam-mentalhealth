import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ArrowRight, 
  ArrowLeft, 
  HelpCircle, 
  ChevronRight, 
  Stethoscope, 
  BrainCircuit, 
  Lightbulb 
} from "lucide-react";
import Footer from "@/components/Footer";
import TreatmentClientWrapper from "./TreatmentClientWrapper";
import { servicesData, getServiceBySlug, ServiceDetail } from "@/data/servicesData";
import { getDatabase } from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/models";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const dynamicParams = true;

async function getEffectiveTreatment(slug: string): Promise<ServiceDetail | null> {
  try {
    const db = await getDatabase();
    const cleanSlug = decodeURIComponent(slug).toLowerCase().trim();
    const doc = await db.collection(COLLECTIONS.TREATMENTS).findOne({
      $or: [
        { slug: cleanSlug },
        { slug: { $regex: new RegExp(`^${cleanSlug}$`, "i") } }
      ]
    });
    if (doc) {
      const staticFallback = getServiceBySlug(cleanSlug) || ({} as Partial<ServiceDetail>);
      const plainDoc = JSON.parse(JSON.stringify(doc));
      return {
        ...staticFallback,
        ...plainDoc,
        keyHighlights: (Array.isArray(plainDoc.keyHighlights) && plainDoc.keyHighlights.length > 0)
          ? plainDoc.keyHighlights
          : (staticFallback.keyHighlights || []),
        journeySteps: (Array.isArray(plainDoc.journeySteps) && plainDoc.journeySteps.length > 0)
          ? plainDoc.journeySteps
          : (staticFallback.journeySteps || []),
        faqs: (Array.isArray(plainDoc.faqs) && plainDoc.faqs.length > 0)
          ? plainDoc.faqs
          : (staticFallback.faqs || []),
      } as ServiceDetail;
    }
  } catch (e) {
    console.error("DB treatment fetch fallback to static:", e);
  }
  return getServiceBySlug(slug) || null;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const treatment = await getEffectiveTreatment(slug);
  if (!treatment) {
    return {
      title: "Treatment Not Found | MANAM Mental Health",
    };
  }

  return {
    title: `${treatment.title} | MANAM Mental Health | Dr. Bhoomi Raval`,
    description: treatment.summary,
  };
}

export default async function DedicatedTreatmentPage({ params }: PageProps) {
  const { slug } = await params;
  const treatment = await getEffectiveTreatment(slug);

  if (!treatment) {
    notFound();
  }

  const prevTreatment = treatment.prevSlug ? await getEffectiveTreatment(treatment.prevSlug) : null;
  const nextTreatment = treatment.nextSlug ? await getEffectiveTreatment(treatment.nextSlug) : null;

  return (
    <main className="relative min-h-screen bg-brand-bg text-[#1D2A3A]">
      <TreatmentClientWrapper>
        {/* Section 1: Hero Header (Color 1: #F7F3EA) */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-brand-bg border-b border-[#E8E2D5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#6C7C8C] mb-8 font-light">
              <Link href="/" className="hover:text-brand-sage transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#A3B0BF]" />
              <Link href="/treatments" className="hover:text-brand-sage transition-colors">
                Treatments
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#A3B0BF]" />
              <span className="text-brand-sage font-medium truncate max-w-50 sm:max-w-none">
                {treatment.shortTitle}
              </span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Title & Key Details */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#EAE2D3] border border-[#DDD4C5] text-brand-sage text-xs font-semibold tracking-wider uppercase">
                  <span>{treatment.num}</span>
                  <span>•</span>
                  <span>{treatment.category}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#162534] font-normal leading-[1.15] tracking-tight">
                  {treatment.title}
                </h1>

                <p className="text-lg sm:text-xl text-[#3F4F60] font-light leading-relaxed">
                  {treatment.tagline}
                </p>

                {/* Quick Spec Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E3DDCF]">
                    <Clock className="w-4 h-4 text-brand-sage shrink-0" />
                    <div>
                      <span className="text-[11px] text-[#7A8998] uppercase tracking-wider block font-semibold">
                        Duration
                      </span>
                      <span className="text-xs sm:text-sm text-[#162534] font-medium">
                        {treatment.duration}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E3DDCF]">
                    <Stethoscope className="w-4 h-4 text-brand-sage shrink-0" />
                    <div>
                      <span className="text-[11px] text-[#7A8998] uppercase tracking-wider block font-semibold">
                        Clinical Format
                      </span>
                      <span className="text-xs sm:text-sm text-[#162534] font-medium">
                        {treatment.format}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hero Actions */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    data-booking-trigger="in-person"
                    className="px-7 py-3.5 rounded-xl bg-brand-sage hover:bg-[#1E3E30] text-white text-sm font-medium tracking-wide shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book In-Clinic Session</span>
                  </button>

                  <button
                    data-booking-trigger="online"
                    className="px-6 py-3.5 rounded-xl bg-[#FAF7F2] hover:bg-white text-brand-sage border border-[#DDD4C5] text-sm font-medium tracking-wide shadow-2xs hover:shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Online Video Consultation</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Hero Office Image */}
              <div className="lg:col-span-5">
                <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden border border-[#DDD4C5] shadow-md bg-[#ECE4D7]">
                  <Image
                    src={treatment.image}
                    alt={treatment.altText}
                    fill
                    priority
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Clinical Overview & Graphical Mental Health Science (Color 2: #ECE4D7) */}
        <section className="py-20 md:py-28 bg-[#ECE4D7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {/* Clinical Philosophy Header Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-brand-sage uppercase block">
                  CLINICAL APPROACH
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif text-[#162534] font-normal leading-tight">
                  Understanding Beyond Diagnosis
                </h2>
                <p className="text-base text-[#4E5C6C] font-light leading-relaxed">
                  {treatment.clinicalPhilosophy}
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="p-7 sm:p-8 rounded-2xl bg-[#FAF7F2] border border-[#DDD4C5] shadow-xs">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#162534] font-medium mb-3">
                    Treatment Overview
                  </h3>
                  <p className="text-base text-[#4E5C6C] font-light leading-relaxed mb-6">
                    {treatment.summary}
                  </p>

                  <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-sage mb-3">
                    Key Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(treatment.keyHighlights || []).map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2.5 text-sm text-[#354556]">
                        <CheckCircle2 className="w-4 h-4 text-brand-sage shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Graphical Mental Health Knowledge Feature Card */}
            <div className="p-8 sm:p-10 lg:p-12 rounded-3xl bg-[#FAF7F2] border border-[#DDD4C5] shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column: Mental Health Diagram / Infographic */}
                <div className="lg:col-span-6">
                  <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden border border-[#E3DDD1] shadow-xs bg-brand-bg">
                    <Image
                      src={treatment.graphicalImage}
                      alt={treatment.graphicalTitle}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-[#7A8998] px-1">
                    <span className="flex items-center gap-1.5 font-medium text-brand-sage">
                      <BrainCircuit className="w-3.5 h-3.5" />
                      <span>Psychological & Neurobiological Principle</span>
                    </span>
                    <span>MANAM Clinical Insights</span>
                  </div>
                </div>

                {/* Right Column: Educational Scientific Breakdown */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-sage">
                    <Lightbulb className="w-4 h-4" />
                    <span>How Healing Works</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#162534] font-medium leading-snug">
                    {treatment.graphicalTitle}
                  </h3>

                  <p className="text-sm sm:text-base text-[#4E5C6C] font-light leading-relaxed">
                    {treatment.graphicalConcept}
                  </p>

                  <div className="space-y-3 pt-2">
                    {treatment.graphicalPoints.map((point, pIdx) => (
                      <div key={pIdx} className="p-3.5 rounded-xl bg-brand-bg border border-[#E8E2D5]">
                        <span className="text-xs font-semibold text-brand-sage block mb-0.5">
                          {point.label}
                        </span>
                        <p className="text-xs sm:text-sm text-[#465666] font-light leading-relaxed">
                          {point.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Indications / When to Seek Care (Color 1: #F7F3EA) */}
        <section className="py-20 md:py-28 bg-brand-bg border-b border-[#E8E2D5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-brand-sage uppercase block mb-3">
                INDICATIONS & SYMPTOMS
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#162534] font-normal leading-tight">
                {treatment.indicationsTitle}
              </h2>
              <p className="text-base text-[#526272] font-light mt-3">
                You do not need to check every symptom to seek an evaluation. If any of these challenges are interfering with your life, we are here to assist.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {treatment.indications.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E3DDCF] shadow-2xs hover:border-brand-sage/40 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-[#EAE2D3] flex items-center justify-center text-brand-sage font-semibold text-xs mb-4">
                      {idx + 1}
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl text-[#162534] font-medium mb-2.5 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#4E5C6C] font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: The Care Journey & Process (Color 2: #ECE4D7) - Omitted for Psychotherapy */}
        {treatment.slug !== "psychotherapy" && (
          <section className="py-20 md:py-28 bg-[#ECE4D7]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-brand-sage uppercase block mb-3">
                  CARE JOURNEY
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif text-[#162534] font-normal leading-tight">
                  What to Expect Step-by-Step
                </h2>
                <p className="text-base text-[#506070] font-light mt-3">
                  A structured, transparent pathway designed to keep you informed, supported, and in control.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(treatment.journeySteps || []).map((stepItem, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#DDD4C5] shadow-xs relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold tracking-wider text-brand-sage px-2.5 py-1 rounded-md bg-[#EAE2D3]">
                          Step {stepItem.step}
                        </span>
                        <span className="text-[11px] text-[#7A8998] font-medium">
                          {stepItem.duration}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl text-[#162534] font-medium mb-2.5 leading-snug">
                        {stepItem.title}
                      </h3>

                      <p className="text-sm text-[#4E5C6C] font-light leading-relaxed">
                        {stepItem.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Section 5: Specific Treatment FAQs */}
        <section
          className={`py-20 md:py-28 ${
            treatment.slug === "psychotherapy"
              ? "bg-[#ECE4D7]"
              : "bg-brand-bg border-b border-[#E8E2D5]"
          }`}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-brand-sage uppercase block mb-3">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#162534] font-normal leading-tight">
                Questions About {treatment.shortTitle}
              </h2>
            </div>

            <div className="space-y-4">
              {(treatment.faqs || []).map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className="p-6 sm:p-7 rounded-2xl bg-[#FAF7F2] border border-[#E3DDCF] shadow-2xs"
                >
                  <h3 className="font-serif text-lg sm:text-xl text-[#162534] font-medium mb-2.5 flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-brand-sage shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-sm sm:text-base text-[#4E5C6C] font-light leading-relaxed pl-8">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Consultation Booking CTA & Related Navigation */}
        <section
          className={`py-20 md:py-28 ${
            treatment.slug === "psychotherapy"
              ? "bg-brand-bg border-b border-[#E8E2D5]"
              : "bg-[#ECE4D7]"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Consultation Action Card */}
            <div className="p-8 sm:p-12 rounded-3xl bg-[#FAF7F2] border border-[#DDD4C5] shadow-sm text-center max-w-3xl mx-auto mb-16">
              <span className="w-3 h-3 rounded-full bg-brand-sage inline-block mb-4" />
              <h2 className="text-3xl sm:text-4xl font-serif text-[#162534] font-normal mb-4">
                Begin Your Care Journey Today
              </h2>
              <p className="text-base text-[#4E5C6C] font-light max-w-xl mx-auto mb-8 leading-relaxed">
                Consult with Dr. Bhoomi Raval in a confidential, supportive setting in Rajkot or via secure online video consultation.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  data-booking-trigger="in-person"
                  className="px-8 py-4 rounded-xl bg-brand-sage hover:bg-[#1E3E30] text-white text-sm font-medium tracking-wide shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book In-Person Consultation</span>
                </button>

                <button
                  data-booking-trigger="online"
                  className="px-7 py-4 rounded-xl bg-[#ECE4D7] hover:bg-[#DDD4C5] text-[#162534] border border-[#DDD4C5] text-sm font-medium tracking-wide shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Book Online Consultation</span>
                </button>
              </div>
            </div>

            {/* Next / Previous Treatment Navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-[#DDD4C5]">
              {prevTreatment ? (
                <Link
                  href={`/treatments/${prevTreatment.slug}`}
                  className="p-5 rounded-2xl bg-[#FAF7F2] hover:bg-white border border-[#DDD4C5] transition-all group flex items-center gap-4"
                >
                  <ArrowLeft className="w-5 h-5 text-brand-sage group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <span className="text-[11px] text-[#7A8998] uppercase tracking-wider block font-semibold">
                      Previous Treatment
                    </span>
                    <span className="font-serif text-lg text-[#162534] font-medium group-hover:text-brand-sage transition-colors">
                      {prevTreatment.shortTitle}
                    </span>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextTreatment ? (
                <Link
                  href={`/treatments/${nextTreatment.slug}`}
                  className="p-5 rounded-2xl bg-[#FAF7F2] hover:bg-white border border-[#DDD4C5] transition-all group flex items-center justify-between gap-4 text-right"
                >
                  <div>
                    <span className="text-[11px] text-[#7A8998] uppercase tracking-wider block font-semibold">
                      Next Treatment
                    </span>
                    <span className="font-serif text-lg text-[#162534] font-medium group-hover:text-brand-sage transition-colors">
                      {nextTreatment.shortTitle}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-brand-sage group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      </TreatmentClientWrapper>
      <Footer />
    </main>
  );
}
