"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Maximize2 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBooking } from "@/context/BookingContext";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { getWhatsAppUrl } from "@/components/BookingModal";
import { initialGalleryItems, GalleryItem } from "@/data/galleryData";

export default function GalleryPage() {
  const { openBooking } = useBooking();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(initialGalleryItems);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.items && data.items.length > 0) {
          setGalleryItems(data.items);
        }
      })
      .catch((err) => console.error("Could not fetch dynamic gallery:", err));
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % galleryItems.length : 0
        );
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : 0
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, galleryItems.length]);

  return (
    <main className="relative min-h-screen bg-[#F7F3EA] text-[#1D2A3A]">
      <Navbar onOpenBooking={() => openBooking("in-person")} />

      {/* Hero Header - Color 1 (#F7F3EA) */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-[#F7F3EA] border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#2D5A47]" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#2D5A47] uppercase">
                COMMUNITY & OUTREACH GALLERY
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#162534] font-normal leading-[1.1] mb-6">
              Mental Health in Action
            </h1>

            <p className="text-base sm:text-lg text-[#4B5A6A] font-light leading-relaxed">
              A visual record of Dr. Bhoomi Raval&apos;s lectures, seminars, school sensitization workshops, medical CME symposiums, and community outreach initiatives across Gujarat.
            </p>
          </div>
        </div>
      </section>

      {/* Photo Gallery Grid - Color 2 (#ECE4D7) */}
      <section className="py-20 md:py-28 bg-[#ECE4D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2D5A47]">
              Showing {galleryItems.length} Photographs
            </h2>
            <span className="text-xs text-[#6B7B8D]">
              Click any photo to enlarge
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {galleryItems.map((item, idx) => (
              <motion.div
                key={item.id || item.src || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.06 }}
                onClick={() => setLightboxIndex(idx)}
                className="group rounded-2xl bg-[#FAF7F2] border border-[#DDD4C5] overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-4/3 w-full bg-[#EAE4D7] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.location || "MANAM clinical gallery photo"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#162534] shadow-sm transform scale-90 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Location Footer Only */}
                {item.location && (
                  <div className="p-4 bg-[#FAF7F2] flex items-center gap-2 text-xs text-[#4E5E6E] border-t border-[#EAE3D6]">
                    <MapPin className="w-3.5 h-3.5 text-[#2D5A47] shrink-0" />
                    <span className="font-medium truncate">{item.location}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && galleryItems[lightboxIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0 bg-[#0C151F]/90 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#DDD5C7] z-10 flex flex-col my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-4 right-4 z-20 p-2.5 text-white bg-black/60 hover:bg-black/80 rounded-full transition-colors backdrop-blur-xs cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(
                    (lightboxIndex - 1 + galleryItems.length) % galleryItems.length
                  );
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-xs transition-colors cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex + 1) % galleryItems.length);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-xs transition-colors cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Main Image */}
              <div className="relative w-full h-[65vh] sm:h-[75vh] bg-[#0E1722] flex items-center justify-center">
                <Image
                  src={galleryItems[lightboxIndex].src}
                  alt={galleryItems[lightboxIndex].location || "Gallery Photo"}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 90vw"
                  priority
                />
              </div>

              {/* Location Bar at Bottom */}
              <div className="p-4 sm:p-5 bg-[#FAF7F2] border-t border-[#EAE3D6] flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-[#162534] font-medium">
                  {galleryItems[lightboxIndex].location ? (
                    <>
                      <MapPin className="w-4 h-4 text-[#2D5A47] shrink-0" />
                      <span>{galleryItems[lightboxIndex].location}</span>
                    </>
                  ) : (
                    <span className="text-[#6A7888]">MANAM Outreach Gallery</span>
                  )}
                </div>
                <span className="text-xs text-[#7B8B9B]">
                  {lightboxIndex + 1} / {galleryItems.length}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Organize a Session Banner - Color 1 (#F7F3EA) */}
      <section className="py-20 md:py-28 bg-[#F7F3EA] border-t border-[#E8E2D5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#2D5A47] uppercase block">
            KNOWLEDGE EMPOWERMENT
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#162534] font-normal">
            Invite Dr. Bhoomi to Speak at Your Event
          </h2>
          <p className="text-sm sm:text-base text-[#4E5E6E] font-light leading-relaxed max-w-xl mx-auto">
            Available for in-person and online webinars, guest lectures, hospital CMEs, school mental health weeks, and corporate wellness panels.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href={getWhatsAppUrl("Hello Dr. Bhoomi, we came across your webinar gallery and would like to invite you to speak / conduct a seminar for our institution.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-semibold shadow-sm transition-all"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Inquire for Speaking on WhatsApp</span>
            </a>

            <button
              onClick={() => openBooking("in-person")}
              className="px-6 py-3.5 rounded-xl bg-[#536374] hover:bg-[#3F4F60] text-white text-sm font-medium tracking-wide shadow-sm transition-all"
            >
              Book Clinical Appointment
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
