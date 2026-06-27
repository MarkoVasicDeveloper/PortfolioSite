/**
 * @typedef {Object} FrogTrigger
 * @property {string} id - The unique identifier of the trigger zone.
 * @property {number[]} position - Spatial [X, Y, Z] coordinates representing the center of the trigger zone.
 * @property {number} radius - The proximity radius threshold from the camera position that activates the command.
 * @property {string} command - The target command key mapped to an explicit definition within FrogCommands.
 */

/**
 * Global configuration array defining spatial proximity trigger boundaries for the character.
 * Used by the proximity evaluation engine to dynamically allocate behavior states.
 * * @type {FrogTrigger[]}
 */
export const FROG_TRIGGER_CONFIG = [
  {
    id: "main_zone",
    position: [-5, 4, -10],
    radius: 23,
    command: "SIT_AND_TYPE",
  },
];
