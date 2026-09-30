"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, Heart } from "lucide-react";
import { getWhatsAppUrl } from "./BookingModal";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Footer() {
  return (
    <footer className="bg-[#121E2B] text-[#CCD7E4] border-t border-[#223347] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Doctor info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 sm:w-28 sm:h-28 bg-[#FAF7F2] p-2 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-white/10">
                <Image
                  src="/assets/no_bg_logo.webp"
                  alt="MANAM Logo"
                  width={470}
                  height={531}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl font-semibold tracking-wider text-white leading-tight block">
                  MANAM
                </span>
                <span className="block text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#86C2A6] font-medium mt-1">
                  Mental Health Initiative
                </span>
              </div>
            </div>

            <p className="font-serif text-base text-white/90 italic">
              Pause. Reflect. Heal.
            </p>

            <div className="pt-2 text-xs text-[#9BB0C7] space-y-1">
              <p className="text-white font-medium text-sm">Dr. Bhoomi Raval</p>
              <p>Consultant Psychiatrist • MBBS, MD Psychiatry (Gold Medalist)</p>
              <p>First floor, Kotak Hospital, Moti Tanki Chowk, Rajkot – 360001</p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#86C2A6]">
              Navigation
            </p>
            <ul className="space-y-2 text-sm text-[#A8BDD3]">
              <li>
                <Link href="/treatments" className="hover:text-white transition-colors">
                  Treatments & Clinical Care
                </Link>
              </li>
              <li>
                <Link href="/conditions" className="hover:text-white transition-colors">
                  Clinical Concerns
                </Link>
              </li>
              <li>
                <Link href="/psychotherapy" className="hover:text-white transition-colors">
                  Psychotherapy & Approaches
                </Link>
              </li>
              <li>
                <Link href="/awareness" className="hover:text-white transition-colors">
                  Awareness & Outreach
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Photo & Webinar Gallery
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-white transition-colors">
                  Mental Health Blogs
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">
                  About Dr. Bhoomi
                </Link>
              </li>
              <li>
                <Link href="/#clinic" className="hover:text-white transition-colors">
                  Clinic Location & Hours
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Consultations */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#86C2A6]">
              Consultations
            </p>
            <div className="text-sm text-[#A8BDD3] space-y-2">
              <p className="text-xs leading-relaxed text-[#94A7BC]">
                In-person consultations at Rajkot and secure online video consultations available across India.
              </p>
              <div className="pt-2">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20BE5A] text-white text-xs font-semibold transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>WhatsApp Consultation Inquiry</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Helplines Notice */}
        <div className="py-6 border-b border-white/10 text-xs text-[#8BA0B8] leading-relaxed">
          <p className="font-semibold text-white/90 mb-1 flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>Emergency Mental Health Helplines (India)</span>
          </p>
          <p>
            If you or someone you know is experiencing acute emotional crisis or thoughts of self-harm, please contact national round-the-clock free support services: <strong>Tele-MANAS: 14416 / 1800 891 4416</strong> or <strong>KIRAN: 1800-599-0019</strong>, or visit your nearest hospital emergency department.
          </p>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71859B]">
          <p>
            © {new Date().getFullYear()} MANAM Mental Health. All rights reserved. Dr. Bhoomi Raval.
          </p>
          <p className="text-[11px] text-center sm:text-right">
            Medical disclaimer: Information provided on this website is for educational purposes and does not replace individual clinical consultation.
          </p>
        </div>
      </div>
    </footer>
  );
}
