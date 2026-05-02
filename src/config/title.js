/**
 * @typedef {Object} TitleEntry
 * @property {string} text - The content of the title
 * @property {number} size - Font size
 * @property {number[]} position - [x, y, z]
 * @property {number} rotationY - Rotation around Y axis
 */

/** @type {TitleEntry[]} */
export const TITLES_CONFIG = [
  {
    text: "My Projects",
    size: 2.9,
    position: [35, 4, -30],
    rotationY: -Math.PI / 3,
  },
  {
    text: "Technology",
    size: 2.9,
    position: [120, 4, -28],
    rotationY: -Math.PI / 3,
  },
  {
    text: "THREE.js",
    size: 0.8,
    position: [110, 1, 50],
    rotationY: Math.PI / 0.9,
  },
  {
    text: "WebGL",
    size: 0.8,
    position: [94, 1, 44],
    rotationY: Math.PI / 3,
  },
];
