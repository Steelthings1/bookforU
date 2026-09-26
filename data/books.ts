import { Book } from '@/types/book';

export const CATEGORIES = [
  'All Books',
  'Tech & AI',
  'Sci-Fi & Fantasy',
  'Business',
  'Self-Help',
  'Psychology',
  'Design',
  'Fiction',
] as const;

export const BOOKS: Book[] = [
  {
    id: 'ai-frontiers',
    title: 'Architects of Intelligence',
    subtitle: 'The Blueprint of Autonomous Systems and Cognitive Agents',
    author: 'Elena Vance & Dr. Marcus Thorne',
    authorBio: 'Elena Vance is an AI systems architect and former researcher at DeepMind. Dr. Marcus Thorne leads cognitive computing labs at Oxford.',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=700&q=80',
    category: 'Tech & AI',
    rating: 4.9,
    reviewCount: 342,
    price: 14.99,
    originalPrice: 29.99,
    discountBadge: '50% OFF',
    isBestseller: true,
    isFeatured: true,
    formats: ['EPUB', 'PDF', 'MOBI'],
    pageCount: 384,
    fileSizeMb: 12.4,
    publishedDate: '2025-01-15',
    language: 'English',
    isbn: '978-0-123456-78-9',
    synopsis: 'A comprehensive, visionary roadmap into the mechanics of autonomous agentic loops, neural reasoning, and multimodal architectures. From foundational transformer attention to synthetic reasoning pipelines, this book bridges theoretical mathematics with production engineering.',
    sampleExcerpt: {
      chapterTitle: 'Chapter 1: The Emergence of Autonomous Reasoning',
      paragraphs: [
        'The transition from static predictive models to autonomous cognitive agents marks the most profound shift in computer science since the dawn of the internet. For decades, software existed as a deterministic cascade of instructions: input mapped to output through carefully bounded algorithms.',
        'When artificial neural networks expanded beyond pattern recognition into generative synthesis, something unprecedented occurred. Models were no longer mere text predictors; they began formulating internal representations of sequence, causality, and conceptual relationships.',
        'In this opening chapter, we deconstruct the anatomy of an autonomous agent: perception, memory projection, tool invocation, and reflexive critique. An agent is not simply a model with an API key; it is an orchestrated feedback loop capable of self-correction.',
        'Consider a system tasked with synthesizing complex clinical trial data. A classic pipeline fails when edge cases defy pre-scripted heuristics. A cognitive agent, however, decomposes the objective into sub-goals, queries verification modules, inspects discrepancies, and executes an iterative repair cycle before submitting its findings.'
      ]
    },
    reviews: [
      {
        id: 'r1',
        userName: 'David K., Lead ML Engineer',
        rating: 5,
        date: '2025-02-10',
        comment: 'Without doubt the most rigorous and hands-on guide to modern agentic architectures. The sample implementations alone are worth ten times the price.',
        verifiedPurchase: true
      },
      {
        id: 'r2',
        userName: 'Sophia M.',
        rating: 5,
        date: '2025-02-18',
        comment: 'Crystal clear explanations. The chapter on self-reflective feedback loops helped our team solve a month-long hallucination bottleneck.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'chronicles-of-elysium',
    title: 'Echoes of the Obsidian Star',
    subtitle: 'The Elysium Trilogy - Book One',
    author: 'Kaelen Vance',
    authorBio: 'Kaelen Vance is a Hugo and Nebula award-nominated speculative fiction novelist whose worldbuilding has captivated over a million readers worldwide.',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80',
    category: 'Sci-Fi & Fantasy',
    rating: 4.8,
    reviewCount: 512,
    price: 9.99,
    originalPrice: 16.99,
    discountBadge: '41% OFF',
    isBestseller: true,
    isFeatured: true,
    formats: ['EPUB', 'PDF', 'MOBI'],
    pageCount: 496,
    fileSizeMb: 8.7,
    publishedDate: '2024-11-20',
    language: 'English',
    isbn: '978-1-987654-32-1',
    synopsis: 'Beyond the shattered asteroid belt of Cygnus Prime, a dormant relic awakens, humming with frequencies that alter the passage of time. When scavenger captain Maya Cruz discovers an obsidian vessel buried within a crystal nebula, she triggers a race between interstellar dynasties.',
    sampleExcerpt: {
      chapterTitle: 'Prologue: The Shattered Ring',
      paragraphs: [
        'The silence of deep space is never truly silent. If you press your helmet against the titanium hull of the *Stardust Pilgrim*, you can hear the faint, hollow rattle of micrometeorites bouncing off the heat shield like frozen rain on glass.',
        'Maya adjusted the frequency dial of her spectrometer. The readout flared violet—an impossible spectrum for an abandoned mineral asteroid. Asteroids don’t radiate rhythmic harmonic pulses every forty-two seconds.',
        '"Hold retro-thrusters," she whispered into the comms channel. "Jax, look at the sensor cone. Are you seeing this density gradient?"',
        'Jax’s voice crackled through the static, thick with apprehension. "Captain, whatever is down in that crevasse has a gravitational signature five times denser than enriched iridium. And it’s warming up."'
      ]
    },
    reviews: [
      {
        id: 'r3',
        userName: 'Aria Chen',
        rating: 5,
        date: '2025-01-04',
        comment: 'Epic, breathtaking, and emotionally resonant. Couldn’t put it down until 3 AM!',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'deep-work-flow',
    title: 'Hyperfocus & Flow',
    subtitle: 'Mastering Deep Cognition in a World of Relentless Distraction',
    author: 'Julian Mercer',
    authorBio: 'Julian Mercer is an executive advisor, cognitive psychologist, and keynote speaker on high-output knowledge work.',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
    category: 'Self-Help',
    rating: 4.7,
    reviewCount: 289,
    price: 11.99,
    originalPrice: 19.99,
    discountBadge: '40% OFF',
    isBestseller: false,
    isFeatured: true,
    formats: ['EPUB', 'PDF'],
    pageCount: 280,
    fileSizeMb: 5.2,
    publishedDate: '2025-02-01',
    language: 'English',
    isbn: '978-0-456789-01-2',
    synopsis: 'Modern knowledge workers switch contexts once every three minutes, fracturing attentional stamina. Julian Mercer delivers a science-backed, battle-tested system to rebuild deep focus, structure unbreachable work blocks, and unlock sustained creative output.',
    sampleExcerpt: {
      chapterTitle: 'Chapter 1: The Fragmentation Trap',
      paragraphs: [
        'Every notification is a micro-fracture in your neural architecture. When an alert dings on your workstation while you are solving an intricate problem, your mind does not simply glance away and immediately bounce back. Neuroscience calls this "attention residue."',
        'For up to twenty minutes after a thirty-second interruption, remnants of your prefrontal cortex remain tethered to the distraction. If you check your inbox four times an hour, you never achieve full cognitive depth.',
        'Hyperfocus is not about brute-force willpower. Willpower is a perishable biological reserve. High performers do not resist distraction through agony; they engineer an environment where distraction is frictionless to avoid and immersion is effortless to sustain.'
      ]
    },
    reviews: [
      {
        id: 'r4',
        userName: 'Liam Sterling',
        rating: 5,
        date: '2025-02-22',
        comment: 'This book single-handedly saved my productivity. The 90-minute immersion cadence works wonders.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'zero-to-exit',
    title: 'The Unfair Advantage: Zero to Exit',
    subtitle: 'How Modern Tech Founders Build Monopolies in Saturated Markets',
    author: 'Daphne Sterling',
    authorBio: 'Daphne Sterling is a venture partner at Horizon Capital and previously co-founded two enterprise SaaS unicorns.',
    coverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80',
    category: 'Business',
    rating: 4.9,
    reviewCount: 421,
    price: 16.99,
    originalPrice: 24.99,
    discountBadge: '32% OFF',
    isBestseller: true,
    isFeatured: false,
    formats: ['EPUB', 'PDF', 'MOBI'],
    pageCount: 340,
    fileSizeMb: 7.1,
    publishedDate: '2024-10-10',
    language: 'English',
    isbn: '978-0-789012-34-5',
    synopsis: 'A brutally honest, non-cliché handbook for tech entrepreneurs. Unpack the mechanics of asymmetric distribution channels, viral product loops, pricing power psychology, and negotiating high-multiple strategic acquisitions.',
    sampleExcerpt: {
      chapterTitle: 'Chapter 2: The Myth of the Better Mousetrap',
      paragraphs: [
        'The tech graveyard is overflowing with superior products that nobody bought. If your growth plan relies on customers discovering you organically simply because your code is faster or your UI has prettier rounded corners, prepare for a quiet insolvency.',
        'Great businesses are not won in the engineering sprint alone; they are won at the intersection of moat defensibility and distribution friction. When you look at Stripe, Airbnb, or Figma, their initial breakthrough was never pure feature count—it was an unfair wedge.',
        'In this chapter, we outline the five fundamental wedges: regulatory arbitrage, network-density tipping points, bottom-up developer evangelism, platform piggybacking, and proprietary feedback loops.'
      ]
    },
    reviews: [
      {
        id: 'r5',
        userName: 'Nathaniel R., Startup Founder',
        rating: 5,
        date: '2025-01-14',
        comment: 'The chapter on distribution wedges completely changed our go-to-market strategy. We reached cash-flow positive in 90 days.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'mind-heuristics',
    title: 'Invisible Architects',
    subtitle: 'Subconscious Biases and the Hidden Rules of Human Decision',
    author: 'Dr. Evelyn Rousseau',
    authorBio: 'Dr. Evelyn Rousseau is Professor of Behavioral Economics and Cognitive Psychology at the Sorbonne.',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=700&q=80',
    category: 'Psychology',
    rating: 4.8,
    reviewCount: 315,
    price: 12.99,
    originalPrice: 18.99,
    discountBadge: '31% OFF',
    isBestseller: false,
    isFeatured: true,
    formats: ['EPUB', 'PDF'],
    pageCount: 310,
    fileSizeMb: 6.4,
    publishedDate: '2024-12-05',
    language: 'English',
    isbn: '978-0-321654-98-7',
    synopsis: 'Why do rational people make predictably irrational investments, relationship choices, and everyday trade-offs? Dr. Rousseau unravels the evolutionary circuitry behind heuristics, framing effects, and social mimicry.',
    sampleExcerpt: {
      chapterTitle: 'Chapter 1: The Mirage of Autonomy',
      paragraphs: [
        'You believe you chose your morning coffee, your career path, and the candidate you voted for through deliberate, weighing of evidence. Behavioral experiment after experiment demonstrates that your conscious mind is often merely a spokesperson fabricating rationalizations for choices your subconscious made moments prior.',
        'Our brains operate on cognitive thrift. Calculating exact probabilistic outcomes is calorically expensive; fast heuristics keep us alive. The problem is that our savanna-tuned heuristics are routinely exploited by algorithmic feeds, price framing, and scarcity triggers.',
        'When you understand these mental shortcuts, you stop being an unwitting target and start seeing the invisible architecture of your everyday reality.'
      ]
    },
    reviews: [
      {
        id: 'r6',
        userName: 'Chloe Bennett',
        rating: 5,
        date: '2025-02-03',
        comment: 'Fascinating read! Up there with Thinking Fast and Slow, but vastly more actionable for modern life.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'crafting-interfaces',
    title: 'The Craft of Timeless Interfaces',
    subtitle: 'Typography, Spatial Rhythm, and Micro-Interactions in Digital Design',
    author: 'Soren Lindqvist',
    authorBio: 'Soren Lindqvist is a Scandinavian design director whose work has set design standards for iconic digital products.',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=700&q=80',
    category: 'Design',
    rating: 4.9,
    reviewCount: 198,
    price: 18.99,
    originalPrice: 28.00,
    discountBadge: '32% OFF',
    isBestseller: true,
    isFeatured: false,
    formats: ['EPUB', 'PDF'],
    pageCount: 360,
    fileSizeMb: 24.8,
    publishedDate: '2025-01-20',
    language: 'English',
    isbn: '978-0-987123-45-6',
    synopsis: 'Richly illustrated and deeply considered, this guide teaches designers and front-end engineers how to craft interfaces that feel calm, intentional, and effortless. Dive deep into optical kerning, proportional baseline grids, spring physics, and haptic feedback.',
    sampleExcerpt: {
      chapterTitle: 'Chapter 3: The Architecture of White Space',
      paragraphs: [
        'White space is not emptiness; it is the gravitational field that gives meaning to content. When novice designers look at an interface, they ask: "What else can I put in this open space?" A master designer asks: "What can I remove until only the soul of the message remains?"',
        'Spacing is cadence. Just as silence between notes creates music, proportional margins and line heights establish the rhythm of comprehension. A user should never have to think about where their gaze should rest next; the layout must guide them with gentle inevitability.',
        'We examine how 4px and 8px rhythmic scales maintain visual harmony across responsive breakpoints, ensuring your interface breathes naturally whether viewed on a 6-inch phone or a 32-inch 4K display.'
      ]
    },
    reviews: [
      {
        id: 'r7',
        userName: 'Mateo Rossi, UX Lead',
        rating: 5,
        date: '2025-02-14',
        comment: 'The definitive bible on modern visual craft. Every junior and senior designer needs this on their desk.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'shadow-of-the-alchemist',
    title: 'The Alchemist of Prague',
    subtitle: 'A Historical Mystery of Secrets, Guilds, and Lost Relics',
    author: 'Claire Montclaire',
    authorBio: 'Claire Montclaire is an acclaimed historical novelist known for rich atmospheric mysteries set in medieval and Renaissance Europe.',
    coverImage: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=700&q=80',
    category: 'Fiction',
    rating: 4.7,
    reviewCount: 467,
    price: 8.99,
    originalPrice: 14.99,
    discountBadge: '40% OFF',
    isBestseller: false,
    isFeatured: false,
    formats: ['EPUB', 'PDF', 'MOBI'],
    pageCount: 412,
    fileSizeMb: 6.9,
    publishedDate: '2024-09-18',
    language: 'English',
    isbn: '978-1-456123-78-9',
    synopsis: 'Prague, 1598. Beneath the shadows of the Charles Bridge, an imperial astronomer is found poisoned in his tower, clutching a charred manuscript written in an unbreakable cipher. Scholar Lucas Thorne must decipher the riddle before the Inquisition burns the truth to ash.',
    sampleExcerpt: {
      chapterTitle: 'Chapter 1: The Midnight Bell',
      paragraphs: [
        'The bells of St. Vitus Cathedral struck twelve, their bronze tones rolling across the Vltava River like muffled thunder. Snow fell in lazy, thick flakes, settling on the blackened gargoyles that guarded the Old Town.',
        'Lucas wrapped his wool cloak tightly around his shoulders. The lantern in his hand cast erratic arcs of yellow light against the cobblestones. He had received the summons less than an hour ago—a sealed parchment bearing the wax eagle of Emperor Rudolf II.',
        '"If you value the secrets of the cosmos," the note had read in trembling handwriting, "come to the Golden Lane before the hour of one. He has been murdered."',
        'When Lucas reached the small wooden door at the foot of the alchemist’s quarters, the latch was unfastened, swinging gently in the winter draught.'
      ]
    },
    reviews: [
      {
        id: 'r8',
        userName: 'Isabelle Moreau',
        rating: 5,
        date: '2024-11-29',
        comment: 'Atmospheric, thrilling, and impeccably researched. The historical Prague details felt completely real.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'scalable-systems-guide',
    title: 'Distributed Systems Patterns',
    subtitle: 'Event Streams, Consensus Protocols, and High-Throughput Resilience',
    author: 'Vikram Batra',
    authorBio: 'Vikram Batra is a principal systems architect with two decades of experience scaling global cloud infrastructure.',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=700&q=80',
    category: 'Tech & AI',
    rating: 4.9,
    reviewCount: 388,
    price: 15.99,
    originalPrice: 27.99,
    discountBadge: '43% OFF',
    isBestseller: true,
    isFeatured: false,
    formats: ['EPUB', 'PDF'],
    pageCount: 440,
    fileSizeMb: 14.2,
    publishedDate: '2025-01-08',
    language: 'English',
    isbn: '978-0-654987-12-3',
    synopsis: 'When monolithic applications can no longer keep up with millions of concurrent queries, engineers must embrace distributed thinking. Vikram Batra demystifies Raft consensus, event sourcing, idempotent transactions, and zero-downtime schema migrations.',
    sampleExcerpt: {
      chapterTitle: 'Chapter 1: The Fallacy of the Network',
      paragraphs: [
        'Every distributed systems catastrophe begins with an assumption: that the network is reliable, latency is zero, bandwidth is infinite, and topology is static. In reality, packets drop, routers reboot during peak traffic, and clock skew silently corrupts causal ordering.',
        'Designing resilient distributed software requires assuming failure as the normal baseline state rather than an extraordinary exception. If node A sends a payload to node B and receives no acknowledgement, node A cannot know whether node B crashed, the request was lost, or the response timed out.',
        'In this chapter, we explore how distributed consensus algorithms establish reliable truth in untrusted, partition-prone environments.'
      ]
    },
    reviews: [
      {
        id: 'r9',
        userName: 'Tariq Al-Mansoor',
        rating: 5,
        date: '2025-02-12',
        comment: 'The clearest breakdown of Paxos vs Raft and dual-write mitigations in modern backend engineering.',
        verifiedPurchase: true
      }
    ]
  }
];

export const TESTIMONIALS = [
  {
    quote: "bookforU is hands down the cleanest e-book shopping experience. Instant downloads in ePub and PDF with no DRM hassle. Highly recommended!",
    author: "Sarah Jenkins",
    role: "Avid Reader & Product Designer",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
  },
  {
    quote: "The interactive sample reader lets me preview full chapters before buying. I have purchased 6 technical e-books here already.",
    author: "Arjun Patel",
    role: "Senior Cloud Architect",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
  },
  {
    quote: "Exceptional curation. The books on business strategy and AI agents directly impacted how our executive team plans for 2026.",
    author: "Claire Sterling",
    role: "Managing Director, Apex Ventures",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
  }
];

export const FAQS = [
  {
    question: "How do I receive and read my purchased e-books?",
    answer: "Immediately upon checkout completion, you receive direct download links on your confirmation screen and via email. You can download in standard DRM-free formats (.EPUB, .PDF, .MOBI) compatible with Kindle, Apple Books, Kobo, Android, and PC."
  },
  {
    question: "Can I transfer these e-books to my Amazon Kindle?",
    answer: "Yes! Amazon allows seamless transfer via 'Send to Kindle' (emailing the .EPUB or .PDF file to your @kindle.com address) or by connecting your Kindle via USB and dropping the file into the Documents folder."
  },
  {
    question: "What if I am unhappy with my purchase?",
    answer: "We offer a 100% money-back guarantee within 14 days of purchase. If an e-book does not meet your expectations, simply contact our support team for an instant refund."
  },
  {
    question: "Can I preview books before purchasing?",
    answer: "Yes! Every book on bookforU features a 'Read Free Sample' button. You can read the opening chapter directly inside our responsive, themeable in-browser reader."
  },
  {
    question: "Are updates to technical books included?",
    answer: "Yes. Whenever authors release revised editions, errata fixes, or updated code samples, you receive free lifetime access to download the revised editions from your library."
  }
];
