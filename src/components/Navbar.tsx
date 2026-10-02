"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { getWhatsAppUrl } from "./BookingModal";
import WhatsAppIcon from "./WhatsAppIcon";
import { useBooking } from "@/context/BookingContext";

interface NavbarProps {
  onOpenBooking?: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const booking = useBooking();

  const handleBooking = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      booking.openBooking();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Treatments", href: "/treatments" },
    { name: "Conditions", href: "/conditions" },
    { name: "Psychotherapy", href: "/psychotherapy" },
    { name: "Awareness", href: "/awareness" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blogs", href: "/blogs" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#F7F3EA]/95 backdrop-blur-md shadow-xs border-b border-[#E7E2D6]"
          : "bg-[#F7F3EA] border-b border-[#EDE7DB]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "h-16 sm:h-18" : "h-20 sm:h-22"
          }`}
        >
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3.5 group py-1">
            <div
              className={`relative transition-all duration-300 flex items-center justify-center bg-transparent shrink-0 ${
                isScrolled ? "w-10 h-10 sm:w-12 sm:h-12" : "w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
              }`}
            >
              <Image
                src="/assets/no_bg_logo.webp"
                alt="MANAM Logo"
                width={470}
                height={531}
                className="w-full h-full object-contain transition-transform group-hover:scale-105"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-serif font-semibold tracking-wider text-[#162534] group-hover:text-[#2D5A47] transition-all leading-none ${
                  isScrolled ? "text-xl sm:text-2xl" : "text-xl sm:text-2xl lg:text-3xl"
                }`}
              >
                MANAM
              </span>
              <span
                className={`uppercase tracking-[0.22em] text-[#586676] transition-all font-medium ${
                  isScrolled ? "text-[9px] sm:text-[10px] mt-0.5" : "text-[10px] sm:text-[11px] mt-1"
                }`}
              >
                Mental Health
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[13px] tracking-wide relative py-1 transition-colors ${
                    isActive
                      ? "text-[#182333] font-semibold after:w-full"
                      : "text-[#485666] font-medium hover:text-[#182333]"
                  } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#2D5A47] hover:after:w-full after:transition-all after:duration-200`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={handleBooking}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#536374] hover:bg-[#3F4F60] text-white text-[13px] font-medium tracking-wide shadow-xs transition-all active:scale-[0.98]"
            >
              <span>Book a consultation</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleBooking}
              className="sm:hidden px-3.5 py-1.5 rounded-md bg-[#536374] text-white text-xs font-medium"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#485666] hover:text-[#162534] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#E3DDD1] px-5 pt-3 pb-6 space-y-3 shadow-lg">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-sm font-medium border-b border-[#EFE9DE] ${
              pathname === "/" ? "text-[#2D5A47] font-semibold" : "text-[#384655]"
            }`}
          >
            Home
          </Link>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-sm font-medium border-b border-[#EFE9DE] ${
                  isActive ? "text-[#2D5A47] font-semibold" : "text-[#384655] hover:text-[#2D5A47]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleBooking();
              }}
              className="w-full py-2.5 rounded-lg bg-[#536374] text-white text-center text-sm font-medium"
            >
              Book a Consultation
            </button>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-lg bg-[#25D366] text-white text-center text-sm font-semibold flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
