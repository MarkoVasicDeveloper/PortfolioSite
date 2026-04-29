import { AssetError } from "./errors/assetError";
import { Logger } from "./logger";

/**
 * @typedef {Object} AssetConfigEntry
 * @property {string} name - The unique identifier for the asset.
 * @property {string} url - Path to the asset file.
 */

/**
 * @typedef {Object} LoaderConfig
 * @property {Object} loader - The specific loader instance (e.g., GLTFLoader).
 * @property {Object} store - Reference to the internal store where the asset will be saved.
 */

/**
 * Orchestrates asset loading, storage, and retrieval.
 * Decoupled from specific rendering engines using Dependency Injection.
 * @extends EventTarget
 */
export class AssetManager extends EventTarget {
  /**
   * @param {Object.<string, LoaderConfig>} extensionMap - Maps file extensions to specific loaders and stores.
   */
  constructor(extensionMap = {}) {
    super();
    /** * Internal storage for all loaded resources.
     * @type {{models: Object, iconModels: Object, audio: Object, fonts: Object, textures: Object}}
     */
    this.assets = {
      models: {},
      iconModels: {},
      audio: {},
      fonts: {},
      textures: {},
    };
    /** * @type {Object.<string, LoaderConfig>}
     * @private
     */
    this.extensionMap = extensionMap;
  }

  /**
   * Injects or updates the loader configuration.
   * @param {Object.<string, LoaderConfig>} map - The extension to loader mapping.
   */
  setExtensionMap(map) {
    this.extensionMap = map;
  }

  /**
   * Connects an external LoadingManager to the internal event system.
   * @param {Object} loadingManager - The manager instance (e.g., THREE.LoadingManager).
   */
  setupProgress(loadingManager) {
    /**
     * @param {string} _ - The URL of the asset (unused).
     * @param {number} loaded - Number of assets loaded so far.
     * @param {number} total - Total number of assets to be loaded.
     */
    loadingManager.onProgress = (_, loaded, total) => {
      const progress = (loaded / total) * 100;
      /**
       * Fired when an asset progress updates.
       * @event AssetManager#assetProgress
       * @type {CustomEvent}
       * @property {Object} detail - The progress percentage (0-100).
       */
      this.dispatchEvent(
        new CustomEvent("assetProgress", { detail: progress }),
      );
    };

    loadingManager.onLoad = () => {
      /**
       * Fired when all assets are fully loaded.
       * @event AssetManager#assetLoaded
       */
      this.dispatchEvent(new CustomEvent("assetLoaded"));
    };
  }

  /**
   * Internal generic loader wrapper for Promises.
   * @param {Object} loader - The loader instance.
   * @param {string} url - Resource URL.
   * @param {string} name - Unique asset name.
   * @param {Object} store - Target storage object.
   * @returns {Promise<any>}
   * @private
   */
  _genericLoad(loader, url, name, store) {
    return new Promise((resolve, reject) => {
      if (!loader || typeof loader.load !== "function") {
        const error = new Error(`Invalid loader for asset: ${name}`);
        Logger.error("AssetManager", error.message);
        reject(error);
        return;
      }

      loader.load(
        url,
        (result) => {
          if (result.isTexture) {
            result.colorSpace = "srgb";
          }
          store[name] = result;
          resolve(result);
        },
        undefined,
        (error) => {
          const assetError = new AssetError(name, url, error);
          Logger.error("AssetManager", assetError.message, error);
          reject(assetError);
        },
      );
    });
  }

  /**
   * Loads all provided asset configurations in parallel.
   * @param {Object.<string, AssetConfigEntry[]>} assetsConfig - Config object containing arrays of assets.
   * @returns {Promise<any[]>} Resolved when all assets in config are processed.
   */
  async allLoad(assetsConfig) {
    const allPromises = Object.entries(assetsConfig).flatMap(
      ([groupKey, assets]) => {
        return assets.map((asset) => {
          const ext = asset.url.split("?")[0].split(".").pop().toLowerCase();
          const config = this.extensionMap[ext];

          if (config) {
            const targetStore = this.assets[groupKey] || config.store;

            return this._genericLoad(
              config.loader,
              asset.url,
              asset.name,
              targetStore,
            );
          }

          Logger.warn(
            "AssetManager",
            `Unsupported format .${ext} for "${asset.name}"`,
          );
          return Promise.resolve(null);
        });
      },
    );

    return Promise.all(allPromises);
  }

  /** @returns {Object} Loaded 3D models. */
  get models() {
    return this.assets.models;
  }

  /** @returns {Object} Loaded 3D iconModels. */
  get iconModels() {
    return this.assets.iconModels;
  }

  /** @returns {Object} Loaded font data. */
  get fonts() {
    return this.assets.fonts;
  }

  /** @returns {Object} Loaded audio buffers. */
  get audio() {
    return this.assets.audio;
  }

  /** @returns {Object} Loaded textures for shaders. */
  get textures() {
    return this.assets.textures;
  }
}
