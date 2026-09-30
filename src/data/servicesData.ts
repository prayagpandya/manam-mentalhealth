export interface ServiceDetail {
  slug: string;
  num: string;
  title: string;
  shortTitle: string;
  tagline: string;
  category: string;
  image: string;
  altText: string;
  duration: string;
  format: string;
  supervision: string;
  summary: string;
  clinicalPhilosophy: string;
  keyHighlights: string[];
  graphicalImage: string;
  graphicalTitle: string;
  graphicalConcept: string;
  graphicalPoints: { label: string; text: string }[];
  indicationsTitle: string;
  indications: {
    title: string;
    description: string;
  }[];
  journeySteps: {
    step: string;
    title: string;
    description: string;
    duration: string;
  }[];
  whatToExpect: string[];
  faqs: {
    q: string;
    a: string;
  }[];
  nextSlug?: string;
  prevSlug?: string;
}

export const servicesData: ServiceDetail[] = [
  {
    slug: "consultation",
    num: "01",
    title: "Psychiatric Consultation & Assessment",
    shortTitle: "Psychiatric Consultation",
    tagline: "Comprehensive clinical diagnostic evaluation & individualized care plan",
    category: "Clinical Assessment",
    image: "/assets/service_consultation.webp",
    altText: "Doctor and patient in a warm, welcoming consultation room",
    duration: "45–60 mins (Initial) • 20–30 mins (Follow-up)",
    format: "In-Person (Rajkot) or Secure Online Video",
    supervision: "Dr. Bhoomi Raval, MD Psychiatry (Gold Medalist)",
    summary:
      "A psychiatric consultation goes far beyond a symptom checklist. It is an empathetic, confidential clinical conversation exploring your emotional state, thought patterns, medical history, family background, and current life stressors.",
    clinicalPhilosophy:
      "Mental health is deeply personal. We believe that true recovery starts with being heard without judgment. Our goal is to arrive at diagnostic clarity together and craft a sustainable, individualized treatment plan tailored to your biological, psychological, and social circumstances.",
    keyHighlights: [
      "Gold Medalist Psychiatric Diagnostics",
      "Confidential & Stigma-Free Space",
      "Collaborative Medication Choices",
      "Regular Progress & Recovery Monitoring"
    ],
    graphicalImage: "/assets/graphical_untangling_mind.webp",
    graphicalTitle: "From Emotional Overwhelm to Structured Clarity",
    graphicalConcept:
      "When experiencing mental distress, thoughts, worries, and physical tensions often feel like an overwhelming tangled knot. A thorough psychiatric evaluation methodically unravels these complex threads—distinguishing biological vulnerabilities, psychological stressors, and sleep disturbances to restore calm, peaceful cognitive flow.",
    graphicalPoints: [
      {
        label: "Identifying Triggers",
        text: "Distinguishing between situational life stressors and biological neurochemical vulnerabilities."
      },
      {
        label: "Mind-Body Dialogue",
        text: "Understanding how emotional anxiety directly creates physical muscle tension, rapid heartbeats, and fatigue."
      },
      {
        label: "Clear Recovery Blueprint",
        text: "Crafting a structured, step-by-step roadmap from confusion to emotional equilibrium and resilience."
      }
    ],
    indicationsTitle: "When should you consider a consultation?",
    indications: [
      {
        title: "Persistent Sadness or Emptiness",
        description: "Low mood, unexplained tearfulness, fatigue, or loss of pleasure in activities you once enjoyed lasting longer than two weeks."
      },
      {
        title: "Overwhelming Anxiety & Panic Attacks",
        description: "Constant worry, racing thoughts, restlessness, racing heartbeat, chest tightness, or fear of losing control."
      },
      {
        title: "Disrupted Sleep & Appetite Patterns",
        description: "Severe insomnia, waking up unrefreshed, frequent nightmares, or dramatic changes in eating habits."
      },
      {
        title: "Difficulty Coping with Daily Life",
        description: "Struggling to manage work, school, relationships, or family responsibilities due to emotional exhaustion or distress."
      },
      {
        title: "Second Opinion on Diagnoses or Medications",
        description: "Seeking expert review of existing psychiatric medications, persistent side effects, or clarifying an uncertain diagnosis."
      },
      {
        title: "Unusual Experiences or Intrusive Thoughts",
        description: "Distressing thoughts you cannot stop, obsessive urges, hearing voices, or feeling detached from reality."
      }
    ],
    journeySteps: [
      {
        step: "01",
        title: "Comprehensive Clinical Interview",
        description: "An in-depth exploration of your current challenges, medical history, sleep patterns, past treatments, and family dynamics.",
        duration: "Initial 45 mins"
      },
      {
        step: "02",
        title: "Mental Status Examination (MSE)",
        description: "Expert diagnostic evaluation of cognitive function, emotional affect, thought processes, and psychological resilience.",
        duration: "Same Session"
      },
      {
        step: "03",
        title: "Collaborative Care Formulation",
        description: "Discussing diagnostic impressions transparently. Deciding mutually whether care involves psychotherapy, lifestyle adjustments, medication, or a combination.",
        duration: "Same Session"
      },
      {
        step: "04",
        title: "Supervised Follow-Up & Titration",
        description: "Reviewing medication efficacy, monitoring improvements, fine-tuning dosages, and tracking your emotional well-being over time.",
        duration: "2–4 Weeks Later"
      }
    ],
    whatToExpect: [
      "A completely safe, quiet, and confidential clinical environment.",
      "Zero moral judgment or labeling—focus is purely on understanding what you're experiencing.",
      "Full explanation of any recommended medicine: why it is needed, expected timeline, and safety profile.",
      "Clear guidance for family members or caregivers accompanying you."
    ],
    faqs: [
      {
        q: "Do I need a doctor's referral to book a consultation?",
        a: "No, a referral is not required. You can book an appointment directly with Dr. Bhoomi Raval either at Kotak Hospital in Rajkot or via online video consultation."
      },
      {
        q: "Will I definitely be prescribed medication during my first visit?",
        a: "Not necessarily. Medication is prescribed only when clinically indicated. For mild to moderate concerns, psychotherapy, psychoeducation, and behavioral strategies may be the primary recommendation."
      },
      {
        q: "How should I prepare for my first appointment?",
        a: "Bring any previous medical or psychiatric records, prescription slips, and a brief mental note of when your symptoms began and any questions you'd like answered."
      },
      {
        q: "Can family members attend the session with me?",
        a: "Yes. Having a trusted family member can be very helpful for collateral history. With your consent, Dr. Bhoomi will also spend one-on-one time with you privately."
      }
    ],
    nextSlug: "psychotherapy",
    prevSlug: "ect"
  },
  {
    slug: "psychotherapy",
    num: "02",
    title: "Individual Psychotherapy & Counseling",
    shortTitle: "Psychotherapy & Counseling",
    tagline: "Tailored cognitive, emotional, and behavioral therapeutic modalities",
    category: "Therapy & Counseling",
    image: "/assets/service_psychotherapy.webp",
    altText: "Calm and peaceful psychotherapy counseling chairs beside a sunny window",
    duration: "50–60 mins per session",
    format: "In-Person (Rajkot) or Secure Online Video",
    supervision: "Dr. Bhoomi Raval (150+ Structured Psychotherapy Sessions Conducted)",
    summary:
      "Psychotherapy provides a structured, supportive space to explore thoughts, emotions, and behavioral patterns. With over 150 documented psychotherapy sessions, Dr. Bhoomi integrates evidence-based modalities like CBT and REBT to foster enduring personal resilience.",
    clinicalPhilosophy:
      "We view therapy as a collaborative partnership. Rather than offering superficial advice, we provide practical psychological tools that empower you to understand your mind, reframe rigid beliefs, and respond constructively to life's difficulties.",
    keyHighlights: [
      "Evidence-Based CBT & REBT Frameworks",
      "Goal-Oriented & Solution-Focused",
      "Practical Between-Session Exercises",
      "Safe, Confidential Processing Space"
    ],
    graphicalImage: "/assets/graphical_cbt_loop.webp",
    graphicalTitle: "The Cognitive-Behavioral Framework (Thoughts • Emotions • Actions)",
    graphicalConcept:
      "Psychological science demonstrates that our emotions and physical states are not caused directly by external events, but by our cognitive appraisals of those events. In therapy, we map the dynamic loop between Thoughts (Cognition), Feelings (Affect), and Behaviors (Action) to replace self-defeating loops with emotional freedom.",
    graphicalPoints: [
      {
        label: "Cognition (Thoughts)",
        text: "Identifying cognitive distortions such as catastrophic thinking, mind reading, and rigid 'musts/shoulds'."
      },
      {
        label: "Affect (Emotions)",
        text: "Building emotional awareness and distress tolerance rather than fighting or numbing difficult feelings."
      },
      {
        label: "Action (Behaviors)",
        text: "Active behavioral experiments, breaking avoidance habits, and testing constructive responses in daily life."
      }
    ],
    indicationsTitle: "Who can benefit from psychotherapy?",
    indications: [
      {
        title: "Recurrent Depression & Negative Self-Talk",
        description: "Breaking cycles of persistent self-criticism, worthlessness, rumination, and chronic emotional heaviness."
      },
      {
        title: "Anxiety, Phobias & Social Discomfort",
        description: "Overcoming debilitating performance anxiety, social fears, anticipatory dread, and generalized worry."
      },
      {
        title: "Relationship Difficulties & Boundary Issues",
        description: "Navigating interpersonal conflict, fear of abandonment, setting healthy emotional boundaries, and improving communication."
      },
      {
        title: "Emotional Regulation Difficulties",
        description: "Learning to identify emotional triggers and prevent sudden anger outbursts, emotional impulsivity, or shutting down."
      },
      {
        title: "Life Transitions & Grief Processing",
        description: "Processing major life upheavals, career shifts, bereavement, loss of loved ones, or identity crises."
      },
      {
        title: "Obsessive Thoughts & Compulsive Rituals",
        description: "Structured Exposure and Response Prevention (ERP) alongside cognitive restructuring for OCD symptoms."
      }
    ],
    journeySteps: [
      {
        step: "01",
        title: "Therapeutic Rapport & Case Formulation",
        description: "Establishing trust, identifying core problems, and mapping the cognitive connections between thoughts, feelings, and actions.",
        duration: "Sessions 1–2"
      },
      {
        step: "02",
        title: "Skill Acquisition & Cognitive Reframing",
        description: "Learning evidence-based techniques to challenge cognitive distortions, regulate emotional distress, and modify unhelpful behaviors.",
        duration: "Sessions 3–6"
      },
      {
        step: "03",
        title: "Behavioral Activation & Real-World Practice",
        description: "Implementing tailored between-session exercises, journaling, exposure tasks, and mindful self-awareness in daily life.",
        duration: "Sessions 7–10"
      },
      {
        step: "04",
        title: "Consolidation & Relapse Prevention",
        description: "Reviewing progress, reinforcing healthy coping mechanisms, and creating an individualized blueprint for lifelong resilience.",
        duration: "Closing Phase"
      }
    ],
    whatToExpect: [
      "A warm, confidential dialogue where your boundaries and pacing are respected.",
      "Practical, actionable takeaways rather than passive listening alone.",
      "Clear goal setting established collaboratively at the start of therapy.",
      "A non-judgmental space to express difficult thoughts and emotions openly."
    ],
    faqs: [
      {
        q: "How many psychotherapy sessions will I need?",
        a: "The duration depends on your goals and symptoms. Focused cognitive-behavioral therapy often shows meaningful progress within 8 to 12 sessions, though longer support is available for complex concerns."
      },
      {
        q: "Is therapy effective without taking psychiatric medication?",
        a: "Yes, for many mild to moderate conditions like situational anxiety, relationship stress, and mild depression, psychotherapy alone is highly effective. If biological symptoms are severe, therapy works best combined with medication."
      },
      {
        q: "Is everything I say in therapy strictly confidential?",
        a: "Absolutely. Strict medical and ethical confidentiality guidelines are upheld. Nothing shared in the room is disclosed without your explicit consent, except in rare emergencies involving immediate physical harm."
      }
    ],
    nextSlug: "adolescent",
    prevSlug: "consultation"
  },
  {
    slug: "adolescent",
    num: "03",
    title: "Adolescent Mental Health & Developmental Care",
    shortTitle: "Adolescent Mental Health",
    tagline: "Age-sensitive clinical guidance for teenagers, students & their families",
    category: "Child & Youth Care",
    image: "/assets/service_adolescent.webp",
    altText: "Warm, welcoming, non-intimidating adolescent counseling space",
    duration: "45–60 mins per session",
    format: "In-Person (Rajkot) or Secure Online Video",
    supervision: "Dr. Bhoomi Raval, MD Psychiatry",
    summary:
      "Adolescence is a profound developmental transition characterized by rapid neurobiological shifts and intense social pressures. Emotional difficulties often manifest as irritability, academic decline, or withdrawal rather than traditional adult symptoms.",
    clinicalPhilosophy:
      "Teenagers need to feel respected, understood, and heard rather than scrutinized. We provide a safe, non-judgmental bridge between adolescents and their families, addressing distress early before it impacts lifelong development.",
    keyHighlights: [
      "Teen-Friendly, Non-Intimidating Space",
      "Academic & Exam Stress Strategies",
      "Screen Time & Social Media Wellness",
      "Supportive Family & Parenting Guidance"
    ],
    graphicalImage: "/assets/graphical_nervous_system.webp",
    graphicalTitle: "Balancing the Developing Adolescent Nervous System",
    graphicalConcept:
      "The teenage brain is undergoing profound synaptic reorganization, with the limbic emotional center developing ahead of the prefrontal executive control cortex. Under chronic academic pressure and social comparison, youth often experience chronic sympathetic nervous system overload. We guide adolescents to restore parasympathetic calm and brain-body harmony.",
    graphicalPoints: [
      {
        label: "Sympathetic Stress Signals",
        text: "Understanding irritability, restlessness, and sudden mood swings as biological stress overload rather than rebellion."
      },
      {
        label: "Vagal & Somatic Regulation",
        text: "Practical breathing, sensory grounding, and physical movement techniques to regulate the nervous system."
      },
      {
        label: "Executive Function Coaching",
        text: "Structured tools to manage attention, prioritize schoolwork, and build digital wellness habits."
      }
    ],
    indicationsTitle: "Signs your teenager may need professional support:",
    indications: [
      {
        title: "Academic Decline & School Refusal",
        description: "Sudden drops in grades, chronic procrastination, paralyzing exam anxiety, or reluctance to attend classes."
      },
      {
        title: "Intense Irritability & Outbursts",
        description: "Extreme mood swings, defiance, intense anger, or persistent hostility that strains family relationships."
      },
      {
        title: "Social Withdrawal & Isolation",
        description: "Disconnecting from friends, spending hours locked in their room, quitting hobbies, and loss of enthusiasm."
      },
      {
        title: "Digital Addiction & Sleep Disruption",
        description: "Compulsive smartphone, gaming, or social media usage interfering with sleep cycles and physical well-being."
      },
      {
        title: "Self-Harm, Hopelessness, or Low Self-Worth",
        description: "Unexplained cuts or marks, expressions of wanting to disappear, or feelings of being an unbearable burden."
      },
      {
        title: "Suspected ADHD, Concentration Issues & Impulsivity",
        description: "Difficulty focusing, chronic forgetfulness, restlessness, or hyperactivity impacting school and social development."
      }
    ],
    journeySteps: [
      {
        step: "01",
        title: "Adolescent One-on-One Conversation",
        description: "A private, confidential discussion where the teen can speak freely without fear of parental reprimand.",
        duration: "First Half"
      },
      {
        step: "02",
        title: "Caregiver & Family Perspective",
        description: "Gathering developmental history, behavioral milestones, and home/school observations from parents.",
        duration: "Second Half"
      },
      {
        step: "03",
        title: "Developmental Assessment & Plan",
        description: "Formulating whether symptoms stem from emotional stress, neurodevelopmental factors (e.g. ADHD), or mood difficulties.",
        duration: "Same Session"
      },
      {
        step: "04",
        title: "Family Counseling & Skill Building",
        description: "Guiding parents on empathetic communication while equipping the teenager with emotional coping skills.",
        duration: "Ongoing"
      }
    ],
    whatToExpect: [
      "A compassionate, youthful, and non-judgmental clinical space.",
      "Clear confidentiality boundaries explained to both the adolescent and their parents.",
      "Practical coping toolkits for school, friendships, and home life.",
      "Collaborative parenting strategies that reduce household friction."
    ],
    faqs: [
      {
        q: "What if my teenager refuses to come to the clinic?",
        a: "It is very common for teenagers to feel defensive or apprehensive. Parents can begin by attending a collateral consultation to discuss their concerns and learn how to introduce mental healthcare gently."
      },
      {
        q: "Will you tell me everything my child says during the private session?",
        a: "To build necessary trust, private conversations remain confidential between Dr. Bhoomi and the teenager. However, key themes, progress, and any safety concerns are always communicated transparently with parents."
      },
      {
        q: "Are psychiatric medicines safe for teenagers?",
        a: "Yes, when strictly indicated and prescribed according to pediatric and adolescent clinical guidelines. Non-pharmacological approaches are always prioritized first whenever appropriate."
      }
    ],
    nextSlug: "womens-mental-health",
    prevSlug: "psychotherapy"
  },
  {
    slug: "womens-mental-health",
    num: "04",
    title: "Women's Mental Health & Perinatal Care",
    shortTitle: "Women's Mental Health",
    tagline: "Specialized care through hormonal, reproductive, and life transitions",
    category: "Specialized Psychiatry",
    image: "/assets/service_womens_mental.webp",
    altText: "Peaceful maternal and women's wellness sanctuary with soft natural light",
    duration: "45–60 mins per session",
    format: "In-Person (Rajkot) or Secure Online Video",
    supervision: "Dr. Bhoomi Raval, MD Psychiatry (Gold Medalist)",
    summary:
      "Women experience intricate neuroendocrine fluctuations across biological milestones—from adolescence to pregnancy, the postpartum period, and perimenopause. We provide specialized, empathetic care that honors the interplay between biology, psychology, and social roles.",
    clinicalPhilosophy:
      "A woman's emotional distress is never 'just hormones' or a personal flaw. We provide compassionate, evidence-based psychiatric support that empowers women to navigate motherhood, career, caregiving, and bodily transitions with strength and dignity.",
    keyHighlights: [
      "Perinatal & Postpartum Depression Care",
      "Medication Safety in Pregnancy & Breastfeeding",
      "Premenstrual Dysphoric Disorder (PMDD)",
      "Perimenopause Mood Support"
    ],
    graphicalImage: "/assets/graphical_untangling_mind.webp",
    graphicalTitle: "The Neuroendocrine & Emotional Axis in Women's Health",
    graphicalConcept:
      "Estrogen and progesterone are active neuromodulators that directly influence serotonergic, dopaminergic, and GABAergic neurotransmission. Shifting hormonal ratios during the luteal phase (PMDD), the postpartum transition, and perimenopause can trigger intense emotional turbulence. We untangle these biological shifts with safe medical guidance and empathetic psychological care.",
    graphicalPoints: [
      {
        label: "Hormonal Sensitivity",
        text: "Identifying individual neurochemical vulnerability to normal reproductive hormonal transitions."
      },
      {
        label: "Perinatal Safety Standards",
        text: "Evidence-based risk-benefit analysis of psychiatric medication during pregnancy planning and lactation."
      },
      {
        label: "Holistic Restorative Care",
        text: "Protecting maternal sleep hygiene, addressing caregiver depletion, and fostering strong domestic support."
      }
    ],
    indicationsTitle: "Key areas of clinical care for women:",
    indications: [
      {
        title: "Postpartum Depression & Perinatal Anxiety",
        description: "Intense sadness, panic, tearfulness, maternal guilt, difficulty bonding with the baby, or intrusive fears of harm following childbirth."
      },
      {
        title: "Pre-Pregnancy Psychiatric Planning",
        description: "Expert risk-benefit evaluation of psychiatric medications for women planning pregnancy or discovering an unexpected pregnancy."
      },
      {
        title: "Premenstrual Dysphoric Disorder (PMDD)",
        description: "Severe monthly depressive dips, irritability, rage, anxiety, or physical pain occurring in the luteal phase before menstruation."
      },
      {
        title: "Perimenopausal & Menopausal Mood Changes",
        description: "Emotional instability, brain fog, sudden anxiety, sleep disruption, and exhaustion accompanying hormonal shifts."
      },
      {
        title: "Caregiver Fatigue & Burnout",
        description: "Emotional and physical depletion from balancing multi-generational caregiving, household demands, and professional careers."
      },
      {
        title: "Trauma, Domestic Stress & Relationship Strain",
        description: "Confidential healing and therapeutic support for past interpersonal trauma, relationship distress, or life transitions."
      }
    ],
    journeySteps: [
      {
        step: "01",
        title: "Hormonal & Reproductive Timeline Review",
        description: "Mapping emotional symptoms alongside menstrual, obstetric, and reproductive milestones.",
        duration: "First 30 mins"
      },
      {
        step: "02",
        title: "Perinatal & Pharmacological Safety Check",
        description: "Evidence-based risk-benefit analysis regarding medication safety during pregnancy and lactation.",
        duration: "Same Session"
      },
      {
        step: "03",
        title: "Individualized Treatment Plan",
        description: "Combining medical treatment, targeted psychotherapy, sleep protection protocols, and partner education.",
        duration: "Same Session"
      },
      {
        step: "04",
        title: "Collaborative Obstetric Liaison",
        description: "Coordinating with your gynecologist or pediatrician to ensure holistic, safe continuity of maternal care.",
        duration: "Ongoing"
      }
    ],
    whatToExpect: [
      "A deeply empathetic, female-led clinical space where you are fully validated.",
      "Clear guidance on safe medications during pregnancy and nursing.",
      "Practical strategies to restore sleep hygiene and protect maternal mental wellness.",
      "Psychoeducation for spouses and family members to foster a strong support system."
    ],
    faqs: [
      {
        q: "Is it safe to take antidepressants during pregnancy or while breastfeeding?",
        a: "Many modern psychiatric medications have robust safety data in pregnancy and lactation. Untreated maternal depression and anxiety also carry significant risks for both mother and child. Dr. Bhoomi carefully discusses individualized risk-benefit ratios to ensure safety."
      },
      {
        q: "What is the difference between 'baby blues' and postpartum depression?",
        a: "The 'baby blues' are common mood swings and tearfulness lasting 1–2 weeks postpartum due to rapid hormonal shifts. If distress lasts longer, involves intense feelings of inadequacy, panic, or detachment, it indicates postpartum depression, which responds well to treatment."
      },
      {
        q: "Can PMDD be treated effectively?",
        a: "Yes. PMDD is a recognized neurobiological condition. Treatments including targeted serotonergic medications, psychotherapy, and lifestyle interventions offer immense relief."
      }
    ],
    nextSlug: "de-addiction",
    prevSlug: "adolescent"
  },
  {
    slug: "de-addiction",
    num: "05",
    title: "De-Addiction & Substance Use Support",
    shortTitle: "De-Addiction & Substance Care",
    tagline: "Evidence-based addiction psychiatry, detoxification support & relapse prevention",
    category: "Addiction Psychiatry",
    image: "/assets/service_deaddiction.webp",
    altText: "Warm, respectful, confidential consultation environment for addiction recovery",
    duration: "45–60 mins per session",
    format: "In-Person (Rajkot) or Secure Online Video",
    supervision: "Dr. Bhoomi Raval, MD Psychiatry",
    summary:
      "Substance dependence is a complex, treatable medical condition involving neurochemical changes in the brain's reward pathways. We provide compassionate, confidential outpatient medical management and psychological support without judgment or shame.",
    clinicalPhilosophy:
      "Addiction is not a moral failing or lack of willpower. Most individuals turn to substances to cope with underlying emotional pain, anxiety, depression, or chronic stress. We treat both the addiction and the underlying psychological driver together (dual diagnosis).",
    keyHighlights: [
      "Confidential Outpatient Detoxification",
      "Dual Diagnosis (Anxiety/Depression + Substance)",
      "Medication-Assisted Craving Reduction",
      "Relapse Prevention & Family Support"
    ],
    graphicalImage: "/assets/graphical_nervous_system.webp",
    graphicalTitle: "Rewiring the Mesolimbic Dopamine Reward Pathway",
    graphicalConcept:
      "Addictive substances stimulate unnaturally high surges of dopamine in the nucleus accumbens, leading to receptor downregulation and intense cravings. Through medication-assisted detoxification and cognitive reframing, we help the brain's neural pathways heal, re-sensitizing the nervous system to natural rewards and emotional fulfillment.",
    graphicalPoints: [
      {
        label: "Neurochemical Stabilization",
        text: "Using safe medications to gently normalize GABA and glutamate balance during withdrawal."
      },
      {
        label: "Craving Interruption",
        text: "Blocking reward pathways that fuel compulsive cravings, granting mental space to develop healthy habits."
      },
      {
        label: "Treating the Root Cause",
        text: "Addressing untreated anxiety, trauma, or depression that initially prompted substance use."
      }
    ],
    indicationsTitle: "Substances and patterns we assist with:",
    indications: [
      {
        title: "Alcohol Dependence & Frequent Binging",
        description: "Inability to stop drinking once started, developing tolerance, blackouts, or drinking in secret."
      },
      {
        title: "Tobacco & Nicotine Dependence",
        description: "Compulsive smoking, vaping, or chewing tobacco with severe restlessness and irritability when attempting to quit."
      },
      {
        title: "Cannabis & Marijuana Use Difficulties",
        description: "Daily or heavy cannabis use resulting in amotivational syndrome, paranoia, or loss of occupational focus."
      },
      {
        title: "Prescription Medication Misuse",
        description: "Dependence on sleeping pills, sedatives (benzodiazepines), or opioid painkillers without medical supervision."
      },
      {
        title: "Physical Withdrawal Symptoms",
        description: "Experiencing hand tremors, morning sweating, anxiety, insomnia, nausea, or rapid heartbeat when abstaining."
      },
      {
        title: "Impact on Family, Career & Financial Stability",
        description: "Strained domestic relationships, workplace absenteeism, legal difficulties, or loss of personal health."
      }
    ],
    journeySteps: [
      {
        step: "01",
        title: "Substance & Medical Safety Assessment",
        description: "Confidential evaluation of quantity, frequency, duration, withdrawal risk, and physical health bloodwork.",
        duration: "First Visit"
      },
      {
        step: "02",
        title: "Medically Supervised Detoxification",
        description: "Prescribing safe, non-addictive medications to ease physical withdrawal symptoms and suppress intense cravings.",
        duration: "Days 1–14"
      },
      {
        step: "03",
        title: "Dual Diagnosis & Psychological Therapy",
        description: "Treating co-existing anxiety, depression, or insomnia using Motivational Enhancement Therapy (MET) and CBT.",
        duration: "Weeks 2–8"
      },
      {
        step: "04",
        title: "Long-Term Relapse Prevention",
        description: "Identifying personal relapse triggers, cultivating sober support systems, and regular accountability check-ins.",
        duration: "Maintenance"
      }
    ],
    whatToExpect: [
      "100% confidential and dignified outpatient medical care.",
      "Clear medical management of cravings and withdrawal discomfort.",
      "Empathetic, collaborative motivation rather than confrontation or blame.",
      "Educational guidance for families to break enabling cycles and support recovery."
    ],
    faqs: [
      {
        q: "Can de-addiction treatment be done on an outpatient basis?",
        a: "Yes. Many motivated individuals can undergo safe, medically supervised detoxification and recovery through outpatient visits without needing residential hospital admission."
      },
      {
        q: "What is 'dual diagnosis'?",
        a: "Dual diagnosis refers to having a substance use concern alongside a mental health condition like depression, anxiety, or bipolar disorder. Treating both simultaneously is critical for lasting sobriety."
      },
      {
        q: "How do anti-craving medications work?",
        a: "Anti-craving medicines act on specific neurotransmitter systems in the brain to reduce the obsessive urge to consume substances, giving the individual cognitive control while they build new coping habits."
      }
    ],
    nextSlug: "sexual-health",
    prevSlug: "womens-mental-health"
  },
  {
    slug: "sexual-health",
    num: "06",
    title: "Sexual Health & Psychosexual Concerns",
    shortTitle: "Sexual Health & Well-being",
    tagline: "A safe, clinical, non-judgmental environment to address psychosexual difficulties",
    category: "Specialized Psychiatry",
    image: "/assets/service_sexual_health.webp",
    altText: "Private, dignified, discreet doctor consultation room",
    duration: "45–60 mins per session",
    format: "In-Person (Rajkot) or Secure Online Video",
    supervision: "Dr. Bhoomi Raval, MD Psychiatry",
    summary:
      "Sexual health is an essential component of overall physical, emotional, and relationship well-being. Performance anxiety, guilt, misconceptions, and biological factors frequently cause immense private distress. We provide a respectful, medical, and confidential setting to seek clarity.",
    clinicalPhilosophy:
      "Psychosexual difficulties are extraordinarily common and treatable. By replacing shame and misinformation with sound medical science and psychological support, individuals and couples can restore comfort, intimacy, and confidence.",
    keyHighlights: [
      "Discreet & Confidential Atmosphere",
      "Medical & Hormonal Factor Evaluation",
      "Performance Anxiety Reduction",
      "Individual & Couple Intimacy Support"
    ],
    graphicalImage: "/assets/graphical_cbt_loop.webp",
    graphicalTitle: "The Mind-Body Sexual Response Loop",
    graphicalConcept:
      "Sexual function relies directly on autonomic parasympathetic relaxation. When performance anxiety or intrusive self-monitoring occurs, the sympathetic nervous system triggers adrenaline release, constricting blood vessels and hindering physical arousal. We break this cognitive-physiological spiral through psychoeducation and anxiety deconditioning.",
    graphicalPoints: [
      {
        label: "Anxiety Deconditioning",
        text: "Removing performance pressure and 'spectatoring' (anxiously observing oneself during intimacy)."
      },
      {
        label: "Endocrine & Physical Clarity",
        text: "Checking for underlying metabolic issues, testosterone/prolactin imbalances, or medication side effects."
      },
      {
        label: "Relationship Harmony",
        text: "Facilitating healthy emotional communication and reducing unspoken intimacy tension between partners."
      }
    ],
    indicationsTitle: "Common psychosexual concerns addressed:",
    indications: [
      {
        title: "Performance Anxiety & Erectile Difficulties",
        description: "Psychogenic or stress-induced erectile difficulties, fear of failure, or excessive anticipatory distress."
      },
      {
        title: "Premature Ejaculation & Lack of Control",
        description: "Rapid or uncontrolled ejaculation causing personal frustration and relationship dissatisfaction."
      },
      {
        title: "Low Desire & Hypoactive Sexual Arousal",
        description: "Loss of sexual interest, fatigue, emotional detachment, or relationship friction impacting libido."
      },
      {
        title: "Painful Intercourse & Vaginismus",
        description: "Involuntary muscle spasms, intense anxiety, or physical pain preventing comfortable intercourse."
      },
      {
        title: "Medication-Induced Sexual Side Effects",
        description: "Evaluating and adjusting prior psychiatric or physical medications that may be impacting sexual functioning."
      },
      {
        title: "Intimacy Guilt, Myths & Misinformation",
        description: "Overcoming deep-seated guilt, sexual myths, or past negative experiences hindering healthy intimacy."
      }
    ],
    journeySteps: [
      {
        step: "01",
        title: "Confidential Clinical History",
        description: "A comfortable, respectful dialogue evaluating onset, psychological stressors, and relationship context.",
        duration: "First 30 mins"
      },
      {
        step: "02",
        title: "Medical & Endocrine Screening",
        description: "Rule out physiological contributors like thyroid dysfunction, diabetes, or medication side effects.",
        duration: "Same Session"
      },
      {
        step: "03",
        title: "Cognitive & Behavioral Psychoeducation",
        description: "Dismantling anxiety triggers, debunking myths, and providing evidence-based sensate focus techniques.",
        duration: "Sessions 2–3"
      },
      {
        step: "04",
        title: "Integrated Treatment & Follow-up",
        description: "Prescribing targeted medical support when needed alongside psychotherapeutic strategies for lasting confidence.",
        duration: "Follow-up"
      }
    ],
    whatToExpect: [
      "Utmost privacy, dignity, and absolute medical confidentiality.",
      "A clinical, scientific approach free from judgment or awkwardness.",
      "Clear explanation of the mind-body link in sexual response.",
      "Option to attend individually or bring your spouse/partner."
    ],
    faqs: [
      {
        q: "Is it normal to feel embarrassed talking about sexual concerns?",
        a: "Yes, almost everyone feels hesitant initially due to cultural stigma. Dr. Bhoomi conducts consultations in a relaxed, medical, and compassionate manner that immediately puts patients at ease."
      },
      {
        q: "Are psychosexual problems usually mental or physical?",
        a: "They are often an intersection of both. Even if a concern begins with physical fatigue or hormones, performance anxiety quickly develops. Addressing both aspects is key to long-term success."
      },
      {
        q: "Can I consult online for psychosexual concerns?",
        a: "Yes, online video consultations are available with end-to-end privacy and confidentiality."
      }
    ],
    nextSlug: "ketamine-therapy",
    prevSlug: "de-addiction"
  },
  {
    slug: "ketamine-therapy",
    num: "07",
    title: "Ketamine Therapy (Interventional Psychiatry)",
    shortTitle: "Ketamine Therapy",
    tagline: "Rapid-acting neuroplastic intervention for Treatment-Resistant Depression (TRD)",
    category: "Interventional Psychiatry",
    image: "/assets/service_ketamine.webp",
    altText: "Tranquil interventional psychiatry therapy room with ergonomic recliner and ambient light",
    duration: "90–120 mins per clinical session",
    format: "In-Clinic Only (Strict Medical Supervision, Rajkot)",
    supervision: "Dr. Bhoomi Raval, MD Psychiatry (Gold Medalist)",
    summary:
      "Ketamine therapy represents a major medical breakthrough for individuals battling Treatment-Resistant Depression (TRD) and acute suicidal distress. By targeting the brain's glutamatergic NMDA receptors, Ketamine promotes rapid synaptic neuroplasticity where conventional oral antidepressants have failed.",
    clinicalPhilosophy:
      "When standard medications fail to lift deep depression, hopelessness can feel overwhelming. Ketamine offers a scientifically validated, fast-acting neurochemical reset, opening a critical window of neuroplasticity for healing.",
    keyHighlights: [
      "Rapid Symptom Relief (Within Hours/Days)",
      "Targets NMDA & Glutamate Synaptogenesis",
      "Strict In-Clinic Continuous Vital Monitoring",
      "Structured Post-Infusion Integration"
    ],
    graphicalImage: "/assets/graphical_neuroplasticity.webp",
    graphicalTitle: "Synaptic Sprouting & Neural Rewiring in Treatment-Resistant Depression",
    graphicalConcept:
      "Chronic major depression and long-term stress lead to significant dendritic atrophy—the loss of synaptic connections between neurons in the prefrontal cortex and hippocampus. Unlike traditional monoamine antidepressants (SSRIs) that take weeks, Ketamine acts via NMDA receptor antagonism to rapidly stimulate Brain-Derived Neurotrophic Factor (BDNF), inducing fresh synaptogenesis within 24 hours.",
    graphicalPoints: [
      {
        label: "Glutamate Modulation",
        text: "Bypasses slow monoamine pathways to trigger immediate downstream synaptic transmission."
      },
      {
        label: "Dendritic Growth Factors",
        text: "Elevates BDNF and activates the mTOR pathway, rebuilding neural connections lost to depression."
      },
      {
        label: "Neuroplastic Therapy Window",
        text: "Opens a critical cognitive window where psychotherapy and positive behavioral changes take root faster."
      }
    ],
    indicationsTitle: "Clinical candidates for Ketamine Therapy:",
    indications: [
      {
        title: "Treatment-Resistant Depression (TRD)",
        description: "Major depression that has failed to improve despite adequate trials of two or more conventional oral antidepressants."
      },
      {
        title: "Severe Chronic Anhedonia & Emotional Paralysis",
        description: "Persistent inability to feel joy, motivation, or emotional connection despite ongoing therapy and medications."
      },
      {
        title: "Urgent Suicidal Despair & Crisis Relief",
        description: "Rapid reduction of intense, acute suicidal thinking while broader long-term treatment is established."
      },
      {
        title: "Bipolar Depression (Treatment-Refractory)",
        description: "Depressive phases of bipolar disorder under careful psychiatric stabilization and mood-stabilizer coverage."
      },
      {
        title: "Severe PTSD & Anxiety States",
        description: "Severe post-traumatic distress and hyperarousal unresponsive to traditional pharmacological lines."
      }
    ],
    journeySteps: [
      {
        step: "01",
        title: "Psychiatric & Medical Pre-Screening",
        description: "Thorough cardiovascular check, blood pressure baseline, psychiatric history review, and suitability screening.",
        duration: "Prior to Protocol"
      },
      {
        step: "02",
        title: "Controlled In-Clinic Administration",
        description: "Comfortably seated in a quiet room, serene suite with soft lighting. Administered under exact clinical protocols.",
        duration: "40–60 mins"
      },
      {
        step: "03",
        title: "Continuous Real-Time Vital Monitoring",
        description: "Constant observation of blood pressure, heart rate, oxygen saturation, and subjective patient comfort.",
        duration: "During Session"
      },
      {
        step: "04",
        title: "Post-Treatment Recovery & Integration",
        description: "Resting in our calm recovery lounge until fully grounded. Post-infusion reflection and scheduled series review.",
        duration: "30–45 mins"
      }
    ],
    whatToExpect: [
      "A peaceful, clinical monitoring suite designed for sensory calm.",
      "Dedicated nursing and psychiatric supervision throughout the entire session.",
      "Possible mild perceptual shifts or lightheadedness that resolve quickly after the session.",
      "You will need a designated companion to accompany you home."
    ],
    faqs: [
      {
        q: "How quickly does Ketamine therapy work?",
        a: "Unlike oral antidepressants which can take 4–6 weeks to show efficacy, many patients experience measurable improvement in mood and suicidal ideation within 4 to 24 hours of their initial session."
      },
      {
        q: "Is Ketamine safe when administered clinically?",
        a: "Yes. When administered in sub-anesthetic medical doses under continuous clinical vital monitoring by an experienced psychiatrist, Ketamine has a very high safety profile."
      },
      {
        q: "How many sessions are typically recommended?",
        a: "An acute induction course usually consists of 4 to 6 sessions over a period of 2 to 3 weeks, followed by personalized maintenance schedules if needed."
      }
    ],
    nextSlug: "ect",
    prevSlug: "sexual-health"
  },
  {
    slug: "ect",
    num: "08",
    title: "ECT (Electroconvulsive Therapy)",
    shortTitle: "Electroconvulsive Therapy",
    tagline: "Modern, safe neuromodulation under anesthesia for severe refractory illness",
    category: "Interventional Psychiatry",
    image: "/assets/service_ect.webp",
    altText: "Modern, serene hospital clinical neuromodulation suite with state-of-the-art monitoring",
    duration: "Brief 15–20 mins procedure + recovery",
    format: "In-Hospital Surgical Suite under General Anesthesia (Rajkot)",
    supervision: "Dr. Bhoomi Raval & Consultant Anesthesiologist",
    summary:
      "Modern Electroconvulsive Therapy (ECT) is one of the safest, most effective, and life-saving treatments in modern medicine. Administered under brief general anesthesia and muscle relaxation, modern ECT is completely painless and controlled, delivering gentle therapeutic neuromodulation.",
    clinicalPhilosophy:
      "Media portrayals of ECT are outdated and inaccurate. Today's ECT is a sophisticated, dignified hospital procedure that rapidly restores neurochemical equilibrium in patients with severe, medication-resistant mental illness.",
    keyHighlights: [
      "Conducted under Brief General Anesthesia",
      "Rapid Symptom Reversal for Severe Illness",
      "Painless & Monitored with EEG & ECG",
      "Highest Efficacy Rate in Clinical Psychiatry"
    ],
    graphicalImage: "/assets/graphical_neuroplasticity.webp",
    graphicalTitle: "Global Neurochemical Re-synchronization via Neuromodulation",
    graphicalConcept:
      "During severe medication-resistant depression or catatonia, neural firing patterns become profoundly dysregulated. Modern brief-pulse ECT delivers a carefully calibrated stimulus that elicits a generalized, therapeutic cerebral discharge, re-sensitizing serotonin, dopamine, and GABA receptor complexes and stimulating robust neurogenesis.",
    graphicalPoints: [
      {
        label: "Receptor Resensitization",
        text: "Overcomes receptor down-regulation where oral antidepressants have failed to stimulate response."
      },
      {
        label: "Neuroendocrine Reset",
        text: "Normalizes hyperactive hypothalamic-pituitary-adrenal (HPA) stress axis dysfunction."
      },
      {
        label: "Modern Safety Safeguards",
        text: "Performed in an operating theatre with continuous EEG brainwave and ECG cardiovascular monitoring."
      }
    ],
    indicationsTitle: "When is ECT medically indicated?",
    indications: [
      {
        title: "Severe, Medication-Refractory Depression",
        description: "Depression with severe psychomotor retardation, inability to eat or drink, or refusal of oral care."
      },
      {
        title: "Acute, Life-Threatening Suicidal Crisis",
        description: "When immediate, rapid intervention is essential to preserve life while long-term care is stabilized."
      },
      {
        title: "Depression with Psychotic Features & Catatonia",
        description: "Severe psychotic delusions, mutism, posturing, or catatonic stupor unresponsive to antipsychotic medication."
      },
      {
        title: "Severe Refractory Bipolar Mania",
        description: "Exhausting, unrelenting mania where oral mood stabilizers fail to achieve containment."
      },
      {
        title: "Medical Frailty Where Medications Are Unsafe",
        description: "Patients with severe physical frailty who cannot tolerate the cardiovascular or liver burden of complex drug regimens."
      }
    ],
    journeySteps: [
      {
        step: "01",
        title: "Pre-Anesthetic Clearance & Workup",
        description: "Complete blood count, electrolytes, ECG, and evaluation by a consultant anesthesiologist to ensure 100% safety.",
        duration: "Pre-Procedure"
      },
      {
        step: "02",
        title: "Brief General Anesthesia Induction",
        description: "Administration of a short-acting intravenous anesthetic and muscle relaxant. You are peacefully asleep within seconds.",
        duration: "5 mins"
      },
      {
        step: "03",
        title: "Controlled Neuromodulation Delivery",
        description: "A precisely calibrated, brief electrical stimulus produces a controlled therapeutic seizure monitored on EEG.",
        duration: "30–60 seconds"
      },
      {
        step: "04",
        title: "Post-Anesthesia Care Unit (PACU) Recovery",
        description: "Waking up naturally in recovery under close nurse observation. Ready for light breakfast within 45–60 minutes.",
        duration: "45–60 mins"
      }
    ],
    whatToExpect: [
      "You will feel zero pain or discomfort because you are asleep under general anesthesia.",
      "Treatment takes place in an accredited hospital operating room with an anesthesiologist present.",
      "Mild, temporary confusion or memory fog around the procedure is normal and resolves steadily.",
      "Transparent discussions with patients and family members at every step."
    ],
    faqs: [
      {
        q: "Does ECT cause permanent memory loss?",
        a: "Modern brief-pulse and ultra-brief pulse ECT significantly minimizes cognitive effects. Some patients experience temporary forgetfulness of events around the time of treatment, but long-term memory and cognitive functioning typically improve as the severe depression lifts."
      },
      {
        q: "How many ECT sessions are needed?",
        a: "An acute course typically consists of 6 to 12 sessions, usually administered 2 to 3 times per week, tailored to individual clinical response."
      }
    ],
    nextSlug: "consultation",
    prevSlug: "ketamine-therapy"
  }
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return servicesData.find((s) => s.slug === slug);
}
