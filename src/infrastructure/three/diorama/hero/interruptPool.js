/**
 * @typedef {Object} SequenceStep
 * @property {string} name - The unique registration name of the target animation clip.
 * @property {boolean} loop - Determines if the animation track should loop or play once.
 * @property {number} [repeat] - Optional iteration counter specifying how many times a looping animation repeats before firing the "finished" event.
 * @property {number} [timeScale] - Optional playback velocity modifier (e.g., 1.0 for normal speed, 2.0 for double speed).
 */

/**
 * Global pool containing predefined, multi-step animation sequences (tracks).
 * Each inner array represents a complete structural chain that the HeroDiorama
 * will execute sequentially from the first to the last step.
 * * @type {Array<SequenceStep[]>}
 */
export const INTERRUPT_POOL = [
  [
    { name: "typing", loop: true, repeat: 3, timeScale: 0.6 },
    { name: "praying", loop: true, repeat: 3, timeScale: 1.0 },
    { name: "standing_victory", loop: false, timeScale: 1.0 },
  ],
  [
    { name: "typing", loop: true, repeat: 3, timeScale: 0.6 },
    { name: "sitting_pose", loop: true, repeat: 5, timeScale: 1.0 },
    { name: "sitting_victory", loop: false, timeScale: 1.0 },
  ],
  [
    { name: "typing", loop: true, repeat: 3, timeScale: 0.6 },
    { name: "sitting_pose", loop: true, repeat: 5, timeScale: 1.0 },
    { name: "typing", loop: true, repeat: 2, timeScale: 0.6 },
    { name: "praying", loop: true, repeat: 3, timeScale: 1.0 },
    { name: "sitting_victory2", loop: false, timeScale: 1.0 },
  ],
];
