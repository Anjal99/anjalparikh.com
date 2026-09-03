import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { mailto, siteConfig } from "../lib/siteConfig";

const NAV_LINKS = [
  { label: "Home", target: "home" },
  { label: "Work", target: "work" },
  { label: "Events", target: "events" },
  { label: "Resume", target: "/resume" },
] as const;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
      const work = document.getElementById("work");
      const events = document.getElementById("events");
      const threshold = window.innerHeight / 2;
      if (events && window.scrollY >= events.offsetTop - threshold) {
        setActiveSection("events");
      } else if (work && window.scrollY >= work.offsetTop - threshold) {
        setActiveSection("work");
      } else {
        setActiveSection("home");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const scrollToSection = useCallback(
    (target: string) => {
      const scroll = () => {
        if (target === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          document
            .getElementById(target)
            ?.scrollIntoView({ behavior: "smooth" });
        }
      };
      if (location.pathname !== "/") {
        navigate("/");
        window.setTimeout(scroll, 450);
      } else {
        scroll();
      }
    },
    [location.pathname, navigate]
  );

  const isActive = (link: (typeof NAV_LINKS)[number]) =>
    link.target === "/resume"
      ? location.pathname === "/resume"
      : location.pathname === "/" && activeSection === link.target;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <nav
        aria-label="Primary"
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-black/10" : ""
        }`}
      >
        <button
          onClick={() => scrollToSection("home")}
          aria-label="Back to top"
          className="group relative h-9 w-9 shrink-0 rounded-full p-[2px] transition-transform duration-300 hover:scale-110"
        >
          <span className="absolute inset-0 rounded-full accent-gradient transition-opacity duration-300 group-hover:opacity-0" />
          <span
            className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: "linear-gradient(270deg, #89AACC 0%, #4E85BF 100%)",
            }}
          />
          <span className="relative flex h-full w-full items-center justify-center rounded-full bg-bg font-display text-[15px] leading-none tracking-[0.05em] text-text-primary">
            {siteConfig.initials}
          </span>
        </button>

        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        {NAV_LINKS.map((link) => (
          <button
            key={link.label}
            onClick={() =>
              link.target === "/resume"
                ? navigate("/resume")
                : scrollToSection(link.target)
            }
            className={`rounded-full px-3 py-1.5 text-xs transition-colors duration-300 sm:px-4 sm:py-2 sm:text-sm ${
              isActive(link)
                ? "text-text-primary bg-stroke/50"
                : "text-muted hover:text-text-primary hover:bg-stroke/50"
            }`}
          >
            {link.label}
          </button>
        ))}

        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        <a href={mailto} className="group relative ml-1 rounded-full">
          <span
            className="absolute rounded-full accent-gradient-animated opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ inset: "-2px" }}
            aria-hidden
          />
          <span className="relative flex items-center gap-1 rounded-full bg-surface px-3 py-1.5 text-xs text-text-primary backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm">
            Say hi
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </span>
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
