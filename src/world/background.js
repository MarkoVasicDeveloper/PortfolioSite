import * as THREE from "three";

/**
 * Handles the background fog/shader plane.
 * Acts as a fullscreen background element by rendering a 2x2 plane
 * in a dedicated background scene with depth testing disabled.
 *
 * @extends THREE.Mesh
 */
export class Background extends THREE.Mesh {
  /**
   * @param {Object} shaderData - The shader source code.
   * @param {string} shaderData.vertex - Vertex shader string.
   * @param {string} shaderData.fragment - Fragment shader string.
   * @param {Object.<string, THREE.IUniform>} uniforms - Shader uniforms object.
   */
  constructor(shaderData, uniforms) {
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      fragmentShader: shaderData.fragment,
      vertexShader: shaderData.vertex,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    super(geometry, material);

    /** @type {string} */
    this.name = "background";
  }

  /**
   * Cleans up background resources.
   */
  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}
