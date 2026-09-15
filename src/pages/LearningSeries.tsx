import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { fadeUp } from "../components/ui";
import { useSeo } from "../hooks/useSeo";
import {
  formatDuration,
  formatSeriesDuration,
  getSeries,
  getSeriesDuration,
} from "../lib/journal";
import { siteConfig } from "../lib/siteConfig";

const LearningSeriesPage = () => {
  const { seriesSlug } = useParams();
  const series = getSeries(seriesSlug);

  useSeo({
    title: series ? `${series.title} | ${siteConfig.name}` : `Learning | ${siteConfig.name}`,
    description: series?.description ?? siteConfig.description,
    path: `/learning/${seriesSlug ?? ""}`,
  });

  if (!series) return <Navigate to="/" replace />;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1100px] px-6 pb-24 pt-36 md:px-10">
        <motion.header {...fadeUp} className="mb-12">
          <Link
            to="/#journal"
            className="mb-6 inline-block text-xs text-muted uppercase tracking-[0.3em] transition-colors hover:text-text-primary"
          >
            ← Learning in Public
          </Link>
          <span className="mb-3 block text-xs text-muted uppercase tracking-[0.3em]">
            {series.entries.length} lessons · {formatSeriesDuration(getSeriesDuration(series))}
          </span>
          <h1 className="display-tracking font-display text-6xl leading-none text-text-primary md:text-8xl">
            {series.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            {series.description}
          </p>
        </motion.header>

        <section aria-label={`${series.title} lessons`} className="grid gap-5 md:grid-cols-2">
          {series.entries.map((entry, index) => (
            <motion.article
              key={entry.slug}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.05 }}
            >
              <Link
                to={`/journal/${entry.slug}`}
                aria-label={`Lesson ${index + 1}: ${entry.title}`}
                className="group grid min-h-full grid-cols-[120px_1fr] overflow-hidden rounded-3xl border border-stroke bg-surface/30 transition-colors duration-300 hover:bg-surface sm:grid-cols-[150px_1fr]"
              >
                <span className="relative min-h-[180px] overflow-hidden bg-surface">
                  <img
                    src={entry.poster}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-bg/15 transition-colors duration-300 group-hover:bg-bg/35" />
                  <span className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[11px] text-white backdrop-blur-md">
                    {formatDuration(entry.durationSec)}
                  </span>
                </span>
                <span className="flex flex-col justify-between p-5">
                  <span>
                    <span className="mb-3 block text-xs text-muted uppercase tracking-[0.3em]">
                      Lesson {index + 1}
                    </span>
                    <span className="block text-xl leading-snug text-text-primary">
                      {entry.title}
                    </span>
                    <span className="mt-3 block text-sm leading-relaxed text-muted">
                      {entry.blurb}
                    </span>
                  </span>
                  <span className="mt-5 text-sm text-text-primary transition-transform duration-300 group-hover:translate-x-1">
                    Watch lesson →
                  </span>
                </span>
              </Link>
            </motion.article>
          ))}
        </section>
      </main>
    </>
  );
};

export default LearningSeriesPage;
