import * as THREE from "three";

/**
 * Helper function to generate standard panel uniforms.
 * @returns {{ image: {type: string, value: THREE.Texture|null}, time: {type: string, value: number}, hover: {type: string, value: number} }}
 */
const createPanelUniforms = () => ({
  image: { value: null },
  time: { value: 0 },
  hover: { value: 0 },
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
    time: { value: 0 },
    color: { value: new THREE.Color(1, 1, 1) },
    twinkleSpeed: { value: 20 },
    speed: { value: 0.0001 },
    brightness: { value: 0.0018 },
    distfading: { value: 0.2 },
  },

  matrix: {
    color: { value: new THREE.Color(0, 0.70196, 0.14509) },
    resolution: { value: new THREE.Vector2(1.9461, 1.9369) },
    charSize: { value: new THREE.Vector2(0.8769, 0.9384) },
    charResolution: { value: 7.72425 },
    speed: { value: 18.2645 },
    time: { value: 0 },
  },

  road: {
    time: { value: 0 },
    color: { value: new THREE.Color(0x00aaff) },
  },

  main: createPanelUniforms(),
  washer: createPanelUniforms(),
  landary: createPanelUniforms(),
  burger: createPanelUniforms(),
  css: createPanelUniforms(),
  react: createPanelUniforms(),
  python: createPanelUniforms(),
};
