import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Works from "../components/Works";
import Journal from "../components/Journal";
import Events from "../components/Events";
import Footer from "../components/Footer";
import { useSeo } from "../hooks/useSeo";
import { siteConfig } from "../lib/siteConfig";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const handleComplete = useCallback(() => setIsLoading(false), []);

  useSeo({
    title: `${siteConfig.name} | ${siteConfig.jobTitle}`,
    description: siteConfig.description,
    path: "/",
  });

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  // ScrollTrigger measures on mount, while the loading overlay still has the body
  // at overflow:hidden, so its pin/scrub ranges are computed against a document
  // that cannot scroll. Re-measure once the overlay is gone and layout is final.
  useEffect(() => {
    if (isLoading) return;
    const refresh = () => ScrollTrigger.refresh();
    refresh();
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleComplete} />}
      </AnimatePresence>

      <Navbar />
      <main>
        <Hero started={!isLoading} />
        <Works />
        <Events />
        <Journal />
      </main>
      <Footer />
    </>
  );
};

export default Index;
