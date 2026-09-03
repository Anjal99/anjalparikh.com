export interface Project {
  slug: string;
  /** Client-neutral label. Never name the client. */
  title: string;
  label: string;
  year: string;
  blurb: string;
  stack: string[];
  highlights: string[];
  image: string;
  /** Public repo URL, or null for client work under a private repo. */
  repo: string | null;
  /** Live URL if the deployment is public. */
  url: string | null;
  span: string;
  aspect: string;
}

export const projects: Project[] = [
  {
    slug: "paydirt-crm",
    title: "PayDirt CRM",
    label: "Construction estimating platform",
    year: "2026",
    blurb:
      "A multi-tenant estimating platform for construction contractors, covering bid intake through estimate delivery with per-tenant data isolation.",
    stack: [
      "Next.js 16",
      "TypeScript",
      "PostgreSQL",
      "Prisma 7",
      "NextAuth v5",
      "Tailwind",
      "Docker",
    ],
    highlights: [
      "Multi-tenancy enforced at the ORM layer with Prisma 7 and the @prisma/adapter-pg driver adapter, so tenant isolation holds at the data boundary rather than in application code.",
      "Two authentication paths through NextAuth v5: Google OAuth for teams already on Workspace, and passwordless magic links for field staff without company accounts.",
      "The full build pairs the TypeScript application with a Python service and PLpgSQL routines, containerized for deployment.",
    ],
    image: "/projects/paydirt-crm.svg",
    repo: null,
    url: null,
    span: "md:col-span-7",
    aspect: "aspect-[4/3] md:aspect-[7/5]",
  },
  {
    slug: "indy-leaderboard",
    title: "Sales Leaderboard",
    label: "Roofing contractor · internal tool",
    year: "2026",
    blurb:
      "A live sales leaderboard and admin dashboard driven straight from the client's existing CRM pipeline.",
    stack: ["Next.js", "TypeScript", "JobNimbus API", "Tailwind"],
    highlights: [
      "Reads deal data directly from the JobNimbus CRM API and reshapes it into a ranked, continuously updating leaderboard.",
      "Paired admin view for correcting attribution and adjusting rankings without touching the CRM itself.",
    ],
    image: "/projects/indy-leaderboard.svg?v=2",
    repo: null,
    url: null,
    span: "md:col-span-5",
    aspect: "aspect-[4/3] md:aspect-square",
  },
  {
    slug: "indy-scheduler",
    title: "Job Scheduler",
    label: "Roofing contractor · scheduling agent",
    year: "2026",
    blurb:
      "An agent that builds a crew's daily schedule on its own, weighing job economics, site conditions, and travel against the existing queue.",
    stack: ["TypeScript", "Python", "Docker"],
    highlights: [
      "Scores each job across cash versus insurance work, roof build type, gutter and siding scope, proximity, weather, and time already spent in the queue.",
      "Turns that scoring into a proposed daily schedule rather than a list of suggestions, so dispatch starts from a plan instead of a spreadsheet.",
    ],
    image: "/projects/indy-scheduler.svg?v=2",
    repo: null,
    url: null,
    span: "md:col-span-5",
    aspect: "aspect-[4/3] md:aspect-square",
  },
  {
    slug: "arc-clinic",
    title: "ARC Clinic",
    label: "Client web application",
    year: "2026",
    blurb: "",
    stack: [],
    highlights: [],
    image: "/projects/arc-clinic.svg",
    repo: null,
    url: null,
    span: "md:col-span-7",
    aspect: "aspect-[4/3] md:aspect-[7/5]",
  },
  {
    slug: "earthwise",
    title: "Earthwise",
    label: "Client web application",
    year: "2026",
    blurb: "",
    stack: [],
    highlights: [],
    image: "/projects/earthwise.svg",
    repo: null,
    url: null,
    span: "md:col-span-7",
    aspect: "aspect-[4/3] md:aspect-[7/5]",
  },
  {
    slug: "arborist-ops",
    title: "Arborist Internal Operations Builder",
    label: "Field operations · mix calculator",
    year: "2026",
    blurb:
      "An internal tool that turns a 22-service rate chart into mix recipes crews can run in the field, instead of calculating treatments by hand.",
    stack: ["Next.js", "TypeScript", "Python", "JSON"],
    highlights: [
      "Twenty-two services and their mix rates live in one rate chart, so a price or formula change shows up everywhere on the next load.",
      "JSON-backed for client testing, with a Postgres path already mapped for when the chart needs to be edited in-app.",
      "Replaces spreadsheet math for field mixes so crews aren't reconstructing recipes per job.",
    ],
    image: "/projects/arborist-ops.svg?v=2",
    repo: null,
    url: null,
    span: "md:col-span-5",
    aspect: "aspect-[4/3] md:aspect-square",
  },
];

export const getProject = (slug?: string) =>
  projects.find((p) => p.slug === slug);
