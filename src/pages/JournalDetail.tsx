import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import VideoEmbed from "../components/VideoEmbed";
import { fadeUp } from "../components/ui";
import { useSeo } from "../hooks/useSeo";
import {
  formatDuration,
  getAdjacentEntries,
  getEntry,
  getSeries,
} from "../lib/journal";
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

  const series = getSeries(entry.seriesSlug);
  const { previous, next } = getAdjacentEntries(entry.slug);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[900px] px-6 pb-24 pt-36 md:px-10">
        <motion.header {...fadeUp} className="mb-10">
          <Link
            to={`/learning/${entry.seriesSlug}`}
            className="mb-6 inline-block text-xs text-muted uppercase tracking-[0.3em] transition-colors hover:text-text-primary"
          >
            ← Back to {series?.title ?? "all lessons"}
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

        <motion.div {...fadeUp} className="grid gap-6 border-t border-stroke pt-8 sm:grid-cols-2">
          <div>
            {previous && (
              <Link
                to={`/journal/${previous.slug}`}
                aria-label={`Previous lesson: ${previous.title}`}
                className="group block"
              >
                <span className="mb-2 block text-xs text-muted uppercase tracking-[0.3em]">
                  Previous lesson
                </span>
                <span className="display-tracking font-display text-3xl leading-none text-text-primary transition-colors group-hover:text-muted md:text-4xl">
                  ← {previous.title}
                </span>
              </Link>
            )}
          </div>
          <div className="sm:text-right">
            {next && (
              <Link
                to={`/journal/${next.slug}`}
                aria-label={`Next lesson: ${next.title}`}
                className="group block"
              >
                <span className="mb-2 block text-xs text-muted uppercase tracking-[0.3em]">
                  Next lesson
                </span>
                <span className="display-tracking font-display text-3xl leading-none text-text-primary transition-colors group-hover:text-muted md:text-4xl">
                  {next.title} →
                </span>
              </Link>
            )}
          </div>
        </motion.div>
      </main>
    </>
  );
};

export default JournalDetail;
