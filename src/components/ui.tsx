import type { ReactNode } from "react";
import { motion } from "framer-motion";

export const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
  viewport: { once: true, margin: "-100px" },
};

interface PillButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export const PillButton = ({
  href,
  onClick,
  children,
  className = "",
}: PillButtonProps) => {
  const Tag = href ? "a" : "button";
  const isExternal = href?.startsWith("http");
  return (
    <Tag
      href={href}
      onClick={onClick}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className={`group relative rounded-full transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <span
        className="absolute rounded-full accent-gradient-animated opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ inset: "-2px" }}
        aria-hidden
      />
      <span className="relative flex items-center gap-2 rounded-full border border-stroke bg-surface px-6 py-3 text-sm text-text-primary transition-colors duration-300 group-hover:border-transparent">
        {children}
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Tag>
  );
};

interface SectionHeaderProps {
  eyebrow: string;
  heading: ReactNode;
  subtext: string;
  action?: ReactNode;
  center?: boolean;
  headingId?: string;
}

export const SectionHeader = ({
  eyebrow,
  heading,
  subtext,
  action,
  center = false,
  headingId,
}: SectionHeaderProps) => (
  <motion.div
    {...fadeUp}
    className={`mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-8 ${
      center ? "flex-col items-center text-center" : ""
    }`}
  >
    <div className={center ? "flex flex-col items-center" : ""}>
      <span className="mb-2 block text-xs text-muted uppercase tracking-[0.3em]">
        {eyebrow}
      </span>
      <h2
        id={headingId}
        className="display-tracking mb-2 font-display text-5xl leading-none text-text-primary md:text-6xl lg:text-7xl"
      >
        {heading}
      </h2>
      <p className="max-w-md text-sm text-muted md:text-base">{subtext}</p>
    </div>
    {action}
  </motion.div>
);
