"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, GraduationCap, HeartHandshake, BookOpen } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-[#F7F3EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
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
              I believe psychiatric care begins with understanding the person, not simply identifying a diagnosis.
            </p>

            <p>
              Every individual brings their own thoughts, experiences, relationships and circumstances to what they are going through. My role as a psychiatrist is to understand these layers carefully, arrive at an appropriate clinical assessment, and work with the individual towards meaningful recovery.
            </p>

            <p>
              My approach combines psychiatric assessment, evidence-based treatment and psychotherapy, with the understanding that different people may need different forms of care at different stages.
            </p>

            <p>
              I have a particular interest in Depression, anxiety and mood disorders, OCD, psychotic disorders, adolescent and women&apos;s mental health, trauma-related concerns, de-addiction and sexual health. My psychotherapy work includes CBT, REBT and integrated approaches.
            </p>



            {/* Emphasized Callout Box */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#F0EAE0]/80 border-l-3 border-[#2D5A47] mt-6">
              <p className="font-serif italic text-lg sm:text-xl text-[#1D2F3F] leading-relaxed">
                &ldquo;You do not have to arrive with all the answers. You can simply come with what you are experiencing. We can understand the rest together.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Right Column: Credentials & Experience Card */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-22">
              <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
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
                  <h3 className="font-serif text-xl sm:text-2xl text-[#162534] font-medium flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[#2D5A47] shrink-0" />
                    <span>Credentials & Background</span>
                  </h3>
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
                      Gold Medalist
                    </span>
                  </div>
                  <p className="text-sm text-[#526171] mt-0.5">
                    PDU Medical College, Rajkot
                  </p>
                </div>

                {/* 1-Year Certificate Course */}
                <div className="py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-lg text-[#162534] font-medium">1-Year Certificate Course</span>
                  </div>
                  <p className="text-sm text-[#526171] mt-0.5">
                    Child and Adolescent Mental Health
                  </p>
                  <p className="text-xs text-[#738292]">
                    Pathways Foundation, Kovai, Tamilnadu
                  </p>
                </div>

                {/* Psychotherapy Experience */}
                <div className="pt-4 pb-0">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-lg text-[#162534] font-medium">Psychotherapy Experience</span>
                  </div>
                  <p className="text-sm text-[#526171] mt-1 leading-relaxed">
                    Training and clinical experience in CBT, REBT and integrated psychotherapy during residency years.
                  </p>
                  <p className="text-sm text-[#526171] mt-1 leading-relaxed">
                    Certified CBT practitioner (From Academy of Applied Psychology)
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
        </div>
      </div>
    </section>
  );
}
