"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  HeartHandshake, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  Sparkles, 
  AlertCircle,
  ShieldCheck,
  Brain,
  Activity,
  Users,
  Moon,
  Flame,
  Smartphone,
  Layers,
  HeartPulse
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBooking } from "@/context/BookingContext";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { getWhatsAppUrl } from "@/components/BookingModal";

export default function ConditionsPage() {
  const { openBooking } = useBooking();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Concerns" },
    { id: "mood", label: "Mood & Depression" },
    { id: "anxiety", label: "Anxiety & OCD" },
    { id: "neuropsych", label: "Headaches & Neurocognitive" },
    { id: "adolescent", label: "Youth & Digital" },
    { id: "addiction", label: "Addiction & Somatic" }
  ];

  const conditionsList = [
    {
      id: "anxiety-panic",
      category: "anxiety",
      title: "Anxiety, Phobias & Panic Attacks",
      subtitle: "Persistent fear, uncontrollable worry, and acute somatic panic attacks",
      overview:
        "While anxiety is a natural human reaction to stress, anxiety disorders involve excessive, irrational, and persistent worry that disrupts daily living. This frequently manifests with profound physical sensations.",
      signs: [
        "Palpitations, racing heartbeat, chest tightness, or shortness of breath",
        "Sudden, intense episodes of panic with a feeling of impending doom",
        "Excessive worrying about health, family, finances, or routine responsibilities",
        "Avoidance of crowded places, public speaking, or social situations (social anxiety)",
        "Restlessness, feeling on edge, muscle tension, and difficulty concentrating"
      ],
      howWeHelp:
        "Comprehensive clinical assessment to rule out underlying medical issues (thyroid, cardiac), tailored psychopharmacology to calm autonomic arousal, and evidence-based Cognitive Behavioral Therapy (CBT) and exposure techniques."
    },
    {
      id: "depression-mood",
      category: "mood",
      title: "Depression & Mood Disorders",
      subtitle: "Major Depressive Disorder, persistent sadness, anhedonia & mood instability",
      overview:
        "Depression is not merely feeling sad or 'low' for a day. It is a biological and emotional medical disorder that profoundly drains energy, joy, optimism, and cognitive drive.",
      signs: [
        "Persistent feelings of sadness, emptiness, hopelessness, or worthlessness",
        "Loss of interest or pleasure in activities once thoroughly enjoyed (anhedonia)",
        "Chronic fatigue, sluggishness, or conversely psychomotor agitation",
        "Insomnia, waking early in the morning, or excessive daytime sleeping",
        "Changes in appetite or weight, brain fog, and recurring thoughts of self-harm or despair"
      ],
      howWeHelp:
        "Safe, modern antidepressant therapy to restore neurochemical equilibrium, combined with behavioral activation, cognitive restructuring, and supportive psychotherapy."
    },
    {
      id: "ocd",
      category: "anxiety",
      title: "Obsessive-Compulsive Disorder (OCD)",
      subtitle: "Intrusive distressing thoughts paired with repetitive compulsive behaviors or rituals",
      overview:
        "OCD involves unwanted, distressing thoughts, images, or urges (obsessions) that trigger intense anxiety, which the person attempts to neutralize through repetitive mental or physical actions (compulsions).",
      signs: [
        "Excessive fear of contamination, germs, chemicals, or dirt",
        "Repetitive checking (door locks, stoves, switches, documents, emails)",
        "Need for symmetry, exactness, order, or precise arrangement of objects",
        "Intrusive taboo, aggressive, blasphemous, or sexual thoughts that cause deep shame",
        "Mental rituals (counting, silent prayers, replaying phrases) to ward off catastrophic outcomes"
      ],
      howWeHelp:
        "High-dose serotonergic pharmacotherapy, alongside Exposure and Response Prevention (ERP)—the gold standard psychotherapy for breaking the OCD cycle."
    },
    {
      id: "bipolar",
      category: "mood",
      title: "Bipolar Affective Disorder",
      subtitle: "Fluctuations between severe depressive lows and manic or hypomanic highs",
      overview:
        "Bipolar disorder involves marked shifts in mood, energy, and activity levels. Episodes of clinical depression alternate with periods of mania or hypomania (elevated, energized, irritable mood).",
      signs: [
        "Manic phases: Grandiose self-confidence, drastically reduced need for sleep (e.g. 2 hours)",
        "Pressured rapid speech, racing thoughts, jumping rapidly between ideas",
        "Impulsive spending, reckless driving, risky investments, or uncharacteristic behavior",
        "Depressive phases: Severe lethargy, crying spells, withdrawal, and intense helplessness",
        "Rapid cycling or mixed episodes where excitement and severe despair co-exist"
      ],
      howWeHelp:
        "Careful mood-stabilizing medication regimens (Lithium, mood-stabilizing anticonvulsants, modern atypicals), sleep hygiene frameworks, and family psychoeducation for early relapse detection."
    },
    {
      id: "headaches-migraines",
      category: "neuropsych",
      title: "Headaches & Migraine-Related Neuropsychiatric Concerns",
      subtitle: "Chronic tension headaches and migraines driven or amplified by emotional stress",
      overview:
        "The brain and emotional nervous system are inextricably intertwined. Chronic migraines and daily headaches frequently have deep neurochemical and emotional contributors including chronic stress, anxiety, and sleep debt.",
      signs: [
        "Recurrent unilateral throbbing headaches accompanied by nausea and light sensitivity",
        "Chronic daily tension headaches that worsen during interpersonal or professional stress",
        "Headaches resistant to standard over-the-counter painkillers or showing analgesic overuse",
        "Co-existing severe anxiety, irritability, depression, or sleep disturbances",
        "Stress-induced somatic amplification where anxiety lowers the pain threshold"
      ],
      howWeHelp:
        "Neuropsychiatric preventive pharmacotherapy (neuromodulators that manage both migraine pathways and mood circuitry), sleep regularization, and bio-behavioral relaxation techniques."
    },
    {
      id: "geriatric-dementia",
      category: "neuropsych",
      title: "Geriatric Mental Health & Dementia-Related Concerns",
      subtitle: "Memory difficulties, cognitive decline, behavioral changes & late-life depression",
      overview:
        "Aging brings unique neurological, biochemical, and psychosocial challenges. Older adults frequently experience cognitive decline, confusion, or late-life mood disorders that require compassionate, specialized medical care.",
      signs: [
        "Progressive short-term memory loss (forgetting recent events, misplacing items repeatedly)",
        "Disorientation to time, date, or familiar surroundings",
        "Uncharacteristic suspicion, paranoia, agitation, or night-time wandering (sundowning)",
        "Late-life depression presenting as memory complaints (pseudo-dementia) or social withdrawal",
        "Caregiver exhaustion and distress in managing changing parental behaviors"
      ],
      howWeHelp:
        "Neurocognitive assessment, gentle anti-dementia and behavioral stabilization medication with low anticholinergic side effects, environmental adaptation guidance, and dedicated caregiver counseling."
    },
    {
      id: "psychosis-schizophrenia",
      category: "neuropsych",
      title: "Psychosis & Schizophrenia Spectrum",
      subtitle: "Hallucinations, delusions, disorganized thinking & loss of touch with reality",
      overview:
        "Psychotic conditions involve altered perceptions and beliefs. Experiences such as hearing voices or holding firm unusual beliefs can be terrifying for the patient and deeply distressing for family members.",
      signs: [
        "Auditory hallucinations (hearing voices speaking, commenting, or commanding when alone)",
        "Persecutory or referential delusions (believing oneself is spied on, followed, or targeted)",
        "Marked withdrawal from hygiene, self-care, work, and interpersonal contact",
        "Disorganized speech, sudden emotional flattening, or inappropriate reactions",
        "Unprovoked suspicion, intense fear, or odd behavioral rituals"
      ],
      howWeHelp:
        "Early psychiatric intervention, modern atypical antipsychotic therapy with minimal sedation, metabolic monitoring, and structured psychoeducation to foster long-term functional rehabilitation."
    },
    {
      id: "trauma-ptsd",
      category: "anxiety",
      title: "Trauma-Related Concerns & PTSD",
      subtitle: "Emotional, mental, and bodily aftermath of overwhelming, traumatic life events",
      overview:
        "Traumatic events (accidents, abuse, sudden bereavement, medical crises) can overwhelm the nervous system's capacity to integrate memories, leaving the individual in a prolonged state of perceived danger.",
      signs: [
        "Involuntary, intrusive flashbacks, distressing nightmares, or vivid memories of the trauma",
        "Persistent physiological hyperarousal, being easily startled, or feeling constantly on guard",
        "Active avoidance of places, conversations, people, or thoughts connected to the event",
        "Emotional detachment, numbness, inability to feel love or joy, and chronic guilt",
        "Sudden emotional flooding or severe anxiety triggered by sensory reminders"
      ],
      howWeHelp:
        "Trauma-informed psychiatric evaluation, pharmacological stabilization of hyperarousal and sleep architecture, and integrated trauma-focused psychotherapy."
    },
    {
      id: "sleep-insomnia",
      category: "anxiety",
      title: "Sleep-Wake & Insomnia Concerns",
      subtitle: "Chronic difficulty initiating, maintaining sleep, or non-restorative sleep patterns",
      overview:
        "Sleep is the biological anchor of mental health. Chronic sleep difficulties are rarely isolated; they are almost universally linked to anxiety, depression, circadian dysregulation, or hyperarousal.",
      signs: [
        "Lying awake for hours tossing and turning despite severe physical exhaustion",
        "Waking up repeatedly during the night or waking hours before the alarm with racing thoughts",
        "Severe daytime fatigue, irritability, cognitive sluggishness, and poor focus",
        "Anxiety focused specifically on sleep ('Will I be able to sleep tonight?')",
        "Unhealthy dependence on self-prescribed sleeping aids or alcohol to induce sleep"
      ],
      howWeHelp:
        "Cognitive Behavioral Therapy for Insomnia (CBT-I), structured circadian resetting, and non-addictive psychiatric sleep regulation when indicated."
    },
    {
      id: "somatic-symptoms",
      category: "addiction",
      title: "Somatic Symptom & Functional Concerns",
      subtitle: "Severe physical distress (gastric, bodily pain, tremors) linked to psychological factors",
      overview:
        "When the mind is under prolonged strain, the body speaks. Somatic symptom concerns involve genuine, distressing physical symptoms for which standard medical workups reveal no physical structural abnormality.",
      signs: [
        "Chronic bodily aches, fatigue, dizziness, or gastrointestinal distress (IBS)",
        "Persistent tremors, numbness, or fainting-like episodes linked to emotional triggers",
        "Intense health anxiety and catastrophic fears ('Doctors are missing a deadly illness')",
        "Frustration after normal scans, blood tests, and visits to multiple medical specialists",
        "Physical symptoms that intensify noticeably during relationship or work crises"
      ],
      howWeHelp:
        "Empathetic clinical validation (affirming that the pain is real), neurochemical stabilization of central pain amplification, and psychoeducation connecting gut-brain and nerve-emotion axes."
    },
    {
      id: "adolescent-mental-health",
      category: "adolescent",
      title: "Adolescent Mental Health & Academic Stress",
      subtitle: "Exam anxiety, identity struggles, behavioral rebellion & adolescent emotional crises",
      overview:
        "Teenagers and young adults experience intense neurodevelopmental remodeling. Academic expectations, digital immersion, and peer dynamics can trigger severe mood and behavioral shifts.",
      signs: [
        "Severe resistance or refusal to attend school, coaching, or college classes",
        "Explosive anger, door slamming, chronic irritability, or severe emotional lability",
        "Drastic withdrawal into solitary bedrooms and refusal to communicate with family",
        "Excessive perfectionism or severe panic around board exams and competitive entrance tests",
        "Self-injurious behaviors (superficial cutting, burning) used as maladaptive emotion regulation"
      ],
      howWeHelp:
        "Adolescent-friendly confidential communication, family therapy and parental coaching, stress resilience training, and gentle medical management when appropriate."
    },
    {
      id: "digital-dependency",
      category: "adolescent",
      title: "Internet & Digital Dependency Concerns",
      subtitle: "Problematic gaming, compulsive social media use & dopamine exhaustion",
      overview:
        "Modern algorithms are engineered to stimulate compulsive engagement. Uncontrolled digital consumption frequently masks underlying social isolation, untreated ADHD, anxiety, or low self-esteem.",
      signs: [
        "Inability to limit screen time despite repeated personal attempts and family conflict",
        "Violent irritability, hostility, or despair when digital devices are restricted",
        "Severe degradation of sleep schedule (staying awake until 3–4 AM scrolling or gaming)",
        "Neglect of academic responsibilities, real-world social bonds, and physical health",
        "Experiencing real-world existence as dull, grey, and unstimulating compared to screens"
      ],
      howWeHelp:
        "Assessment of underlying psychiatric triggers (ADHD, social phobia, depression), dopamine resetting frameworks, structured behavioral contracts, and family counseling."
    },
    {
      id: "substance-dependence",
      category: "addiction",
      title: "Substance Use & Chemical Dependence",
      subtitle: "Alcohol, nicotine, prescription sedatives & cannabis dependency",
      overview:
        "Substance use disorders involve neurochemical rewiring of the brain's reward and stress circuits. Patients require compassionate medical detoxification, anti-craving medications, and psychological rehabilitation.",
      signs: [
        "Drinking or using substances earlier in the day or in secrecy",
        "Failed attempts to cut down or control the amount consumed",
        "Tremors, nausea, sweating, or severe anxiety upon waking before the first intake",
        "Continuing use despite clear medical warnings, financial damage, or strained relationships",
        "Using substances as the primary tool to suppress sadness, anger, or sleep difficulties"
      ],
      howWeHelp:
        "Confidential outpatient medical detoxification, anti-craving pharmacological therapy, treatment of underlying dual-diagnosis psychiatric illness, and relapse prevention counseling."
    }
  ];

  const filteredConditions =
    selectedCategory === "all"
      ? conditionsList
      : conditionsList.filter((c) => c.category === selectedCategory);

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
                CLINICAL DOMAINS & CONCERNS
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#162534] font-normal leading-[1.1] mb-6">
              Concerns We Can Help You Understand
            </h1>

            <p className="text-base sm:text-lg text-[#4B5A6A] font-light leading-relaxed mb-8">
              You do not need to diagnose yourself before reaching out. Symptoms are simply your mind and body&apos;s way of signaling that something needs care. Explore common clinical conditions below to learn how we evaluate and treat them.
            </p>

            {/* Filter category pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-[#2D5A47] text-white shadow-xs"
                      : "bg-[#FAF7F2] text-[#4F5E6E] border border-[#DDD5C7] hover:border-[#2D5A47]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conditions Grid Section - Color 2 (#ECE4D7) */}
      <section className="py-20 md:py-28 bg-[#ECE4D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#2D5A47] uppercase block mb-1">
                DETAILED CLINICAL OVERVIEWS
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#162534] font-normal">
                Showing {filteredConditions.length} Clinical Concerns
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5B6B7C]">
              Click any card to discuss specific symptoms during consultation
            </p>
          </div>

          <div className="space-y-8">
            {filteredConditions.map((item, idx) => (
              <motion.div
                key={item.id}
                id={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
                className="rounded-3xl bg-[#FAF7F2] border border-[#DDD4C5] p-6 sm:p-8 lg:p-10 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#2D5A47]" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#6A7B8C]">
                        {item.subtitle}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-[#162534] font-medium leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#4C5C6C] font-light leading-relaxed">
                      {item.overview}
                    </p>

                    <div className="pt-2">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2D5A47] mb-3 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-[#2D5A47]" />
                        <span>Common Manifestations & Warning Signs</span>
                      </h4>
                      <ul className="space-y-2">
                        {item.signs.map((sign, sIdx) => (
                          <li key={sIdx} className="text-xs sm:text-sm text-[#4F5F6F] flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A47] shrink-0 mt-2" />
                            <span>{sign}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: How We Help Box */}
                  <div className="lg:col-span-5 bg-[#F3EDE2] rounded-2xl p-6 sm:p-8 border border-[#DFD7CA] flex flex-col justify-between h-full space-y-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#162534] pb-3 border-b border-[#D8CFC0]">
                        <HeartPulse className="w-4 h-4 text-[#2D5A47]" />
                        <span>How Psychiatric Care Helps</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#405060] font-light leading-relaxed mt-4">
                        {item.howWeHelp}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#D8CFC0] flex items-center justify-between">
                      <button
                        onClick={() => openBooking("in-person")}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-[#2D5A47] hover:text-[#18392C] transition-colors"
                      >
                        <span>Schedule an assessment</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[11px] text-[#7A8A9A]">
                        Strictly Confidential
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Self-Reflection Guide - Color 1 (#F7F3EA) */}
      <section className="py-20 md:py-28 bg-[#F7F3EA] border-t border-[#E8E2D5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#2D5A47] uppercase block mb-2">
              SELF-ASSESSMENT CLARITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#162534] font-normal">
              When Is It Time to Consult a Psychiatrist?
            </h2>
            <p className="text-sm sm:text-base text-[#526171] mt-2 font-light max-w-2xl mx-auto">
              You do not need to be in severe distress to seek help. An early consultation can prevent symptoms from compounding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Persistent Duration (≥ 2 Weeks)",
                desc: "When emotional distress, sorrow, anxiety, or numbness lasts more than 2 consecutive weeks without naturally resolving."
              },
              {
                title: "Functional Impairment",
                desc: "When difficulties begin interfering with your ability to study, perform at work, care for children, or maintain friendships."
              },
              {
                title: "Physical Disruption",
                desc: "When severe changes in your sleep patterns, chronic somatic headaches, severe appetite loss, or panic attacks take a physical toll."
              },
              {
                title: "Feeling Overwhelmed or Stuck",
                desc: "When self-help, positive thinking, or advice from friends feels exhausted, and you need medical insight and evidence-based guidance."
              }
            ].map((box, bIdx) => (
              <div
                key={bIdx}
                className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E2DCCE] shadow-2xs"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded-full bg-[#2D5A47]/10 flex items-center justify-center text-[#2D5A47] text-xs font-bold">
                    ✓
                  </span>
                  <h3 className="font-serif text-lg text-[#162534] font-medium">
                    {box.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#4E5E6E] font-light leading-relaxed pl-7">
                  {box.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions FAQs - Color 2 (#ECE4D7) */}
      <section className="py-20 md:py-28 bg-[#ECE4D7] border-t border-[#DDD4C5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#2D5A47] uppercase block mb-2">
              FREQUENT QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#162534] font-normal">
              Understanding Psychiatric Diagnoses
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#DDD4C5]">
              <h3 className="font-serif text-lg text-[#162534] font-medium mb-2">
                Does having a psychiatric diagnosis define who I am?
              </h3>
              <p className="text-sm text-[#4E5D6D] font-light leading-relaxed">
                Never. In modern clinical psychiatry, a diagnosis is simply a medical roadmap—a scientific language that helps us identify which neurochemical, behavioral, and psychotherapeutic treatments will bring you the fastest, most enduring relief. You are always a person first, never a label.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#DDD4C5]">
              <h3 className="font-serif text-lg text-[#162534] font-medium mb-2">
                Can mental health conditions recur, and how do we prevent it?
              </h3>
              <p className="text-sm text-[#4E5D6D] font-light leading-relaxed">
                Like hypertension or asthma, some individuals have higher biological vulnerability to recurrent mood or anxiety episodes. However, with appropriate initial treatment duration, gradual tapering protocols, and CBT cognitive tools, the risk of recurrence is dramatically lowered.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#DDD4C5]">
              <h3 className="font-serif text-lg text-[#162534] font-medium mb-2">
                What if my family doesn&apos;t believe in mental health?
              </h3>
              <p className="text-sm text-[#4E5D6D] font-light leading-relaxed">
                Stigma often stems from a lack of neurobiological literacy. Dr. Bhoomi routinely conducts supportive family psychoeducation sessions where the medical reality of psychiatric illness is explained with warmth, empathy, and scientific clarity, turning skepticism into family support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA Banner - Color 1 (#F7F3EA) */}
      <section className="py-20 bg-[#F7F3EA] border-t border-[#E8E2D5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#2D5A47] uppercase block mb-3">
            TAKE THE FIRST STEP
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#162534] mb-4">
            Understanding begins with a conversation.
          </h2>
          <p className="text-base text-[#4E5C6C] font-light max-w-xl mx-auto mb-8">
            In-person consultations at Kotak Hospital, Rajkot and secure online video consultations available across India.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openBooking("in-person")}
              className="px-7 py-3.5 rounded-xl bg-[#536374] hover:bg-[#3F4F60] text-white text-sm font-medium tracking-wide shadow-sm transition-all"
            >
              Book an Assessment
            </button>
            <Link
              href="/psychotherapy"
              className="px-6 py-3.5 rounded-xl border border-[#DDD5C7] text-sm font-medium text-[#4D5D6E] bg-[#FAF7F2] hover:bg-[#F3EDE2] transition-all"
            >
              Explore Psychotherapy Approaches →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
