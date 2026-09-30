"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Video, Phone, Building2, Globe2 } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: "in-person" | "online";
}

export const WHATSAPP_NUMBER = "919426915152"; // Dr. Bhoomi / MANAM clinic WhatsApp line
export const DEFAULT_WHATSAPP_MESSAGE =
  "Hi Dr. Bhoomi, I came across MANAM Mental Health and would like to enquire about booking a consultation. Could you please share the available appointments?";

export function getWhatsAppUrl(customDetails?: string) {
  let message = DEFAULT_WHATSAPP_MESSAGE;
  if (customDetails) {
    message = customDetails;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function BookingModal({
  isOpen,
  onClose,
  defaultType = "in-person",
}: BookingModalProps) {
  const [consultationType, setConsultationType] = useState<"in-person" | "online">(defaultType);
  const [patientName, setPatientName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("India");
  const [notes, setNotes] = useState("");

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    let details = `*MANAM Mental Health — Consultation Inquiry*\n`;
    details += `• *Consultation Mode:* ${consultationType === "in-person" ? "In-Person (Rajkot Clinic)" : "Online Video Consultation"}\n`;
    if (patientName.trim()) {
      details += `• *Name:* ${patientName.trim()}\n`;
    }
    if (contactNumber.trim()) {
      details += `• *Contact Number:* ${contactNumber.trim()}\n`;
    }
    if (city.trim()) {
      details += `• *City:* ${city.trim()}\n`;
    }
    if (country.trim()) {
      details += `• *Country:* ${country.trim()}\n`;
    }
    if (notes.trim()) {
      details += `• *Brief Note / Concern:* ${notes.trim()}\n`;
    }
    details += `\n_Please send this message to start the consultation inquiry._`;

    const url = getWhatsAppUrl(details);
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0F1A24]/60 backdrop-blur-sm"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-[#FAF7F2] border border-[#E3DDD1] rounded-2xl shadow-2xl p-5 sm:p-8 z-10 my-auto text-[#1D2A3A]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-[#6E7B8B] hover:text-[#182333] hover:bg-[#EFE9DC] rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-5 sm:mb-6 pr-6 sm:pr-0">
              <span className="text-[11px] font-semibold tracking-widest text-[#2D5A47] uppercase block mb-1">
                MANAM • Appointment Inquiry
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-[#162534] font-medium">
                Book a Consultation
              </h3>
              <p className="text-xs sm:text-sm text-[#576475] mt-1 leading-relaxed">
                Choose your consultation preference below to connect directly with Dr. Bhoomi Raval via WhatsApp.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleWhatsAppRedirect} className="space-y-4 sm:space-y-5">
              {/* Consultation Type Radio */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-2">
                  Consultation Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setConsultationType("in-person")}
                    className={`flex items-center justify-center gap-2 p-2.5 sm:p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                      consultationType === "in-person"
                        ? "border-[#2D5A47] bg-[#2D5A47]/10 text-[#193B2E] ring-1 ring-[#2D5A47]"
                        : "border-[#E0D9CB] bg-white text-[#4A5568] hover:border-[#CBD5E1]"
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-[#2D5A47] shrink-0" />
                    <span>In-Person (Rajkot)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultationType("online")}
                    className={`flex items-center justify-center gap-2 p-2.5 sm:p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                      consultationType === "online"
                        ? "border-[#2D5A47] bg-[#2D5A47]/10 text-[#193B2E] ring-1 ring-[#2D5A47]"
                        : "border-[#E0D9CB] bg-white text-[#4A5568] hover:border-[#CBD5E1]"
                    }`}
                  >
                    <Video className="w-4 h-4 text-[#2D5A47] shrink-0" />
                    <span>Online Video</span>
                  </button>
                </div>
              </div>

              {/* Patient Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0D9CB] bg-white text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]/40 focus:border-[#2D5A47]"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                  Contact Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="e.g. +91 98250 06343"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E0D9CB] bg-white text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]/40 focus:border-[#2D5A47]"
                  />
                  <Phone className="w-4 h-4 text-[#788899] absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* City & Country Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                    City
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Rajkot"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E0D9CB] bg-white text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]/40 focus:border-[#2D5A47]"
                    />
                    <Building2 className="w-4 h-4 text-[#788899] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                    Country
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g. India"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E0D9CB] bg-white text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]/40 focus:border-[#2D5A47]"
                    />
                    <Globe2 className="w-4 h-4 text-[#788899] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Brief Concerns / Note */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                  Brief Note or Question (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Inquiring for adolescent consultation, therapy sessions, etc."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E0D9CB] bg-white text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]/40 focus:border-[#2D5A47] resize-none"
                />
              </div>

              {/* Direct WhatsApp CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BE5A] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                  <span>Send Inquiry via WhatsApp</span>
                </button>
                <p className="text-center text-[11px] text-[#6E7B8B] mt-2">
                  Opens WhatsApp with pre-formatted inquiry text. All conversations are handled with clinical confidentiality.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
