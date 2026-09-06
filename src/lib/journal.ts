export interface JournalEntry {
  slug: string;
  /** Ordinal label shown on the card, e.g. "Lesson 1". */
  kicker: string;
  title: string;
  /** Seconds. Rendered as m:ss. */
  durationSec: number;
  /** Veed project id. Swap provider/id when these move to YouTube. */
  provider: "veed" | "youtube";
  videoId: string;
  poster: string;
  /** Animated preview, shown on hover. */
  posterAnimated?: string;
  /** One or two lines from Anjal. Empty until written. */
  blurb: string;
  /** ISO date. Empty until confirmed; needed for VideoObject rich results. */
  published: string;
}

export const journal: JournalEntry[] = [
  {
    slug: "ai-operating-system",
    kicker: "Lesson 1",
    title: "The AI Operating System",
    durationSec: 1051,
    provider: "veed",
    videoId: "e360b206-9073-498c-a21a-b277e0a21f9b",
    poster: "/journal/ai-operating-system.jpg",
    posterAnimated: "/journal/ai-operating-system.gif",
    blurb: "",
    published: "",
  },
  {
    slug: "claude-bootcamp-mcp-servers",
    kicker: "Lesson 2",
    title: "Claude Bootcamp: MCP Servers",
    durationSec: 1320,
    provider: "veed",
    videoId: "219ca302-00f8-4959-99c3-443a90655d52",
    poster: "/journal/claude-bootcamp-mcp-servers.jpg",
    posterAnimated: "/journal/claude-bootcamp-mcp-servers.gif",
    blurb: "",
    published: "",
  },
  {
    slug: "ai-native-workflows",
    kicker: "Lesson 3",
    title: "AI Native Workflows",
    durationSec: 1223,
    provider: "veed",
    videoId: "5ab71fee-ed28-4f20-9261-138bee4c3db5",
    poster: "/journal/ai-native-workflows.jpg",
    posterAnimated: "/journal/ai-native-workflows.gif",
    blurb: "",
    published: "",
  },
];

export const getEntry = (slug?: string) =>
  journal.find((e) => e.slug === slug);

export const formatDuration = (s: number) =>
  `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export const embedUrl = (e: JournalEntry) =>
  e.provider === "veed"
    ? `https://www.veed.io/embed/${e.videoId}`
    : `https://www.youtube-nocookie.com/embed/${e.videoId}?autoplay=1`;
