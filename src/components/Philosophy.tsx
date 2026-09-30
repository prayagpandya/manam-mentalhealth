"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Philosophy() {
  return (
    <section className="py-20 md:py-28 bg-[#ECE4D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Tag & Image on left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#2D5A47] uppercase block mb-4 sm:mb-6">
              MANAM PHILOSOPHY
            </span>
            <div className="relative w-full max-w-[360px] aspect-square rounded-2xl overflow-hidden shadow-md border border-[#D8CFBF] bg-[#FAF6EE]">
              <Image
                src="/assets/manam_philosophy.webp"
                alt="MANAM Philosophy - Mental Healthcare Begins With Understanding"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 360px"
              />
            </div>
          </motion.div>

          {/* Core statement and explanation on right */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 max-w-2xl"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#162534] font-normal leading-[1.2] mb-8">
              Mental healthcare begins with understanding.
            </h2>

            <div className="space-y-5 text-base sm:text-lg text-[#4E5C6C] font-light leading-relaxed">
              <p>
                At MANAM, we look beyond symptoms to understand the person experiencing them: their thoughts, emotions, behaviour, circumstances and the people around them.
              </p>
              <p>
                Psychiatric care may involve medication, psychotherapy, or a combination of both, depending on the individual&apos;s needs.
              </p>
            </div>

            <div className="mt-8 pt-2">
              <Link
                href="/treatments"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#2D5A47] hover:text-[#18392C] transition-colors group"
              >
                <span className="underline underline-offset-4 decoration-[#2D5A47]/40 group-hover:decoration-[#2D5A47]">
                  Explore treatments
                </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
