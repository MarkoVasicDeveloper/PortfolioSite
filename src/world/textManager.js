import { Text3D } from "./text3d";
import { TechText } from "./techText";
import { TITLES_CONFIG, TECH_TEXT_CONFIG } from "../config/configIndex";
import { SHADER_REGISTRY } from "../shader/shaderRegistry";
import { SHADER_UNIFORMS } from "../shader/uniforms";

/**
 * TextManager handles the creation, organization, and disposal of all 3D text elements.
 * It separates text logic from the main World orchestrator.
 */
export class TextManager {
  /**
   * @param {import('../core/sceneManager').SceneManager} sceneManager
   * @param {import('../core/assetManager').AssetManager} assetManager
   */
  constructor(sceneManager, assetManager) {
    /** @type {import('../core/sceneManager').SceneManager} */
    this.sceneManager = sceneManager;
    /** @type {import('../core/assetManager').AssetManager} */
    this.assetManager = assetManager;
    /**
     * Collection of all active text instances (Text3D, TechText).
     * @type {Array<Object>}
     */
    this.texts = [];

    this._init();
  }

  _init() {
    this._addTitles();
    this._addTechTexts();
    this._addHeroText();
  }

  /**
   * Initializes and adds floating 3D titles to the scene based on configuration.
   * Uses the Permanent Marker font.
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
      this._register(title);
    });
  }

  /**
   * Initializes technology description texts using the JSON font.
   * @private
   * @returns {void}
   */
  _addTechTexts() {
    TECH_TEXT_CONFIG.forEach((config) => {
      const techText = new TechText(config, this.assetManager.fonts.fontJson);
      this._register(techText);
    });
  }

  /**
   * Creates the main "Hero" title with underwater shader effects.
   * @private
   * @returns {void}
   */
  _addHeroText() {
    this.heroText = new Text3D(
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
    this._register(this.heroText);
  }

  /**
   * Adds a text instance to the internal tracking array and the 3D scene.
   * @param {Object} textInstance - The text object to be managed.
   * @private
   */
  _register(textInstance) {
    this.texts.push(textInstance);
    this.sceneManager.add(textInstance);
  }

  /**
   * Disposes of all text resources and removes them from the scene.
   * Essential for preventing memory leaks.
   * @returns {void}
   */
  dispose() {
    this.texts.forEach((text) => {
      if (text.dispose) {
        text.dispose();
      }
      this.sceneManager.scene.remove(text);
    });

    this.heroText.dispose();
    this.texts = [];
  }
}
