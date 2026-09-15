export type VideoProvider = "veed" | "youtube" | "self-hosted";

export interface JournalEntry {
  slug: string;
  seriesSlug: string;
  kicker: string;
  title: string;
  durationSec: number;
  provider: VideoProvider;
  videoId?: string;
  videoSrc?: string;
  poster: string;
  posterAnimated?: string;
  blurb: string;
  published: string;
  orientation?: "landscape" | "portrait";
}

export interface LearningSeries {
  slug: string;
  title: string;
  label: string;
  description: string;
  cover: string;
  coverAlt: string;
  previewCount: number;
  entries: JournalEntry[];
}

const claudeBootCamp: LearningSeries = {
  slug: "claude-bootcamp",
  title: "Claude BootCamp",
  label: "Long form",
  description:
    "A practical path through AI operating systems, MCP servers, and native workflows.",
  cover: "/journal/claude-bootcamp-mcp-servers.jpg",
  coverAlt: "Claude BootCamp workshop preview",
  previewCount: 3,
  entries: [
    {
      slug: "ai-operating-system",
      seriesSlug: "claude-bootcamp",
      kicker: "Lesson 1",
      title: "The AI Operating System",
      durationSec: 1051,
      provider: "veed",
      videoId: "e360b206-9073-498c-a21a-b277e0a21f9b",
      poster: "/journal/ai-operating-system.jpg",
      posterAnimated: "/journal/ai-operating-system.gif",
      blurb: "Build a working system around context, tools, and repeatable execution.",
      published: "",
      orientation: "landscape",
    },
    {
      slug: "claude-bootcamp-mcp-servers",
      seriesSlug: "claude-bootcamp",
      kicker: "Lesson 2",
      title: "MCP Servers",
      durationSec: 1320,
      provider: "veed",
      videoId: "219ca302-00f8-4959-99c3-443a90655d52",
      poster: "/journal/claude-bootcamp-mcp-servers.jpg",
      posterAnimated: "/journal/claude-bootcamp-mcp-servers.gif",
      blurb: "Connect Claude to the tools and services that make a workflow useful.",
      published: "",
      orientation: "landscape",
    },
    {
      slug: "ai-native-workflows",
      seriesSlug: "claude-bootcamp",
      kicker: "Lesson 3",
      title: "AI Native Workflows",
      durationSec: 1223,
      provider: "veed",
      videoId: "5ab71fee-ed28-4f20-9261-138bee4c3db5",
      poster: "/journal/ai-native-workflows.jpg",
      posterAnimated: "/journal/ai-native-workflows.gif",
      blurb: "Design workflows around the strengths of the model instead of adding it at the end.",
      published: "",
      orientation: "landscape",
    },
  ],
};

