"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FaqsProps {
  onOpenBooking: () => void;
}

export default function Faqs({ onOpenBooking }: FaqsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Do I need to know what diagnosis I have before seeing a psychiatrist?",
      a: "No. You don't need to diagnose yourself before seeking help. A psychiatric consultation involves understanding your symptoms, experiences, medical and personal history, and current circumstances to arrive at an appropriate clinical assessment.",
    },
    {
      q: "Does seeing a psychiatrist mean that something is seriously wrong with me?",
      a: "Not necessarily. People seek psychiatric care for a wide range of concerns, from anxiety, sleep difficulties and emotional distress to more complex psychiatric conditions. Seeking help is about understanding what you're experiencing and finding appropriate care.",
    },
    {
      q: "Will I have to take medication lifelong if I see a psychiatrist?",
      a: "Not necessarily. Treatment and its duration depends on the individual's assessment and clinical needs. Depending on the situation, care may involve psychotherapy, medication, lifestyle and behavioural interventions, or a combination of approaches.",
    },
    {
      q: "Are psychiatric medicines addictive?",
      a: "Not all psychiatric medicines are addictive. Different medications have different properties, indications and potential side effects. Some medicines can lead to dependence or withdrawal if stopped abruptly, which is why medication should be prescribed and changed under appropriate medical supervision.",
    },
    {
      q: "Can I stop my medication once I start feeling better?",
      a: "Feeling better does not always mean that treatment can be stopped immediately. The appropriate duration of treatment depends on the condition, treatment response, history of recurrence and other individual factors. Medication should generally not be stopped or changed without discussing it with your psychiatrist.",
    },
    {
      q: "Can I see a psychiatrist specifically for psychotherapy?",
      a: "Yes. Psychotherapy can be an important part of psychiatric care and may be recommended alone or alongside medication, depending on the individual's needs. Assessment will be done prior to proceeding with therapy.",
    },
    {
      q: "What happens during the first consultation?",
      a: "The first consultation generally involves a detailed discussion about what you have been experiencing, when it began, how it affects your daily life, relevant personal and medical history, and other factors that may be important for understanding your concerns. You will also have an opportunity to ask questions and discuss possible treatment options.",
    },
    {
      q: "Will what I discuss in consultation remain confidential?",
      a: "Patient confidentiality is an important part of psychiatric care. Information discussed during consultation is handled professionally and confidentially, subject to applicable legal and clinical exceptions.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-20 md:py-32 bg-[#ECE4D7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#2D5A47] uppercase block mb-3">
            FAQS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#162534] font-normal tracking-tight">
            Questions are welcome here.
          </h2>
        </motion.div>

        {/* Accordion List */}
        <div className="divide-y divide-[#DDD4C5] border-t border-b border-[#DDD4C5]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="py-5 sm:py-6"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between text-left gap-4 group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg sm:text-xl text-[#162534] font-medium group-hover:text-[#2D5A47] transition-colors">
                    {faq.q}
                  </span>
                  <span className="shrink-0 w-8 h-8 rounded-full border border-[#D2C8B8] flex items-center justify-center text-[#556475] group-hover:border-[#2D5A47] group-hover:text-[#2D5A47] transition-all">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-sm sm:text-base text-[#4E5D6D] font-light leading-relaxed pr-8">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Closing Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="font-serif text-xl sm:text-2xl text-[#162534] font-medium mb-2">
            Still have questions?
          </p>
          <p className="text-sm sm:text-base text-[#526171] font-light mb-6">
            You can discuss your concerns directly during a consultation.
          </p>
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#536374] hover:bg-[#3F4F60] text-white text-sm font-medium tracking-wide shadow-xs transition-all text-center"
          >
            Book a consultation
          </button>
        </motion.div>
      </div>
    </section>
  );
}
