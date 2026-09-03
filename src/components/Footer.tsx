import { motion } from "framer-motion";
import { HLS_SRC, useHlsVideo } from "../hooks/useHlsVideo";
import { mailto, siteConfig } from "../lib/siteConfig";
import { fadeUp } from "./ui";

const Footer = () => {
  const videoRef = useHlsVideo(HLS_SRC);
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-bg pt-16 md:pt-20 pb-8 md:pb-12"
    >
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute left-1/2 top-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 scale-y-[-1] object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg to-transparent" />
      </div>

      <div className="relative z-10">
        <motion.div
          {...fadeUp}
          className="mx-auto flex max-w-[1200px] flex-col items-center px-6 py-16 text-center md:py-24"
        >
          <span className="mb-4 text-xs text-muted uppercase tracking-[0.3em]">
            Got a project in mind?
          </span>
          <h2 className="display-tracking mb-10 max-w-3xl font-display text-5xl leading-none text-text-primary md:text-6xl lg:text-7xl">
            Let's make something{" "}
            <span className="accent-text">worth remembering</span>
          </h2>

          <a
            href={mailto}
            className="group relative rounded-full transition-transform duration-300 hover:scale-105"
          >
            <span
              className="absolute rounded-full accent-gradient-animated opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ inset: "-2px" }}
              aria-hidden
            />
            <span className="relative flex items-center gap-2 rounded-full bg-text-primary px-8 py-4 text-sm font-medium text-bg transition-colors duration-300 group-hover:bg-bg group-hover:text-text-primary">
              {siteConfig.email}
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </span>
          </a>
        </motion.div>

        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 border-t border-white/10 px-6 pt-8 sm:flex-row">
          <span className="text-xs text-muted">
            © 2026 {siteConfig.name}. All rights reserved.
          </span>

          <nav aria-label="Social links" className="flex items-center gap-5">
            {siteConfig.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted transition-colors duration-300 hover:text-text-primary"
              >
                {social.label}
              </a>
            ))}
          </nav>

          <span className="flex items-center gap-2.5 text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Open to opportunities
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
