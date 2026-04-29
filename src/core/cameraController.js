import * as THREE from "three";

/**
 * Advanced camera controller for smooth path-following.
 * Features infinite looping, look-ahead smoothing, and cross-platform input handling.
 */
export class CameraController {
  /**
   * @param {THREE.PerspectiveCamera} camera - The camera instance to control.
   * @param {Array<{x: number, y: number}>} curvePoints - Array of 2D points defining the path.
   */
  constructor(camera, curvePoints) {
    /** @type {THREE.PerspectiveCamera} */
    this.camera = camera;

    /** * The closed 3D path generated from provided points.
     * @type {THREE.CatmullRomCurve3}
     */
    this.path = new THREE.CatmullRomCurve3(
      curvePoints.map((p) => new THREE.Vector3(p.x, 3, -p.y)),
      true,
    );

    this.currentProgress = 0;
    this.targetProgress = 0;

    this.lerpSpeed = 0.03;
    this.sensitivity = 0.0001;

    /** * Smoothed look-at target to prevent jerky camera rotations.
     * @type {THREE.Vector3}
     */
    this.currentLookAt = new THREE.Vector3();

    this.lastPointerY = 0;
    this.isPointerDown = false;

    this._onWheel = this._onWheel.bind(this);
    this._onPointerDown = this._onPointerDown.bind(this);
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerUp = this._onPointerUp.bind(this);

    this._setupEvents();
  }

  /**
   * Initializes event listeners for mouse and touch inputs.
   * @private
   */
  _setupEvents() {
    window.addEventListener("wheel", this._onWheel, { passive: true });
    window.addEventListener("pointerdown", this._onPointerDown);
    window.addEventListener("pointermove", this._onPointerMove);
    window.addEventListener("pointerup", this._onPointerUp);
  }

  /** @private */
  _onWheel(e) {
    this._updateTarget(e.deltaY);
  }

  /** @private */
  _onPointerDown(e) {
    this.isPointerDown = true;
    this.lastPointerY = e.clientY;
  }

  /** @private */
  _onPointerMove(e) {
    if (!this.isPointerDown) return;
    const deltaY = (this.lastPointerY - e.clientY) * 1.8;
    this._updateTarget(deltaY);
    this.lastPointerY = e.clientY;
  }

  /** @private */
  _onPointerUp() {
    this.isPointerDown = false;
  }

  /**
   * Updates the target progress based on input delta.
   * @param {number} delta - The input change value.
   * @private
   */
  _updateTarget(delta) {
    this.targetProgress += delta * this.sensitivity;
  }

  /**
   * Main update loop for camera positioning and orientation.
   * Should be called within the requestAnimationFrame loop.
   */
  update() {
    if (!this.camera || !this.path) return;

    this.currentProgress = THREE.MathUtils.lerp(
      this.currentProgress,
      this.targetProgress,
      this.lerpSpeed,
    );

    const normalizedProgress = ((this.currentProgress % 1) + 1) % 1;

    const position = this.path.getPointAt(normalizedProgress);
    this.camera.position.copy(position);

    const lookAtTarget = this.path.getPointAt((normalizedProgress + 0.02) % 1);

    this.currentLookAt.lerp(lookAtTarget, 0.1);
    this.camera.lookAt(this.currentLookAt);
  }

  /**
   * Cleans up resources and removes global event listeners.
   * Crucial for preventing memory leaks in Single Page Applications.
   */
  dispose() {
    window.removeEventListener("wheel", this._onWheel);
    window.removeEventListener("pointerdown", this._onPointerDown);
    window.removeEventListener("pointermove", this._onPointerMove);
    window.removeEventListener("pointerup", this._onPointerUp);

    this.path = null;
    this.camera = null;
    this.currentLookAt = null;
  }
}
