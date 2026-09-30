"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Calendar,
  Sparkles,
} from "lucide-react";
import InstagramIcon from "@/components/InstagramIcon";
import { MongoReel } from "@/lib/models";
import { reelsData } from "@/data/reelsData";
import { useBooking } from "@/context/BookingContext";

export default function ReelsSection() {
  const { openBooking } = useBooking();
  const [reels, setReels] = useState<MongoReel[]>(reelsData);
  const [mutedStates, setMutedStates] = useState<boolean[]>(
    new Array(reelsData.length).fill(true)
  );
  const [selectedReelIndex, setSelectedReelIndex] = useState<number | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  // Fetch dynamic reels from API
  useEffect(() => {
    fetch("/api/reels")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.reels && data.reels.length > 0) {
          setReels(data.reels);
          setMutedStates(new Array(data.reels.length).fill(true));
        }
      })
      .catch((err) => console.error("Could not fetch reels from DB:", err));
  }, []);

  // Sync mute state to video elements
  const toggleMute = (index: number) => {
    setMutedStates((prev) => {
      const next = [...prev];
      const newMuted = !next[index];
      next[index] = newMuted;

      const video = cardVideoRefs.current[index];
      if (video) {
        video.muted = newMuted;
        if (!newMuted) {
          // Mute all other videos when one is unmuted
          cardVideoRefs.current.forEach((otherVideo, idx) => {
            if (otherVideo && idx !== index) {
              otherVideo.muted = true;
              next[idx] = true;
            }
          });
        }
      }
      return next;
    });
  };

  // Scroll controls
  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Open modal: immediately mute and pause ALL background carousel card videos
  const openReelModal = (index: number) => {
    cardVideoRefs.current.forEach((video) => {
      if (video) {
        video.muted = true;
        video.pause();
      }
    });
    setMutedStates(new Array(reels.length).fill(true));
    setSelectedReelIndex(index);
  };

  // Close modal: pause modal video and resume background carousel card videos (muted)
  const closeReelModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setSelectedReelIndex(null);
  };

  // Switch reels within modal
  const navigateModal = (newIndex: number) => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setSelectedReelIndex(newIndex);
  };

  // Guarantee single-audio state synchronization whenever selectedReelIndex changes
  useEffect(() => {
    if (selectedReelIndex !== null) {
      // Modal is OPEN: mute and pause ALL background cards so only 1 voice plays
      cardVideoRefs.current.forEach((video) => {
        if (video) {
          video.muted = true;
          video.pause();
        }
      });
      setMutedStates(new Array(reels.length).fill(true));
    } else {
      // Modal is CLOSED: ensure background cards play muted
      cardVideoRefs.current.forEach((video) => {
        if (video) {
          video.muted = true;
          video.play().catch(() => {});
        }
      });
    }
  }, [selectedReelIndex, reels.length]);

  // Escape & arrow key listener for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeReelModal();
      } else if (e.key === "ArrowLeft" && selectedReelIndex !== null) {
        navigateModal((selectedReelIndex - 1 + reels.length) % reels.length);
      } else if (e.key === "ArrowRight" && selectedReelIndex !== null) {
        navigateModal((selectedReelIndex + 1) % reels.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedReelIndex, reels.length]);

  const selectedReel = selectedReelIndex !== null ? reels[selectedReelIndex] : null;

  return (
    <section id="reels" className="py-20 md:py-28 bg-[#F3EDE2] border-y border-[#E2D9CC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-linear-to-r from-[#833AB4]/15 via-[#FD1D1D]/15 to-[#FCAF45]/15 border border-[#833AB4]/20 text-[#833AB4] text-xs font-semibold tracking-wider uppercase">
                <InstagramIcon className="w-3.5 h-3.5 text-[#E1306C]" />
                <span>Instagram Psychoeducation</span>
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#162534] font-normal tracking-tight">
              Short Insights on the Go
            </h2>
            <p className="text-sm sm:text-base text-[#556575] font-light mt-2 max-w-xl">
              Practical psychiatry advice, emotional regulation techniques, and mental health awareness reels by Dr. Bhoomi Raval.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Direct Instagram link */}
            <a
              href="https://www.instagram.com/manam_mentalhealth/reels/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#162534] hover:text-[#E1306C] border border-[#D5CABE] text-xs font-medium shadow-2xs transition-all"
            >
              <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
              <span className="font-semibold">@manam_mentalhealth</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            {/* Scroll navigation arrows */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => handleScroll("left")}
                aria-label="Scroll left"
                className="w-10 h-10 rounded-xl bg-white border border-[#D5CABE] hover:bg-[#FAF7F2] flex items-center justify-center text-[#162534] transition-all cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScroll("right")}
                aria-label="Scroll right"
                className="w-10 h-10 rounded-xl bg-white border border-[#D5CABE] hover:bg-[#FAF7F2] flex items-center justify-center text-[#162534] transition-all cursor-pointer shadow-2xs"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Reels Carousel Feed */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto overflow-y-hidden pb-4 pt-2 snap-x snap-proximity scrollbar-none"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            overscrollBehaviorX: "contain",
            overscrollBehaviorY: "auto",
          }}
        >
          {reels.map((reel, index) => {
            const isMuted = mutedStates[index] ?? true;

            return (
              <motion.div
                key={reel._id || index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                onClick={() => openReelModal(index)}
                className="group relative w-[240px] sm:w-[270px] md:w-[290px] aspect-[9/16] shrink-0 rounded-3xl overflow-hidden bg-[#0D1520] border border-[#DDD4C5] shadow-sm hover:shadow-xl hover:border-[#2D5A47]/40 transition-all duration-300 cursor-pointer snap-start"
              >
                {/* Background Video */}
                <video
                  ref={(el) => {
                    cardVideoRefs.current[index] = el;
                  }}
                  src={reel.videoUrl}
                  poster={reel.thumbnailUrl}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="metadata"
                  onEnded={(e) => {
                    e.currentTarget.currentTime = 0;
                    e.currentTarget.play().catch(() => {});
                  }}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Dark Vignette Overlay for readability */}
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />

                {/* Top Bar: Instagram tag & Audio Toggle */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-20">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/15 text-white text-[11px] font-medium shadow-xs">
                    <InstagramIcon className="w-3 h-3 text-[#FCAF45]" />
                    <span className="tracking-tight">@manam</span>
                  </div>

                  {/* Individual Mute/Unmute toggle button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute(index);
                    }}
                    aria-label={isMuted ? "Unmute reel" : "Mute reel"}
                    className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all shadow-xs cursor-pointer"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-white/90" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                    )}
                  </button>
                </div>

                {/* Center Hover Action */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#162534] shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>
                </div>

                {/* Bottom Content Info */}
                <div className="absolute bottom-4 left-4 right-4 z-20 text-white pointer-events-none space-y-2">
                  {reel.viewsCount && (
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-emerald-300/90 block">
                      {reel.viewsCount} views • Dr. Bhoomi Raval
                    </span>
                  )}

                  <h3 className="font-serif text-base sm:text-lg font-medium leading-snug line-clamp-2 drop-shadow-xs">
                    {reel.title}
                  </h3>

                  <p className="text-[11px] text-white/75 font-light line-clamp-2 leading-relaxed">
                    {reel.caption}
                  </p>

                  <div className="pt-1 flex items-center justify-between text-[11px] text-white/80 font-medium">
                    <span className="inline-flex items-center gap-1 group-hover:text-emerald-300 transition-colors">
                      <span>Watch full reel</span>
                      <span>→</span>
                    </span>
                    {reel.duration && (
                      <span className="text-[10px] text-white/60 font-mono">
                        {reel.duration}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Swipe hint on mobile */}
        <div className="sm:hidden text-center mt-4">
          <span className="text-xs text-[#7A8A9A]">
            ← Swipe to view more reels →
          </span>
        </div>
      </div>

      {/* Reel Modal Popup */}
      <AnimatePresence>
        {selectedReel && selectedReelIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeReelModal}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#DDD5C7] z-10 my-auto text-[#1D2A3A]"
            >
              {/* Close Button Outside / Top Corner */}
              <button
                onClick={closeReelModal}
                aria-label="Close reel modal"
                className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Buttons */}
              <button
                onClick={() =>
                  navigateModal(
                    (selectedReelIndex - 1 + reels.length) % reels.length
                  )
                }
                aria-label="Previous reel"
                className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() =>
                  navigateModal((selectedReelIndex + 1) % reels.length)
                }
                aria-label="Next reel"
                className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 max-h-[88vh] overflow-y-auto">
                {/* Left Column: Full Reel Video Player */}
                <div className="md:col-span-6 bg-[#0B131C] relative flex items-center justify-center min-h-[380px] sm:min-h-[480px]">
                  <div className="relative w-full max-w-[340px] aspect-[9/16] overflow-hidden">
                    <video
                      key={selectedReel.videoUrl}
                      ref={modalVideoRef}
                      src={selectedReel.videoUrl}
                      poster={selectedReel.thumbnailUrl}
                      autoPlay
                      loop
                      controls
                      playsInline
                      onEnded={(e) => {
                        e.currentTarget.currentTime = 0;
                        e.currentTarget.play().catch(() => {});
                      }}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Right Column: Reel Details, Doctor Info & Actions */}
                <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#FAF7F2]">
                  <div className="space-y-5">
                    {/* Doctor Instagram Profile Badge */}
                    <div className="flex items-center justify-between pb-4 border-b border-[#E3DDD1]">
                      <div className="flex items-center gap-3">
                        <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#D5CABE] bg-[#EAE4D7] shrink-0">
                          <Image
                            src="/assets/28.webp"
                            alt="Dr. Bhoomi Raval"
                            fill
                            sizes="44px"
                            className="object-cover object-top"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-serif font-semibold text-[#162534] text-base">
                              Dr. Bhoomi Raval
                            </span>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.2 rounded-full">
                              MD
                            </span>
                          </div>
                          <span className="text-xs text-[#6A7888] font-mono">
                            @manam_mentalhealth
                          </span>
                        </div>
                      </div>

                      <a
                        href={selectedReel.instagramUrl || "https://www.instagram.com/manam_mentalhealth/reels/"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-linear-to-r from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#FCAF45]/10 text-[#833AB4] hover:bg-[#833AB4]/20 border border-[#833AB4]/20 text-xs font-semibold transition-all"
                      >
                        <InstagramIcon className="w-3.5 h-3.5 text-[#E1306C]" />
                        <span>Follow</span>
                      </a>
                    </div>

                    {/* Reel Title & Full Caption */}
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#162534] font-medium leading-snug mb-3">
                        {selectedReel.title}
                      </h3>

                      <div className="text-sm text-[#4E5E6E] font-light leading-relaxed whitespace-pre-line max-h-[220px] overflow-y-auto pr-2">
                        {selectedReel.caption}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-[#E3DDD1] space-y-3">
                    <a
                      href={selectedReel.instagramUrl || "https://www.instagram.com/manam_mentalhealth/reels/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-linear-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] hover:opacity-95 text-white text-sm font-semibold shadow-xs transition-opacity"
                    >
                      <InstagramIcon className="w-4 h-4" />
                      <span>Watch & Comment on Instagram</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                    </a>

                    <button
                      onClick={() => {
                        closeReelModal();
                        openBooking("in-person");
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2D5A47] hover:bg-[#234838] text-white text-sm font-medium transition-colors shadow-xs cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Consultation With Dr. Bhoomi</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
