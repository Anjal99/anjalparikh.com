import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Journal from "./Journal";

describe("Learning in Public gateway", () => {
  it("starts on Claude BootCamp and links to its series page", () => {
    render(
      <MemoryRouter>
        <Journal />
      </MemoryRouter>,
    );

    expect(screen.getByRole("button", { name: "Claude BootCamp" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByText("The AI Operating System")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view claude bootcamp/i })).toHaveAttribute(
      "href",
      "/learning/claude-bootcamp",
    );
  });

  it("switches to the Hermes 101 preview without leaving the homepage", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Journal />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "Hermes 101" }));

    expect(screen.getByRole("button", { name: "Hermes 101" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByText("The Three Pillars of Hermes")).toBeInTheDocument();
    expect(screen.getByText("Previewing 4 of 8 lessons")).toBeInTheDocument();
    expect(screen.queryByText("Building Reusable Skills")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view hermes 101/i })).toHaveAttribute(
      "href",
      "/learning/hermes-101",
    );
  });
});
