"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Users, 
  Sparkles, 
  ShieldAlert, 
  BookOpen, 
  GraduationCap, 
  Stethoscope, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Heart, 
  Award,
  Mail,
  Camera
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBooking } from "@/context/BookingContext";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { getWhatsAppUrl } from "@/components/BookingModal";

export default function AwarenessPage() {
  const { openBooking } = useBooking();

  const programs = [
    {
      id: "adolescent",
      title: "Mental health awareness session in college",
      category: "Youth & Educational Institutions",
      image: "/assets/12.webp",
      caption: "Session on adolescent mental health at Virani College",
      desc: "Interactive, age-appropriate sessions designed to help teenagers understand emotional regulation, manage academic expectations, cope with peer dynamics, and identify early warning signs of mood and anxiety concerns before they compound.",
      topics: [
        "Exam stress, performance paralysis, and healthy study habits",
        "Understanding emotional mood swings vs clinical depression",
        "Building self-compassion, positive body image, and peer empathy",
        "Safe help-seeking frameworks: When and how to talk to a counselor or parent"
      ]
    },
    {
      id: "campus-youth",
      title: "Campus Workshops: Social Media, Dopamine & Stress",
      category: "Colleges & Universities",
      image: "/assets/14.webp",
      caption: "Campus lecture on digital wellness and dopamine culture",
      desc: "University students navigate complex transitions in independence, career identity, and digital immersion. These sessions confront dopamine exhaustion, problematic gaming, doom-scrolling, and the psychological impact of digital validation.",
      topics: [
        "The neurochemistry of social media algorithms and screen dependence",
        "Overcoming burnout, procrastination, and lack of motivation",
        "Dating anxiety, relationship boundaries, and emotional safety",
        "Substance misuse awareness and healthy recreational alternatives"
      ]
    },
    {
      id: "suicide-prevention",
      title: "Suicide Prevention & Gatekeeper Training",
      category: "Critical Public Health Intervention",
      image: "/assets/8.webp",
      caption: "MIND FEST Mega Event: Mental Health is a Universal Human Right (PDU Medical College)",
      desc: "Suicide is largely preventable through timely, informed intervention. Dr. Bhoomi trains students, teachers, parents, and community leaders to recognize verbal and behavioral crisis cues and respond safely without stigma or judgment.",
      topics: [
        "Debunking myths: Talking about suicide does not plant the idea",
        "Recognizing subtle behavioral withdrawal, giving away possessions, or statements of hopelessness",
        "The 'Ask, Listen, Connect' emergency communication protocol",
        "National 24/7 crisis resources and emergency hospital referral pathways"
      ]
    },
    {
      id: "cme-doctors",
      title: "Physician & Medical Professional CMEs",
      category: "Continuing Medical Education",
      image: "/assets/18.webp",
      caption: "Physicians CME conference on foundations of psychotherapy & psychosomatics",
      desc: "Over 40% of primary care patients present with somatic symptoms rooted in psychiatric distress. Dr. Bhoomi conducts specialized lectures for MBBS doctors, gynecologists, and pediatricians to enhance early diagnosis and psychosomatic management.",
      topics: [
        "Psychosomatic medicine: Irritable Bowel Syndrome (IBS), fibromyalgia, and tension headaches",
        "Rational psychopharmacology: Modern antidepressants and avoiding sedative over-prescription",
        "Recognizing perinatal and postpartum depression in obstetric clinics",
        "Physician burnout, secondary trauma, and mental wellness for healthcare workers"
      ]
    },
    {
      id: "psychiatry-education",
      title: "Clinical Symposia & Psychotherapy Education",
      category: "Clinical Literacy & Evidence-Based Care",
      image: "/assets/25.webp",
      caption: "Clinical symposium on Acceptance & Commitment Therapy (ACT)",
      desc: "Presentations exploring the neurobiological mechanisms of mental illness, cutting-edge interventional psychiatry (such as Ketamine and neuromodulation), and empirical psychotherapy modalities like ACT and CBT.",
      topics: [
        "Acceptance & Commitment Therapy (ACT) in clinical practice",
        "Neuroplasticity and synaptic repair in mood disorder recovery",
        "Treatment-Resistant Depression (TRD) intervention protocols",
        "De-stigmatizing medical psychiatry in the scientific community"
      ]
    },
    {
      id: "community-panels",
      title: "Public Awareness & Community Panels",
      category: "Community & Society",
      image: "/assets/10.webp",
      caption: "Community outreach auditorium panel with hundreds of participants",
      desc: "Broad community gatherings and public lectures dismantling taboos around psychiatric care, family counseling, and creating empathetic, supportive home environments across urban and rural Gujarat.",
      topics: [
        "Why seeing a psychiatrist is identical to seeing any medical specialist",
        "Women's mental wellness across motherhood and hormonal transitions",
        "Supporting a family member with severe mental illness at home",
        "Overcoming social shame, gossip, and superstition around mental health"
      ]
    }
  ];

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
                COMMUNITY OUTREACH & PSYCHOEDUCATION
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#162534] font-normal leading-[1.1] mb-6">
              Mental Health Awareness: Beyond the Clinic Walls
            </h1>

            <p className="text-base sm:text-lg text-[#4B5A6A] font-light leading-relaxed mb-8">
              True psychiatric care extends far beyond the four walls of a consultation room. Dr. Bhoomi Raval is actively committed to public health psychoeducation—conducting talks, seminars, workshops, and gatekeeper trainings for schools, universities, hospitals, and community forums.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#536374] hover:bg-[#3F4F60] text-white text-sm font-medium tracking-wide shadow-sm transition-all"
              >
                <Camera className="w-4 h-4" />
                <span>View Event & Webinar Gallery</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={getWhatsAppUrl("Hi Dr. Bhoomi, we would like to inquire about organizing a mental health awareness session / seminar for our institution.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-semibold shadow-sm transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Invite for a Talk / Workshop</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Programs List - Color 2 (#ECE4D7) */}
      <section className="py-20 md:py-28 bg-[#ECE4D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#2D5A47] uppercase block mb-2">
              OUTREACH PILLARS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#162534] font-normal">
              Educational Modules & Awareness Programs
            </h2>
            <p className="text-sm sm:text-base text-[#526171] mt-2 font-light max-w-2xl">
              Delivering culturally grounded, medically sound mental health literacy across Gujarat.
            </p>
          </div>

          <div className="space-y-12">
            {programs.map((item, idx) => (
              <motion.div
                key={item.id}
                id={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="rounded-3xl bg-[#FAF7F2] border border-[#DDD4C5] p-6 sm:p-10 lg:p-12 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  {/* Photo Column */}
                  <div className="lg:col-span-5 relative">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#DCD5C7] shadow-sm relative bg-[#EAE4D7] group">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>
                    <p className="text-[11px] text-[#6E7E8E] italic mt-2.5 text-center">
                      {item.caption}
                    </p>
                  </div>

                  {/* Content Column */}
                  <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#2D5A47]">
                      {item.category}
                    </span>

                    <h3 className="font-serif text-2xl sm:text-3xl text-[#162534] font-medium leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#4C5C6C] font-light leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="pt-3 border-t border-[#EAE3D6]">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#162534] mb-3">
                        Key Themes Explored in this Session:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {item.topics.map((topic, tIdx) => (
                          <div key={tIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#4E5E6E]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A47] shrink-0 mt-2" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Community Outreach Matters - Color 1 (#F7F3EA) */}
      <section className="py-20 md:py-28 bg-[#F7F3EA] border-t border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#2D5A47] uppercase block mb-2">
              WHY IT MATTERS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#162534] font-normal">
              Changing the Mental Health Narrative
            </h2>
            <p className="text-sm sm:text-base text-[#526171] mt-2 font-light">
              By bringing psychiatric literacy into public spaces, we break down decades of silence and fear.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#FAF7F2] border border-[#E3DDCF] space-y-3">
              <span className="w-10 h-10 rounded-xl bg-[#2D5A47]/10 flex items-center justify-center text-[#2D5A47] font-serif font-bold text-lg">
                01
              </span>
              <h3 className="font-serif text-xl text-[#162534] font-medium">
                Early Identification
              </h3>
              <p className="text-sm text-[#4E5E6E] font-light leading-relaxed">
                When students, parents, and doctors recognize early warning signs of depression or anxiety, treatment starts months earlier—preventing acute crises and academic collapse.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#FAF7F2] border border-[#E3DDCF] space-y-3">
              <span className="w-10 h-10 rounded-xl bg-[#2D5A47]/10 flex items-center justify-center text-[#2D5A47] font-serif font-bold text-lg">
                02
              </span>
              <h3 className="font-serif text-xl text-[#162534] font-medium">
                Eradicating Stigma
              </h3>
              <p className="text-sm text-[#4E5E6E] font-light leading-relaxed">
                Framing psychiatric care as neurobiological medicine removes toxic shame. Individuals learn that seeking help is a courageous act of self-preservation, not a personal flaw.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#FAF7F2] border border-[#E3DDCF] space-y-3">
              <span className="w-10 h-10 rounded-xl bg-[#2D5A47]/10 flex items-center justify-center text-[#2D5A47] font-serif font-bold text-lg">
                03
              </span>
              <h3 className="font-serif text-xl text-[#162534] font-medium">
                Empowering Caregivers
              </h3>
              <p className="text-sm text-[#4E5E6E] font-light leading-relaxed">
                Families are taught how to communicate with love and boundaries rather than criticism, transforming living spaces into calm, supportive recovery environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Organize a Session Banner - Color 2 (#ECE4D7) */}
      <section className="py-20 md:py-28 bg-[#ECE4D7] border-t border-[#DDD4C5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#FAF7F2] border border-[#DDD4C5] p-8 sm:p-12 text-center space-y-6 shadow-sm">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#2D5A47] uppercase block">
              INSTITUTIONAL COLLABORATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#162534] font-normal">
              Host an Awareness Workshop for Your Organization
            </h2>
            <p className="text-sm sm:text-base text-[#4E5E6E] font-light leading-relaxed max-w-xl mx-auto">
              Dr. Bhoomi Raval is available for keynotes, guest lectures, campus mental health weeks, gatekeeper workshops, and corporate mental wellness panels across Rajkot and Gujarat.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <a
                href={getWhatsAppUrl("Hello Dr. Bhoomi, we are interested in scheduling a mental health awareness seminar / workshop for our organization.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-semibold shadow-sm transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Inquire via WhatsApp</span>
              </a>

              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#536374] hover:bg-[#3F4F60] text-white text-sm font-medium tracking-wide shadow-sm transition-all"
              >
                <Camera className="w-4 h-4" />
                <span>See Photos from Past Talks</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Banner - Color 1 (#F7F3EA) */}
      <section className="py-20 bg-[#F7F3EA] border-t border-[#E8E2D5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#2D5A47] uppercase block mb-3">
            NEED PERSONAL CARE?
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#162534] mb-4">
            Consultations Are Always Confidential & Available
          </h2>
          <p className="text-base text-[#4E5C6C] font-light max-w-xl mx-auto mb-8">
            Whether for yourself, a family member, or a student, clinical consultations provide personalized, private medical care.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openBooking("in-person")}
              className="px-7 py-3.5 rounded-xl bg-[#536374] hover:bg-[#3F4F60] text-white text-sm font-medium tracking-wide shadow-sm transition-all"
            >
              Book an Appointment
            </button>
            <Link
              href="/services"
              className="px-6 py-3.5 rounded-xl border border-[#DDD5C7] text-sm font-medium text-[#4D5D6E] bg-[#FAF7F2] hover:bg-[#F3EDE2] transition-all"
            >
              View Clinical Services →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
