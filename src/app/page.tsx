"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import About from "@/components/About";
import Services from "@/components/Services";
import Conditions from "@/components/Conditions";
import Psychotherapy from "@/components/Psychotherapy";
import Awareness from "@/components/Awareness";
import ReelsSection from "@/components/ReelsSection";
import GoogleReviews from "@/components/GoogleReviews";
import HomeBlogs from "@/components/HomeBlogs";
import Faqs from "@/components/Faqs";
import Clinic from "@/components/Clinic";
import Footer from "@/components/Footer";
import { useBooking } from "@/context/BookingContext";

export default function Home() {
  const { openBooking } = useBooking();

  return (
    <main className="relative min-h-screen bg-[#F7F3EA] text-[#1D2A3A] selection:bg-[#2D5A47]/15 selection:text-[#182333]">
      {/* Navigation */}
      <Navbar onOpenBooking={() => openBooking("in-person")} />

      {/* 1. Hero Section */}
      <Hero onOpenBooking={() => openBooking("in-person")} />

      {/* MANAM Philosophy */}
      <Philosophy />

      {/* 2. About Dr. Bhoomi */}
      <About />

      {/* 3. Services (Including Ketamine & ECT) */}
      <Services />

      {/* 4. Conditions (Including Headaches/Migraines, Geriatric, Somatic, Internet & Digital) */}
      <Conditions onOpenBooking={() => openBooking("in-person")} />

      {/* 5. Psychotherapy */}
      <Psychotherapy onOpenBooking={() => openBooking("in-person")} />

      {/* Addition: Mental Health Awareness & Education */}
      <Awareness />

      {/* Client Instagram Reels & Short Psychoeducation */}
      <ReelsSection />

      {/* Google Verified Reviews (Horizontally Scrollable) */}
      <GoogleReviews />

      {/* Clinical Blogs & Insights */}
      <HomeBlogs />

      {/* 6. Frequently Asked Questions */}
      <Faqs onOpenBooking={() => openBooking("in-person")} />

      {/* 7. Clinic & In-person / Online Consultation Info */}
      <Clinic onOpenBooking={() => openBooking("in-person")} />

      {/* Footer */}
      <Footer />
    </main>
  );
}
