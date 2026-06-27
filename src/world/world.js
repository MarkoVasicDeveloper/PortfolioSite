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

    /** @type {Road} */
    this.road = new Road(this.sceneManager);

    /** @type {TextManager} */
    this.textManager = new TextManager(this.sceneManager, this.assetManager);

    /** @type {number} */
    this._lastTime = 0;

    /** @type {string|null} */
    this._previousZoneId = null;

    /** @type {FrogCharacter|null} */
    this.frog = null;

    /** @type {HeroStageBuilder|null} */
    this.stageBuilder = null;

    /** @type {Background|null} */
    this.fogBackground = null;

    this._init();
  }

  /**
   * Internal initialization sequence.
   * @private
   * @returns {void}
   */
  _init() {
    this._setupLights();
    this._addStaticModels();
    this._addProjectPanels();
    this._addBackground();
  }

  /** * Initializes ambient and directional lighting for the world.
   * @private
   * @returns {void}
   */
  _setupLights() {
    const ambientalLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.sceneManager.add(ambientalLight);

    const hemisphereLight = new THREE.HemisphereLight(0xeeeeff, 0x444444, 0.8);
    hemisphereLight.position.set(0, 20, 0);
    this.sceneManager.add(hemisphereLight);
  }

  /**
   * Iterates through asset configurations to instantiate, transform,
   * and inject static 3D models into the active scene.
   * @private
   * @returns {void}
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

  /**
   * Instantiates and configures the Frog character entity.
   * @param {Object} frogAsset - Raw graphic asset.
   * @param {Object} config - Asset transformation configuration.
   * @private
   * @returns {void}
   */
  _addFrogCharacter(frogAsset, config) {
    this.frog = new FrogCharacter(
      frogAsset,
      this.sceneManager.camera,
      FROG_TRIGGER_CONFIG,
    );
    this._applyTransforms(this.frog.container, config.transform);
    this.sceneManager.add(this.frog.container);
  }

  /**
   * Applies spatial transformations to a 3D target node.
   * @param {THREE.Object3D} model - Target 3D object container.
   * @param {Object} transform - Transformation parameters.
   * @private
   * @returns {void}
   */
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

  /**
   * Traverses the model hierarchy and injects custom shader materials.
   * @param {THREE.Object3D} model - Target 3D hierarchy.
   * @param {Object} config - Configuration object containing keys for shaders and uniforms.
   * @private
   * @returns {void}
   */
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

  /**
   * Initial setup and alignment for the Hero office diorama environment.
   * @param {THREE.Object3D} asset - Loaded office model context.
   * @private
   * @returns {void}
   */
  _setupHeroDiorama(asset) {
    this.stageBuilder = new HeroStageBuilder(this.sceneManager, asset);
    this.stageBuilder.build();
    this.stageBuilder.alignLightsToModel();
    this._setOfficeVisibility(true);
  }

  /**
   * Dispatches explicit visibility states to the office scene bounds and associated shadow lights.
   * @param {boolean} visible - Target visibility flag state.
   * @private
   * @returns {void}
   */
  _setOfficeVisibility(visible) {
    if (!this.stageBuilder) {
      return;
    }

    if (this.stageBuilder.officeScene) {
      this.stageBuilder.officeScene.visible = visible;
    }
    if (this.stageBuilder.neonBlueLight) {
      this.stageBuilder.neonBlueLight.visible = visible;
    }
    if (this.stageBuilder.topLight) {
      this.stageBuilder.topLight.visible = visible;
    }
  }

  /**
   * Instantiates project panels based on PANEL_CONFIG.
   * Maps loaded textures to shader uniforms and positions panels in space.
   * @private
   * @returns {void}
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
   * Updates global shader uniforms and processes dynamic zone transitions.
   * @param {number} elapsedTime - Total time since application start in seconds.
   * @returns {void}
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

      if (this.frog.currentZoneId !== this._previousZoneId) {
        this._previousZoneId = this.frog.currentZoneId;

        const isInsideOffice = this.frog.currentZoneId === "main_zone";
        this._setOfficeVisibility(isInsideOffice);
      }
    }
  }

  /**
   * Cleans up all resources, geometry and materials to prevent browser memory leaks.
   * @returns {void}
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

  /**
   * Fetches path positioning spline navigation points data.
   * @type {Array<THREE.Vector3>}
   */
  get points() {
    return this.road.points;
  }
}
