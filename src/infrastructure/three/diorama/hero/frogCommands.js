/**
 * @typedef {Object} SequenceStep
 * @property {string} name - The unique registration name of the target animation clip.
 * @property {boolean} loop - Determines if the animation track should repeat.
 * @property {number} [repeat] - Optional iteration counter for THREE.LoopRepeat cycles.
 * @property {number} [timeScale] - Optional playback velocity modifier (default is 1.0).
 */

/**
 * @typedef {Object} FrogCommandConfig
 * @property {SequenceStep[]} sequence - Array of animation steps defining the structural diorama flow.
 * @property {number[]} position - Spatial coordinates mapped as an [X, Y, Z] position array.
 * @property {number} rotationY - Target yaw rotation angle expressed in radians.
 */

/**
 * Global configuration registry mapping trigger command keys to spatial parameters and animation sequences.
 * Serves as the primary data source for the DioramaManager state allocation.
 * * @type {Record<string, FrogCommandConfig>}
 */
export const FrogCommands = {
  SIT_AND_TYPE: {
    sequence: [{ name: "typing", loop: true }],
    position: [10, 0, -25],
    rotationY: -Math.PI / 1.7,
  },
};
