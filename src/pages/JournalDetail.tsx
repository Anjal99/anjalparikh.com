import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import VideoEmbed from "../components/VideoEmbed";
import { fadeUp } from "../components/ui";
import { useSeo } from "../hooks/useSeo";
import { formatDuration, getEntry, journal } from "../lib/journal";
import { siteConfig } from "../lib/siteConfig";

const JournalDetail = () => {
  const { slug } = useParams();
  const entry = getEntry(slug);

  useSeo({
    title: entry ? `${entry.title} | ${siteConfig.name}` : `Journal | ${siteConfig.name}`,
    description:
      entry?.blurb ||
      (entry ? `${entry.kicker}: ${entry.title}. A recorded lesson on building with AI.` : siteConfig.description),
    path: `/journal/${slug ?? ""}`,
  });

  if (!entry) return <Navigate to="/" replace />;

  const idx = journal.findIndex((e) => e.slug === entry.slug);
  const next = journal[(idx + 1) % journal.length];

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[900px] px-6 pb-24 pt-36 md:px-10">
        <motion.header {...fadeUp} className="mb-10">
          <Link
            to="/#journal"
            className="mb-6 inline-block text-xs text-muted uppercase tracking-[0.3em] transition-colors hover:text-text-primary"
          >
            ← All lessons
          </Link>
          <span className="mb-3 block text-xs text-muted uppercase tracking-[0.3em]">
            {entry.kicker} · {formatDuration(entry.durationSec)}
          </span>
          <h1 className="display-tracking font-display text-5xl leading-none text-text-primary md:text-6xl">
            {entry.title}
          </h1>
          {entry.blurb && (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              {entry.blurb}
            </p>
          )}
        </motion.header>

        <motion.div {...fadeUp} className="mb-12">
          <VideoEmbed entry={entry} />
        </motion.div>

        <motion.div
          {...fadeUp}
          className="border-t border-stroke pt-8"
        >
          <span className="mb-2 block text-xs text-muted uppercase tracking-[0.3em]">
            Next lesson
          </span>
          <Link
            to={`/journal/${next.slug}`}
            className="display-tracking font-display text-3xl leading-none text-text-primary transition-colors hover:text-muted md:text-4xl"
          >
            {next.title} →
          </Link>
        </motion.div>
      </main>
    </>
  );
};

export default JournalDetail;
