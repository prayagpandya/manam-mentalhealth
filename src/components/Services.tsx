"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Services() {
  const services = [
    {
      num: "01",
      slug: "consultation",
      title: "Psychiatric consultation",
      image: "/assets/service_consultation.webp",
      altText: "Doctor and patient in a warm, welcoming consultation room",
      description:
        "Detailed clinical assessment to understand your symptoms, history, and medical needs. Diagnosis, personalized treatment, and continuous follow-up care.",
      tags: ["Assessment", "Diagnosis", "Medication review"],
    },
    {
      num: "02",
      slug: "psychotherapy",
      title: "Psychotherapy & counseling",
      image: "/assets/service_psychotherapy.webp",
      altText: "Tranquil psychotherapy room",
      description:
        "Understand thoughts, emotions, and behaviors. Evidence-based CBT, REBT, and integrative psychotherapy tailored to your personal growth.",
      tags: ["CBT", "REBT", "Emotional regulation"],
    },
    {
      num: "03",
      slug: "adolescent",
      title: "Adolescent mental health",
      image: "/assets/service_adolescent.webp",
      altText: "Comfortable, welcoming adolescent counseling lounge with bookshelves",
      description:
        "Compassionate, age-appropriate guidance for teenagers navigating emotional distress, academic pressures, peer challenges, and self-worth.",
      tags: ["Academic stress", "Youth wellness", "Family guidance"],
    },
    {
      num: "04",
      slug: "womens-mental-health",
      title: "Women's mental health",
      image: "/assets/service_womens_mental.webp",
      altText: "Gentle women's wellness sanctuary",
      description:
        "Specialized clinical support through hormonal milestones, pregnancy, postpartum recovery, PMDD, perimenopause, and caregiving burnout.",
      tags: ["Perinatal & Postpartum", "PMDD", "Hormonal transitions"],
    },
    {
      num: "05",
      slug: "de-addiction",
      title: "De-addiction & recovery",
      image: "/assets/service_deaddiction.webp",
      altText: "Mindful recovery consultation room with natural wooden table",
      description:
        "Confidential outpatient medical detoxification and psychological support for substance use, addressing co-occurring anxiety and depression.",
      tags: ["Medical detox", "Dual diagnosis", "Relapse prevention"],
    },
    {
      num: "06",
      slug: "sexual-health",
      title: "Sexual health concerns",
      image: "/assets/service_sexual_health.webp",
      altText: "Private, discreet doctor consultation room with comfortable armchairs",
      description:
        "A confidential, dignified medical environment to address performance anxiety, intimacy difficulties, and psychosexual distress without judgment.",
      tags: ["Confidential care", "Performance anxiety", "Intimacy support"],
    },
  ];

  return (
    <section id="treatments" className="py-20 md:py-32 bg-[#ECE4D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-16 pb-8 border-b border-[#DDD4C5]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#2D5A47] uppercase block mb-3">
              TREATMENTS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#162534] font-normal tracking-tight">
              How we can help
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6"
          >
            <p className="text-sm sm:text-base text-[#506070] font-light leading-relaxed max-w-xl">
              Care is individualised and may involve psychiatric care, psychotherapy, medication, or a combination of approaches.
            </p>
          </motion.div>
        </div>

        {/* Services List Rows with Visual Thumbnail */}
        <div className="divide-y divide-[#DDD4C5]">
          {services.map((service, index) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link
                href={`/treatments/${service.slug}`}
                className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-center group hover:bg-[#E3D9C9]/50 transition-colors rounded-2xl px-3 sm:px-5 cursor-pointer block"
              >
                {/* Thumbnail & Title */}
                <div className="md:col-span-6 flex items-center gap-4 sm:gap-6">
                  <div
                    className="relative w-32 sm:w-44 md:w-48 lg:w-60 aspect-16/10 rounded-2xl overflow-hidden shrink-0 border border-[#DDD4C5] bg-[#FAF7F2] shadow-xs group-hover:border-[#2D5A47]/40 group-hover:shadow-sm transition-all"
                  >
                    <Image
                      src={service.image}
                      alt={service.altText}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 130px, (max-width: 1024px) 210px, 240px"
                    />
                  </div>

                  <div className="min-w-0">
                    <span className="text-xs font-semibold tracking-wider text-[#798897] tabular-nums block mb-1">
                      {service.num}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#162534] font-medium group-hover:text-[#2D5A47] transition-colors leading-snug">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Description, Tags & Direct Link */}
                <div className="md:col-span-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-sm sm:text-[15px] text-[#4C5B6B] font-light leading-relaxed max-w-lg">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      {service.tags.map((tag, tIdx) => (
                        <React.Fragment key={tag}>
                          <span className="text-xs font-medium text-[#2D5A47]">
                            {tag}
                          </span>
                          {tIdx < service.tags.length - 1 && (
                            <span className="text-[#A2B1BF] text-xs">•</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2D5A47] group-hover:text-[#18392C] group-hover:translate-x-1 transition-all shrink-0 self-start sm:self-center"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Link to Full Dedicated Treatments Directory */}
        <div className="mt-12 text-center pt-8 border-t border-[#DDD4C5]">
          <Link
            href="/treatments"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FAF7F2] hover:bg-white text-[#2D5A47] border border-[#DDD4C5] text-sm font-semibold shadow-2xs hover:shadow-xs transition-all"
          >
            <span>Explore All 8 Treatments & Clinical Protocols</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
