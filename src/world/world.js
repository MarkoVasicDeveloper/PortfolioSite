import * as THREE from "three";
import { ASSET_CONFIG } from "../config/assets";
import { SHADER_REGISTRY } from "../shader/shaderRegistry";
import { SHADER_UNIFORMS } from "../shader/uniforms";
import { ProjectPanel } from "./projectPanel";
import { PANEL_CONFIG } from "../config/panels";

/**
 * World class handles everything that lives INSIDE the scene.
 * Models, Lights, Environment, etc.
 */

export class World {
  /**
   * @param {import('../core/sceneManager').SceneManager} sceneManager
   * @param {import('../core/assetManager').AssetManager} assetManager
   */
  constructor(sceneManager, assetManager) {
    this.sceneManager = sceneManager;
    this.assetManager = assetManager;

    this.projectPanels = [];

    this._setupLights();
    this._addStaticModels();
    this._addProjectPanels();
  }

  /** @private */
  _setupLights() {
    const ambientalLight = new THREE.AmbientLight(0xffffff, 1);

    const directionalLight = new THREE.DirectionalLight("#ffffff", 0.2);
    directionalLight.position.set(2, 4, 1);

    this.sceneManager.add(ambientalLight);
    this.sceneManager.add(directionalLight);
  }

  /** @private */
  _addStaticModels() {
    ASSET_CONFIG.models.forEach((config) => {
      const asset = this.assetManager.models[config.name];
      if (!asset) return;

      const model = asset.scene || asset;
      if (config.transform) {
        const { position, scale, rotation } = config.transform;
        if (position) model.position.set(...position);
        if (scale) model.scale.set(...scale);
        if (rotation) model.rotation.set(...rotation);
      }

      if (config.shader && SHADER_UNIFORMS[config.uniforms]) {
        const shaderData = SHADER_REGISTRY[config.shader];

        model.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.ShaderMaterial({
              vertexShader: shaderData.vertex,
              fragmentShader: shaderData.fragment,
              uniforms: SHADER_UNIFORMS[config.uniforms],
            });
          }
        });
      }

      this.sceneManager.add(model);
    });
  }

  /** @private */
  _addProjectPanels() {
    PANEL_CONFIG.forEach((config) => {
      const shaderData = SHADER_REGISTRY[config.shaderKey];
      const uniforms = SHADER_UNIFORMS[config.uniforms];

      const loadedTexture = this.assetManager.textures[config.id];
      if (loadedTexture && uniforms.image) uniforms.image.value = loadedTexture;

      const panel = new ProjectPanel(
        config,
        shaderData,
        uniforms,
        this.assetManager,
      );

      panel.position.set(...config.transform.position);
      panel.rotation.set(...config.transform.rotation);
      panel.scale.set(...config.transform.scale);

      this.projectPanels.push(panel);
      this.sceneManager.add(panel);
    });
  }

  update(elapsedTime) {
    Object.values(SHADER_UNIFORMS).forEach((u) => {
      if (u.time) u.time.value = elapsedTime;
    });

    this.projectPanels.forEach((panel) => panel.update(elapsedTime));
  }
}
