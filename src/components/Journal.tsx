import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SectionHeader, fadeUp } from "./ui";
import {
  formatDuration,
  formatSeriesDuration,
  getSeriesDuration,
  learningSeries,
} from "../lib/journal";

const Journal = () => {
  const [activeSlug, setActiveSlug] = useState(learningSeries[0].slug);
  const activeSeries =
    learningSeries.find((series) => series.slug === activeSlug) ?? learningSeries[0];
  const preview = activeSeries.entries.slice(0, activeSeries.previewCount);
  const isPartialPreview = preview.length < activeSeries.entries.length;

  return (
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
          subtext="Notes from building, teaching, and testing the tools I use. Choose a series, then follow it in order."
        />

        <motion.div
          {...fadeUp}
          className="grid min-h-[480px] overflow-hidden rounded-3xl border border-stroke bg-surface/30 md:grid-cols-[40%_60%]"
        >
          <div className="relative min-h-[300px] overflow-hidden md:min-h-full">
            <img
              key={activeSeries.cover}
              src={activeSeries.cover}
              alt={activeSeries.coverAlt}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent md:bg-gradient-to-r md:from-transparent md:via-bg/20 md:to-surface" />
            <div className="absolute bottom-7 left-7 z-10">
              <span className="block text-[11px] text-muted uppercase tracking-[0.3em]">
                Currently viewing
              </span>
              <span className="display-tracking mt-2 block font-display text-4xl leading-none text-text-primary md:text-5xl">
                {activeSeries.title}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div
              className="flex flex-wrap gap-2 border-b border-stroke pb-6"
              aria-label="Learning series"
            >
              {learningSeries.map((series) => {
                const isActive = series.slug === activeSeries.slug;
                return (
                  <button
                    key={series.slug}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveSlug(series.slug)}
                    className={`rounded-full border px-4 py-2.5 text-xs font-medium transition-colors duration-300 ${
                      isActive
                        ? "border-text-primary bg-text-primary text-bg"
                        : "border-stroke bg-surface text-muted hover:text-text-primary"
                    }`}
                  >
                    {series.title}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 py-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="block text-[11px] text-muted uppercase tracking-[0.3em]">
                  {activeSeries.entries.length} lessons ·{" "}
                  {formatSeriesDuration(getSeriesDuration(activeSeries))}
                </span>
                <h3 className="display-tracking mt-2 font-display text-5xl leading-none text-text-primary md:text-6xl">
                  {activeSeries.title}
                </h3>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-muted">
                {activeSeries.description}
              </p>
            </div>

            <div className="border-t border-stroke">
              {preview.map((entry, index) => (
                <Link
                  key={entry.slug}
                  to={`/journal/${entry.slug}`}
                  className="group grid grid-cols-[36px_1fr_auto] items-center gap-3 border-b border-stroke px-1 py-3.5 transition-all duration-300 hover:pl-2 hover:text-[#89aacc]"
                >
                  <span className="font-display text-xl text-[#668db7]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium">{entry.title}</span>
                  <span className="text-xs text-muted">
                    {formatDuration(entry.durationSec)}
                  </span>
                </Link>
              ))}
            </div>

            <div className="flex items-center justify-between pt-5">
              <span className="text-xs text-muted">
                {isPartialPreview
                  ? `Previewing ${preview.length} of ${activeSeries.entries.length} lessons`
                  : "View the complete series"}
              </span>
              <Link
                to={`/learning/${activeSeries.slug}`}
                aria-label={`View ${activeSeries.title}`}
                className="group flex items-center gap-3 text-sm text-text-primary"
              >
                View series
                <span className="grid h-9 w-9 place-items-center rounded-full bg-text-primary text-bg transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Journal;
