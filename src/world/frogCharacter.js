import * as THREE from "three";
import { AnimationManager } from "../core/animationManager";
import { DioramaManager } from "../infrastructure/three/diorama/dioramaManager";

const _targetTriggerPosition = new THREE.Vector3();

/**
 * Orchestrator class representing the main Frog character entity.
 * Manages spatial transformations, component lifecycles (animations/dioramas),
 * and handles proximity-based camera trigger zone checks.
 */
export class FrogCharacter {
  /**
   * Creates an instance of FrogCharacter.
   * @param {Object|THREE.Object3D} frogAsset - The loaded asset object (typically a GLTF result containing a scene).
   * @param {THREE.Camera} camera - The active application camera used for spatial proximity tracking.
   * @param {Array<Object>} triggerConfig - Configuration array containing spatial bounds and command maps.
   */
  constructor(frogAsset, camera, triggerConfig) {
    /**
     * Group container wrapping the raw mesh model for safe local/global space operations.
     * @type {THREE.Group}
     */
    this.container = new THREE.Group();
    this.container.name = "frogContainer";

    /**
     * The raw inner Object3D/Group hierarchy parsed from the graphic asset.
     * @type {THREE.Object3D}
     */
    this.rawModel = frogAsset.scene || frogAsset;

    /**
     * Reference to the runtime scene camera used to evaluate zone proximity thresholds.
     * @type {THREE.Camera}
     */
    this.camera = camera;

    /**
     * Dependency injected collection of localized trigger definitions.
     * @type {Array<Object>}
     */
    this.triggerConfig = triggerConfig;

    /**
     * Id tracker of the current active trigger zone. Null if the camera is out of bounds.
     * @type {string|null}
     */
    this.currentZoneId = null;

    /**
     * Subsystem manager handling internal animation state tracks.
     * @type {AnimationManager}
     */
    this.animationManager = null;

    /**
     * Subsystem manager controlling contextual behavior dioramas.
     * @type {DioramaManager}
     */
    this.dioramaManager = null;

    this._init(frogAsset.animations || []);
  }

  /**
   * Internal component bootstrapper. Compiles spatial node links,
   * optimizes shading materials for low-light environments, and registers subsystems.
   * @param {THREE.AnimationClip[]} animations - Cached array of clips extracted from the asset root.
   * @private
   * @returns {void}
   */
  _init(animations) {
    this.container.add(this.rawModel);

    this._optimizeMaterialsForDiorama();

    this.animationManager = new AnimationManager(this.rawModel, animations);
    this.dioramaManager = new DioramaManager(this);

    this.setVisibility(true);
  }

  /**
   * Traverses the model hierarchy to dim material base colors and adjust roughness,
   * ensuring the mesh blends naturally into the dark cyber-punk diorama.
   * @private
   * @returns {void}
   */
  _optimizeMaterialsForDiorama() {
    const DARKNESS_FACTOR = 0.3;
    const TARGET_ROUGHNESS = 0.85;

    this.rawModel.traverse((child) => {
      if (!child.isMesh || !child.material) {
        return;
      }

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((mat) => {
        if (mat.color) {
          mat.color.multiplyScalar(DARKNESS_FACTOR);
        }
        if ("roughness" in mat) {
          mat.roughness = TARGET_ROUGHNESS;
        }
      });
    });
  }

  /**
   * Safe spatial manipulation utility interface for positioning and rotating the root container element.
   * @param {number[]} [position] - Array matching [x, y, z] spatial coords.
   * @param {number} [rotationY] - Target yaw angle value in radians.
   * @returns {void}
   */
  setupScene(position, rotationY) {
    if (position) {
      this.container.position.set(...position);
    }
    if (rotationY !== undefined) {
      this.container.quaternion.setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        rotationY,
      );
    }
  }

  /**
   * Updates visibility state configurations on the main container node.
   * When false, Three.js automatically bypasses the element during the render execution pass.
   * @param {boolean} visible - Visibility visibility target flag.
   * @returns {void}
   */
  setVisibility(visible) {
    this.container.visible = visible;
  }

  /**
   * Core frame ticker loop execution hook. Dispatches update updates to managers and triggers proximity evaluations.
   * @param {number} deltaTime - Time variance delta slice elapsed since the last rendering frame in seconds.
   * @returns {void}
   */
  update(deltaTime) {
    if (this.animationManager) {
      this.animationManager.update(deltaTime);
    }

    if (this.dioramaManager && this.dioramaManager.currentDiorama) {
      const currentDiorama = this.dioramaManager.currentDiorama;
      if (typeof currentDiorama.update === "function") {
        currentDiorama.update(deltaTime);
      }
    }

    this._checkTriggers();
  }

  /**
   * Performs real-time distance comparisons between the active camera and configured triggers.
   * Operates on squared mathematical lengths to avoid expensive square root CPU cycles.
   * @private
   * @returns {void}
   */
  _checkTriggers() {
    if (!this.camera?.position || !this.triggerConfig) {
      return;
    }
    const cameraPos = this.camera.position;

    let activeZone = null;

    for (const trigger of this.triggerConfig) {
      const [tx, ty, tz] = trigger.position;
      _targetTriggerPosition.set(tx, ty, tz);

      const distanceSq = cameraPos.distanceToSquared(_targetTriggerPosition);
      const radiusSq = trigger.radius * trigger.radius;

      if (distanceSq <= radiusSq) {
        activeZone = trigger;
        break;
      }
    }

    // Handle structural state changes only when crossing a boundary threshold
    if (this.currentZoneId !== activeZone?.id) {
      this.currentZoneId = activeZone ? activeZone.id : null;

      if (activeZone) {
        this.dioramaManager.switchDiorama(activeZone.command);
        this.setVisibility(true);
      } else {
        this.setVisibility(false);
        this.dioramaManager.clear();
      }
    }
  }

  /**
   * Disposes of structural runtime component allocations, unbinds external event tracks,
   * and prepares inner sub-managers for memory cleanup.
   * @param {THREE.Scene} [parentScene] - Optional reference to the root Three.js graph scene to force node removal.
   * @returns {void}
   */
  dispose(parentScene = null) {
    if (this.dioramaManager) {
      this.dioramaManager.clear();
      this.dioramaManager = null;
    }
    if (this.animationManager) {
      this.animationManager.dispose();
      this.animationManager = null;
    }

    if (parentScene && this.container) {
      parentScene.remove(this.container);
    }

    this.camera = null;
    this.triggerConfig = null;
  }
}
