import gsap from "gsap";
import { ValidationError } from "./errors/error";

/**
 * Manages spatial interactions between the camera and 3D objects.
 * Handles distance-based scaling animations and sound triggers.
 */
export class InteractionManager {
  /**
   * @param {THREE.Camera} camera - The main scene camera to calculate distances from.
   * @param {THREE.Scene} scene - The Three.js scene containing interactive objects.
   * @param {Array<Object>} configs - Array of interaction configuration objects.
   * @param {Object} soundManager - The audio service used to play interaction sounds.
   */
  constructor(camera, scene, configs, soundManager) {
    if (!camera || !scene || !soundManager) {
      throw new ValidationError(
        "InteractionManager",
        "Missing essential dependencies (camera, scene, or soundManager).",
      );
    }

    if (!Array.isArray(configs) || configs.length === 0) {
      throw new ValidationError(
        "InteractionManager",
        "Interaction configs array is empty or missing.",
      );
    }

    /** @type {THREE.Camera} */
    this.camera = camera;
    /** @type {THREE.Scene} */
    this.scene = scene;
    /** @type {Array<Object>} */
    this.configs = configs;
    /** @type {Object} */
    this.soundManager = soundManager;

    /**
     * Map to store grouped interactive objects for optimized iteration.
     * @type {Map<string, Array<Object>>}
     * @private
     */
    this.interactiveGroups = new Map();

    this._cacheInteractiveObjects();
  }

  /**
   * Traverses the scene once to identify and group interactive objects based on naming conventions.
   * Sets initial state (scale 0) for all discovered interactive meshes.
   * @private
   */
  _cacheInteractiveObjects() {
    this.scene.traverse((obj) => {
      const config = this.configs.find((c) => obj.name.includes(c.name));

      if (config) {
        if (!this.interactiveGroups.has(config.name)) {
          this.interactiveGroups.set(config.name, []);
        }

        obj.scale.set(0, 0, 0);
        obj.userData.isActive = false;
        obj.userData.config = config;

        this.interactiveGroups.get(config.name).push(obj);
      }
    });
  }

  /**
   * Main update loop. Should be called within the RequestAnimationFrame (tick) function.
   * Calculates distance to camera and triggers state changes.
   */
  update() {
    if (!this.camera.position) {
      return;
    }
    const cameraPosition = this.camera.position;

    this.interactiveGroups.forEach((meshes) => {
      meshes.forEach((mesh) => {
        const distance = cameraPosition.distanceTo(mesh.position);
        const config = mesh.userData.config;

        const maxRange = config.range.max;
        const minRange = config.range.min || 0;
        const isInRange = distance <= maxRange && distance >= minRange;

        if (isInRange !== mesh.userData.isActive) {
          this._handleStateChange(mesh, isInRange);
        }
      });
    });
  }

  /**
   * Handles visual and audio transitions when an object enters or leaves its active range.
   * @param {THREE.Mesh|THREE.Object3D} mesh - The target 3D object.
   * @param {boolean} active - Whether the object should be visible/active.
   * @private
   */
  _handleStateChange(mesh, active) {
    const config = mesh.userData.config;
    mesh.userData.isActive = active;

    const targetScale = active ? 1 : 0;

    if (active && config.sound) {
      this.soundManager.play(config.sound, 0.4);
    }

    gsap.to(mesh.scale, {
      x: targetScale,
      y: targetScale,
      z: targetScale,
      duration: config.duration,
      ease: active ? "back.out(1.7)" : "power2.inOut",
      overwrite: "auto",
    });
  }
}
