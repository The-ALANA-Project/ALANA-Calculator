/**
 * ALANA Project — Site Configuration
 * ─────────────────────────────────────────────────────────────────────────────
 * Duplicate this template for each new product website.
 * Update the values below to match your product's identity.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  // ── Product Identity ──────────────────────────────────────────────────────
  /** Full product name displayed across the site */
  productName: 'ALANA Quest Calculator',
  /** Shown in the header beside the ALANA mark */
  productLabel: 'Quest Calculator',
  /** Short description shown in SEO meta and hero */
  tagline: 'Track, calculate, and submit your community quests for ALANA token rewards.',
  /** Extended description for About / hero section */
  description:
    'The ALANA Quest Calculator enables community members to submit recurring tasks and calculate ALANA token rewards based on effort, quality, and impact. NFT-gated access ensures only verified Nucleus Guardians, Specialists, and Apprentices can participate in building and sustaining The ALANA Project ecosystem.',

  // ── Contact & Legal ───────────────────────────────────────────────────────
  contactEmail: 'contact@the-alana-project.xyz',
  legalEntityName: 'The ALANA Project',
  copyrightYear: '2026',

  // ── Navigation ────────────────────────────────────────────────────────────
  /** Main navigation items shown in the side-shelf menu */
  navItems: [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'quest-library', label: 'Quest Library', path: '/quest-library' },
    { id: 'my-quests', label: 'My Quests', path: '/my-quests' },
    { id: 'leaderboard', label: 'Leaderboard', path: '/leaderboard' },
    { id: 'admin', label: 'Guardian Panel', path: '/guardian-panel' },
  ],

  // ── Social Links ──────────────────────────────────────────────────────────
  socialLinks: {
    tiktok: 'https://www.tiktok.com/@the_alana_project',
    linkedin: 'https://www.linkedin.com/company/the-alana-project/',
    youtube: 'https://www.youtube.com/channel/UCD15TuEOTarAN9JATOQOd1A',
    twitter: 'https://twitter.com/alana_xyz',
    instagram: 'https://www.instagram.com/the_alana_project/',
    github: 'https://github.com/the-alana-project',
    telegram: 'https://t.me/+Z0cAQeeZvfdmNjQy',
  },

  // ── Hero Section ──────────────────────────────────────────────────────────
  hero: {
    heading: 'Welcome',
    subheading:
      'To all ALANA Contributors, from Nucleus Apprentices, Specialists to Guardians. This is where you hand in your Quests to earn rewards. Start by connecting your wallet.',
secondaryCta: { label: 'Learn More', path: '/about' },
  },
};
