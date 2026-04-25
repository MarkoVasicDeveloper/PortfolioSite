import { matrixFragment } from "./fragment/matrix";
import { matrixVertex } from "./vertex/matrix";

/** * @typedef {Object} ShaderEntry
 * @property {string} vertex - The vertex shader source code
 * @property {string} fragment - The fragment shader source code
 * @property {string} uniforms - The key name of the uniforms object in SHADER_UNIFORMS
 */

/** @type {Object<string, ShaderEntry>} */
export const SHADER_REGISTRY = {
  matrix: {
    vertex: matrixVertex,
    fragment: matrixFragment,
    uniforms: "matrixUniforms",
  },
};
