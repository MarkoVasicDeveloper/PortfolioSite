import { matrixFragment } from "./fragment/matrix";
import { matrixVertex } from "./vertex/matrix";
import { planeFragment } from "./fragment/plane";
import { planeVertex } from "./vertex/plane";
import { roadVertex } from "./vertex/road";
import { roadFragment } from "./fragment/road";
import { underwaterVertex } from "./vertex/underwater";
import { underwaterFragment } from "./fragment/underwater";
import { fogFragment } from "./fragment/fog";
import { fogVertex } from "./vertex/fog";

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
  road: {
    vertex: roadVertex,
    fragment: roadFragment,
  },
  underwater: {
    vertex: underwaterVertex,
    fragment: underwaterFragment,
  },
  fog: {
    vertex: fogVertex,
    fragment: fogFragment,
  },
};
