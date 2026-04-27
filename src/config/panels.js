/**
 * @typedef {Object} PanelTransform
 * @property {number[]} position - [x, y, z] coordinates of the panel center
 * @property {number[]} rotation - [x, y, z] rotation in radians
 * @property {number[]} scale - [x, y, z] initial scale (use [0,0,0] for spawn animations)
 */

/**
 * @typedef {Object} PanelAttachment
 * @property {string} modelName - Reference to the name in ASSET_CONFIG
 * @property {string} link - URL to open when the icon is clicked
 * @property {number[]} offset - Position relative to the panel center [x, y, z]
 * @property {number[]} scale - Scale of the icon model
 * @property {number[]} [rotation] - Optional relative rotation for the icon
 */

/**
 * @typedef {Object} PanelEntry
 * @property {string} id - Unique identifier (e.g., 'washer', 'intro')
 * @property {string} name - Display name of the project
 * @property {string} link - Main project URL
 * @property {string} shaderKey - Key to identify the shader in SHADER_REGISTRY
 * @property {string} uniforms - Key to identify the uniforms in SHADER_UNIFORMS
 * @property {PanelTransform} transform - Spatial data for the panel
 * @property {PanelAttachment[]} [attachments] - Optional interactive icon attached to the panel
 */

/** @type {PanelEntry[]} */
export const PANEL_CONFIG = [
  {
    id: "main",
    name: "Main Panel",
    link: "https://join.skype.com/invite/GC84cpUFYwdI",
    shaderKey: "plane",
    uniforms: "main",
    transform: {
      position: [-5, 4, -10],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    },
    attachments: [
      {
        modelName: "git",
        link: "https://github.com/MarkoVasicDeveloper",
        offset: [4.5, -2.5, 0],
        scale: [0.2, 0.2, 0.05],
      },
      {
        modelName: "linkedin",
        link: "https://www.linkedin.com/in/marko-vasic-developer/",
        offset: [5.7, -2.5, 0],
        scale: [0.2, 0.2, 0.05],
      },
    ],
  },
  {
    id: "washer",
    name: "Washer Software",
    link: "https://washersoftware.com",
    shaderKey: "plane",
    uniforms: "washer",
    transform: {
      position: [52, 4, 0],
      rotation: [0, -Math.PI / 1.3, 0],
      scale: [0, 0, 0],
    },
    attachments: [
      {
        modelName: "git",
        link: "https://github.com/MarkoVasicDeveloper/AplikacijaZaTepihServise-Presentation",
        offset: [4.5, -2.5, 0],
        scale: [0.2, 0.2, 0.05],
      },
    ],
  },
  {
    id: "landary",
    name: "Perionica Vasić",
    link: "https://perionicavasic.rs",
    shaderKey: "plane",
    uniforms: "landary",
    transform: {
      position: [72, 4, 22],
      rotation: [0, -Math.PI / 1.8, 0],
      scale: [0, 0, 0],
    },
    attachments: [
      {
        modelName: "git",
        link: "https://github.com/MarkoVasicDeveloper/perionica-vasic",
        offset: [4.5, -2.5, 0],
        scale: [0.2, 0.2, 0.05],
      },
    ],
  },
  {
    id: "burger",
    name: "Crazy Burger",
    link: "https://markovasicdeveloper.github.io/Crazy-Burger/",
    shaderKey: "plane",
    uniforms: "burger",
    transform: {
      position: [80, 4, -18],
      rotation: [0, -Math.PI / 10, 0],
      scale: [0, 0, 0],
    },
    attachments: [
      {
        modelName: "git",
        link: "https://github.com/MarkoVasicDeveloper/Crazy-Burger",
        offset: [4.5, -2.5, 0],
        scale: [0.2, 0.2, 0.05],
      },
    ],
  },
  {
    id: "css",
    name: "CSS Learning",
    link: "https://www.w3schools.com/css/",
    shaderKey: "plane",
    uniforms: "css",
    transform: {
      position: [72, 3, 71],
      rotation: [0, -Math.PI / 0.75, 0],
      scale: [0, 0, 0],
    },
    attachments: [
      {
        modelName: "css",
        link: "https://github.com/MarkoVasicDeveloper",
        offset: [4.5, -2, 0],
        scale: [10, 10, 10],
        rotation: [0, -Math.PI / 2, 0],
      },
    ],
  },
  {
    id: "react",
    name: "React Technology",
    link: "https://reactjs.org",
    shaderKey: "plane",
    uniforms: "react",
    transform: {
      position: [34, 3, 65],
      rotation: [0, -Math.PI / 0.65, 0],
      scale: [1, 1, 1],
    },
    attachments: [
      {
        modelName: "react",
        link: "https://github.com/MarkoVasicDeveloper",
        offset: [4.5, -2, 0],
        scale: [3, 3, 3],
        rotation: [0, 0, 0],
      },
    ],
  },
  {
    id: "python",
    name: "Python Logic",
    link: "https://www.python.org/",
    shaderKey: "plane",
    uniforms: "python",
    transform: {
      position: [4, 3, 42],
      rotation: [0, -Math.PI / 0.6, 0],
      scale: [1, 1, 1],
    },
    attachments: [
      {
        modelName: "python",
        link: "https://github.com/MarkoVasicDeveloper",
        offset: [4.7, -2, 0],
        scale: [0.8, 0.8, 0.8],
        rotation: [0, -Math.PI / 2, 0],
      },
    ],
  },
];
