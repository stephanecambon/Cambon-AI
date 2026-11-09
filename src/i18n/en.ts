// English texts. Wrap a word in == to highlight it in amber (e.g. ==pay==).
// Any bracketed marker is replaced via src/config.ts.
import type { Texts } from './fr';

export const en: Texts = {
  meta: {
    homeTitle: 'Cambon AI · Applied R&D for small and mid-sized companies',
    homeDescription:
      'PhD in AI and entrepreneur, I solve the hard problems of small and mid-sized companies: optimization, forecasting, targeting, decision support.',
    projectsTitle: 'Projects · Cambon AI, applied R&D',
    projectsDescription:
      'Tender responses, biotech, robotics, press economics, SaaS products: six projects, from a well-framed problem to a measured result.',
    legalTitle: 'Legal notice · Cambon AI',
    privacyTitle: 'Privacy · Cambon AI',
    privacyDescription:
      'What data the cambon.ai website and its newsletter collect, why, how long it is kept, and your rights.',
    legalDescription: 'Legal notice for the cambon.ai website.',
    notFoundTitle: 'Page not found · Cambon AI',
    ogImageAlt: 'Cambon AI: Your hardest problems are the ones that pay the most.',
  },
  nav: {
    approach: 'Approach',
    projects: 'Projects',
    about: 'About',
    booking: 'Book a call',
    mainLabel: 'Main navigation',
    langLabel: 'Language',
  },

  // ---------- Home page ----------
  hero: {
    eyebrow: 'Cambon AI · Applied R&D for small and mid-sized companies',
    title: 'Your hardest problems are the ones that ==pay== the most.',
    subtitle:
      'A researcher to frame the problem, an entrepreneur to turn it into value. With a PhD in AI and more than ten years as an entrepreneur, I tackle what weighs on your margins: optimization, forecasting, targeting, decision support. From a well-framed problem to a solution running in production.',
    ctaPrimary: "Let's talk about your problem",
    ctaSecondary: 'See the projects',
    factsLabel: 'Fact sheet',
    facts: [
      ['PhD in AI', 'Planning under constraints, 2005'],
      ['11 years as a founder', 'Founded Ownpage, sold in 2024'],
      ['≈ 40% of major French media', 'equipped by Ownpage'],
    ],
  },

  constat: {
    label: 'The shift',
    title: 'Providers are moving up the stack.',
    paragraphs: [
      'Yesterday, optimizing delivery routes or forecasting demand precisely took an R&D team. Today, a small or mid-sized company can take it on.',
      'The whole market is moving up a notch. Support functions are shifting from software to AI agents, which teams are learning to use themselves. Custom development is getting faster and cheaper. And problems once reserved for labs and large corporations are now within reach.',
      "That's where I work: on the problems that move margins, markets and products.",
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
          'targeting: the right offer, to the right customer, at the right time',
          'anticipating failures (predictive maintenance)',
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
          'connecting software systems',
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
          'HR: tracking leave, preparing payroll',
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
          'Robotizing a workshop, automating a biotech lab',
          'Data science for biotech: choosing the next experiments based on previous ones',
        ],
      },
      {
        title: 'Production problems with a strong R&D component',
        goal: 'productivity on your core business.',
        items: [
          'Setting up a data stack and making use of your data (data science)',
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
      { title: 'Researcher.', text: 'I formalize the problem and prove the solution holds.' },
      {
        title: 'Entrepreneur.',
        text: 'I pick the problems that pay, and I know how to sell what comes out of them.',
      },
      { title: 'Builder.', text: 'I build and deliver, with no middleman.' },
    ],
  },

  about: {
    label: 'Background',
    title: 'Who I am',
    photoAlt: 'Stéphane Cambon',
    photoPlaceholder: 'Photo coming soon',
    lead: 'Stéphane Cambon, PhD in artificial intelligence and entrepreneur.',
    paragraphs: [
      'I founded and ran Ownpage for eleven years. We built, sold and deployed personalization software used by about 40% of major French media, and the company was sold in 2024. I then served as COO at Opper Marketing. I keep working on the economics of the press: I published an open-source global licence model for French publishers.',
      'Before that, I was a researcher. My PhD focused on planning under multiple constraints for autonomous systems (Université Paul Sabatier, 2005). I then took AI into the field, across very different sectors: aerospace, with predictive maintenance on the Rafale and the A320; healthcare, with anesthesia software in hospitals; video games, with the AI of the strategy game R.U.S.E.',
      'I never let go of scientific research. My latest work proves mathematically that a robot cannot reach certain objects.',
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
        paragraphs: [
          'The cambon.ai website sets no cookies and uses no audience measurement tools. Its fonts are served from cambon.ai: your browser contacts no other site during your visit.',
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
    privacy: 'This website sets no cookies and uses no audience measurement tools.',
  },
  notFound: {
    title: 'Page not found',
    text: 'This page does not exist or has been moved.',
    back: 'Back to the home page',
  },
};
