import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PillButton } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const EVENTS = [
  {
    title: "AI Build & Consult Night",
    meta: "Co-host · The Copper Wall · Sep 2026",
    url: "https://luma.com/ad1xtvpz",
    rotation: "-rotate-3",
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
    rotation: "rotate-3",
    image: "/events/agent-builders-buildathon.jpg",
  },
  {
    title: "Dallas Startup Week Happy Hour",
    meta: "Co-host · Dallas · Aug 2026",
    url: "https://luma.com/aitx-pe7z",
    rotation: "-rotate-2",
    image: "/events/dallas-startup-week.jpg",
  },
  {
    title: "Websites with ChatGPT Codex",
    meta: "Co-host · Online workshop · Aug 2026",
    url: "https://luma.com/g8mtiu30",
    rotation: "rotate-1",
    image: "/events/chatgpt-codex-workshop.jpg",
  },
  {
    title: "AI & Automation Night",
    meta: "Co-host · Highland Village · Aug 2026",
    url: "https://luma.com/8hb79w4s",
    rotation: "-rotate-1",
    image: "/events/ai-automation-night.jpg",
  },
  {
    title: "ClawPlex × FWTX DAO",
    meta: "Co-host · The DEC Network, Fort Worth · Jul 2026",
    url: "https://luma.com/evimcn31",
    rotation: "rotate-2",
    image: "/events/clawplex-fwtx-dao.jpg",
  },
  {
    title: "Hermes Agent Night",
    meta: "Co-host & speaker · Spark Coworking, Arlington · Jun 2026",
    url: "https://luma.com/di2osni7",
    rotation: "-rotate-3",
    image: "/events/hermes-agent-night.jpg",
  },
  {
    title: "Claude, OpenAI & The Tools",
    meta: "Co-host · ClawPlex · Jun 2026",
    url: "https://luma.com/7lcfouly",
    rotation: "rotate-3",
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

const LEFT_COLUMN = EVENTS.filter((_, i) => i % 2 === 0);
const RIGHT_COLUMN = EVENTS.filter((_, i) => i % 2 === 1);

const EVENTS_URL = "https://luma.com/agentbuildersclub";

const Events = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<(typeof EVENTS)[number] | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(leftColRef.current, {
        y: -900,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(rightColRef.current, {
        y: -1350,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="events"
      ref={sectionRef}
      aria-labelledby="events-heading"
      className="relative min-h-[2800px] bg-bg"
    >
      <div className="sticky top-0 z-10 flex h-screen flex-col items-center justify-center px-6 text-center">
        <span className="mb-4 block text-xs text-muted uppercase tracking-[0.3em]">
          Events
        </span>
        <h2
          id="events-heading"
          className="display-tracking mb-4 font-display text-5xl leading-none text-text-primary md:text-6xl lg:text-7xl"
        >
          Events I've <span className="accent-text">hosted</span>
        </h2>
        <p className="mb-8 max-w-md text-sm text-muted md:text-base">
          Co-organizer of the Agent Builders Club and ClawPlex. Eleven build nights,
          talks, and hack sessions across the DFW AI scene this year.
        </p>
        <PillButton href={EVENTS_URL}>See upcoming events</PillButton>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        <div className="mx-auto grid h-full max-w-[1400px] grid-cols-2 gap-12 px-6 md:gap-40 md:px-12">
          <div
            ref={leftColRef}
            className="flex flex-col items-start gap-20 pt-[500px] md:gap-24"
          >
            {LEFT_COLUMN.map((item) => (
              <button
                key={item.title}
                onClick={() => setLightbox(item)}
                aria-label={`View ${item.title}`}
                className={`pointer-events-auto group w-full max-w-[320px] overflow-hidden rounded-2xl border border-stroke bg-surface shadow-2xl shadow-black/40 transition-transform duration-500 hover:scale-105 hover:rotate-0 ${item.rotation}`}
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

          <div
            ref={rightColRef}
            className="flex flex-col items-end gap-20 pt-[780px] md:gap-24"
          >
            {RIGHT_COLUMN.map((item) => (
              <button
                key={item.title}
                onClick={() => setLightbox(item)}
                aria-label={`View ${item.title}`}
                className={`pointer-events-auto group w-full max-w-[320px] overflow-hidden rounded-2xl border border-stroke bg-surface shadow-2xl shadow-black/40 transition-transform duration-500 hover:scale-105 hover:rotate-0 ${item.rotation}`}
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
