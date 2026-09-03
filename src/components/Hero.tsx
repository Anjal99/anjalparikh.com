import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { HLS_SRC, useHlsVideo } from "../hooks/useHlsVideo";
import { mailto, siteConfig } from "../lib/siteConfig";

const ROLES = siteConfig.roles;

interface HeroProps {
  started: boolean;
}

const Hero = ({ started }: HeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useHlsVideo(HLS_SRC);
  const [roleIndex, setRoleIndex] = useState(0);
  const role = ROLES[roleIndex];
  const article = /^[aeiou]/i.test(role) ? "An" : "A";

  useEffect(() => {
    const interval = window.setInterval(
      () => setRoleIndex((i) => (i + 1) % ROLES.length),
      2000
    );
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!started) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      );
      tl.fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1 },
        0.3
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [started]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute left-1/2 top-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <h1
          className="name-reveal display-tracking mb-6 font-display text-[5.85rem] leading-[0.85] text-text-primary md:text-[7.8rem] lg:text-[10.4rem]"
          style={{ opacity: 0 }}
        >
          {siteConfig.name}
        </h1>

        <p
          className="blur-in mb-4 text-base text-muted md:text-lg"
          style={{ opacity: 0 }}
        >
          {article}{" "}
          <span
            key={roleIndex}
            className="inline-block animate-role-fade-in font-medium text-text-primary"
          >
            {role}
          </span>{" "}
          lives in {siteConfig.location}.
        </p>

        <p
          className="blur-in mb-12 max-w-md text-sm text-muted md:text-base"
          style={{ opacity: 0 }}
        >
          {siteConfig.tagline}
        </p>

        <div className="blur-in inline-flex gap-4" style={{ opacity: 0 }}>
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("work")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative rounded-full p-[2px] transition-transform duration-300 hover:scale-105"
          >
            <span
              className="absolute inset-0 rounded-full rainbow-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden
            />
            <span className="relative block rounded-full bg-text-primary px-7 py-3.5 text-sm font-medium text-bg transition-colors duration-300 group-hover:bg-bg group-hover:text-text-primary">
              See Works
            </span>
          </a>

          <a
            href={mailto}
            className="group relative rounded-full transition-transform duration-300 hover:scale-105"
          >
            <span
              className="absolute rounded-full accent-gradient-animated opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ inset: "-2px" }}
              aria-hidden
            />
            <span className="relative block rounded-full border-2 border-stroke bg-bg px-7 py-3.5 text-sm font-medium text-text-primary transition-colors duration-300 group-hover:border-transparent">
              Reach out
            </span>
          </a>
        </div>

        <div
          className="blur-in mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          style={{ opacity: 0 }}
        >
          {siteConfig.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-surface/60 px-5 py-3 backdrop-blur-md"
            >
              <span className="display-tracking font-display text-3xl leading-none text-text-primary">
                {stat.value}
              </span>
              <span className="text-left text-[11px] uppercase leading-tight tracking-[0.18em] text-muted">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
