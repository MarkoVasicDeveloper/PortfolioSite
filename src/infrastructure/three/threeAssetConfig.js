import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TTFLoader } from "three/examples/jsm/loaders/TTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { TextureLoader } from "three";

/**
 * Factory function to create a loader map for Three.js.
 * Connects file extensions to specific Three.js loaders and their respective storage.
 * * @param {AssetManager} assetManagerInstance - The core AssetManager instance for storage access.
 * @param {THREE.LoadingManager} loadingManager - The Three.js manager to track loading progress.
 * @returns {Object} A map of file extensions to their loader configurations.
 */
export function createThreeExtensionMap(assetManagerInstance, loadingManager) {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");

  const gltfLoader = new GLTFLoader(loadingManager);
  gltfLoader.setDRACOLoader(dracoLoader);

  const fontLoader = new FontLoader(loadingManager);
  const textureLoader = new TextureLoader(loadingManager);

  /**
   * Wrapper for Audio loading to ensure it follows the standard (url, onLoad, onProgress, onError) signature.
   * Note: HTML5 Audio doesn't report granular progress via XHR like Three.js loaders.
   */
  const audioLoaderWrapper = {
    load: (url, onLoad, onError) => {
      const audio = new Audio(url);
      audio.oncanplaythrough = () => onLoad(audio);
      audio.onerror = onError;
    },
  };

  /**
   * Wrapper for TTF loading that parses raw data into a Three.js Font instance.
   */
  const ttfFontLoaderWrapper = {
    load: (url, onLoad, onProgress, onError) => {
      const ttfLoader = new TTFLoader(loadingManager);
      ttfLoader.load(
        url,
        (json) => {
          onLoad(fontLoader.parse(json));
        },
        onProgress,
        onError,
      );
    },
  };

  return {
    glb: { loader: gltfLoader, store: assetManagerInstance.assets.models },
    gltf: { loader: gltfLoader, store: assetManagerInstance.assets.models },
    obj: {
      loader: new OBJLoader(loadingManager),
      store: assetManagerInstance.assets.models,
    },
    fbx: {
      loader: new FBXLoader(loadingManager),
      store: assetManagerInstance.assets.models,
    },
    json: {
      loader: fontLoader,
      store: assetManagerInstance.assets.fonts,
    },
    ttf: {
      loader: ttfFontLoaderWrapper,
      store: assetManagerInstance.assets.fonts,
    },
    mp3: {
      loader: audioLoaderWrapper,
      store: assetManagerInstance.assets.audio,
    },
    wav: {
      loader: audioLoaderWrapper,
      store: assetManagerInstance.assets.audio,
    },
    jpg: {
      loader: textureLoader,
      store: assetManagerInstance.assets.textures,
    },
    png: {
      loader: textureLoader,
      store: assetManagerInstance.assets.textures,
    },
  };
}
