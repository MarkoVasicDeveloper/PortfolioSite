import { HeroDiorama } from "./hero/heroDiorama";
import { FrogCommands } from "../diorama/hero/frogCommands";
import { ValidationError } from "../../../core/errors/error";

/**
 * State manager responsible for controlling the lifecycle of scene dioramas.
 * Acts as a behavioral routing engine that dynamically instantiates, configures,
 * and disposes of specialized diorama classes based on structural commands.
 */
export class DioramaManager {
  /**
   * Creates an instance of DioramaManager.
   * @param {Object} frog - The main character context instance orchestrating the entity state.
   * @throws {ValidationError} If the required 'frog' parameter is missing or invalid.
   */
  constructor(frog) {
    // Type validation and dependency checking on initialization
    if (!frog || typeof frog !== "object") {
      throw new ValidationError(
        "DioramaManager",
        "Initialization failed: Required parameter 'frog' instance is missing or invalid.",
      );
    }

    /**
     * Parent context character reference.
     * @type {Object}
     */
    this.frog = frog;

    /**
     * The currently active diorama runtime instance. Null if no trigger zone is active.
     * @type {Object|null}
     */
    this.currentDiorama = null;

    /**
     * Tracked identifier key of the currently active command state.
     * @type {string|null}
     */
    this.currentAction = null;

    /**
     * Internal registry mapping command keys to explicit Diorama class constructors.
     * @type {Record<string, typeof import("../baseDiorama").BaseDiorama>}
     */
    this.dioramaMap = {
      SIT_AND_TYPE: HeroDiorama,
    };
  }

  /**
   * Evaluates and orchestrates the transition between the current diorama and a targeted command state.
   * Gracefully shuts down the active diorama lifecycle before re-allocating new domain contexts.
   * @param {string} [commandKey=""] - The targeted trigger configuration command key. Defaults to an empty string.
   * @returns {void}
   */
  switchDiorama(commandKey = "") {
    // Fallback: If commandKey is falsy or missing, automatically trigger full clear and stop execution
    if (!commandKey) {
      this.clear();
      return;
    }

    // Performance optimization: Avoid redundant operations if the targeted state is already active
    if (this.currentDiorama && this.currentAction === commandKey) {
      return;
    }

    // Safely exit and unbind the running context before dereferencing
    if (this.currentDiorama) {
      this.currentDiorama.exit();
      this.currentDiorama = null;
    }

    this.currentAction = commandKey;

    // Fallback protection against structural dictionary property access issues
    const DioramaClass = this.dioramaMap[commandKey];
    const config = FrogCommands ? FrogCommands[commandKey] : null;

    // Instantiate and execute the new diorama state only if both class and configuration exist
    if (DioramaClass && config) {
      this.currentDiorama = new DioramaClass(this.frog, config);
      this.currentDiorama.enter();
    } else {
      // Automatic fallback reset in case of invalid or unregistered data mappings
      this.currentDiorama = null;
      this.currentAction = null;
    }
  }

  /**
   * Forces an immediate teardown of the active diorama context.
   * Resets all operational trackers to an idle/clean state.
   * @returns {void}
   */
  clear() {
    if (this.currentDiorama) {
      this.currentDiorama.exit();
      this.currentDiorama = null;
    }
    this.currentAction = null;
  }
}
