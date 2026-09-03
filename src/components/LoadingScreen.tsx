import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = ["Build", "Ship", "Scale"];
const DURATION_MS = 2700;

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    let raf: number;
    let timeout: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION_MS, 1);
      setCount(Math.round(progress * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timeout = window.setTimeout(onComplete, 400);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  useEffect(() => {
    const interval = window.setInterval(
      () => setWordIndex((i) => (i + 1) % WORDS.length),
      900
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-bg"
    >
      <motion.span
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute left-6 top-6 text-xs text-muted uppercase tracking-[0.3em] md:left-10 md:top-8"
      >
        Portfolio
      </motion.span>

      <div className="flex h-full items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="display-tracking text-5xl md:text-7xl lg:text-8xl font-display text-text-primary/80"
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      <span className="absolute bottom-8 right-6 text-7xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums leading-none md:right-10 md:bottom-10">
        {String(count).padStart(3, "0")}
      </span>

      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-stroke/50">
        <div
          className="h-full w-full origin-left accent-gradient"
          style={{
            transform: `scaleX(${count / 100})`,
            boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
          }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
