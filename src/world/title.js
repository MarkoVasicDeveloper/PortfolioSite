import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

/**
 * Represents a 3D floating title in the scene.
 * @extends THREE.Mesh
 */
export class Title extends THREE.Mesh {
  /**
   * @param {Object} config - Title configuration
   * @param {Object} font - Loaded font object
   */
  constructor(config, font) {
    const geometry = new TextGeometry(config.text, {
      font: font,
      size: config.size,
      height: 0.01,
      curveSegments: 12,
    });

    const material = new THREE.MeshStandardMaterial({ color: "#525B68" });

    super(geometry, material);

    this.name = "title";
    this.position.set(...config.position);
    this.rotation.y = config.rotationY;

    this.scale.set(0, 0, 0);
  }

  /**
   * Proper cleanup of geometry and material
   */
  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}
