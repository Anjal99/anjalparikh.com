import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SectionHeader, fadeUp } from "./ui";
import { formatDuration, journal } from "../lib/journal";

const Journal = () => (
  <section
    id="journal"
    aria-labelledby="journal-heading"
    className="bg-bg pt-4 pb-16 md:pt-6 md:pb-24"
  >
    <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
      <SectionHeader
        headingId="journal-heading"
        eyebrow="Journal"
        heading={
          <>
            Learning in <span className="accent-text">public</span>
          </>
        }
        subtext="Short lessons on building with AI. Recorded walkthroughs of the tools and workflows I actually use."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {journal.map((entry, i) => (
          <motion.div
            key={entry.slug}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: i * 0.1 }}
          >
            <Link
              to={`/journal/${entry.slug}`}
              className="group block overflow-hidden rounded-3xl border border-stroke bg-surface/30 transition-colors duration-300 hover:bg-surface"
            >
              <span className="relative block aspect-video overflow-hidden">
                <img
                  src={entry.poster}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-bg/25 transition-colors duration-300 group-hover:bg-bg/45" />
                <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="relative rounded-full p-[2px] accent-gradient-animated">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bg text-sm text-text-primary">
                      ▶
                    </span>
                  </span>
                </span>
                <span className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[11px] text-white backdrop-blur-md">
                  {formatDuration(entry.durationSec)}
                </span>
              </span>

              <span className="block p-5">
                <span className="mb-2 block text-xs text-muted uppercase tracking-[0.3em]">
                  {entry.kicker}
                </span>
                <span className="block text-lg leading-snug text-text-primary">
                  {entry.title}
                </span>
                {entry.blurb && (
                  <span className="mt-2 block text-sm leading-relaxed text-muted">
                    {entry.blurb}
                  </span>
                )}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Journal;
