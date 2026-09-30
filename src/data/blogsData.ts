export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  readTime: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
  keyTakeaways: string[];
  content: {
    heading: string;
    paragraphs: string[];
  }[];
  clinicalAdvice: string;
}

export const blogsData: BlogPost[] = [
  {
    slug: "understanding-high-functioning-anxiety",
    title: "Understanding High-Functioning Anxiety: Why Looking 'Fine' Isn't the Same as Being Fine",
    excerpt:
      "High achievers often mask internal panic behind perfectionism and busy schedules. Explore the neurobiology of hidden anxiety and sustainable pathways to calm.",
    category: "Anxiety & Mood",
    image: "/assets/blog_1.webp",
    readTime: "5 min read",
    publishedDate: "September 15, 2026",
    author: {
      name: "Dr. Bhoomi Raval",
      role: "Consultant Psychiatrist (Gold Medalist)",
      avatar: "/assets/dr_bhoomi_raval.webp",
    },
    tags: ["High-Functioning Anxiety", "Overthinking", "CBT", "Burnout"],
    keyTakeaways: [
      "Perfectionism and overworking are frequently coping mechanisms to numb underlying dread.",
      "Somatic symptoms like jaw clenching, shallow breathing, and insomnia often precede clinical diagnoses.",
      "Recovery does not mean losing your drive; it means replacing anxious urgency with grounded clarity.",
    ],
    content: [
      {
        heading: "The Paradox of the Successful Yet Exhausted Mind",
        paragraphs: [
          "From the outside, individuals with high-functioning anxiety seem to have everything together. They meet deadlines ahead of time, maintain meticulously organized schedules, and seldom say no to responsibilities. Yet internally, they are running an exhausting marathon with no finish line.",
          "In clinical practice, patients often tell me: 'Doctor, I am functioning, but I feel like glass that could shatter with one tap.' This internal dissonance between external success and internal turbulence is the hallmark of high-functioning anxiety.",
        ],
      },
      {
        heading: "Biological Drivers: The Constant Fight-or-Flight Loop",
        paragraphs: [
          "When you live in perpetual fear of dropping the ball, your sympathetic nervous system remains continuously activated. Cortisol and adrenaline stay elevated, leaving your body in an ongoing state of emergency preparedness.",
          "Over time, this neurochemical strain manifests physically: chronic migraines, irritable bowel symptoms, shoulder stiffness, and restless light sleep where your mind continues calculating tomorrow's worries.",
        ],
      },
      {
        heading: "Actionable Steps to Regulate Your Nervous System",
        paragraphs: [
          "1. Practice Strategic Disengagement: Deliberately build 15-minute white-space windows into your calendar where no productivity is required.",
          "2. Cognitive Reframing: Catch catastrophic 'what-if' thoughts and counter them with evidence-based 'what-is' realities.",
          "3. Seek Clinical Evaluation: When self-soothing is no longer sufficient, cognitive behavioral therapy and judicious medical support can reset baseline nervous sensitivity.",
        ],
      },
    ],
    clinicalAdvice:
      "You don't have to wait until you collapse to justify asking for help. Healing begins when you allow yourself to be supported before reaching the breaking point.",
  },
  {
    slug: "burnout-vs-depression-key-differences",
    title: "Burnout vs. Clinical Depression: Key Differences and When to Seek Help",
    excerpt:
      "Is it chronic career exhaustion or clinical depression? Learn the vital diagnostic markers and tailored recovery strategies for both.",
    category: "Mental Health Science",
    image: "/assets/blog_2.webp",
    readTime: "6 min read",
    publishedDate: "September 10, 2026",
    author: {
      name: "Dr. Bhoomi Raval",
      role: "Consultant Psychiatrist (Gold Medalist)",
      avatar: "/assets/dr_bhoomi_raval.webp",
    },
    tags: ["Burnout", "Depression", "Workplace Stress", "Clinical Care"],
    keyTakeaways: [
      "Burnout is primarily domain-specific (work, caregiving), whereas depression permeates every facet of life.",
      "Depression involves persistent anhedonia (inability to feel pleasure) and profound feelings of worthlessness.",
      "Taking a holiday typically relieves situational burnout, but depressive neurochemistry requires clinical intervention.",
    ],
    content: [
      {
        heading: "Untangling Two Overlapping Crises",
        paragraphs: [
          "With modern work culture demanding 24/7 availability, distinguishing between severe chronic burnout and clinical major depressive disorder is one of the most critical diagnostic evaluations we conduct at MANAM.",
          "While both conditions present with exhaustion, brain fog, and low motivation, their underlying neurobiology and therapeutic trajectories differ substantially.",
        ],
      },
      {
        heading: "The Anhedonia Test",
        paragraphs: [
          "A burnt-out professional who disconnects completely for a week often starts rediscovering enjoyment in hobbies, good meals, or laughing with friends. The stress is tied to their environment.",
          "In contrast, someone experiencing depression suffers from anhedonia: even in ideal circumstances, surrounded by loved ones or relaxing in nature, the emotional numbness persists. This reflects neurochemical deregulation in serotonin, dopamine, and norepinephrine pathways.",
        ],
      },
      {
        heading: "Tailored Roadmaps to Healing",
        paragraphs: [
          "For burnout: Radical boundary restoration, sleep hygiene, and psychotherapeutic realignment of priorities.",
          "For depression: A combination of structured evidence-based psychotherapy (CBT/REBT) alongside carefully monitored psychiatric medications to rebalance neurochemical circuits.",
        ],
      },
    ],
    clinicalAdvice:
      "If emotional exhaustion persists for longer than two consecutive weeks accompanied by loss of interest and self-blame, a formal psychiatric consultation is essential.",
  },
  {
    slug: "debunking-myths-psychiatric-medications",
    title: "De-Stigmatizing Psychiatric Medications: Debunking Myths Around Dependency & Side Effects",
    excerpt:
      "Separating scientific medical evidence from cultural misconceptions surrounding psychiatric medications, SSRIs, and treatment duration.",
    category: "Medication & Science",
    image: "/assets/blog_3.webp",
    readTime: "7 min read",
    publishedDate: "September 02, 2026",
    author: {
      name: "Dr. Bhoomi Raval",
      role: "Consultant Psychiatrist (Gold Medalist)",
      avatar: "/assets/dr_bhoomi_raval.webp",
    },
    tags: ["Psychiatry", "SSRIs", "Mental Health Myths", "Stigma-Free"],
    keyTakeaways: [
      "Modern antidepressants (SSRIs/SNRIs) are non-addictive and do not alter your personality.",
      "Psychiatric medications act like eyeglasses for the brain—correcting neurochemical imbalances so therapy can work.",
      "Most treatments are temporary and systematically tapered under strict clinical guidance.",
    ],
    content: [
      {
        heading: "The Fear That Keeps People Suffering in Silence",
        paragraphs: [
          "Nobody hesitates to take insulin for diabetes or thyroid hormone for hypothyroidism. Yet when it comes to neurochemical conditions of the brain, patients and their families often carry profound hesitation.",
          "The three most common fears I encounter are: 'Will I become addicted?', 'Will it change who I am?', and 'Will I have to take this for the rest of my life?' Let us examine the clinical truth.",
        ],
      },
      {
        heading: "Myth vs. Scientific Reality",
        paragraphs: [
          "Myth 1: Antidepressants are addictive. Scientific Reality: Antidepressants (SSRIs, SNRIs) do not trigger dopamine reward surges. They do not cause chemical cravings or addiction.",
          "Myth 2: Medicines turn you into an emotionless zombie. Scientific Reality: Proper therapeutic dosages relieve debilitating emotional agony so your true, authentic personality can shine through again.",
          "Myth 3: You can never stop once you start. Scientific Reality: After symptom remission and maintenance, medications are gently tapered down under medical supervision.",
        ],
      },
      {
        heading: "Collaborative, Patient-Centered Prescribing",
        paragraphs: [
          "At MANAM, medication is never forced. Every prescription is a collaborative discussion explaining why a specific molecule is chosen, what benefits to expect, and how any initial mild side effects are proactively managed.",
        ],
      },
    ],
    clinicalAdvice:
      "Medication is not a sign of moral weakness; it is a scientifically grounded biological tool that empowers your mind to heal.",
  },
  {
    slug: "adolescent-mental-health-parenting-guide",
    title: "Adolescent Mental Health in the Digital Age: A Compassionate Guide for Parents",
    excerpt:
      "Navigating teenage academic pressure, screen addiction, identity crises, and emotional vulnerability with non-judgmental clinical support.",
    category: "Youth & Parenting",
    image: "/assets/blog_4.webp",
    readTime: "5 min read",
    publishedDate: "August 28, 2026",
    author: {
      name: "Dr. Bhoomi Raval",
      role: "Consultant Psychiatrist (Gold Medalist)",
      avatar: "/assets/dr_bhoomi_raval.webp",
    },
    tags: ["Adolescents", "Parenting", "Screen Time", "Academic Stress"],
    keyTakeaways: [
      "Teenage brain remodeling makes adolescents hypersensitive to social rejection and peer validation.",
      "Anger and irritability in adolescents are frequently masked presentations of underlying anxiety or sadness.",
      "Curiosity and listening build more psychological safety than interrogating and lecturing.",
    ],
    content: [
      {
        heading: "The Developing Adolescent Brain",
        paragraphs: [
          "Between ages 12 and 22, the human brain undergoes substantial neuro-synaptic pruning. The emotional limbic system matures years before the executive prefrontal cortex—the region responsible for impulse control, long-term planning, and emotional regulation.",
          "Add algorithmic social media feeds engineered to capture attention, intense academic competition, and shifting peer dynamics, and today's youth face unprecedented psychological pressures.",
        ],
      },
      {
        heading: "Recognizing Red Flags Beyond Normal Teenage Moods",
        paragraphs: [
          "While mood fluctuations are part of growing up, watch for: sudden withdrawal from friends and family, drastic decline in academic performance, changes in sleep or appetite, self-harm marks, and pervasive irritability.",
        ],
      },
      {
        heading: "Bridging the Communication Gap",
        paragraphs: [
          "Replace: 'Why are you always on your phone?' with: 'I notice you've been seeming drained lately. I'm here whenever you want to talk, no lectures.'",
          "Providing a neutral, safe clinical space where teenagers can speak freely with a compassionate psychiatrist often transforms family harmony.",
        ],
      },
    ],
    clinicalAdvice:
      "When a teenager feels seen and heard rather than corrected and criticized, their defensive walls lower and genuine healing begins.",
  },
  {
    slug: "sleep-neurochemistry-anxious-brain",
    title: "Sleep and Emotional Regulation: How Chronic Insomnia Disrupts the Anxious Brain",
    excerpt:
      "The bidirectional link between REM sleep deprivation, prefrontal cortex fatigue, and escalating emotional reactivity.",
    category: "Sleep & Wellness",
    image: "/assets/blog_5.webp",
    readTime: "5 min read",
    publishedDate: "August 20, 2026",
    author: {
      name: "Dr. Bhoomi Raval",
      role: "Consultant Psychiatrist (Gold Medalist)",
      avatar: "/assets/dr_bhoomi_raval.webp",
    },
    tags: ["Sleep", "Insomnia", "Anxiety", "Neuroscience"],
    keyTakeaways: [
      "Sleep is not passive rest; it is the brain's neurochemical wash cycle and memory consolidation system.",
      "A single night of sleep deprivation increases amygdala reactivity by over 60%, making normal problems feel catastrophic.",
      "Fixing circadian rhythm is often the quickest catalyst for psychiatric stabilization.",
    ],
    content: [
      {
        heading: "The Bedtime Racing Mind Phenomenon",
        paragraphs: [
          "You feel exhausted all day, yet the moment your head touches the pillow, your brain launches into hyperdrive: reviewing conversations from five years ago, anticipating future catastrophes, and calculating the exact hours left until sunrise.",
          "This is not a lack of willpower; it is a hyperaroused nervous system that has lost the ability to down-regulate into parasympathetic safety.",
        ],
      },
      {
        heading: "The Amygdala-Prefrontal Disconnect",
        paragraphs: [
          "Brain imaging reveals that without adequate deep and REM sleep, the rational prefrontal cortex loses inhibitory control over the emotional fear center (the amygdala).",
          "Small everyday difficulties suddenly trigger heart palpitations, panic attacks, and uncontrollable emotional reactivity.",
        ],
      },
      {
        heading: "Evidence-Based Sleep Hygiene Rules",
        paragraphs: [
          "1. Keep wake times consistent 7 days a week.",
          "2. Keep blue-light screens out of the bed at least 45 minutes before sleep.",
          "3. Avoid treating the bed as an office or dining table—train your brain that bed equals rest.",
        ],
      },
    ],
    clinicalAdvice:
      "If insomnia has persisted for more than three weeks, an evaluation for underlying anxiety, depression, or circadian rhythm disorder can provide swift, lasting relief.",
  },
  {
    slug: "womens-mental-health-hormonal-transitions",
    title: "Women's Mental Health & Hormonal Shifts: Navigating Postpartum, PMDD, and Perimenopause",
    excerpt:
      "A clinical look into how estrogen and progesterone fluctuations impact neurotransmitters, and why specialized women's psychiatric care matters.",
    category: "Women's Health",
    image: "/assets/blog_6.webp",
    readTime: "6 min read",
    publishedDate: "August 12, 2026",
    author: {
      name: "Dr. Bhoomi Raval",
      role: "Consultant Psychiatrist (Gold Medalist)",
      avatar: "/assets/dr_bhoomi_raval.webp",
    },
    tags: ["Women's Health", "Postpartum", "PMDD", "Perimenopause"],
    keyTakeaways: [
      "Estrogen directly modulates serotonin synthesis and dopamine receptor sensitivity.",
      "Premenstrual Dysphoric Disorder (PMDD) is a severe neurobiological sensitivity, not 'just bad PMS'.",
      "Postpartum depression and anxiety are medical conditions requiring empathetic, non-stigmatized clinical care.",
    ],
    content: [
      {
        heading: "The Overlooked Biology of Female Hormonal Fluctuations",
        paragraphs: [
          "Throughout a woman's life, hormonal transitions—menarche, menstrual cycles, pregnancy, postpartum, and perimenopause—create profound shifts in neurochemistry.",
          "For millions of women, these biological shifts are dismissed with phrases like 'it's just mood swings' or 'you're overreacting.' In clinical reality, brain receptors have varying genetic sensitivity to sudden estrogen and progesterone drops.",
        ],
      },
      {
        heading: "PMDD: Debilitating Yet Treatable",
        paragraphs: [
          "PMDD causes severe despair, overwhelming rage, panic attacks, and fatigue in the 7–10 days preceding menstruation, resolving promptly with flow. Identifying this cyclicity allows targeted medical and psychotherapeutic protocols that restore normalcy.",
        ],
      },
      {
        heading: "Postpartum Care: Nurturing the Mother",
        paragraphs: [
          "Baby blues affect up to 80% of mothers in the first 2 weeks, but when crying spells, intrusive anxious thoughts about the baby's safety, or numbness continue beyond, compassionate psychiatric support protects both mother and infant bonding.",
        ],
      },
    ],
    clinicalAdvice:
      "Your suffering is real, biological, and completely treatable. You do not have to endure hormonal distress in silence.",
  },
];
