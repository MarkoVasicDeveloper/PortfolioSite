import { describe, it, expect, vi, beforeEach } from "vitest";
import { LoadingUI } from "../loadingUI.js";

describe("LoadingUI: Component", () => {
  let assetManager;
  let onEnter;
  let loadingUI;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="loadingContent">
        <progress id="progressBar" value="0" max="100"></progress>
        <label>Loading...</label>
        <button id="enter" class="hidden"></button>
        <svg><text style="stroke-dashoffset: 2550">Logo</text></svg>
      </div>
    `;
    assetManager = new EventTarget();
    onEnter = vi.fn();
    loadingUI = new LoadingUI(assetManager, onEnter);
  });

  it("should update progress bar and SVG stroke on assetProgress event", () => {
    const progressEvent = new CustomEvent("assetProgress", { detail: 50 });
    assetManager.dispatchEvent(progressEvent);

    const progressBar = document.getElementById("progressBar");
    const logo = document.querySelector("svg text");

    expect(progressBar.value).toBe(50);
    expect(logo.style.strokeDashoffset).toBe("1275");
  });

  it("should show Enter button and change label when finished", () => {
    assetManager.dispatchEvent(new Event("assetLoaded"));

    const enterButton = document.getElementById("enter");
    const label = document.querySelector("label");

    expect(enterButton.classList.contains("hidden")).toBe(false);
    expect(label.innerText).toBe("Ready!");
  });

  it("should stop listening to events after cleanup", () => {
    loadingUI.cleanup();
    const progressBar = document.getElementById("progressBar");
    const progressEvent = new CustomEvent("assetProgress", { detail: 100 });

    assetManager.dispatchEvent(progressEvent);

    expect(progressBar.value).toBe(0);
  });
});
