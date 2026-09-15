import type { ReactNode } from "react";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Index from "./pages/Index";
import Resume from "./pages/Resume";
import ProjectDetail from "./pages/ProjectDetail";
import JournalDetail from "./pages/JournalDetail";
import LearningSeriesPage from "./pages/LearningSeries";

// Opacity-only transition: a transform/filter on this wrapper would break
// position:fixed descendants (navbar, GSAP pinning).
const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.45, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/projects/:slug"
          element={
            <PageTransition>
              <ProjectDetail />
            </PageTransition>
          }
        />
        <Route
          path="/learning/:seriesSlug"
          element={
            <PageTransition>
              <LearningSeriesPage />
            </PageTransition>
          }
        />
        <Route
          path="/journal/:slug"
          element={
            <PageTransition>
              <JournalDetail />
            </PageTransition>
          }
        />
        <Route
          path="/resume"
          element={
            <PageTransition>
              <Resume />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