const hermes101: LearningSeries = {
  slug: "hermes-101",
  title: "Hermes 101",
  label: "Event shorts",
  description:
    "Orchestration, reusable skills, memory, context, and the real work they make possible.",
  cover: "/learning/hermes-101/cover.jpg",
  coverAlt: "Anjal presenting Hermes 101 at an event",
  previewCount: 4,
  entries: [
    {
      slug: "three-pillars-of-hermes",
      seriesSlug: "hermes-101",
      kicker: "Lesson 1",
      title: "The Three Pillars of Hermes",
      durationSec: 57,
      provider: "self-hosted",
      videoSrc: "/learning/hermes-101/three-pillars-of-hermes.mp4",
      poster: "/learning/hermes-101/posters/three-pillars-of-hermes.jpg",
      blurb: "A quick framework for orchestration, skills, and memory or context.",
      published: "",
      orientation: "portrait",
    },
    {
      slug: "orchestration-and-subagents",
      seriesSlug: "hermes-101",
      kicker: "Lesson 2",
      title: "Orchestration and Subagents",
      durationSec: 45,
      provider: "self-hosted",
      videoSrc: "/learning/hermes-101/orchestration-and-subagents.mp4",
      poster: "/learning/hermes-101/posters/orchestration-and-subagents.jpg",
      blurb: "Use direct tools and delegated workers as parts of one coordinated process.",
      published: "",
      orientation: "portrait",
    },
    {
      slug: "keeping-main-agent-free",
      seriesSlug: "hermes-101",
      kicker: "Lesson 3",
      title: "Keeping the Main Agent Free",
      durationSec: 51,
      provider: "self-hosted",
      videoSrc: "/learning/hermes-101/keeping-main-agent-free.mp4",
      poster: "/learning/hermes-101/posters/keeping-main-agent-free.jpg",
      blurb: "Move long research into separate context windows so the main conversation stays responsive.",
      published: "",
      orientation: "portrait",
    },
    {
      slug: "how-hermes-selects-skills",
      seriesSlug: "hermes-101",
      kicker: "Lesson 4",
      title: "How Hermes Selects Skills",
      durationSec: 37,
      provider: "self-hosted",
      videoSrc: "/learning/hermes-101/how-hermes-selects-skills.mp4",
      poster: "/learning/hermes-101/posters/how-hermes-selects-skills.jpg",
      blurb: "Match the request to focused operating instructions before the work begins.",
      published: "",
      orientation: "portrait",
    },
    {
      slug: "building-reusable-skills",
      seriesSlug: "hermes-101",
      kicker: "Lesson 5",
      title: "Building Reusable Skills",
      durationSec: 33,
      provider: "self-hosted",
      videoSrc: "/learning/hermes-101/building-reusable-skills.mp4",
      poster: "/learning/hermes-101/posters/building-reusable-skills.jpg",
      blurb: "Capture repeated work, then improve the process until it becomes dependable.",
      published: "",
      orientation: "portrait",
    },
    {
      slug: "memory-and-context-with-obsidian",
      seriesSlug: "hermes-101",
      kicker: "Lesson 6",
      title: "Memory and Context with Obsidian",
      durationSec: 53,
      provider: "self-hosted",
      videoSrc: "/learning/hermes-101/memory-and-context-with-obsidian.mp4",
      poster: "/learning/hermes-101/posters/memory-and-context-with-obsidian.jpg",
      blurb: "Preserve the personal and operating context that should survive individual conversations.",
      published: "",
      orientation: "portrait",
    },
    {
      slug: "delegating-real-work",
      seriesSlug: "hermes-101",
      kicker: "Lesson 7",
      title: "Delegating Real Work",
      durationSec: 83,
      provider: "self-hosted",
      videoSrc: "/learning/hermes-101/delegating-real-work.mp4",
      poster: "/learning/hermes-101/posters/delegating-real-work.jpg",
      blurb: "Apply delegation to travel, email, research, and other substantial tasks.",
      published: "",
      orientation: "portrait",
    },
    {
      slug: "expert-knowledge-to-campaign",
      seriesSlug: "hermes-101",
      kicker: "Lesson 8",
      title: "Turning Expert Knowledge into a Campaign",
      durationSec: 40,
      provider: "self-hosted",
      videoSrc: "/learning/hermes-101/expert-knowledge-to-campaign.mp4",
      poster: "/learning/hermes-101/posters/expert-knowledge-to-campaign.jpg",
      blurb: "Turn captured expert material into a practical campaign for a product launch.",
      published: "",
      orientation: "portrait",
    },
  ],
};

export const learningSeries: LearningSeries[] = [claudeBootCamp, hermes101];
export const journal = learningSeries.flatMap((series) => series.entries);

export const getSeries = (slug?: string) =>
  learningSeries.find((series) => series.slug === slug);

export const getEntry = (slug?: string) =>
  journal.find((entry) => entry.slug === slug);

export const getAdjacentEntries = (slug?: string) => {
  const entry = getEntry(slug);
  if (!entry) return { previous: undefined, next: undefined };

  const series = getSeries(entry.seriesSlug);
  const index = series?.entries.findIndex((candidate) => candidate.slug === slug) ?? -1;

  return {
    previous: index > 0 ? series?.entries[index - 1] : undefined,
    next:
      series && index >= 0 && index < series.entries.length - 1
        ? series.entries[index + 1]
        : undefined,
  };
};

export const getSeriesDuration = (series: LearningSeries) =>
  series.entries.reduce((total, entry) => total + entry.durationSec, 0);

export const formatDuration = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

export const formatSeriesDuration = (seconds: number) => {
  if (seconds < 600) {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${minutes} min ${remainder} sec`;
  }

  return `${Math.round(seconds / 60)} min`;
};

export const embedUrl = (entry: JournalEntry) => {
  if (entry.provider === "veed") {
    return `https://www.veed.io/embed/${entry.videoId}`;
  }
  if (entry.provider === "youtube") {
    return `https://www.youtube-nocookie.com/embed/${entry.videoId}?autoplay=1`;
  }
  return entry.videoSrc ?? "";
};
