import * as THREE from "three";
import { LIGHT_CONFIG } from "../../../../config/heroDioram";

/**
 * HeroStageBuilder isolates the configuration, material mapping,
 * shadow settings, and precise lighting alignment for the Hero Diorama.
 */
export class HeroStageBuilder {
  /**
   * @param {Object} sceneManager - The core scene manager.
   * @param {THREE.Scene|Object} model - The loaded GLTF/GLB model asset.
   */
  constructor(sceneManager, model) {
    /** @type {Object} */
    this.sceneManager = sceneManager;
    /** @type {THREE.Scene|Object} */
    this.office = model;

    /** @type {THREE.DirectionalLight|null} */
    this.topLight = null;
    /** @type {THREE.Object3D|null} */
    this.lightTarget = null;
    /** @type {THREE.Group|THREE.Scene|null} */
    this.officeScene = null;
    /** @type {THREE.SpotLight|null} */
    this.neonBlueLight = null;
    /** @type {THREE.Object3D|null} */
    this.customNeonTarget = null;
    /** @type {THREE.Mesh|null} */
    this.screenMesh = null;

    /** @private */
    this._vModelPos = new THREE.Vector3();
    /** @private */
    this._vLocalCenter = new THREE.Vector3();
    /** @private */
    this._vRealScreenPos = new THREE.Vector3();
  }

  /**
   * Parses the hierarchy, configures PBR materials, shadows, and computes spatial bounds.
   */
  build() {
    this.officeScene = this.office.scene || this.office;
    const AMBIENT_DARKNESS = 0.3;
    const DEFAULT_ROUGHNESS = 0.8;
    const DEFAULT_METALNESS = 0.1;

    this.officeScene.traverse((child) => {
      if (!child.isMesh) {
        return;
      }

      if (child.name.toLowerCase() === "screen") {
        this._setupScreenMesh(child);
        return;
      }

      if (child.material) {
        this._optimizeMaterial(
          child,
          AMBIENT_DARKNESS,
          DEFAULT_ROUGHNESS,
          DEFAULT_METALNESS,
        );
      }

      child.castShadow = true;
      child.receiveShadow = true;
    });

    this._initLights();
  }

  /**
   * Optimizes standard mesh materials to handle low-light environments correctly.
   * @private
   */
  _optimizeMaterial(mesh, darknessFactor, roughness, metalness) {
    const oldMaterial = mesh.material;
    const originalColor = oldMaterial.color
      ? oldMaterial.color.clone()
      : new THREE.Color(0xffffff);

    originalColor.multiplyScalar(darknessFactor);

    mesh.material = new THREE.MeshStandardMaterial({
      color: originalColor,
      map: oldMaterial.map,
      roughness: roughness,
      metalness: metalness,
    });

    oldMaterial.dispose();
  }

  /**
   * Configures the neon emission material specifically for the monitor screen.
   * @private
   */
  _setupScreenMesh(mesh) {
    const oldMaterial = mesh.material;

    mesh.material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x111111),
      map: oldMaterial ? oldMaterial.map : null,
      emissive: new THREE.Color(0x00a8ff),
      emissiveIntensity: 2.0,
      roughness: 0.2,
    });

    if (oldMaterial) {
      oldMaterial.dispose();
    }

    this.screenMesh = mesh;
    this.screenMesh.geometry.computeBoundingBox();

    this.screenMesh.castShadow = true;
    this.screenMesh.receiveShadow = true;
  }

  /**
   * Instantiates and registers the doriama-specific lights into the scene.
   * @private
   */
  _initLights() {
    this.neonBlueLight = new THREE.SpotLight(
      0x00a8ff,
      15,
      5,
      Math.PI / 5,
      0.4,
      1,
    );
    this.neonBlueLight.castShadow = true;
    this.neonBlueLight.shadow.mapSize.set(1024, 1024);
    this.neonBlueLight.shadow.bias = -0.001;

    this.customNeonTarget = new THREE.Object3D();
    this.sceneManager.add(this.customNeonTarget);

    this.neonBlueLight.target = this.customNeonTarget;
    this.sceneManager.add(this.neonBlueLight);

    this.topLight = new THREE.DirectionalLight(0xffe6b3, 2.5);
    this.topLight.castShadow = true;
    this.topLight.shadow.mapSize.set(1024, 1024);
    this.topLight.shadow.bias = -0.0005;

    const boxSize = LIGHT_CONFIG.directional.boxSize;
    const shadowCam = this.topLight.shadow.camera;
    shadowCam.left = -boxSize;
    shadowCam.right = boxSize;
    shadowCam.top = boxSize;
    shadowCam.bottom = -boxSize;
    shadowCam.near = 1;
    shadowCam.far = 15;

    this.lightTarget = new THREE.Object3D();
    this.sceneManager.add(this.lightTarget);

    this.topLight.target = this.lightTarget;
    this.sceneManager.add(this.topLight);
  }

  /**
   * Aligns the lights to the physical geometry center of the screen mesh.
   */
  alignLightsToModel() {
    if (
      !this.topLight ||
      !this.lightTarget ||
      !this.officeScene ||
      !this.screenMesh
    ) {
      return;
    }

    this.officeScene.updateMatrixWorld(true);
    this.officeScene.getWorldPosition(this._vModelPos);

    this.screenMesh.geometry.boundingBox.getCenter(this._vLocalCenter);
    this._vRealScreenPos.copy(this._vLocalCenter);
    this.screenMesh.localToWorld(this._vRealScreenPos);

    const actualScreenY = this._vModelPos.y + LIGHT_CONFIG.screenHeightOffset;

    this.neonBlueLight.position.set(
      this._vRealScreenPos.x,
      actualScreenY,
      this._vRealScreenPos.z + 0.1,
    );

    this.customNeonTarget.position.set(
      this._vRealScreenPos.x + LIGHT_CONFIG.targetXOffset,
      actualScreenY,
      this._vRealScreenPos.z + LIGHT_CONFIG.targetZOffset,
    );

    this.lightTarget.position.copy(this._vModelPos);
    this.topLight.position.set(
      this._vModelPos.x + LIGHT_CONFIG.directional.x,
      this._vModelPos.y + LIGHT_CONFIG.directional.y,
      this._vModelPos.z + LIGHT_CONFIG.directional.z,
    );

    this.topLight.shadow.camera.updateProjectionMatrix();
  }
}
