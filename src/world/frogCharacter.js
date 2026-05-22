import * as THREE from "three";
import { AnimationManager } from "../core/animationManager";

/**
 * Represents the dynamic Frog Character in the 3D world.
 * Handles its own visual container, offset fixes, and animations.
 */
export class FrogCharacter {
  /**
   * @param {Object} frogAsset - The loaded GLTF/GLB asset for the frog.
   */
  constructor(frogAsset) {
    /** @type {THREE.Group} - The clean pivot container for the world to interact with */
    this.container = new THREE.Group();
    this.container.name = "frogContainer";

    /** @type {THREE.Object3D} - The raw model with bones from Blender */
    this.rawModel = frogAsset.scene || frogAsset;

    /** @type {AnimationManager} */
    this.animationManager = null;

    this._init(frogAsset.animations || []);
  }

  /**
   * Sets up the internal hierarchy and fixes Blender eccentricities.
   * @private
   */
  _init(animations) {
    this.container.add(this.rawModel);

    this.animationManager = new AnimationManager(this.rawModel, animations);
  }

  /**
   * Plays a specific animation with optional crossfade duration.
   * @param {string} name - Name of the animation clip.
   * @param {number} [duration=0.5] - Crossfade duration in seconds.
   */
  play(name, duration = 0.5) {
    if (this.animationManager) {
      this.animationManager.play(name, duration);
    }
  }

  /**
   * Updates the character animations. Must be called in the RAF loop.
   * @param {number} deltaTime - Time elapsed since the last frame.
   */
  update(deltaTime) {
    if (this.animationManager) {
      this.animationManager.update(deltaTime);
    }
  }

  /**
   * Cleans up animation manager resources.
   */
  dispose() {
    if (this.animationManager) {
      this.animationManager.dispose();
    }
  }

  /**
   * Exposes the main container position for easy GSAP manipulation.
   * @type {THREE.Vector3}
   */
  get position() {
    return this.container.position;
  }

  /**
   * Exposes the main container rotation.
   * @type {THREE.Euler}
   */
  get rotation() {
    return this.container.rotation;
  }
}
