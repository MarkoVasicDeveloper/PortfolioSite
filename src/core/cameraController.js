import * as THREE from "three";
import { ValidationError } from "./errors/error";

/**
 * Advanced camera controller for smooth path-following.
 * Features infinite looping and look-ahead smoothing.
 * Relies on external input delta (e.g., from an InputManager).
 */
export class CameraController {
  /**
   * @param {THREE.PerspectiveCamera} camera - The camera instance to control.
   * @param {Array<{x: number, y: number}>} curvePoints - Array of 2D points defining the path.
   */
  constructor(camera, curvePoints) {
    if (!camera) {
      throw new ValidationError(
        "CameraController",
        "Camera instance is missing!",
      );
    }

    if (!curvePoints || !Array.isArray(curvePoints) || curvePoints.length < 2) {
      throw new ValidationError(
        "CameraController",
        "Invalid curvePoints. Need at least 2 points.",
      );
    }
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

    /** * Pre-allocated vector for look-at calculations to optimize performance.
     * @type {THREE.Vector3}
     * @private
     */
    this.lookTarget = new THREE.Vector3();
  }

  /**
   * Updates camera position and orientation based on input delta.
   * Should be called within the main animation loop.
   * @param {number} inputDelta - Accumulated delta value from InputManager.
   */
  update(inputDelta) {
    this.targetProgress += inputDelta * this.sensitivity;
    this.currentProgress = THREE.MathUtils.lerp(
      this.currentProgress,
      this.targetProgress,
      this.lerpSpeed,
    );

    const normalizedProgress = ((this.currentProgress % 1) + 1) % 1;

    const position = this.path.getPointAt(normalizedProgress);
    this.camera.position.copy(position);

    const lookAtTarget = this.path.getPointAt((normalizedProgress + 0.01) % 1);
    this.camera.lookAt(lookAtTarget);
  }

  /**
   * Nullifies references for garbage collection.
   */
  dispose() {
    this.path = null;
    this.camera = null;
    this.currentLookAt = null;
  }
}
