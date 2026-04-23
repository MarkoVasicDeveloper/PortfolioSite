/**
 * Handles the visual representation of the asset loading process.
 * Manages DOM elements, progress bars, and SVG animations.
 */

export class LoadingUI {
  /**
   * @param {EventTarget} assetManager - The manager to listen for loading events.
   */
  constructor(assetManager) {
    /** @type {EventTarget} */
    this.assetManager = assetManager;

    /** * Controller to manage and clean up event listeners.
     * @type {AbortController}
     */
    this.controller = new AbortController();

    /** @type {Object<string, HTMLElement|null>} */
    this.elements = {
      progressBar: document.getElementById("progressBar"),
      label: document.querySelector("label"),
      enterButton: document.getElementById("enter"),
      logo: document.querySelector("svg text"),
    };

    /** @type {number} Total length of the SVG stroke for animation. */
    this.initialStrokeOffset = 2550;
    this._initListeners();
  }

  /**
   * Initializes event listeners with an AbortSignal for automatic cleanup.
   * @private
   */
  _initListeners() {
    const { signal } = this.controller;

    this.assetManager.addEventListener(
      "assetProgress",
      (event) => {
        this.update(event.detail);
      },
      { signal },
    );

    this.assetManager.addEventListener(
      "assetLoaded",
      () => {
        this.finish();
      },
      { signal },
    );
  }

  /**
   * Updates the UI elements based on the current loading progress.
   * @param {number} progress - The loading progress (0-100).
   */
  update(progress) {
    const { progressBar, logo } = this.elements;

    if (progressBar) progressBar.value = progress;
    if (logo) {
      const currentOffset =
        this.initialStrokeOffset - this.initialStrokeOffset * (progress / 100);
      logo.style.strokeDashoffset = Math.max(0, currentOffset);
    }
  }

  /**
   * Transitions the UI to the "Ready" state and triggers cleanup.
   */
  finish() {
    const { enterButton, progressBar, label } = this.elements;

    enterButton?.classList.remove("hidden");
    progressBar?.classList.add("hidden");
    if (label) label.innerText = "Ready!";

    this.cleanup();
  }

  /**
   * Aborts all active event listeners to prevent memory leaks.
   */
  cleanup() {
    this.controller.abort();
  }
}
