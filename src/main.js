import * as THREE from "three";
import { AssetManager } from "./core/assetManager.js";
import { createThreeExtensionMap } from "./infrastructure/three/threeAssetConfig.js";
import { LoadingUI } from "./infrastructure/ui/loadingUI.js";
import { ASSET_CONFIG, interactionConfigs } from "./config/configIndex.js";
import { World } from "./world/world.js";
import { SceneManager } from "./core/sceneManager.js";
import { CameraController } from "./core/cameraController.js";
import { InputManager } from "./core/inputManager.js";
import { soundManager } from "./core/soundManager.js";
import { InteractionManager } from "./core/interactionManager.js";
import { RaycasterManager } from "./core/raycasterManager.js";
import { HudUI } from "./infrastructure/ui/headsUpDisplay.js";
import { OrientationManager } from "./infrastructure/ui/orientationManager.js";
import { Logger } from "./core/logger.js";

// --- Setup Base Engine ---
const canvas = document.querySelector("canvas.webgl");
const sceneManager = new SceneManager(canvas);
const loadingManager = new THREE.LoadingManager();
const assetManager = new AssetManager();
const input = new InputManager();

// --- Setup UI Managers ---
const hud = new HudUI(soundManager);

// This only triggers when the user clicks the "Enter" button
new LoadingUI(assetManager, async () => {
  // 1. Force landscape on mobile
  await OrientationManager.handleMobileOrientation();

  // 2. Unlock Audio Context (Browser requirement)
  soundManager.unlock();

  // 3. Start music only now
  soundManager.startBackgroundMusic("backgroundMusic", 0.2);

  // 4. Reveal the HUD (Mute button, etc.)
  hud.show();
});

// --- Configure Assets ---
const mapExtension = createThreeExtensionMap(assetManager, loadingManager);
assetManager.setExtensionMap(mapExtension);
assetManager.setupProgress(loadingManager);

// --- Systems Initialized after scene is ready ---
new RaycasterManager(sceneManager.camera, sceneManager.scene, assetManager);

/**
 * Main application entry point.
 * Handles asset loading and world initialization.
 */
async function startApp() {
  try {
    // Wait for all assets (models, textures, sounds)
    await assetManager.allLoad(ASSET_CONFIG);

    // Distribute loaded audio to manager
    soundManager.setAudioAssets(assetManager.audio);

    // Initialize the 3D World and Logic
    const world = new World(sceneManager, assetManager);
    const cameraController = new CameraController(
      sceneManager.camera,
      world.points,
    );

    const interactionManager = new InteractionManager(
      sceneManager.camera,
      sceneManager.scene,
      interactionConfigs,
    );

    // Start the Render Loop
    sceneManager.render((elapsedTime) => {
      const delta = input.popDeltaY();

      // Update systems
      if (world.update) world.update(elapsedTime);
      cameraController.update(delta);
      interactionManager.update();
    });
  } catch (error) {
    Logger.error("Critical loading error:", error);
  }
}

startApp();
