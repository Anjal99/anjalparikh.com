/**
 * Single source of truth for identity, contact, and SEO strings.
 * The nav, hero, footer, resume, and every meta tag read from here.
 */
export const siteConfig = {
  name: "Anjal Parikh",
  initials: "AP",
  jobTitle: "Software Developer",
  location: "Dallas",
  email: "anjal.parikh@gmail.com",
  url: "https://anjalparikh.com",

  /** Cycles under the hero name: "A {role} lives in {location}." */
  roles: ["Developer", "Engineer", "Builder"],

  tagline:
    "Building multi-tenant platforms, AI agents, and the automation that ties a business together, end to end.",

  description:
    "Software developer in Dallas building multi-tenant platforms, AI agents, and business automation, from data model and API through to the interface.",

  keywords: [
    "software developer",
    "senior developer",
    "python developer",
    "wordpress developer",
    "automation engineer",
    "Anjal Parikh",
  ],

  /** Rendered as info pills under the hero CTAs. */
  stats: [
    { value: "4", label: "Years Experience" },
    { value: "100+", label: "Projects Completed" },
  ],

  /** Drop a 1200x630 PNG at public/og-image.png to enable link previews. */
  ogImage: "/og-image.png",

  socials: [
    { label: "X", href: "https://x.com/AnjalParikh", handle: "@AnjalParikh" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/anjal-parikh/" },
    { label: "GitHub", href: "https://github.com/Anjal99" },
  ],
} as const;

export const mailto = `mailto:${siteConfig.email}`;
