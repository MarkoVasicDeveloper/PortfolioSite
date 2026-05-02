/**
 * @typedef {Object} TechTextEntry
 * @property {string} content - The descriptive text content, using \n for manual line breaks.
 * @property {number[]} position - The [x, y, z] coordinates in the 3D world.
 * @property {number} rotationY - The rotation around the Y axis in radians.
 */

/**
 * Configuration for the floating technology description texts.
 * These are positioned near their respective technology sections in the 3D scene.
 *
 * @type {TechTextEntry[]}
 */
export const TECH_TEXT_CONFIG = [
  {
    content:
      "JavaScript is my primary language.\nI focus on writing clean, performant,\nand maintainable code, leveraging\nmodern ES6+ features and deep\narchitectural patterns to solve\ncomplex frontend challenges.",
    position: [124, 7, 30],
    rotationY: Math.PI / 1.1,
  },
  {
    content:
      "This immersive experience is built\nwith Three.js. I specialize in merging\n3D math with WebGL shaders to create\nhigh-performance visual effects that push\nthe boundaries of the traditional web.",
    position: [94, 6, 60],
    rotationY: Math.PI / 1.4,
  },
  {
    content:
      "I leverage SCSS and SVG animations to build\npolished user interfaces. Beyond visuals,\nI have extensive experience in seamless API\nintegrations, ensuring robust communication\nbetween the frontend and complex backends.",
    position: [61, 7, 69],
    rotationY: Math.PI / 1.9,
  },
  {
    content:
      "I build scalable web applications using\nReact.js, focusing on component-driven architecture\nand efficient state management. My expertise\nextends to mobile development via React Native,\ndelivering cross-platform solutions.",
    position: [25, 5, 57],
    rotationY: Math.PI / 2.8,
  },
  {
    content:
      "Python was my first love and entry point\ninto programming. My background in cyber\nsecurity gave me a deep understanding of\nnetworking protocols, Linux environments,\nand automation scripts — a foundation that\nmakes me a more versatile developer.",
    position: [1, 7, 30],
    rotationY: Math.PI / 5.2,
  },
];
