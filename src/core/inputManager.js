/**
 * Centralized Input Manager to handle cross-platform user interactions.
 * Normalizes mouse wheel and touch events into a consistent delta format
 * for use in the main animation loop.
 */
export class InputManager {
  constructor() {
    /** * Accumulated vertical movement since the last frame.
     * @type {number}
     */
    this.deltaY = 0;

    /** @type {number} Sensitivity factor for mouse wheel */
    this.wheelMultiplier = 1.0;

    /** @type {number} Sensitivity factor for touch movement */
    this.touchMultiplier = 2.0;

    // Internal state for tracking pointer movement
    this.lastPointerY = 0;
    this.isPointerDown = false;

    // Bind methods to preserve 'this' context for event listeners
    this._onWheel = this._onWheel.bind(this);
    this._onPointerDown = this._onPointerDown.bind(this);
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerUp = this._onPointerUp.bind(this);

    this._init();
  }

  /**
   * Initializes global event listeners.
   * @private
   */
  _init() {
    window.addEventListener("wheel", this._onWheel, { passive: true });
    window.addEventListener("pointerdown", this._onPointerDown);
    window.addEventListener("pointermove", this._onPointerMove);
    window.addEventListener("pointerup", this._onPointerUp);
  }

  /**
   * Handler for the mouse wheel event.
   * @param {WheelEvent} e
   * @private
   */
  _onWheel(e) {
    this.deltaY += e.deltaY * this.wheelMultiplier;
  }

  /**
   * Handler for the initial pointer contact (mouse click or touch start).
   * @param {PointerEvent} e
   * @private
   */
  _onPointerDown(e) {
    this.isPointerDown = true;
    this.lastPointerY = e.clientY;
  }

  /**
   * Handler for pointer movement. Calculates the difference between
   * current and last position to simulate scroll.
   * @param {PointerEvent} e
   * @private
   */
  _onPointerMove(e) {
    if (!this.isPointerDown) {
      return;
    }

    // Invert the difference to make "swipe up" move the camera forward
    const diff = this.lastPointerY - e.clientY;
    this.deltaY += diff * this.touchMultiplier;

    this.lastPointerY = e.clientY;
  }

  /**
   * Handler for pointer release.
   * @private
   */
  _onPointerUp() {
    this.isPointerDown = false;
  }

  /**
   * Retrieves the accumulated deltaY and resets it to zero.
   * This is the "bridge" between the events and your Three.js update loop.
   * @returns {number} The vertical delta since this method was last called.
   */
  popDeltaY() {
    const currentDelta = this.deltaY;
    this.deltaY = 0;
    return currentDelta;
  }

  /**
   * Clean up all global event listeners to prevent memory leaks.
   */
  dispose() {
    window.removeEventListener("wheel", this._onWheel);
    window.removeEventListener("pointerdown", this._onPointerDown);
    window.removeEventListener("pointermove", this._onPointerMove);
    window.removeEventListener("pointerup", this._onPointerUp);
  }
}
