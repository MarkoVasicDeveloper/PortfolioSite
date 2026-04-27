/**
 * Helper function to generate standard panel uniforms.
 * @returns {{ image: {type: string, value: THREE.Texture|null}, time: {type: string, value: number}, hover: {type: string, value: number} }}
 */
const createPanelUniforms = () => ({
  image: { type: "t", value: null },
  time: { type: "f", value: 0 },
  hover: { type: "f", value: 0 },
});

/**
 * Centralized registry for all shader uniforms used in the application.
 */
export const SHADER_UNIFORMS = {
  underwater: {
    speed: { value: 2.0 },
    scale: { value: 3 },
    time: { value: 0.0 },
  },

  fog: {
    time: { type: "f", value: 0 },
    color: { value: { r: 1, g: 1, b: 1 } },
    twinkleSpeed: { value: 20 },
    speed: { value: 0.0001 },
    brightness: { value: 0.0018 },
    distfading: { value: 0.2 },
  },

  matrix: {
    color: { value: { r: 0, g: 0.70196, b: 0.14509 } },
    resolution: { value: { x: 1.9461, y: 1.9369 } },
    charSize: { value: { x: 0.8769, y: 0.9384 } },
    charResolution: { value: 7.72425 },
    speed: { value: 18.2645 },
    time: { value: 0 },
  },

  main: createPanelUniforms(),
  washer: createPanelUniforms(),
  landary: createPanelUniforms(),
  burger: createPanelUniforms(),
  css: createPanelUniforms(),
  react: createPanelUniforms(),
  python: createPanelUniforms(),
};
