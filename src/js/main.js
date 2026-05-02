import * as THREE from "three";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
// import { raycasterHover, raycasterClick } from "./raycaster/raycaster";
// import { loadingModel, dracoModel } from "./loadingModel";
import { TTFLoader } from "three/examples/jsm/loaders/TTFLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
// import { myAnimatedModel, mixer } from "./myASnimatedModel";
// import mute from "../../static/mute.png";
// import play from "../../static/volume.png";

import { AssetManager } from "../core/assetManager";

import { createThreeExtensionMap } from "../infrastructure/three/threeAssetConfig.js";
import { LoadingUI } from "../infrastructure/ui/loadingUI.js";
import { ASSET_CONFIG, interactionConfigs } from "../config/configIndex.js";
import { World } from "../world/world.js";
import { SceneManager } from "../core/sceneManager.js";
import { CameraController } from "../core/cameraController.js";
import { InputManager } from "../core/inputManager.js";
import { soundManager } from "../core/soundManager.js";
import { InteractionManager } from "../core/interactionManager.js";

const enterButton = document.getElementById("enter");
const loadingContent = document.querySelector(".loadingContent");
const info = document.querySelector(".info");

const canvas = document.querySelector("canvas.webgl");

const sceneManager = new SceneManager(canvas);

const loadingManager = new THREE.LoadingManager();
const assetManager = new AssetManager();
new LoadingUI(assetManager);

const mapExtension = createThreeExtensionMap(assetManager, loadingManager);
assetManager.setExtensionMap(mapExtension);
assetManager.setupProgress(loadingManager);
const input = new InputManager();

async function startApp() {
  try {
    await assetManager.allLoad(ASSET_CONFIG);
    soundManager.setAudioAssets(assetManager.audio);
    soundManager.startBackgroundMusic("backgroundMusic", 0.2);

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

    sceneManager.render((elapsedTime) => {
      const delta = input.popDeltaY();
      if (world.update) world.update(elapsedTime);
      cameraController.update(delta);
      interactionManager.update();
    });
  } catch (error) {
    console.error("Loading error:", error);
  }
}

startApp();

export const ttfLoader = new TTFLoader(loadingManager);
export const loader = new FontLoader(loadingManager);
export const modelLoader = new GLTFLoader(loadingManager);
export const fbxLoader = new FBXLoader(loadingManager);

// function launchFullScreen(element) {
//   if (element.requestFullScreen) {
//     element.requestFullScreen();
//   } else if (element.mozRequestFullScreen) {
//     element.mozRequestFullScreen();
//   } else if (element.webkitRequestFullScreen) {
//     element.webkitRequestFullScreen();
//   }
// }

enterButton.onclick = () => {
  soundManager.unlock();
  // backAudio.play();
  loadingContent.style.display = "none";
  info.classList.remove("hidden");
  // distanceOfCamera(camera, objectArray, scene);
  // window.addEventListener("wheel", (e) => {
  //   moveCamera(e, camera, points);
  //   distanceOfCamera(camera, objectArray, scene);
  // });

  // window.addEventListener("touchmove", (e) => {
  //   moveCamera(e, camera, points);
  //   distanceOfCamera(camera, objectArray, scene);
  // });
  // if (window.innerHeight > window.innerWidth)
  //   launchFullScreen(document.documentElement);
};

// let pausedMusic = false;

// info.onclick = () => {
//   const img = document.querySelector(".info img");
//   if (!pausedMusic) {
//     // backAudio.pause();
//     img.src = mute;
//     pausedMusic = true;
//     return;
//   }
//   img.src = play;
//   // backAudio.play();
//   pausedMusic = false;
// };

// window.addEventListener("resize", () => onResize(camera, renderer));
// window.addEventListener("pointermove", (e) => raycasterHover(e, camera, scene));
// window.addEventListener("click", () => raycasterClick(camera, scene));

// addTitle(scene);
// myName(scene);
// loadingModel(scene);
// // technologyText(scene);
// dracoModel(scene);
// // myAnimatedModel(myModel, scene);

// const geometry = myPanel.children[0].geometry;
// const positionAttribute = geometry.getAttribute("position");

// const vertex = new THREE.Vector3();

// let frame = 1;
// console.log(mixer);
// function animation() {
//   // if (mixer) mixer.update(time.getDelta());

//   for (let i = 0; i < uniformsArray.length; i++) {
//     uniformsArray[i].time.value = time.getElapsedTime();
//   }

//   for (let i = 0; i < ringArray.length; i++) {
//     ringArray[i].scale.set(1 + Math.sin(frame) * 3, 1 + Math.sin(frame) * 3, 1);
//   }

//   frame += 0.07;

//   for (let y = 0; y < 200 + 1; y++) {
//     for (let x = 0; x < 300 + 1; x++) {
//       const index = x + y * (300 + 1);
//       const pos = vertex.fromBufferAttribute(positionAttribute, index);
//       const time = (Date.now() * 0.2) / 50;
//       pos.z = (Math.sin(0.08 * x + 0.08 * y - time) * 0.03 * x) / 60;
//       geometry.attributes.position.setXYZ(index, pos.x, pos.y, pos.z);
//     }
//   }

//   myPanel.children[0].geometry.attributes.position.needsUpdate = true;

//   renderer.clear();
//   renderer.render(bgScene, bgCamera);
//   renderer.render(scene, camera);
//   requestAnimationFrame(animation);
// }

// animation();
