import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PillButton, SectionHeader, fadeUp } from "./ui";
import { projects } from "../lib/projects";

const halftone = {
  backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
  backgroundSize: "4px 4px",
};

const Works = () => (
  <section
    id="work"
    aria-labelledby="work-heading"
    className="bg-bg py-12 md:py-16"
  >
    <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
      <SectionHeader
        headingId="work-heading"
        eyebrow="Selected Work"
        heading={
          <>
            Featured <span className="accent-text">projects</span>
          </>
        }
        subtext="Platforms, internal tools, and agents built for clients. Most of this work lives in private repositories. Each case study covers what it does and how it was built."
        action={
          <PillButton href="mailto:anjal.parikh@gmail.com" className="hidden md:inline-flex">
            Ask about a project
          </PillButton>
        }
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: (i % 2) * 0.15 }}
            className={`${project.span}`}
          >
            <Link
              to={`/projects/${project.slug}`}
              className={`group relative block h-full overflow-hidden rounded-3xl border border-stroke bg-surface ${project.aspect}`}
            >
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div
                className="pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply"
                style={halftone}
              />

              <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2 text-xs text-white/80">
                <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 backdrop-blur-md">
                  {project.label}
                </span>
                <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 backdrop-blur-md">
                  {project.year}
                </span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center bg-bg/70 opacity-0 backdrop-blur-lg transition-opacity duration-500 group-hover:opacity-100">
                <span className="relative rounded-full p-[2px] accent-gradient-animated">
                  <span className="flex items-center gap-1.5 rounded-full bg-white px-6 py-3 text-sm text-black">
                    Case study:{" "}
                    <span className="display-tracking font-display text-lg leading-none">
                      {project.title}
                    </span>
                  </span>
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.p
        {...fadeUp}
        className="mt-8 text-center text-xs text-muted md:text-left"
      >
        Most client work sits in private repositories, so the code isn't public.
        Happy to walk through any of it on a call.
      </motion.p>

      <div className="mt-8 flex justify-center md:hidden">
        <PillButton href="mailto:anjal.parikh@gmail.com">
          Ask about a project
        </PillButton>
      </div>
    </div>
  </section>
);

export default Works;
