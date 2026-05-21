import * as THREE from "three";
import { ValidationError } from "./errors/error";

/**
 * Universal AnimationManager handling PBR model animations.
 * Supports smooth cross-fading, action pooling, and state tracking.
 */
export class AnimationManager {
  /**
   * @param {THREE.Object3D} model - The root 3D object/mesh to animate.
   * @param {THREE.AnimationClip[]} animations - Array of clips loaded from the asset.
   */
  constructor(model, animations) {
    if (!model) {
      throw new ValidationError(
        "AnimationManager",
        "Initialization failed: 'model' target parameter is missing or undefined.",
      );
    }

    if (!animations) {
      throw new ValidationError(
        "AnimationManager",
        "Initialization failed: 'animations' array is undefined.",
      );
    }

    /** @type {THREE.AnimationMixer} */
    this.mixer = new THREE.AnimationMixer(model);

    /** @type {Map<string, THREE.AnimationAction>} */
    this.actions = new Map();

    /** @type {THREE.AnimationAction|null} */
    this.currentAction = null;

    this._init(animations);
  }

  /**
   * Pools all available clips into AnimationAction instances for quick access.
   * @param {THREE.AnimationClip[]} animations
   * @private
   */
  _init(animations) {
    if (animations.length === 0) {
      return;
    }

    animations.forEach((clip) => {
      const action = this.mixer.clipAction(clip);
      this.actions.set(clip.name, action);
    });
  }

  /**
   * Plays or smoothly transitions to a targeted animation.
   * @param {string} name - The name of the animation clip.
   * @param {number} [duration=0.5] - Crossfade duration in seconds.
   * @returns {THREE.AnimationAction|null} The activated action.
   */
  play(name, duration = 0.5) {
    const nextAction = this.actions.get(name);

    if (!nextAction) {
      throw new ValidationError(
        "AnimationManager",
        `Animation "${name}" does not exist on this model.`,
      );
    }

    if (this.currentAction === nextAction) {
      return nextAction;
    }

    if (!this.currentAction) {
      nextAction.reset().fadeIn(duration).play();
    } else {
      nextAction.reset();
      nextAction.play();
      this.currentAction.crossFadeTo(nextAction, duration, true);
    }

    this.currentAction = nextAction;
    return nextAction;
  }

  /**
   * Advances the mixer time. Call this inside the world/render update loop.
   * @param {number} deltaTime - Time elapsed since the last frame in seconds.
   */
  update(deltaTime) {
    if (this.mixer && deltaTime > 0) {
      this.mixer.update(deltaTime);
    }
  }

  /**
   * Disposes of the mixer and clears references to prevent memory leaks.
   */
  dispose() {
    if (this.mixer) {
      this.mixer.stopAllAction();
      this.mixer.uncacheRoot(this.mixer.getRoot());
    }
    this.actions.clear();
    this.currentAction = null;
    this.mixer = null;
  }
}
