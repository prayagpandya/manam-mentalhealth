"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Globe } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-24 lg:pb-16 min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#F7F3EA]">
      <div className="max-w-5xl lg:max-w-6xl xl:max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 w-full py-2 sm:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-center">
          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Tag / Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <span className="w-2 h-2 rounded-full bg-[#2D5A47]" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#2D5A47] uppercase">
                MANAM MENTAL HEALTH INITIATIVE
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[50px] xl:text-[56px] font-serif font-normal text-[#142332] leading-[1.12] tracking-tight mb-3 sm:mb-4">
              Pause. Reflect. Heal.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#475666] font-light leading-relaxed mb-5 sm:mb-6 max-w-xl">
              Understanding your mind is the first step towards understanding what you are going through. A safe, confidential space for psychiatric assessment, therapy, and recovery.
            </p>

            {/* Doctor Profile Card */}
            <div className="bg-[#FAF7F2] border border-[#E3DDCF] rounded-2xl p-4 sm:p-5 mb-6 shadow-2xs max-w-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base sm:text-lg font-semibold text-[#142332]">
                      Dr. Bhoomi Raval
                    </h2>
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#2D5A47]/10 text-[#2D5A47] border border-[#2D5A47]/20">
                      MD Gold Medalist
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-[#4D5D6E] mt-0.5">
                    Consultant Psychiatrist • MBBS, MD Psychiatry
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-[#E8E1D3] flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-[#445566]">
                <span className="font-semibold text-[#2D5A47]">Clinical Care:</span>
                <span className="px-2 py-0.5 rounded-md bg-[#EFE8DB] text-[#293B4D] font-medium">Psychiatric Assessment</span>
                <span className="text-[#B0BCC8]">•</span>
                <span className="px-2 py-0.5 rounded-md bg-[#EFE8DB] text-[#293B4D] font-medium">Treatment</span>
                <span className="text-[#B0BCC8]">•</span>
                <span className="px-2 py-0.5 rounded-md bg-[#EFE8DB] text-[#293B4D] font-medium">Psychotherapy</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl bg-[#536374] hover:bg-[#3F4F60] text-white text-sm font-medium tracking-wide shadow-xs hover:shadow transition-all duration-200 active:scale-[0.98]"
              >
                <span>Book a consultation</span>
              </button>

              <div className="inline-flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-[#DDD5C7] text-xs font-medium text-[#4D5D6E] bg-[#FAF7F2]/80">
                <MapPin className="w-3.5 h-3.5 text-[#2D5A47]" />
                <span>Rajkot</span>
                <span className="text-[#B2BDC8]">|</span>
                <Globe className="w-3.5 h-3.5 text-[#2D5A47]" />
                <span>Online Consultations</span>
              </div>
            </div>

            {/* Care Philosophy Highlights */}
            <div className="pt-4 border-t border-[#E3DDD0] flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#526272]">
              <span className="flex items-center gap-1.5 font-medium text-[#2D5A47]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A47]" />
                Evidence-Based Care
              </span>
              <span className="flex items-center gap-1.5 font-medium text-[#2D5A47]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A47]" />
                Confidential & Safe Space
              </span>
              <span className="flex items-center gap-1.5 font-medium text-[#2D5A47]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A47]" />
                Individualized Recovery
              </span>
            </div>
          </motion.div>

          {/* Right Image Column - Arched Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-center xl:justify-center"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[380px] xl:max-w-[400px]">
              {/* Decorative Subtle Ambient Glow */}
              <div className="absolute -inset-4 bg-[#EADEC9]/40 rounded-[200px] blur-2xl -z-10" />

              {/* Arch Frame */}
              <div className="relative overflow-hidden rounded-t-[150px] sm:rounded-t-[190px] rounded-b-2xl border border-[#DFD8CB] shadow-lg bg-[#EAE4D7]">
                <div className="aspect-[3/4] relative w-full">
                  <Image
                    src="/assets/hero_right.webp"
                    alt="Dr. Bhoomi Raval - Consultant Psychiatrist"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 768px) 100vw, 420px"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
