// English texts. Wrap a word in == to highlight it in orange (e.g. ==at the scale of your business==).
// Any bracketed marker is replaced via src/config.ts.
import type { Texts } from './fr';

export const en: Texts = {
  meta: {
    homeTitle: 'Cambon AI · Big-company R&D, at the scale of your business',
    homeDescription:
      'Optimizing, forecasting, targeting, robotizing: big-company R&D, made accessible to small and mid-sized companies. PhD in AI, ROI quantified from day one.',
    projectsTitle: 'Projects · Cambon AI, applied R&D',
    projectsDescription:
      'Tender responses, biotech, robotics, press economics, SaaS products: six projects, from a well-framed problem to a measured result.',
    legalTitle: 'Legal notice · Cambon AI',
    privacyTitle: 'Privacy · Cambon AI',
    privacyDescription:
      'What data the cambon.ai website and its newsletter collect, why, how long it is kept, and your rights.',
    legalDescription:
      'Legal notice for the cambon.ai website: publisher CAMBON AI (SASU, Paris), registration, publication director and hosting provider.',
    notFoundTitle: 'Page not found · Cambon AI',
    ogImageAlt: 'Cambon AI: Big-company R&D, at the scale of your business.',
  },
  nav: {
    approach: 'Approach',
    projects: 'Projects',
    about: 'About',
    booking: 'Book a call',
    mainLabel: 'Main navigation',
    logoLabel: 'Cambon AI, home',
    langLabel: 'Language',
  },

  // ---------- Home page ----------
  hero: {
    eyebrow: 'Cambon AI · Applied artificial intelligence',
    title: 'Big-company R&D, ==at the scale of your business==.',
    subtitleLead: 'Your hardest problems are the ones that pay the most.',
    subtitle:
      'Optimizing, forecasting, targeting, robotizing: they used to be reserved for large corporations. A PhD in AI, an entrepreneur, twenty-five years in the field: I make them accessible to small and mid-sized companies, with a quantified return on investment from day one.',
    ctaPrimary: "Let's talk about your problem",
    ctaSecondary: 'See the projects',
    factsLabel: "What I bring",
    facts: [
      ["Model", "constraints, data, scenarios"],
      ["Build", "algorithms, software, infrastructure"],
      ["Make it pay", "ROI, go-to-market, funding"],
    ],
  },

  constat: {
    label: 'The shift',
    title: 'Providers are moving up the stack.',
    paragraphs: [
      'Yesterday, optimizing delivery routes or forecasting demand precisely took an R&D team. Today, a small or mid-sized company can take it on.',
      'The whole market is moving up a notch. Support functions are shifting from software to AI agents. Custom development is getting faster and cheaper. And problems once reserved for labs and large corporations are now within reach.',
      'I have to move up a notch too. Throughout my career, I spent 5% of my time on research and 95% on execution: writing code, drafting specifications, shipping. Today, AI takes on much of that execution. I can finally flip the ratio, and spend most of my time on what creates value: understanding your problem and finding the solution that pays.',
    ],
  },

  layers: {
    title: 'The AI market in three layers',
    colExamples: 'Example problems',
    colBefore: 'Before',
    colNow: 'Now',
    bar: 'Cambon AI',
    roi: 'Return on investment',
    gainLabel: 'Payoff:',
    rows: [
      {
        name: 'Layer 3 · Hard problems',
        gain: 'margin, new markets, new products',
        examples: [
          'route optimization, shop-floor scheduling',
          'demand forecasting, pricing',
          'robotizing a workshop, automating a lab',
        ],
        before: [
          {
            style: 'dashed',
            title: 'Out of reach for SMEs',
            caption: 'Labs, specialist consultancies, corporate R&D',
          },
        ],
        now: [
          {
            style: 'amber',
            title: 'Cambon AI',
            text: 'Problem framing, prototype, solution',
          },
          { style: 'outline', title: '↑ IT services firms', caption: 'starting to move up' },
        ],
      },
      {
        name: 'Layer 2 · Production problems',
        gain: 'productivity on your core business',
        examples: [
          'setting up a data stack',
          'building custom business software',
          'plugging AI into internal documentation: support, tender generation',
        ],
        before: [
          {
            style: 'outline',
            title: 'IT services firms',
            caption: 'Custom development, slow and expensive',
          },
        ],
        now: [
          {
            style: 'amber',
            title: 'Cambon AI designs and builds',
            text: 'Data architecture, reliable document AI, and more',
          },
          { style: 'outline', title: 'IT services firms', caption: 'now building to order' },
        ],
      },
      {
        name: 'Layer 1 · Support functions',
        gain: 'productivity on overhead costs',
        examples: [
          'chasing payments, invoicing',
          'sorting email, writing meeting notes',
          'accounting: entering invoices, bank reconciliation',
        ],
        before: [{ style: 'outline', title: 'SaaS vendors', caption: 'One tool per function' }],
        now: [
          {
            style: 'outline',
            title: 'AI agents',
            text: 'Mainstream tools are replacing SaaS',
            caption: 'Set up by small providers, or by teams themselves after training',
          },
        ],
      },
    ],
  },

  offer: {
    label: 'The offer',
    title: 'What I do',
    goalLabel: 'Goal:',
    blocks: [
      {
        title: 'Hard problems',
        goal: 'margin, new markets, new products.',
        items: [
          'Optimizing routes, scheduling a workshop',
          'Forecasting demand, setting prices',
          'Targeting the right offer, to the right customer, at the right time',
          'Anticipating failures',
          'Robotizing a workshop, automating a laboratory',
          'Modeling and statistics: understanding what drives your results',
        ],
      },
      {
        title: 'Production problems with a strong R&D component',
        goal: 'productivity on your core business.',
        items: [
          'Setting up a data stack',
          'Building custom business software',
          'Connecting your software systems',
          'Plugging AI into your internal documentation: support, tender responses',
          'Deploying AI tools in regulated environments',
        ],
      },
    ],
    notLead: "What I don't do:",
    notText:
      'train your teams on mainstream tools, or deploy agents for support functions. Others do that very well.',
  },

  method: {
    label: 'The method',
    title: 'How I work',
    steps: [
      {
        title: 'Frame.',
        text: 'A free 30-minute first conversation. Then I formalize the problem and estimate the expected return on investment before committing to delivery. We decide together whether to go ahead.',
      },
      {
        title: 'Prototype.',
        text: 'A proof on your data, in a few weeks. We measure the actual ROI before investing further.',
      },
      {
        title: 'Deliver.',
        text: 'I build the solution and put it into production, or hand it over to your teams.',
      },
      {
        title: 'Deploy and go to market.',
        text: 'I make sure your teams adopt the solution. And when it becomes a new product, I build the go-to-market with you: positioning, pricing, first customers. I was an entrepreneur for eleven years and sold my own solutions: I know what it takes for a product to find its customers.',
      },
    ],
    note: 'I can also support you over time, a few days a month, as a fractional Chief AI Officer.',
  },

  why: {
    label: 'The difference',
    title: 'Why me',
    items: [
      {
        title: 'Researcher.',
        text: 'I frame the problem and prove the solution holds. With a PhD in AI and expertise in constraint-based planning, optimization, machine learning, data science and autonomous systems, I apply these methods wherever they make a difference: aerospace, healthcare, video games, media, logistics, biotech.',
      },
      {
        title: 'Entrepreneur.',
        text: "I know where the return on investment lies, and how to sell what comes out of it. I've been through every stage of a startup: founding, first customers, equity fundraising and non-dilutive funding, go-to-market, customer relationships, project delivery, through to selling the company and integrating it into the acquirer.",
      },
      {
        title: 'Builder.',
        text: 'I build and ship, with no middleman. Twenty years of experience in software development and product creation: AI models, SaaS software, desktop applications, embedded systems, from the first mockup to production.',
      },
    ],
  },

  about: {
    label: 'Background',
    title: 'Who I am',
    photoAlt: 'Stéphane Cambon',
    photoPlaceholder: 'Photo coming soon',
    linkedin: 'My LinkedIn profile',
    email: 'Email me',
    lead: 'Stéphane Cambon, PhD in artificial intelligence and entrepreneur.',
    paragraphs: [
      "I founded and ran Ownpage for eleven years. We built, sold and deployed a personalized recommendation platform for websites, apps and above all newsletters, adopted by a large share of the French media. The company was sold in 2024. I then served as COO at Opper Marketing.",
      "Ownpage was already an AI startup, but I have been working in this field for twenty-five years. My PhD focused on planning under multiple constraints in robotics, and my postdoc on machine learning applied to plan recognition. I then took AI into the field, across very different sectors: aerospace, with predictive maintenance on the Rafale and the A320; consumer products, with a recommendation system for a B2C app; video games, with the AI of the strategy game R.U.S.E.",
      "Alongside this, I pursue my own projects: research on safety in robotics, and app development. I also take part in the public debate on the future of the press and on AI safety.",
    ],
  },

  projectsPreview: {
    label: 'Track record',
    title: 'Projects',
    all: 'All projects',
  },

  cta: {
    label: 'Contact',
    title: "A problem that won't budge?",
    text: "Tell me about it in 30 minutes. If I'm not the right person to solve it, I'll tell you.",
    button: 'Book a call',
  },

  // ---------- Projects ----------
  projects: {
    label: 'Track record',
    title: 'Projects',
    filterLegend: 'Filter by category',
    filterAll: 'All',
    categories: {
      difficile: 'Hard problems',
      production: 'Production',
      saas: 'SaaS products',
    },
    cardProblem: 'Problem',
    cardApproach: 'Approach',
    cardResult: 'Result',
    context: 'Context',
    problem: 'The problem',
    approach: 'The approach',
    result: 'The result',
    transferable: "What's transferable",
    links: 'Links',
    back: 'All projects',
  },

  footer: {
    company: 'Cambon AI · SASU · Paris',
    legal: 'Legal notice',
    privacy: 'Privacy',
  },

  // ---------- Newsletter ----------
  newsletter: {
    label: 'Newsletter',
    title: 'Get my analyses.',
    text: 'The economics of tech, seen through science. No fixed schedule: only when I have something useful to say.',
    emailLabel: 'Your email',
    consent: 'I agree to receive the Cambon AI newsletter. I can unsubscribe at any time.',
    privacyLink: 'Privacy policy',
    button: 'Subscribe',
    sending: 'Sending…',
    success: "Thanks, you're on the list. See you soon in your inbox.",
    error: 'Something went wrong. Email me directly at stephane@cambon.ai.',
    errorEmail: "This email address doesn't look valid.",
    errorConsent: 'Tick the box to confirm your subscription.',
    honeypot: 'Leave this field empty',
    ctaLine: 'No problem to share yet?',
    ctaLink: 'Get my analyses.',
  },

  // ---------- Privacy ----------
  privacy: {
    eyebrow: 'Personal data',
    title: 'Privacy policy',
    intro:
      'This page explains what data the cambon.ai website and its newsletter collect, why, for how long, and how to exercise your rights.',
    updated: 'Last updated: November 2026.',
    optOut: {
      stop: 'Opt out of measurement on this site',
      resume: 'Allow measurement again',
      active: 'Current status: audience measurement is on in this browser.',
      refused: 'Current status: you have opted out. This choice is stored in this browser only.',
      browser:
        'Current status: your browser sends the Global Privacy Control or Do Not Track signal, so audience measurement is off.',
    },
    sections: [
      {
        title: 'Data controller',
        paragraphs: [
          "CAMBON AI, SASU, 126 rue d'Alésia, 75014 Paris, France. Contact: stephane@cambon.ai.",
        ],
      },
      {
        title: 'Data collected',
        paragraphs: [
          'When you subscribe to the newsletter: your email address, the date of subscription, the language and the page you subscribed from, and the version of the consent text you accepted. Nothing else: no IP address, no information about your browser.',
        ],
      },
      {
        title: 'Purpose',
        paragraphs: ['Sending the Cambon AI newsletter.'],
      },
      {
        title: 'Legal basis',
        paragraphs: [
          'Your consent, given by ticking a box when you subscribe. You can withdraw it at any time.',
        ],
      },
      {
        title: 'Recipient',
        paragraphs: [
          'Stéphane Cambon only. Your data is never sold, rented or shared.',
        ],
      },
      {
        title: 'Hosting',
        paragraphs: [
          "Sign-ups are sent to a Google Apps Script and stored in a private Google Sheets spreadsheet, in Cambon AI's Google Workspace account. The provider is Google Cloud France SARL, 8 rue de Londres, 75009 Paris, France. Under Google's terms, data may be transferred outside the European Union, subject to the safeguards set out in its data processing terms. When the form is submitted, Google technically receives your IP address; Cambon AI does not store it.",
        ],
      },
      {
        title: 'Retention period',
        paragraphs: [
          'Until you unsubscribe. If you never unsubscribe, your data is deleted no later than three years after your last contact with me (a reply to an email, for example), in line with the recommendation of the CNIL, the French data protection authority.',
        ],
      },
      {
        title: 'Your rights',
        paragraphs: [
          'At any time, you can access your data, correct it, have it deleted or withdraw your consent, simply by emailing stephane@cambon.ai. Every newsletter reminds you how to unsubscribe.',
          'You can also lodge a complaint with the CNIL (www.cnil.fr).',
        ],
      },
      {
        title: 'The website itself',
        optOut: true,
        paragraphs: [
          "The website sets no cookies. It measures its audience with an in-house tool, for statistical purposes only: page viewed, referring site, visit duration, device type. A random identifier, erased when you close the tab, links the pages of a single visit. This data is never cross-referenced, shared or used for any other purpose; it is stored in a private Google spreadsheet and kept for 13 months at most. To do this, your browser contacts Google's servers (script.google.com). Measurement is turned off if your browser sends the Global Privacy Control or Do Not Track signal.",
          'The website is hosted by GitHub Pages (GitHub Inc.). As GitHub states, visitors\' IP addresses are logged and stored for security purposes, whether or not the visitor is signed in to GitHub.',
        ],
      },
    ],
  },
  legal: {
    eyebrow: 'Legal information',
    title: 'Legal notice',
    items: [
      [
        'Company',
        'CAMBON AI, SASU (French simplified joint-stock company) with a share capital of €1,000',
      ],
      ['Registered office', "126 rue d'Alésia, 75014 Paris, France"],
      ['Registration', 'RCS Paris 131 228 074'],
      ['SIREN (French company number)', '131 228 074'],
      ['Publication director', 'Stéphane Cambon'],
      ['Contact', 'stephane@cambon.ai'],
      [
        'Hosting provider',
        'GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, United States',
      ],
    ],
    privacy: 'This website sets no cookies. It measures its audience anonymously, with an in-house tool.',
  },
  notFound: {
    title: 'Page not found',
    text: 'This page does not exist or has been moved.',
    back: 'Back to the home page',
  },
};
