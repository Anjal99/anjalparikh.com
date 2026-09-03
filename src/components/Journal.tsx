import { motion } from "framer-motion";
import { PillButton, SectionHeader, fadeUp } from "./ui";

const ENTRIES = [
  {
    title: "Designing with restraint",
    readTime: "4 min read",
    date: "Aug 2026",
    image:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=400&q=80",
  },
  {
    title: "The case for motion in interfaces",
    readTime: "6 min read",
    date: "Jul 2026",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80",
  },
  {
    title: "Systems over screens",
    readTime: "5 min read",
    date: "May 2026",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80",
  },
  {
    title: "Notes on typography at scale",
    readTime: "8 min read",
    date: "Mar 2026",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&q=80",
  },
];

const Journal = () => (
  <section
    id="journal"
    aria-labelledby="journal-heading"
    className="bg-bg py-8 md:py-10"
  >
    <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
      <SectionHeader
        headingId="journal-heading"
        eyebrow="Journal"
        heading={
          <>
            Recent <span className="accent-text">thoughts</span>
          </>
        }
        subtext="Occasional writing on design, engineering, and the space between."
        action={
          <PillButton href="#" className="hidden md:inline-flex">
            View all
          </PillButton>
        }
      />

      <div className="flex flex-col gap-2">
        {ENTRIES.map((entry, i) => (
          <motion.a
            key={entry.title}
            href="#"
            onClick={(e) => e.preventDefault()}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: i * 0.08 }}
            className="group flex items-center gap-6 rounded-[40px] border border-stroke bg-surface/30 p-4 transition-colors duration-300 hover:bg-surface sm:rounded-full"
          >
            <img
              src={entry.image}
              alt=""
              loading="lazy"
              className="h-16 w-16 shrink-0 rounded-full border border-stroke object-cover sm:h-20 sm:w-20"
            />
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base text-text-primary transition-colors duration-300 sm:text-xl">
                {entry.title}
              </h3>
              <p className="mt-1 text-xs text-muted sm:hidden">
                {entry.readTime} · {entry.date}
              </p>
            </div>
            <div className="ml-auto hidden shrink-0 items-center gap-6 pr-4 text-xs text-muted sm:flex">
              <span>{entry.readTime}</span>
              <span>{entry.date}</span>
              <span className="text-base text-text-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                →
              </span>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="mt-6 flex justify-center md:hidden">
        <PillButton href="#">View all</PillButton>
      </div>
    </div>
  </section>
);

export default Journal;
