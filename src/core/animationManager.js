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
   * Plays or smoothly transitions to a targeted animation using contextual configurations.
   * @param {Object} step - The configuration step object from the sequence.
   * @param {string} step.name - The name of the animation clip.
   * @param {boolean} [step.loop] - Flag indicating if the track loops.
   * @param {number} [step.repeat] - Loop repeat counter limit.
   * @param {number} [step.timeScale] - Velocity modifier.
   * @param {number} [duration=0.5] - Crossfade duration in seconds.
   * @returns {THREE.AnimationAction|null} The activated action.
   */
  play(step, duration = 0.5) {
    const { name, loop, repeat, timeScale } = step;
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

    nextAction.reset();

    const targetTimeScale = timeScale !== undefined ? timeScale : 1.0;
    nextAction.setEffectiveTimeScale(targetTimeScale);
    nextAction.setEffectiveWeight(1.0);

    nextAction.clampWhenFinished = true;

    if (repeat && loop) {
      nextAction.setLoop(THREE.LoopRepeat, repeat);
    } else if (!loop) {
      nextAction.setLoop(THREE.LoopOnce);
    } else {
      nextAction.setLoop(THREE.LoopRepeat);
    }

    if (!this.currentAction) {
      nextAction.play();
      this.mixer.update(0);
    } else {
      nextAction.play();
      this.currentAction.crossFadeTo(nextAction, duration, false);
    }

    this.currentAction = nextAction;
    return nextAction;
  }

  /**
   * Safely stops the currently playing animation and resets the state track.
   * Smoothly fades out the action if duration is provided.
   * @param {number} [duration=0.2] - Fade out transition time.
   */
  stop(duration = 0.2) {
    if (!this.currentAction) {
      return;
    }

    if (duration > 0) {
      this.currentAction.fadeOut(duration);
    } else {
      this.currentAction.stop();
    }

    this.currentAction = null;
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
