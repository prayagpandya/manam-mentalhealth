"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Brain, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Clock, 
  Lock, 
  Compass, 
  Layers, 
  Anchor, 
  MessageSquare
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBooking } from "@/context/BookingContext";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { getWhatsAppUrl } from "@/components/BookingModal";

export default function PsychotherapyPage() {
  const { openBooking } = useBooking();

  const modalities = [
    {
      id: "cbt",
      title: "Cognitive Behaviour Therapy (CBT)",
      acronym: "CBT",
      badge: "Gold Standard Evidence-Based",
      description:
        "CBT explores the interconnected triad of Thoughts, Emotions, and Behaviors. It is grounded in the scientific finding that how we perceive a situation determines our emotional reaction, rather than the situation itself.",
      mechanisms: [
        "Identifying Automatic Negative Thoughts (ANTs) and cognitive distortions (catastrophizing, emotional reasoning)",
        "Socratic dialogue and empirical thought records to examine objective evidence",
        "Behavioral Activation for depression (counteracting avoidance and behavioral withdrawal)",
        "Graded Exposure and Response Prevention (ERP) for phobias, panic, and OCD"
      ],
      idealFor: "Depression, Panic Disorder, Generalized Anxiety, Social Phobia, OCD, and Chronic Stress."
    },
    {
      id: "rebt",
      title: "Rational Emotive Behaviour Therapy (REBT)",
      acronym: "REBT",
      badge: "Philosophical & Emotional Restructuring",
      description:
        "Pioneered by Albert Ellis, REBT teaches that emotional suffering comes not from external adversities, but from our irrational dogmatic beliefs ('musts', 'shoulds', 'awfulizing') about those adversities.",
      mechanisms: [
        "The ABCDEF Formulation: Activating event (A) → Beliefs (B) → Consequences (C) → Disputing (D) → Effective philosophy (E) → New feelings (F)",
        "Challenging rigid demands ('I must be loved by everyone; life must be fair')",
        "Cultivating Unconditional Self-Acceptance (USA) and Unconditional Other-Acceptance (UOA)",
        "High Frustration Tolerance (HFT) training for everyday emotional resilience"
      ],
      idealFor: "Perfectionism, anger management, chronic guilt, relationship distress, and self-worth crises."
    },
    {
      id: "act",
      title: "Acceptance and Commitment Therapy (ACT)",
      acronym: "ACT",
      badge: "Mindfulness & Psychological Flexibility",
      description:
        "ACT moves away from fighting or trying to suppress unpleasant thoughts. Instead, it fosters psychological flexibility—learning to accept inner sensations while taking value-guided actions in reality.",
      mechanisms: [
        "Cognitive Defusion: Learning to observe thoughts as passing words rather than absolute truths",
        "Experiential Acceptance: Dropping the struggle with anxiety or sadness instead of fleeing into numbing",
        "Present-Moment Awareness: Contact with the here-and-now through grounded mindfulness",
        "Values Clarification & Committed Action: Living according to deeply held personal priorities"
      ],
      idealFor: "Treatment-resistant anxiety, chronic pain, grief, existential dilemmas, and emotional burnout."
    },
    {
      id: "dbt-skills",
      title: "Dialectical Behavior Therapy (DBT) Skills",
      acronym: "DBT Skills",
      badge: "Crisis Survival & Emotion Regulation",
      description:
        "DBT balances radical acceptance of reality with the necessity for behavioral change. It is intensely practical, offering concrete behavioral formulas for emotional storms and interpersonal boundaries.",
      mechanisms: [
        "Distress Tolerance & TIPP skills (Temperature, Intense exercise, Paced breathing, Paired muscle relaxation)",
        "Emotion Regulation: Identifying emotional vulnerability and practicing 'Opposite Action'",
        "Interpersonal Effectiveness: The DEAR MAN assertion framework for boundary setting without guilt",
        "Radical Acceptance: Acknowledging reality as it is without compounding suffering through resistance"
      ],
      idealFor: "Severe mood swings, impulsive behaviors, border-pattern emotional crises, and intense interpersonal conflict."
    },
    {
      id: "integrated",
      title: "Integrated Humanistic & Person-Centered Psychotherapy",
      acronym: "Integrative",
      badge: "Holistic & Relational",
      description:
        "Human beings are far too nuanced for rigid manuals. Integrated therapy weaves existential meaning, attachment awareness, and empathetic listening into a customized therapeutic container.",
      mechanisms: [
        "Unconditional positive regard and deep relational safety",
        "Existential exploration of life purpose, aging, and personal autonomy",
        "Trauma-informed pace honoring personal readiness and emotional bandwidth",
        "Collaborative synthesis combining psychotherapy with medical psychiatry when indicated"
      ],
      idealFor: "Life transitions, identity consolidation, existential loss, and holistic personal growth."
    }
  ];

  return (
    <main className="relative min-h-screen bg-[#F7F3EA] text-[#1D2A3A]">
      <Navbar onOpenBooking={() => openBooking("in-person")} />

      {/* Hero Header - Color 1 (#F7F3EA) */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-[#F7F3EA] border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Heading & Introduction */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2D5A47]" />
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#2D5A47] uppercase">
                  SCIENTIFIC PSYCHOTHERAPY AT MANAM
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#162534] font-normal leading-[1.1]">
                Therapy is Not Just Talking. It is Rewiring.
              </h1>

              <p className="text-base sm:text-lg text-[#4B5A6A] font-light leading-relaxed">
                Psychotherapy is a structured, clinical process of understanding cognitive loops, processing emotional wounds, and building enduring behavioral resilience. Dr. Bhoomi Raval integrates medical psychiatric insight with evidence-based psychotherapy.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => openBooking("in-person")}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#536374] hover:bg-[#3F4F60] text-white text-sm font-medium tracking-wide shadow-sm transition-all"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-semibold shadow-sm transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>

            {/* Right Column: Psychotherapy Setting Visual */}
            <div className="lg:col-span-5">
              <div className="relative aspect-4/3 w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#DDD4C5] shadow-md bg-[#ECE4D7]">
                <Image
                  src="/assets/psychotherapy_hero.webp"
                  alt="Safe, confidential psychotherapy consultation setting at MANAM"
                  fill
                  priority
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#FAF7F2]/95 backdrop-blur-xs border border-[#E0D8CA] text-xs text-[#354556] shadow-xs flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-[#2D5A47] block mb-0.5">Therapeutic Setting:</span>
                    <span className="text-[#58697A]">Confidential, non-judgmental holding space</span>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#EAE2D3] text-[#2D5A47] font-semibold text-[11px] shrink-0">
                    100% Private
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Eclectic & Integrated Psychotherapy? - Color (#FAF7F2) */}
      <section className="py-20 md:py-28 bg-[#FAF7F2] border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div>
                <span className="text-xs font-semibold tracking-[0.2em] text-[#2D5A47] uppercase block mb-2.5">
                  THE MANAM PHILOSOPHY
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#162534] font-normal tracking-tight leading-[1.15]">
                  What is Eclectic &amp; Integrated Psychotherapy?
                </h2>
                <h3 className="text-xl sm:text-2xl font-serif text-[#2D5A47] font-normal italic mt-3">
                  One person. Not one formula.
                </h3>
              </div>

              <p className="text-base sm:text-lg text-[#4A5969] font-light leading-relaxed">
                People are different. Their difficulties, personalities, life experiences, relationships and ways of coping are different too.
              </p>

              {/* Two Concept Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-5 rounded-2xl bg-[#F4EFE6]/70 border border-[#E3DCCF] space-y-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#2D5A47]/10 text-[#2D5A47] text-xs font-semibold uppercase tracking-wider">
                    Approach 01
                  </span>
                  <p className="text-sm text-[#3E4F61] leading-relaxed">
                    <strong className="text-[#162534] font-semibold">Eclectic psychotherapy</strong> means drawing from more than one therapeutic approach and selecting the techniques that are most relevant to the person&apos;s needs, rather than rigidly following a single school of therapy.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#F4EFE6]/70 border border-[#E3DCCF] space-y-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#2D5A47]/10 text-[#2D5A47] text-xs font-semibold uppercase tracking-wider">
                    Approach 02
                  </span>
                  <p className="text-sm text-[#3E4F61] leading-relaxed">
                    <strong className="text-[#162534] font-semibold">Integrated psychotherapy</strong> goes a step further by thoughtfully bringing together concepts and methods from different therapeutic approaches into a coherent treatment process.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-2 text-[#4A5969] text-base leading-relaxed font-light">
                <p>
                  At MANAM, this means therapy is not about fitting a person into a particular therapy model.
                </p>

                <div className="p-5 sm:p-6 rounded-2xl bg-[#F0EAE0] border-l-4 border-[#2D5A47]">
                  <p className="font-serif text-lg sm:text-xl text-[#182736] leading-snug">
                    It is about understanding the person first &mdash; and then deciding <strong className="font-semibold text-[#2D5A47]">what may be most helpful for them.</strong>
                  </p>
                </div>

                <p>
                  The therapeutic approach may evolve as therapy progresses. Some people may benefit from working primarily with thoughts and behaviours; others may need to explore relationships, emotions, patterns of coping, identity or deeper questions about meaning and purpose.
                </p>

                <p className="font-medium text-[#293B4D] pt-1">
                  The goal is not simply to make someone feel better temporarily, but to help them develop greater understanding, healthier patterns and meaningful, sustainable change.
                </p>
              </div>
            </motion.div>

            {/* Right Visual Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 lg:sticky lg:top-28"
            >
              <div className="relative aspect-4/3 w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#DDD4C5] shadow-lg bg-[#ECE4D7]">
                <Image
                  src="/assets/eclectic_integrated_psychotherapy.webp"
                  alt="Eclectic and Integrated Psychotherapy consultation setting at MANAM"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#FAF7F2]/95 backdrop-blur-xs border border-[#E0D8CA] text-xs shadow-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#2D5A47]" />
                    <span className="font-semibold text-[#2D5A47] uppercase tracking-wider text-[11px]">
                      Personalized Care
                    </span>
                  </div>
                  <p className="text-[#4A5969] leading-relaxed">
                    Tailored evidence-based modalities shaped around your individuality, goals, and pace of healing.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Therapeutic Modalities Breakdown - Color 2 (#ECE4D7) */}
      <section className="py-20 md:py-28 bg-[#ECE4D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#2D5A47] uppercase block mb-2">
              MODALITIES & FRAMEWORKS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#162534] font-normal">
              Evidence-Based Therapeutic Approaches
            </h2>
            <p className="text-sm sm:text-base text-[#526171] mt-2 font-light max-w-2xl">
              We do not force you into a pre-packaged manual. The modality is chosen based on your unique presentation, clinical diagnosis, and personal goals.
            </p>
          </div>

          <div className="space-y-10">
            {modalities.map((mod, mIdx) => (
              <motion.div
                key={mod.id}
                id={mod.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: mIdx * 0.05 }}
                className="rounded-3xl bg-[#FAF7F2] border border-[#DDD4C5] p-6 sm:p-10 lg:p-12 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#2D5A47]/10 text-[#2D5A47] border border-[#2D5A47]/20">
                        {mod.acronym}
                      </span>
                      <span className="text-xs font-medium text-[#708090]">
                        {mod.badge}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-[#162534] font-medium leading-snug">
                      {mod.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#4C5B6B] font-light leading-relaxed">
                      {mod.description}
                    </p>

                    <div className="pt-2">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2D5A47] mb-3 flex items-center gap-1.5">
                        <Compass className="w-4 h-4 text-[#2D5A47]" />
                        <span>Core Therapeutic Mechanisms</span>
                      </h4>
                      <ul className="space-y-2">
                        {mod.mechanisms.map((mech, mechIdx) => (
                          <li key={mechIdx} className="text-xs sm:text-sm text-[#4E5D6D] flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A47] shrink-0 mt-2" />
                            <span>{mech}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-[#F3EDE2] rounded-2xl p-6 sm:p-8 border border-[#DFD7CA] flex flex-col justify-between h-full space-y-5">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#162534] pb-3 border-b border-[#D8CFC0]">
                        <CheckCircle2 className="w-4 h-4 text-[#2D5A47]" />
                        <span>Clinical Indications</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#405060] font-light leading-relaxed mt-4">
                        <strong className="font-medium text-[#162534]">Particularly effective for: </strong>
                        {mod.idealFor}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#D8CFC0]">
                      <button
                        onClick={() => openBooking("in-person")}
                        className="w-full py-2.5 rounded-xl bg-[#536374] hover:bg-[#3F4F60] text-white text-xs font-semibold transition-all text-center"
                      >
                        Book Consultation
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The 4-Phase Therapy Process - Color 1 (#F7F3EA) */}
      <section className="py-20 md:py-28 bg-[#F7F3EA] border-t border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#2D5A47] uppercase block mb-2">
              THE THERAPEUTIC JOURNEY
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#162534] font-normal">
              What to Expect From Start to Finish
            </h2>
            <p className="text-sm sm:text-base text-[#526171] mt-2 font-light">
              Therapy has a defined arc. You are never kept in open-ended ambiguity; progress is measured and reviewed transparently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                phase: "Phase 01",
                title: "Safe Intake & Case Formulation",
                desc: "The initial 1–2 sessions focus on establishing unconditional trust, understanding your history, and creating a shared diagnostic formulation of your unhelpful patterns."
              },
              {
                phase: "Phase 02",
                title: "Cognitive Skill Building",
                desc: "You are equipped with practical cognitive tools, thought records, and somatic relaxation frameworks. You begin recognizing triggers in real time."
              },
              {
                phase: "Phase 03",
                title: "Active Processing & Exposure",
                desc: "We gently challenge deep-rooted irrational beliefs, conduct behavioral experiments, and break cycles of avoidance or emotional paralysis."
              },
              {
                phase: "Phase 04",
                title: "Autonomy & Relapse Prevention",
                desc: "Sessions are spaced out as you step into being your own therapist. We draft an individualized relapse prevention blueprint for lasting life wellness."
              }
            ].map((card, cIdx) => (
              <div
                key={card.phase}
                className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E3DDCF] shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#2D5A47] block mb-2">
                    {card.phase}
                  </span>
                  <h3 className="font-serif text-lg font-medium text-[#162534] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#506070] font-light leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Therapy Ethics & Confidentiality - Color 2 (#ECE4D7) */}
      <section className="py-20 md:py-28 bg-[#ECE4D7] border-t border-[#DDD4C5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#FAF7F2] border border-[#DDD4C5] p-8 sm:p-12 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#2D5A47]/10 flex items-center justify-center text-[#2D5A47]">
                <Lock className="w-5 h-5 text-[#2D5A47]" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#2D5A47]">
                  CLINICAL INTEGRITY
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#162534] font-medium">
                  Strict Confidentiality & Medical Ethics
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#4D5D6E] font-light leading-relaxed mb-6">
              Everything shared within the consultation room or video session is protected under doctor-patient confidentiality. Dr. Bhoomi adheres to the highest ethical and medical standards established by the National Medical Commission (NMC) and the Indian Psychiatric Society (IPS).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#EAE3D6] text-xs text-[#526272]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A47] shrink-0" />
                <span>Zero judgment, 100% safe holding space</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A47] shrink-0" />
                <span>No family disclosures without consent</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A47] shrink-0" />
                <span>Standardized 45–50 min structured sessions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA Banner - Color 1 (#F7F3EA) */}
      <section className="py-20 bg-[#F7F3EA] border-t border-[#E8E2D5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#2D5A47] uppercase block mb-3">
            BEGIN YOUR SESSIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#162534] mb-4">
            You don&apos;t have to arrive with all the answers.
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-[#536373] max-w-xl mx-auto mb-8">
            &ldquo;You can simply come with what you are experiencing. We can understand the rest together.&rdquo;
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openBooking("in-person")}
              className="px-7 py-3.5 rounded-xl bg-[#536374] hover:bg-[#3F4F60] text-white text-sm font-medium tracking-wide shadow-sm transition-all"
            >
              Schedule a Psychotherapy Session
            </button>
            <Link
              href="/gallery"
              className="px-6 py-3.5 rounded-xl border border-[#DDD5C7] text-sm font-medium text-[#4D5D6E] bg-[#FAF7F2] hover:bg-[#F3EDE2] transition-all"
            >
              Explore Webinar & Workshop Gallery →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
