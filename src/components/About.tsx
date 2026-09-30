"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, GraduationCap, HeartHandshake, BookOpen } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-[#F7F3EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Header, Clinical Philosophy & Approach */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6 text-[#455464] text-base sm:text-[17px] leading-relaxed font-light"
          >
            <div>
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#2D5A47] uppercase block mb-2.5">
                ABOUT DR. BHOOMI
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#162534] font-normal tracking-tight">
                Meet Dr. Bhoomi Raval
              </h2>
              <p className="text-sm sm:text-base text-[#566575] mt-2 font-medium">
                Consultant Psychiatrist <span className="text-[#A3B0BF] mx-2">|</span> MBBS, MD Psychiatry (Gold Medalist)
              </p>
            </div>

            <p className="text-xl sm:text-2xl font-serif text-[#162534] font-normal leading-snug pt-2">
              Psychotherapy is a collaborative process of understanding what you are going through, recognising patterns in thoughts, emotions and behaviour, and working towards meaningful change.
            </p>

            <p>
              At MANAM, psychotherapy is individualised to the person rather than limited to a single therapeutic approach. Dr. Bhoomi Raval primarily follows an <em className="italic text-[#162534] font-normal">eclectic and integrated approach to psychotherapy</em>, drawing from different evidence-based therapeutic frameworks depending on the individual&apos;s concerns, personality, needs, goals and stage of treatment.
            </p>

            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2D5A47] block mb-2.5">
                Key Areas of Clinical Focus
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Depression & Mood Disorders",
                  "Anxiety & Panic",
                  "OCD",
                  "Adolescent Care",
                  "Women's Mental Health",
                  "De-Addiction",
                  "CBT & REBT Therapy"
                ].map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-lg bg-[#FAF7F2] border border-[#E2DDD2] text-xs font-medium text-[#2C3E50]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Emphasized Callout Box */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#F0EAE0]/80 border-l-3 border-[#2D5A47] mt-6">
              <p className="font-serif italic text-lg sm:text-xl text-[#1D2F3F] leading-relaxed">
                &ldquo;You do not have to arrive with all the answers. You can simply come with what you are experiencing. We can understand the rest together.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Right Column: Credentials & Experience Card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="bg-[#FAF7F2] border border-[#E2DDD2] rounded-2xl p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-4 pb-5 border-b border-[#EDE7DC]">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-[#DDD5C7] shadow-xs">
                  <Image
                    src="/assets/28.webp"
                    alt="Dr. Bhoomi Raval"
                    fill
                    sizes="64px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2D5A47] flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-[#2D5A47]" />
                    <span>Credentials & Background</span>
                  </h3>
                  <p className="font-serif text-lg text-[#162534] font-medium mt-0.5">
                    Dr. Bhoomi Raval
                  </p>
                  <p className="text-xs text-[#5D6D7E]">
                    MD Psychiatry (Gold Medalist)
                  </p>
                </div>
              </div>

              <div className="divide-y divide-[#EFE9DF] mt-2">
                {/* MBBS */}
                <div className="py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-lg text-[#162534] font-medium">MBBS</span>
                  </div>
                  <p className="text-sm text-[#526171] mt-0.5">
                    GMERS Medical College, Gandhinagar
                  </p>
                </div>

                {/* MD Psychiatry */}
                <div className="py-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-serif text-lg text-[#162534] font-medium">MD Psychiatry</span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#2D5A47]/10 text-[#2D5A47] border border-[#2D5A47]/20 flex items-center gap-1 shrink-0">
                      <Award className="w-3 h-3 text-[#2D5A47]" />
                      1-Year Certificate Course
                    </span>
                  </div>
                  <p className="text-sm text-[#526171] mt-0.5">
                    PDU Medical College, Rajkot
                  </p>
                </div>

                {/* Fellowship */}
                <div className="py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-lg text-[#162534] font-medium">Fellowship</span>
                  </div>
                  <p className="text-sm text-[#526171] mt-0.5">
                    Child and Adolescent Mental Health
                  </p>
                  <p className="text-xs text-[#738292]">
                    Parkwood Foundation, Indore
                  </p>
                </div>

                {/* Psychotherapy Experience */}
                <div className="py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-lg text-[#162534] font-medium">Psychotherapy Experience</span>
                  </div>
                  <p className="text-sm text-[#526171] mt-1 leading-relaxed">
                    Training and clinical experience in CBT, REBT and integrated psychotherapy during residency years.
                  </p>
                  <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#EFE9DC] text-xs font-medium text-[#293B4D] flex-wrap">
                    <HeartHandshake className="w-3.5 h-3.5 text-[#2D5A47] shrink-0" />
                    <span>Conducted 150+ clinical sessions during 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
