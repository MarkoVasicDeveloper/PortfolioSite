import * as THREE from "three";
import { LIGHT_CONFIG } from "../../../../config/heroDioram";

/**
 * @typedef {Object} StageBuilderResult
 * @property {THREE.Object3D|null} characterModel - The extracted character mesh (Frog/Armature).
 * @property {THREE.AnimationClip[]} animations - Animations associated with the loaded model.
 */

/**
 * HeroStageBuilder responsibility is to isolate the configuration,
 * material mapping, shadow settings, and precise lighting alignment for the Hero Diorama.
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

    this.officeScene.traverse((child) => {
      if (child.isMesh) {
        if (child.material.type === "MeshBasicMaterial") {
          child.material = new THREE.MeshStandardMaterial({
            color: child.material.color,
            map: child.material.map,
          });
        }

        if (child.name.toLowerCase() === "screen") {
          const oldMaterial = child.material;

          child.material = oldMaterial.clone();
          child.material.emissive = new THREE.Color(0x00a8ff);
          child.material.emissiveIntensity = 2.0;

          if (oldMaterial) {
            oldMaterial.dispose();
          }

          this.screenMesh = child;
          this.screenMesh.geometry.computeBoundingBox();
        }

        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          child.material.roughness = 0.6;
        }
      }
    });

    this._initLights();
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
    this.neonBlueLight.shadow.mapSize.width = 1024;
    this.neonBlueLight.shadow.mapSize.height = 1024;
    this.neonBlueLight.shadow.bias = -0.001;

    this.customNeonTarget = new THREE.Object3D();
    this.sceneManager.add(this.customNeonTarget);

    this.neonBlueLight.target = this.customNeonTarget;
    this.sceneManager.add(this.neonBlueLight);

    this.topLight = new THREE.DirectionalLight(0xffe6b3, 2.5);
    this.topLight.castShadow = true;
    this.topLight.shadow.mapSize.width = 1024;
    this.topLight.shadow.mapSize.height = 1024;
    this.topLight.shadow.bias = -0.0005;

    const boxSize = LIGHT_CONFIG.directional.boxSize;
    this.topLight.shadow.camera.left = -boxSize;
    this.topLight.shadow.camera.right = boxSize;
    this.topLight.shadow.camera.top = boxSize;
    this.topLight.shadow.camera.bottom = -boxSize;
    this.topLight.shadow.camera.near = 1;
    this.topLight.shadow.camera.far = 15;

    this.lightTarget = new THREE.Object3D();
    this.sceneManager.add(this.lightTarget);

    this.topLight.target = this.lightTarget;
    this.sceneManager.add(this.topLight);
  }

  /**
   * Late initialization step. Magnifies world transforms and aligns the lights
   * to the physical geometry center of the screen mesh.
   * Call this ONCE right after the model is positioned in the world scene.
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
