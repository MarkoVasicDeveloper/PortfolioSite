import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

/**
 * Universal 3D Text component that supports both standard and shader materials.
 */
export class Text3D extends THREE.Mesh {
  /**
   * @param {string} content - The actual text string to display.
   * @param {Object} font - The parsed Three.js font object.
   * @param {Object} [options={}] - Configuration options.
   * @param {number} [options.size=1] - Size of the text.
   * @param {number} [options.height=0.01] - Thickness of the text.
   * @param {string} [options.name="Text3D"] - Object name for the scene graph.
   * @param {number[]} [options.position=[0,0,0]] - Initial [x, y, z] position.
   * @param {number} [options.rotationY=0] - Initial rotation around the Y axis.
   * @param {number[]} [options.scale] - Initial [x, y, z] scale.
   * @param {string} [options.color="#525B68"] - Color for MeshStandardMaterial.
   * @param {boolean} [options.center=false] - Whether to center the geometry.
   * @param {Object} [options.shaderData] - Data for ShaderMaterial.
   * @param {string} options.shaderData.vertex - Vertex shader string.
   * @param {string} options.shaderData.fragment - Fragment shader string.
   * @param {Object} [options.uniforms={}] - Uniforms for ShaderMaterial.
   */
  constructor(content, font, options = {}) {
    const geometry = new TextGeometry(content, {
      font: font,
      size: options.size || 1,
      height: options.height || 0.01,
      curveSegments: 12,
    });

    let material;
    if (options.shaderData) {
      material = new THREE.ShaderMaterial({
        vertexShader: options.shaderData.vertex,
        fragmentShader: options.shaderData.fragment,
        uniforms: options.uniforms || {},
        transparent: true,
      });
    } else {
      material = new THREE.MeshStandardMaterial({
        color: options.color || "#525B68",
      });
    }

    super(geometry, material);

    if (options.name) this.name = options.name;

    if (options.position) this.position.set(...options.position);
    if (options.rotationY !== undefined) this.rotation.y = options.rotationY;

    if (options.scale) this.scale.set(0, 0, 0);
  }

  /**
   * Frees the GPU resources allocated for this text instance.
   * Must be called when the object is permanently removed from the scene.
   */
  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}
