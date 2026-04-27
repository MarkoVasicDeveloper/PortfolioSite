import { matrixFragment } from "./fragment/matrix";
import { matrixVertex } from "./vertex/matrix";
import { planeFragment } from "./fragment/plane";
import { planeVertex } from "./vertex/plane";

/** * @typedef {Object} ShaderEntry
 * @property {string} vertex - The vertex shader source code
 * @property {string} fragment - The fragment shader source code
 */

/** @type {Object<string, ShaderEntry>} */
export const SHADER_REGISTRY = {
  matrix: {
    vertex: matrixVertex,
    fragment: matrixFragment,
  },
  plane: {
    vertex: planeVertex,
    fragment: planeFragment,
  },
};
