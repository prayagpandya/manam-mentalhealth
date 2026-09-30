"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ConditionsProps {
  onOpenBooking: () => void;
}

export default function Conditions({ onOpenBooking }: ConditionsProps) {
  const conditions = [
    {
      title: "Anxiety & panic",
      description:
        "Persistent worry, excessive fear, panic attacks, physical symptoms of anxiety and difficulty coping with everyday situations.",
    },
    {
      title: "Depression & mood disorders",
      description:
        "Persistent low mood, loss of interest, changes in sleep or appetite, reduced energy, mood fluctuations and other difficulties affecting daily life.",
    },
    {
      title: "OCD",
      description:
        "Obsessions, unwanted intrusive thoughts and repetitive behaviours or mental rituals that can become difficult to control.",
    },
    {
      title: "Bipolar disorder",
      description:
        "Significant changes in mood, energy, activity and behaviour, including episodes of depression and periods of elevated or unusually activated mood/ mania.",
    },
    {
      title: "Psychosis & schizophrenia",
      description:
        "Experiences such as hallucinations, delusions, significant changes in behaviour or difficulty distinguishing experiences from reality.",
    },
    {
      title: "Trauma-related concerns",
      description:
        "Emotional and psychological difficulties following traumatic or overwhelming experiences, including persistent fear, avoidance, intrusive memories or changes in mood and behaviour.",
    },
    {
      title: "Sleep-related concerns",
      description:
        "Difficulties with falling asleep, staying asleep, irregular sleep patterns or sleep problems associated with psychological or psychiatric concerns.",
    },
    {
      title: "Adolescent mental health",
      description:
        "Emotional, behavioural, social or psychological difficulties affecting adolescents, including concerns around mood, anxiety, behaviour, school or relationships.",
    },
    {
      title: "Substance use concerns",
      description:
        "Difficulties related to alcohol, tobacco, prescription medicines or other substances, including loss of control, dependence or difficulties stopping.",
    },
    {
      title: "Headaches & Migraine-related Concerns",
      description:
        "Psychological and psychiatric factors that may contribute to or accompany recurrent headaches and migraine-related difficulties, including the impact of stress, anxiety, mood and sleep on symptoms.",
    },
    {
      title: "Geriatric Mental Health & Dementia",
      description:
        "Assessment and care for mental health and cognitive concerns in older adults, including memory difficulties, changes in behaviour or mood, confusion and dementia-related concerns. Care may also involve supporting families and caregivers through the course of illness.",
    },
    {
      title: "Somatic Symptom & Related Concerns",
      description:
        "Physical symptoms that may be associated with significant psychological distress, health-related worry or difficulties in how symptoms are experienced and managed, after appropriate medical evaluation.",
    },
    {
      title: "Internet & Digital Use Concerns",
      description:
        "Difficulties related to excessive or uncontrolled internet, social media or online activity, particularly when they begin to interfere with sleep, studies, work, relationships or daily functioning.",
    },
  ];

  return (
    <section id="conditions" className="py-20 md:py-32 bg-[#F7F3EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-16 pb-8 border-b border-[#E3DDD1]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#2D5A47] uppercase block mb-3">
              CONDITIONS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#162534] font-normal tracking-tight">
              Concerns we can help you understand
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
              You do not need to know your diagnosis before seeking psychiatric help. An assessment can help clarify your symptoms and the care that may be appropriate.
            </p>
          </motion.div>
        </div>

        {/* Conditions 3-column Grid matching PDF clean cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {conditions.slice(0, 6).map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
              className="p-6 sm:p-7 rounded-2xl bg-[#FAF7F2] border border-[#E3DDCF] shadow-2xs hover:border-[#2D5A47]/40 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-[#2D5A47] font-semibold">◆</span>
                  <h3 className="font-serif text-xl sm:text-[21px] text-[#162534] font-medium leading-snug">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-[#4E5C6C] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-8 sm:p-10 rounded-2xl bg-[#ECE4D7] border border-[#DDD4C5] flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="max-w-2xl text-center sm:text-left">
            <p className="font-serif text-xl sm:text-2xl text-[#162534] font-medium leading-snug">
              Not sure where your symptoms fit?
            </p>
            <p className="text-sm sm:text-base text-[#526171] mt-1 font-light">
              That&apos;s okay. You don&apos;t need to diagnose yourself before seeking help.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto shrink-0">
            <Link
              href="/conditions"
              className="w-full sm:w-auto px-5 py-3.5 rounded-lg border border-[#DDD4C5] text-sm font-medium text-[#2D5A47] bg-[#FAF7F2] hover:bg-white transition-all text-center"
            >
              Explore All Conditions →
            </Link>
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#536374] hover:bg-[#3F4F60] text-white text-sm font-medium tracking-wide shadow-xs transition-all text-center"
            >
              Book a consultation
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
