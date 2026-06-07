/**
 * @abstract
 * Class representing the base contract for all scene dioramas.
 */
export class BaseDiorama {
  /**
   * @param {Object} frog - The main frog character instance.
   * @param {Object} config - Configuration object containing position, rotation, and commands.
   */
  constructor(frog, config) {
    if (new.target === BaseDiorama) {
      throw new TypeError(
        "Cannot directly instantiate abstract class BaseDiorama.",
      );
    }

    /** @type {Object} */
    this.frog = frog;
    /** @type {Object} */
    this.config = config;
  }

  /**
   * Triggered when the camera enters the trigger zone of this diorama.
   * @abstract
   * @throws {Error} If not implemented by the subclass.
   * @returns {void}
   */
  enter() {
    throw new Error("Method 'enter()' must be implemented in the subclass.");
  }

  /**
   * Triggered when the camera leaves the trigger zone of this diorama.
   * @returns {void}
   */
  exit() {
    // Optional lifecycle method for clearing timers, events, etc.
  }
}
