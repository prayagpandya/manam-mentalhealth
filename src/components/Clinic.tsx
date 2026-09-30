"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Navigation, Globe, PhoneCall } from "lucide-react";
import { getWhatsAppUrl } from "./BookingModal";
import WhatsAppIcon from "./WhatsAppIcon";

interface ClinicProps {
  onOpenBooking: () => void;
}

export default function Clinic({ onOpenBooking }: ClinicProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const clinicPhotos = [
    {
      src: "/assets/office.webp",
      title: "Consultation Lounge",
      alt: "MANAM Psychiatric Consultation Room in Rajkot",
    },
    {
      src: "/assets/27.webp",
      title: "Clinical Examination Room",
      alt: "MANAM Clinical Examination Facility at Kotak Hospital",
    },
  ];

  const googleMapsUrl =
    "https://maps.google.com/?q=Kotak+Hospital+Moti+Tanki+Chowk+Rajkot+Gujarat+360001";

  return (
    <section id="clinic" className="py-20 md:py-32 bg-[#F7F3EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center sm:text-left"
        >
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#2D5A47] uppercase block mb-3">
            VISIT MANAM IN RAJKOT
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#162534] font-normal tracking-tight">
            A calm space to begin.
          </h2>
          <p className="text-sm sm:text-base text-[#526171] mt-2 font-light max-w-2xl">
            In-person psychiatric consultations are available at Kotak Hospital, Moti Tanki Chowk, Rajkot.
          </p>
        </motion.div>

        {/* 2-Column Presentation Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-xl border border-[#DCD5C7] bg-[#162534] text-white">
          {/* Left: Consultation Room Photos with Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative min-h-[360px] sm:min-h-[440px] lg:min-h-[540px] flex flex-col justify-end"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhotoIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={clinicPhotos[activePhotoIndex].src}
                  alt={clinicPhotos[activePhotoIndex].alt}
                  fill
                  className="object-cover object-[center_35%]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-[#162534]/90 via-[#162534]/20 to-transparent pointer-events-none" />

            {/* Photo selector badges at bottom of photo */}
            <div className="relative z-10 p-3 sm:p-5 flex items-center justify-between gap-2 sm:gap-3">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 bg-[#0F1B27]/85 backdrop-blur-md p-1 sm:p-1.5 rounded-xl border border-white/10 max-w-full">
                {clinicPhotos.map((photo, idx) => (
                  <button
                    key={photo.title}
                    onClick={() => setActivePhotoIndex(idx)}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all ${
                      activePhotoIndex === idx
                        ? "bg-[#2D5A47] text-white shadow-xs"
                        : "text-[#BAC8D7] hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {photo.title}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Clinic Details and Hours Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between"
          >
            <div className="space-y-8">
              {/* Address Block */}
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#86C2A6] mb-3">
                  <MapPin className="w-4 h-4 text-[#86C2A6]" />
                  <span>Clinic Address</span>
                </div>
                <div className="text-sm sm:text-base text-[#E1E7EE] font-light leading-relaxed space-y-1">
                  <p className="font-medium text-white text-base">First floor, Kotak Hospital,</p>
                  <p>Opp. Akila press, Nr. Eagle travels,</p>
                  <p>Moti Tanki Chowk, Rajkot – 360001</p>
                </div>
                <div className="mt-3">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#86C2A6] hover:text-[#A7DEB4] transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Google Maps →</span>
                  </a>
                </div>
              </div>

              {/* Consultation Hours */}
              <div className="border-t border-white/10 pt-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#86C2A6] mb-3">
                  <Clock className="w-4 h-4 text-[#86C2A6]" />
                  <span>Consultation Hours</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs text-[#95A5B6] uppercase tracking-wider font-semibold mb-1">
                      Morning
                    </p>
                    <p className="font-medium text-white text-sm sm:text-base">
                      10:00 AM – 1:00 PM
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs text-[#95A5B6] uppercase tracking-wider font-semibold mb-1">
                      Evening
                    </p>
                    <p className="font-medium text-white text-sm sm:text-base">
                      5:00 PM – 8:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Remote Consultations Note */}
              <div className="p-4 rounded-xl bg-[#2D5A47]/20 border border-[#2D5A47]/40 flex items-start gap-3">
                <Globe className="w-4 h-4 text-[#86C2A6] shrink-0 mt-0.5" />
                <p className="text-xs text-[#E1EAE5] leading-relaxed">
                  <strong className="font-semibold text-white">Online Video Consultations</strong> are available for individuals residing outside Rajkot or who prefer receiving care from home.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-semibold transition-all shadow-md shadow-[#25D366]/20"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>Message on WhatsApp</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-medium border border-white/15 transition-all text-center"
              >
                Book Appointment
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
