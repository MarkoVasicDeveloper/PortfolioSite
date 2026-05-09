import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ErrorUI } from "../errorUI.js";

describe("ErrorUI: Component", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    document.body.innerHTML = "";
    delete window.location;
    window.location = { reload: vi.fn() };
  });

  afterEach(() => {
    window.location = originalLocation;
  });

  it("should render the error overlay with correct message", () => {
    const errorMsg = "Database connection failed";
    ErrorUI.show(errorMsg);
    const overlay = document.getElementById("error-overlay");

    expect(overlay).not.toBeNull();
    expect(overlay.innerHTML).toContain(errorMsg);
    expect(overlay.innerHTML).toContain("FATAL_ERROR");
  });

  it("should not create multiple overlays if called multiple times", () => {
    ErrorUI.show("First error");
    ErrorUI.show("Second error");

    const overlays = document.querySelectorAll("#error-overlay");
    expect(overlays.length).toBe(1);
    expect(overlays[0].innerHTML).toContain("First error");
  });

  it("should reload the page when restart button is clicked", () => {
    ErrorUI.show("Any error");

    const btn = document.getElementById("restart-btn");
    btn.click();

    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });

  it("should have critical styles to be visible over everything", () => {
    ErrorUI.show("Style test");
    const overlay = document.getElementById("error-overlay");

    expect(overlay.style.position).toBe("fixed");
    expect(overlay.style.zIndex).toBe("10000");
    expect(overlay.style.display).toBe("flex");
  });
});
