import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

/**
 * Represents descriptive technical paragraphs in 3D space.
 * @extends THREE.Mesh
 */
export class TechText extends THREE.Mesh {
  /**
   * @param {Object} config - Text configuration
   * @param {Object} font - Loaded font object
   */
  constructor(config, font) {
    const geometry = new TextGeometry(config.content, {
      font: font,
      size: 0.5,
      height: 0.01,
      curveSegments: 12,
    });

    const material = new THREE.MeshStandardMaterial({ color: "#525B68" });

    super(geometry, material);

    this.name = "technologyText";
    this.position.set(...config.position);
    this.rotation.y = config.rotationY;

    this.scale.set(0, 0, 0);
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}
