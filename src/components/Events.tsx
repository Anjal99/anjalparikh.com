import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PillButton, SectionHeader } from "./ui";

const EVENTS = [
  {
    title: "AI Build & Consult Night",
    meta: "Co-host · The Copper Wall · Sep 2026",
    url: "https://luma.com/ad1xtvpz",
    rotation: "-rotate-2",
    image: "/events/ai-build-consult-night.jpg",
  },
  {
    title: "AITX Dallas Mixer",
    meta: "Host · Plug and Play · Aug 2026",
    url: "https://luma.com/s0zglrwf",
    rotation: "rotate-2",
    image: "/events/aitx-dallas-mixer.jpg",
  },
  {
    title: "Agent Builders Build-a-thon",
    meta: "Co-host · The Copper Wall · Aug 2026",
    url: "https://luma.com/o0jfobup",
    rotation: "rotate-1",
    image: "/events/agent-builders-buildathon.jpg",
  },
  {
    title: "Dallas Startup Week Happy Hour",
    meta: "Co-host · Dallas · Aug 2026",
    url: "https://luma.com/aitx-pe7z",
    rotation: "-rotate-1",
    image: "/events/dallas-startup-week.jpg",
  },
  {
    title: "Websites with ChatGPT Codex",
    meta: "Co-host · Online workshop · Aug 2026",
    url: "https://luma.com/g8mtiu30",
    rotation: "rotate-2",
    image: "/events/chatgpt-codex-workshop.jpg",
  },
  {
    title: "AI & Automation Night",
    meta: "Co-host · Highland Village · Aug 2026",
    url: "https://luma.com/8hb79w4s",
    rotation: "-rotate-2",
    image: "/events/ai-automation-night.jpg",
  },
  {
    title: "ClawPlex × FWTX DAO",
    meta: "Co-host · The DEC Network, Fort Worth · Jul 2026",
    url: "https://luma.com/evimcn31",
    rotation: "rotate-1",
    image: "/events/clawplex-fwtx-dao.jpg",
  },
  {
    title: "Hermes Agent Night",
    meta: "Co-host & speaker · Spark Coworking, Arlington · Jun 2026",
    url: "https://luma.com/di2osni7",
    rotation: "-rotate-1",
    image: "/events/hermes-agent-night.jpg",
  },
  {
    title: "Claude, OpenAI & The Tools",
    meta: "Co-host · ClawPlex · Jun 2026",
    url: "https://luma.com/7lcfouly",
    rotation: "rotate-2",
    image: "/events/claude-openai-tools.jpg",
  },
  {
    title: "AITX Community DFW Meetup",
    meta: "Co-host · Plug and Play · May 2026",
    url: "https://luma.com/aitx-dfw-may26",
    rotation: "-rotate-2",
    image: "/events/aitx-dfw-meetup.jpg",
  },
  {
    title: "Claude In The Wild",
    meta: "Co-host · 25N Coworking Frisco · May 2026",
    url: "https://luma.com/u3e9qs8i",
    rotation: "rotate-1",
    image: "/events/claude-in-the-wild.jpg",
  },
];

const EVENTS_URL = "https://luma.com/agentbuildersclub";

const Events = () => {
  const [lightbox, setLightbox] = useState<(typeof EVENTS)[number] | null>(null);

  return (
    <section
      id="events"
      aria-labelledby="events-heading"
      className="bg-bg py-8 md:py-10"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          headingId="events-heading"
          eyebrow="Events"
          heading={
            <>
              Events I've <span className="accent-text">hosted</span>
            </>
          }
          subtext="Co-organizer of the Agent Builders Club and ClawPlex. Eleven build nights, talks, and hack sessions across the DFW AI scene this year."
          action={<PillButton href={EVENTS_URL}>See upcoming events</PillButton>}
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-3">
          {EVENTS.map((item) => (
            <button
              key={item.title}
              onClick={() => setLightbox(item)}
              aria-label={`View ${item.title}`}
              className={`group overflow-hidden rounded-2xl border border-stroke bg-surface shadow-lg shadow-black/30 transition-transform duration-500 hover:scale-105 hover:rotate-0 ${item.rotation}`}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[999] flex cursor-zoom-out items-center justify-center bg-bg/90 p-6 backdrop-blur-lg"
          >
            <motion.figure
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col items-center gap-4"
            >
              <img
                src={lightbox.image}
                alt={lightbox.title}
                className="max-h-[75vh] max-w-full rounded-2xl border border-stroke object-contain"
              />
              <figcaption className="text-center">
                <span className="display-tracking block font-display text-2xl leading-none text-text-primary">
                  {lightbox.title}
                </span>
                <span className="mt-2 block text-xs text-muted">{lightbox.meta}</span>
                <a
                  href={lightbox.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-3 inline-block text-xs text-text-primary underline underline-offset-4 hover:text-muted"
                >
                  View on Luma ↗
                </a>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Events;
