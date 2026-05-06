/**
 * Handles the visual representation of the asset loading process.
 * Controls DOM elements, progress bars, and SVG logo animations.
 *
 * @class LoadingUI
 */
export class LoadingUI {
  /**
   * Creates an instance of the LoadingUI class.
   *
   * @param {EventTarget} assetManager - The manager emitting loading events (assetProgress, assetLoaded).
   * @param {Function} [onEnterCallback] - Optional callback function triggered when the user clicks the enter button.
   */
  constructor(assetManager, onEnterCallback) {
    /** @type {EventTarget} */
    this.assetManager = assetManager;

    /** @type {Function|undefined} */
    this.onEnterCallback = onEnterCallback;

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

    if (this.elements.enterButton) {
      this.elements.enterButton.onclick = () => this._handleEnter();
    }
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
   * Internal handler for the Enter button click.
   * Hides the UI, executes the callback, and cleans up resources.
   * @private
   */
  _handleEnter() {
    this.hide();
    if (this.onEnterCallback) this.onEnterCallback();
    this.cleanup();
  }

  /**
   * Transitions the UI to the "Ready" state and triggers cleanup.
   */
  finish() {
    const { enterButton, progressBar, label } = this.elements;

    enterButton?.classList.remove("hidden");
    progressBar?.classList.add("hidden");
    if (label) label.innerText = "Ready!";
  }

  /**
   * Hides the main loading screen container.
   */
  hide() {
    const container = document.querySelector(".loadingContent");
    if (container) container.style.display = "none";
  }

  /**
   * Aborts all active event listeners to prevent memory leaks.
   */
  cleanup() {
    this.controller.abort();
  }
}
