import * as THREE from "three";
import { SHADER_REGISTRY } from "../shader/shaderRegistry";
import { SHADER_UNIFORMS } from "../shader/uniforms";

/**
 * The Road class manages the road logic, path generation, and visual elements.
 * It uses custom ShaderMaterials to animate pulsing points along the path.
 */
export class Road {
  /**
   * Creates a road instance.
   * @param {Object} sceneManager - The scene manager used to add objects to the Three.js scene.
   */
  constructor(sceneManager) {
    this.sceneManager = sceneManager;

    this.group = new THREE.Group();
    this.sceneManager.add(this.group);

    this.progress = 0;
    this.materials = [];

    this._createPath();
    this._createVisualRoad();
  }

  /**
   * Generates the mathematical path (array of points) using EllipseCurve.
   * This path is used for camera movement and geometry reference.
   * @private
   */
  _createPath() {
    let ax = 22.5;
    const radius = [22, 18, 22, 62];

    this.points = [];

    for (let i = 0; i < 4; i++) {
      const curve = new THREE.EllipseCurve(
        i === 3 ? 62.5 : ax,
        0,
        radius[i],
        radius[i],
        0,
        Math.PI,
        i % 2 === 0 ? false : true,
        0,
      );

      const pts =
        i !== 3 ? curve.getPoints(300).reverse() : curve.getPoints(900);

      this.points.push(...pts);
      ax += 40;
    }
  }

  /**
   * Creates visual road objects (Points) using RingGeometry.
   * Each segment receives its own ShaderMaterial instance for independent animation.
   * @private
   */
  _createVisualRoad() {
    const geometry = new THREE.RingGeometry(
      15,
      25,
      30,
      4,
      0,
      6.283185307179586 / 2,
    );

    const shader = SHADER_REGISTRY["road"];
    let x = 22.5;

    for (let i = 0; i < 3; i++) {
      const material = new THREE.ShaderMaterial({
        vertexShader: shader.vertex,
        fragmentShader: shader.fragment,
        uniforms: THREE.UniformsUtils.clone(SHADER_UNIFORMS["road"]),
        transparent: true,
        depthWrite: false,
      });
      const mesh = new THREE.Points(geometry, material);

      mesh.position.x = x;
      mesh.rotation.x = i % 2 === 0 ? -Math.PI / 2 : Math.PI / 2;

      this.materials.push(material);
      this.group.add(mesh);

      x += 40;
    }

    const bigGeometry = new THREE.RingGeometry(
      55,
      65,
      90,
      4,
      0,
      6.283185307179586 / 2,
    );

    const bigMaterial = new THREE.ShaderMaterial({
      vertexShader: shader.vertex,
      fragmentShader: shader.fragment,
      uniforms: THREE.UniformsUtils.clone(SHADER_UNIFORMS["road"]),
      transparent: true,
      depthWrite: false,
    });

    const bigMesh = new THREE.Points(bigGeometry, bigMaterial);

    bigMesh.position.x = 62.5;
    bigMesh.rotation.x = Math.PI / 2;

    this.materials.push(bigMaterial);
    this.group.add(bigMesh);
  }

  /**
   * Updates material uniforms, specifically the time used for shader animations.
   * @param {number} elapsedTime - The total elapsed time since the application started.
   */
  update(elapsedTime) {
    if (this.materials) {
      this.materials.forEach((mat) => {
        mat.uniforms.time.value = elapsedTime;
      });
    }
  }
}
