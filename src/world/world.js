import * as THREE from "three";
import { ASSET_CONFIG } from "../config/assets";
import { SHADER_REGISTRY } from "../shader/shaderRegistry";
import { SHADER_UNIFORMS } from "../shader/uniforms";
import { ProjectPanel } from "./projectPanel";
import {
  PANEL_CONFIG,
  TITLES_CONFIG,
  TECH_TEXT_CONFIG,
} from "../config/configIndex";
import { Road } from "./road";
import { TechText } from "./techText";
import { Text3D } from "./text3d";

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
    /** @type {import('../core/sceneManager').SceneManager} */
    this.sceneManager = sceneManager;
    /** @type {import('../core/assetManager').AssetManager} */
    this.assetManager = assetManager;

    /** * Collection of active ProjectPanel instances.
     * @type {ProjectPanel[]}
     */
    this.projectPanels = [];

    this.road = new Road(this.sceneManager);

    this._init();
  }

  /**
   * Internal initialization sequence.
   * @private
   */
  _init() {
    this._setupLights();
    this._addStaticModels();
    this._addProjectPanels();
    this._addTitles();
    this._addTechTexts();
    this._addHeroText();
  }

  /** * Initializes ambient and directional lighting for the world.
   * @private
   */
  _setupLights() {
    const ambientalLight = new THREE.AmbientLight(0xffffff, 1);

    const directionalLight = new THREE.DirectionalLight("#ffffff", 0.2);
    directionalLight.position.set(2, 4, 1);

    this.sceneManager.add(ambientalLight);
    this.sceneManager.add(directionalLight);
  }

  /** * Iterates through ASSET_CONFIG to instantiate and position static 3D models.
   * Applies custom shaders if specified in the configuration.
   * @private
   */
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

  /** * Instantiates project panels based on PANEL_CONFIG.
   * Maps loaded textures to shader uniforms and positions panels in space.
   * @private
   */
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

  /**
   * Initializes and adds floating 3D titles to the scene based on the configuration.
   * Iterates through the TITLES_CONFIG and creates a new Title instance for each entry,
   * passing the pre-loaded Permanent Marker font from the AssetManager.
   *
   * @private
   * @returns {void}
   */
  _addTitles() {
    TITLES_CONFIG.forEach((config) => {
      const title = new Text3D(
        config.text,
        this.assetManager.fonts.fontPremanentMarker,
        {
          position: [...config.position],
          rotationY: config.rotationY,
          size: config.size,
          scale: [0, 0, 0],
          name: "title",
        },
      );
      this.sceneManager.add(title);
    });
  }

  /**
   * Initializes technology description texts.
   * @private
   */
  _addTechTexts() {
    TECH_TEXT_CONFIG.forEach((config) => {
      const techText = new TechText(config, this.assetManager.fonts.fontJson);
      this.sceneManager.add(techText);
    });
  }

  /**
   * Creates the main "Hero" title with liquid shader effects.
   * @private
   */
  _addHeroText() {
    const heroText = new Text3D(
      "Marko Vasic",
      this.assetManager.fonts.fontJustAnotherHand,
      {
        size: 3.9,
        position: [88, 1, 0],
        rotationY: -Math.PI / 2,
        shaderData: SHADER_REGISTRY.underwater,
        uniforms: SHADER_UNIFORMS.underwater,
      },
    );
    this.sceneManager.add(heroText);
  }

  /**
   * Main update loop for the world.
   * Updates global shader uniforms (like time) and individual panel animations.
   * @param {number} elapsedTime - Total time since application start.
   */
  update(elapsedTime) {
    this.road.update(elapsedTime);

    Object.values(SHADER_UNIFORMS).forEach((u) => {
      if (u.time) u.time.value = elapsedTime;
    });

    this.projectPanels.forEach((panel) => panel.update(elapsedTime));
  }

  /** @returns {Array} Loaded points data. */
  get points() {
    return this.road.points;
  }
}
