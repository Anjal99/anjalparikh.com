import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import LearningSeriesPage from "./LearningSeries";

const renderRoute = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/learning/:seriesSlug" element={<LearningSeriesPage />} />
        <Route path="/" element={<div>Home page</div>} />
      </Routes>
    </MemoryRouter>,
  );

describe("Learning series page", () => {
  it("renders every Hermes lesson in series order", () => {
    renderRoute("/learning/hermes-101");

    expect(screen.getByRole("heading", { name: "Hermes 101" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /lesson/i })).toHaveLength(8);
    expect(screen.getByRole("link", { name: /lesson 1.*three pillars/i })).toHaveAttribute(
      "href",
      "/journal/three-pillars-of-hermes",
    );
    expect(
      screen.getByRole("link", { name: /lesson 8.*turning expert knowledge/i }),
    ).toHaveAttribute("href", "/journal/expert-knowledge-to-campaign");
  });

  it("redirects an unknown series back to the homepage", () => {
    renderRoute("/learning/not-a-series");
    expect(screen.getByText("Home page")).toBeInTheDocument();
  });
});
