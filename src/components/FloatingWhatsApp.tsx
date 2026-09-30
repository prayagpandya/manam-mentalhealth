"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { getWhatsAppUrl } from "./BookingModal";
import WhatsAppIcon from "./WhatsAppIcon";

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith("/admin")) {
      setVisible(false);
      setShowTooltip(false);
      return;
    }

    const timer = setTimeout(() => {
      setVisible(true);
      setShowTooltip(true);
    }, 2000);

    const tooltipTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
    };
  }, [pathname]);

  if (pathname?.startsWith("/admin")) return null;
  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2 pointer-events-none">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="pointer-events-auto max-w-[220px] sm:max-w-[240px] bg-white text-[#1C2A38] text-xs py-2 sm:py-2.5 px-3 sm:px-3.5 rounded-2xl shadow-xl border border-[#E3DDD1] relative animate-fade-in">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-1.5 -left-1.5 bg-[#EFE9DD] rounded-full p-0.5 text-[#5D6B7B] hover:text-[#182333]"
            aria-label="Close message"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="font-medium">Have a question?</p>
          <p className="text-[11px] text-[#637283] mt-0.5 leading-snug">
            Inquire directly about consultations on WhatsApp.
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20BE5A] text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
      </a>
    </div>
  );
}
