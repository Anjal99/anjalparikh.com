import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import JournalDetail from "./JournalDetail";

const renderLesson = (slug: string) =>
  render(
    <MemoryRouter initialEntries={[`/journal/${slug}`]}>
      <Routes>
        <Route path="/journal/:slug" element={<JournalDetail />} />
      </Routes>
    </MemoryRouter>,
  );

describe("Journal lesson page", () => {
  it("plays a self-hosted Hermes lesson and links back to its series", () => {
    const { container } = renderLesson("three-pillars-of-hermes");
    const video = container.querySelector("video");

    expect(video).toHaveAttribute(
      "src",
      "/learning/hermes-101/three-pillars-of-hermes.mp4",
    );
    expect(video).toHaveAttribute("poster");
    expect(screen.getByRole("link", { name: /back to hermes 101/i })).toHaveAttribute(
      "href",
      "/learning/hermes-101",
    );
    expect(screen.queryByRole("link", { name: /previous lesson/i })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /next lesson/i })).toHaveAttribute(
      "href",
      "/journal/orchestration-and-subagents",
    );
  });

  it("does not wrap the final lesson back to the beginning", () => {
    renderLesson("expert-knowledge-to-campaign");

    expect(screen.getByRole("link", { name: /previous lesson/i })).toHaveAttribute(
      "href",
      "/journal/delegating-real-work",
    );
    expect(screen.queryByRole("link", { name: /next lesson/i })).not.toBeInTheDocument();
  });
});
