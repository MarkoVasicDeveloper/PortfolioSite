import { BaseDiorama } from "../baseDiorama";
import { INTERRUPT_POOL } from "./interruptPool";
import { ValidationError } from "../../../../core/errors/error";
import { ErrorReport } from "../../../../core/errors/errorReport";

/**
 * Representation of a structured, sequence-driven animation diorama for the Hero character.
 * Implements a data-driven Finite State Machine (FSM) that loops through automated animation flows.
 * * @extends BaseDiorama
 */
export class HeroDiorama extends BaseDiorama {
  /**
   * Creates an instance of HeroDiorama.
   * @param {Object} frog - The main frog character instance containing the animation manager.
   * @param {Object} config - Configuration object containing scene position, rotation, and limits.
   */
  constructor(frog, config) {
    super(frog, config);

    /** * Index tracking the currently active sequence template from the global pool.
     * @type {number}
     */
    this.poolIndex = 0;

    /** * Deep copy of the active animation sequence track currently playing.
     * @type {Array<Object>}
     */
    this.activeSequence = [];

    /** * Pointer tracking the current step/animation index within the active sequence.
     * @type {number}
     */
    this.sequenceIndex = 0;

    /** * Cached bound event handler reference for the Three.js AnimationMixer listener removal.
     * @type {Function}
     */
    this.onFinishedBound = this._onFinished.bind(this);
  }

  /**
   * Initializes the diorama lifecycle. Hooks into the mixer timeline and triggers the loop.
   * @override
   * @returns {void}
   */
  enter() {
    this.frog.animationManager.mixer.addEventListener(
      "finished",
      this.onFinishedBound,
    );

    this._startNewSequence();
  }

  /**
   * Fetches, clones, and initializes the next structural sequence chain from the configuration pool.
   * Dispatches validation errors to the centralized ErrorReport system if the pool is corrupted.
   * @private
   * @throws {ValidationError} If the target sequence template is missing or empty.
   * @returns {void}
   */
  _startNewSequence() {
    const sequenceTemplate = INTERRUPT_POOL[this.poolIndex];

    if (!sequenceTemplate || sequenceTemplate.length === 0) {
      const validationError = new ValidationError(
        "HeroDiorama",
        `INTERRUPT_POOL at index [${this.poolIndex}] is empty, undefined, or corrupted.`,
      );

      ErrorReport.handle(validationError);
      return;
    }

    this.activeSequence = JSON.parse(JSON.stringify(sequenceTemplate));
    this.sequenceIndex = 0;
    this.poolIndex = (this.poolIndex + 1) % INTERRUPT_POOL.length;

    this._playCurrentStep();
  }

  /**
   * Configures standard playback properties (looping, clamping, timescale)
   * and dispatches execution commands to the core AnimationManager.
   * @private
   * @returns {void}
   */
  _playCurrentStep() {
    const currentStep = this.activeSequence[this.sequenceIndex];
    if (!currentStep) {
      this._startNewSequence();
      return;
    }

    this.frog.animationManager.play(currentStep, 0.3);
  }

  /**
   * Event listener callback triggered synchronously when a non-looping Three.js animation action finishes.
   * Evaluates sequential progress and triggers incremental stepping.
   * @param {THREE.Event} e - Native event payload emitted by the THREE.AnimationMixer.
   * @private
   * @returns {void}
   */
  _onFinished(e) {
    const currentStep = this.activeSequence[this.sequenceIndex];
    if (!currentStep) {
      return;
    }

    const expectedAction = this.frog.animationManager.actions.get(
      currentStep.name,
    );

    if (e.action === expectedAction) {
      if (this.sequenceIndex < this.activeSequence.length - 1) {
        this.sequenceIndex++;
        this._playCurrentStep();
      } else {
        this._startNewSequence();
      }
    }
  }

  /**
   * Clears event subscriptions and nullifies domain model bindings
   * to guarantee memory release for browser garbage collection cycles.
   * @override
   * @returns {void}
   */
  exit() {
    this.frog.animationManager.mixer.removeEventListener(
      "finished",
      this.onFinishedBound,
    );

    this.activeSequence = [];
    this.frog = null;
    this.config = null;
  }
}
