import * as THREE from "three";
import { ASSET_CONFIG } from "../config/assets";
import { SHADER_REGISTRY } from "../shader/shaderRegistry";
import { SHADER_UNIFORMS } from "../shader/uniforms";
import { ProjectPanel } from "./projectPanel";
import { PANEL_CONFIG } from "../config/configIndex";
import { Road } from "./road";
import { Background } from "./background";
import { TextManager } from "./textManager";
import { HeroStageBuilder } from "../infrastructure/three/diorama/hero/heroStageBuilder";
import { FrogCharacter } from "./frogCharacter";
import { FROG_TRIGGER_CONFIG } from "../config/frogTriggerConfig";

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
    this.textManager = new TextManager(this.sceneManager, this.assetManager);

    this._lastTime = 0;

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
    this._addBackground();
  }

  /** * Initializes ambient and directional lighting for the world.
   * @private
   */
  _setupLights() {
    const ambientalLight = new THREE.AmbientLight(0xffffff, 0.2);

    const directionalLight = new THREE.DirectionalLight("#ffffff", 2.5);
    directionalLight.position.set(5, 15, 15);

    this.sceneManager.add(ambientalLight);
    // this.sceneManager.add(directionalLight);
  }

  /**
   * Iterates through asset configurations to instantiate, transform,
   * and inject static 3D models into the active scene.
   * @private
   */
  _addStaticModels() {
    ASSET_CONFIG.models.forEach((config) => {
      const asset = this.assetManager.models[config.name];
      if (!asset) {
        return;
      }

      if (config.name === "frog") {
        this._addFrogCharacter(asset, config);
        return;
      }

      const model = asset.scene || asset;

      this._applyTransforms(model, config.transform);
      this._applyShaders(model, config);

      if (config.name === "office") {
        this._setupHeroDiorama(model);
      }

      this.sceneManager.add(model);
    });
  }

  /** @private */
  _addFrogCharacter(frogAsset, config) {
    this.frog = new FrogCharacter(
      frogAsset,
      this.sceneManager.camera,
      FROG_TRIGGER_CONFIG,
    );
    this._applyTransforms(this.frog.container, config.transform);
    this.sceneManager.add(this.frog.container);
  }

  /** @private */
  _applyTransforms(model, transform) {
    if (!transform) {
      return;
    }
    const { position, scale, rotation } = transform;

    if (position) {
      model.position.set(...position);
    }
    if (scale) {
      model.scale.set(...scale);
    }
    if (rotation) {
      model.rotation.set(...rotation);
    }
  }

  /** @private */
  _applyShaders(model, config) {
    if (!config.shader || !SHADER_UNIFORMS[config.uniforms]) {
      return;
    }

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

  /** @private */
  _setupHeroDiorama(asset) {
    this.stageBuilder = new HeroStageBuilder(this.sceneManager, asset);
    this.stageBuilder.build();
    this.stageBuilder.alignLightsToModel();
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
      if (loadedTexture && uniforms.image) {
        uniforms.image.value = loadedTexture;
      }

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
   * Initializes the background fog system and adds it to the persistent background scene.
   * Uses a dedicated shader and uniforms to create a fullscreen visual effect.
   *
   * @private
   * @returns {void}
   */
  _addBackground() {
    this.fogBackground = new Background(
      SHADER_REGISTRY.fog,
      SHADER_UNIFORMS.fog,
    );
    this.sceneManager.addBackground(this.fogBackground);
  }

  /**
   * Main update loop for the world.
   * Updates global shader uniforms (like time) and individual panel animations.
   * @param {number} elapsedTime - Total time since application start.
   */
  update(elapsedTime) {
    const deltaTime = elapsedTime - this._lastTime;
    this._lastTime = elapsedTime;

    this.road.update(elapsedTime);

    Object.values(SHADER_UNIFORMS).forEach((u) => {
      if (u.time) {
        u.time.value = elapsedTime;
      }
    });

    this.projectPanels.forEach((panel) => panel.update(elapsedTime));

    if (this.frog) {
      this.frog.update(deltaTime);
    }
  }

  /**
   * Cleans up all resources to prevent memory leaks.
   */
  dispose() {
    this.road.dispose();
    this.fogBackground.dispose();
    this.projectPanels.forEach((panel) => panel.dispose());

    this.sceneManager.scene.traverse((child) => {
      if (child.isMesh) {
        child.geometry.dispose();

        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    });

    this.projectPanels = [];
    if (this.frog) {
      this.frog.dispose();
    }
  }

  /** @returns {Array} Loaded points data. */
  get points() {
    return this.road.points;
  }
}
