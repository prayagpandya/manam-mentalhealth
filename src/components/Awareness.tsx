"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Users, GraduationCap, ShieldAlert, Sparkles, BookOpen, Stethoscope, Award, Camera, ArrowRight } from "lucide-react";

export default function Awareness() {
  const sessions = [
    {
      title: "Adolescent Mental Health",
      category: "Youth & Development",
      description:
        "Sensitization sessions on emotional regulation, peer dynamics, academic stress, and early identification of mood and anxiety concerns in teenagers.",
      icon: Users,
      image: "/assets/12.webp",
      caption: "National Task Force session on adolescent wellness in college",
    },
    {
      title: "Mental Health Awareness",
      category: "Community & Society",
      description:
        "Public talks dismantling stigma, demystifying psychiatric care, and fostering empathetic, supportive environments in families and communities.",
      icon: Sparkles,
      image: "/assets/10.webp",
      caption: "Community outreach and psychoeducation panel",
    },
    {
      title: "Suicide Prevention & Awareness",
      category: "Critical Intervention",
      description:
        "Gatekeeper training, identifying warning signs, crisis response guidelines, and safe communication frameworks around self-harm and despair.",
      icon: ShieldAlert,
      image: "/assets/8.webp",
      caption: "MIND FEST Mega Event, Department of Psychiatry",
    },
    {
      title: "Psychiatry & Mental Health Education",
      category: "Clinical Literacy",
      description:
        "Educational lectures exploring the neurobiology of mental illness, evidence-based psychopharmacology, and comprehensive treatment modalities.",
      icon: BookOpen,
      image: "/assets/25.webp",
      caption: "Clinical symposium on Acceptance & Commitment Therapy (ACT)",
    },
    {
      title: "Student & School Sessions",
      category: "Institutional Programs",
      description:
        "Interactive workshops in schools and universities focusing on exam anxiety, digital wellness, self-worth, and cultivating resilience.",
      icon: GraduationCap,
      image: "/assets/14.webp",
      caption: "Campus workshop on social media, dopamine culture & stress",
    },
    {
      title: "Professional & Medical Education",
      category: "Continuing Education",
      description:
        "Specialized clinical training for doctors, healthcare workers, and corporate teams on occupational burnout, somatic symptoms, and referral pathways.",
      icon: Stethoscope,
      image: "/assets/18.webp",
      caption: "Physicians CME conference on psychotherapy foundations",
    },
  ];

  return (
    <section id="awareness" className="py-20 md:py-32 bg-[#F7F3EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 pb-8 border-b border-[#E3DDD1]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#2D5A47] uppercase block mb-3">
              COMMUNITY & OUTREACH
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#162534] font-normal leading-[1.15] mb-2">
              Mental Health Awareness & Education
            </h2>
            <p className="font-serif italic text-lg sm:text-xl text-[#536373]">
              &ldquo;Beyond the consultation room.&rdquo;
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 space-y-4 text-base sm:text-lg text-[#4E5C6C] font-light leading-relaxed"
          >
            <p>
              Dr. Bhoomi Raval is actively involved in mental health awareness and psychoeducation through talks, lectures, and interactive sessions for students, professionals, institutions, and the wider community.
            </p>
            <p>
              These sessions focus on creating a grounded understanding of mental health, recognising early warning signs, reducing stigma, and encouraging timely, appropriate help-seeking.
            </p>
          </motion.div>
        </div>

        {/* Selected Talks Grid */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2D5A47]">
              Selected Talks & Awareness Sessions
            </h3>
            <span className="text-xs text-[#7A8998]">
              Institutions • Schools • Healthcare Forums
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sessions.slice(0, 3).map((session, idx) => {
              const Icon = session.icon;
              return (
                <motion.div
                  key={session.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
                  className="rounded-2xl bg-[#FAF7F2] border border-[#E3DDCF] shadow-2xs hover:border-[#2D5A47]/40 hover:shadow-sm transition-all overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Session Image */}
                    <div className="relative aspect-[16/10] w-full bg-[#EAE4D7] overflow-hidden">
                      <Image
                        src={session.image}
                        alt={session.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#2D5A47] shadow-xs">
                        <Icon className="w-4 h-4 text-[#2D5A47]" />
                      </div>
                    </div>

                    <div className="p-6">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B] block mb-1">
                        {session.category}
                      </span>

                      <h4 className="font-serif text-xl sm:text-[22px] text-[#162534] font-medium leading-snug mb-2.5 group-hover:text-[#2D5A47] transition-colors">
                        {session.title}
                      </h4>

                      <p className="text-sm text-[#4E5C6C] font-light leading-relaxed">
                        {session.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-5 pt-0">
                    <p className="text-[11px] text-[#788899] italic border-t border-[#EDE6D9] pt-3">
                      {session.caption}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Community Outreach Moments Gallery Strip */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6 }}
            className="mt-16 sm:mt-20 pt-10 border-t border-[#E3DDD1]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2D5A47]">
                  Outreach Moments
                </h3>
                <p className="font-serif text-xl sm:text-2xl text-[#162534] font-medium mt-1">
                  Photographs from Seminars, Workshops & Drives
                </p>
              </div>
              <span className="text-xs text-[#6C7D8E]">
                Promoting mental health literacy across Gujarat
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {[
                { src: "/assets/4.webp", alt: "Institutional mental health lecture" },
                { src: "/assets/6.webp", alt: "Youth sensitization workshop" },
                { src: "/assets/11.webp", alt: "Community outreach session" },
                { src: "/assets/15.webp", alt: "Interactive school mental wellness discussion" },
                { src: "/assets/16.webp", alt: "Healthcare professional psychoeducation" },
                { src: "/assets/23.webp", alt: "Medical college psychiatric training" },
              ].map((item, mIdx) => (
                <div
                  key={mIdx}
                  className="relative aspect-square rounded-xl overflow-hidden border border-[#DDD5C7] group shadow-2xs bg-[#EAE4D7]"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>

            {/* Links to Dedicated Pages */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-[#E3DDD1]">
              <Link
                href="/awareness"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FAF7F2] hover:bg-white text-[#2D5A47] border border-[#DDD5C7] text-sm font-semibold shadow-2xs transition-all"
              >
                <span>Explore All Outreach Initiatives</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#536374] hover:bg-[#3F4F60] text-white text-sm font-medium tracking-wide shadow-2xs transition-all"
              >
                <Camera className="w-4 h-4" />
                <span>View Complete Photo Gallery</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
