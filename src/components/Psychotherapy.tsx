"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface PsychotherapyProps {
  onOpenBooking: () => void;
}

export default function Psychotherapy({ onOpenBooking }: PsychotherapyProps) {
  const approaches = [
    {
      title: "Cognitive Behaviour Therapy",
      acronym: "CBT",
      description:
        "Working with patterns of thoughts, emotions and behaviours that may be contributing to distress.",
    },
    {
      title: "Rational Emotive Behaviour Therapy",
      acronym: "REBT",
      description:
        "Exploring unhelpful beliefs and developing healthier, more flexible ways of responding to situations.",
    },
    {
      title: "Integrated psychotherapy",
      acronym: "DBT / Humanistic",
      description:
        "Drawing from approaches such as DBT, existential and humanistic therapy when appropriate, rather than following a one-size-fits-all model.",
    },
  ];

  const benefits = [
    "Anxiety",
    "Depression",
    "OCD",
    "Stress",
    "Relationship difficulties",
    "Trauma-related concerns",
    "Emotional regulation",
    "Self-esteem",
  ];

  return (
    <section id="psychotherapy" className="py-20 md:py-32 bg-[#ECE4D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid: Main Text and Approaches */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#2D5A47] uppercase block mb-3">
              PSYCHOTHERAPY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#162534] font-normal leading-[1.15] mb-6">
              Therapy is not just about talking.
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-[#4E5C6C] font-light leading-relaxed">
              <p>
                Psychotherapy is a structured process that can help you understand patterns in your thoughts, emotions and behaviour, work through difficulties, and develop more effective ways of responding to them.
              </p>
              <p>
                At MANAM, therapy is tailored to the individual&apos;s concerns, clinical needs and goals. It may be used on its own or alongside psychiatric treatment and medication.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Approaches */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-6"
          >
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#556475] uppercase block mb-4 pb-2 border-b border-[#DDD4C5]">
              APPROACHES MAY INCLUDE
            </span>

            <div className="divide-y divide-[#DDD4C5]">
              {approaches.map((item) => (
                <div key={item.title} className="py-5 first:pt-2">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-sans text-base sm:text-[17px] text-[#162534] font-semibold">
                      {item.title}
                    </h3>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#2D5A47]/10 text-[#2D5A47]">
                      {item.acronym}
                    </span>
                  </div>
                  <p className="text-sm text-[#4E5C6C] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: What Therapy Can Help With */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 sm:mt-24 pt-10 border-t border-[#DDD4C5]"
        >
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#2D5A47] uppercase block mb-4">
            WHAT THERAPY CAN HELP WITH
          </span>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-base sm:text-xl font-serif text-[#162534]">
            {benefits.map((benefit, bIdx) => (
              <React.Fragment key={benefit}>
                <span className="hover:text-[#2D5A47] transition-colors">{benefit}</span>
                {bIdx < benefits.length - 1 && (
                  <span className="text-[#A3B2C1] text-sm">•</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-[#DDD4C5]">
            <p className="font-serif italic text-base sm:text-lg text-[#556475] max-w-xl">
              &ldquo;You don&apos;t have to know exactly what you need from therapy before you begin. The first step is understanding what you&apos;re going through.&rdquo;
            </p>
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto shrink-0">
              <Link
                href="/psychotherapy"
                className="w-full sm:w-auto px-5 py-3 rounded-lg border border-[#DDD4C5] text-sm font-medium text-[#2D5A47] bg-[#FAF7F2] hover:bg-white transition-all text-center"
              >
                Explore Modalities →
              </Link>
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto shrink-0 px-6 py-3 rounded-lg bg-[#536374] hover:bg-[#3F4F60] text-white text-sm font-medium tracking-wide shadow-xs transition-all text-center"
              >
                Book a consultation
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
