import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { PillButton, fadeUp } from "../components/ui";
import { useSeo } from "../hooks/useSeo";
import { getProject, projects } from "../lib/projects";
import { mailto, siteConfig } from "../lib/siteConfig";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = getProject(slug);

  useSeo({
    title: project
      ? `${project.title} | ${siteConfig.name}`
      : `Project | ${siteConfig.name}`,
    description: project?.blurb ?? siteConfig.description,
    path: `/projects/${slug ?? ""}`,
  });

  if (!project) return <Navigate to="/" replace />;

  const next =
    projects[(projects.findIndex((p) => p.slug === project.slug) + 1) % projects.length];

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[900px] px-6 pb-24 pt-36 md:px-10">
        <motion.header {...fadeUp} className="mb-12">
          <Link
            to="/#work"
            className="mb-6 inline-block text-xs text-muted uppercase tracking-[0.3em] transition-colors hover:text-text-primary"
          >
            ← All work
          </Link>
          <h1 className="display-tracking mb-4 font-display text-5xl leading-none text-text-primary md:text-6xl">
            {project.title}
          </h1>
          <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted">
            <span className="rounded-full border border-stroke bg-surface px-3 py-1">
              {project.label}
            </span>
            <span className="rounded-full border border-stroke bg-surface px-3 py-1">
              {project.year}
            </span>
            <span className="rounded-full border border-stroke bg-surface px-3 py-1">
              {project.repo ? "Public repository" : "Private repository"}
            </span>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-muted">
            {project.blurb || "Case study write-up coming soon."}
          </p>
        </motion.header>

        <motion.img
          {...fadeUp}
          src={project.image}
          alt={project.title}
          className="mb-14 w-full rounded-3xl border border-stroke"
        />

        {project.highlights.length > 0 && (
        <motion.section {...fadeUp} className="mb-14">
          <h2 className="display-tracking mb-6 font-display text-3xl leading-none text-text-primary">
            What it <span className="accent-text">does</span>
          </h2>
          <ul className="flex max-w-2xl flex-col gap-4">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span
                  aria-hidden
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted"
                />
                {h}
              </li>
            ))}
          </ul>
        </motion.section>
        )}

        {project.stack.length > 0 && (
        <motion.section {...fadeUp} className="mb-14">
          <h2 className="display-tracking mb-6 font-display text-3xl leading-none text-text-primary">
            Built <span className="accent-text">with</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-stroke bg-surface px-4 py-2 text-xs text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.section>
        )}

        <motion.section
          {...fadeUp}
          className="flex flex-col gap-6 border-t border-stroke pt-10 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-md text-xs leading-relaxed text-muted">
            {project.repo
              ? "Source is public. See the repository for implementation detail."
              : "This was client work, so the repository is private. Happy to walk through the architecture and code on a call."}
          </p>
          <div className="flex flex-wrap gap-3">
            {project.url && <PillButton href={project.url}>Visit site</PillButton>}
            {project.repo && <PillButton href={project.repo}>View repo</PillButton>}
            <PillButton href={mailto}>Get in touch</PillButton>
          </div>
        </motion.section>

        <motion.div {...fadeUp} className="mt-16 border-t border-stroke pt-8">
          <span className="mb-2 block text-xs text-muted uppercase tracking-[0.3em]">
            Next project
          </span>
          <Link
            to={`/projects/${next.slug}`}
            className="display-tracking font-display text-3xl leading-none text-text-primary transition-colors hover:text-muted md:text-4xl"
          >
            {next.title} →
          </Link>
        </motion.div>
      </main>
    </>
  );
};

export default ProjectDetail;
