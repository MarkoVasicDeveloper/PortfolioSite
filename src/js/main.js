import * as THREE from "three";
import { stage } from "./stage";
import { onResize } from "./onResize";
import {
  underwaterUniforms,
  planeUniforms,
  washerUniforms,
  landaryUniforms,
  lightUniforms,
  crazyBurgerUniforms,
  fogUniforms,
  matrixUniforms,
  cssUniforms,
  reactUniforms,
  pythonUniforms,
} from "../shader/uniforms/uniforms";
import { road } from "./road.js";
import { path } from "./path.js";
import { moveCamera } from "./moveCamera";
import { createPanel, clonePanel } from "./createPanel";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
// import addText from "./addText";
import { raycasterHover, raycasterClick } from "./raycaster/raycaster";
import { addTitle } from "./addTitle";
import { myName } from "./myName";
import { loadingModel, dracoModel } from "./loadingModel";
// import { technologyText } from "./technologyText";
import { distanceOfCamera } from "./distanceOfCamera";
import { TTFLoader } from "three/examples/jsm/loaders/TTFLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { myAnimatedModel, mixer } from "./myASnimatedModel";
import myModel from "url:../../static/myModel.glb";
import mute from "../../static/mute.png";
import play from "../../static/volume.png";

import { AssetManager } from "../core/assetManager";

import bilbord from "url:../../static/bilbord.obj";
import board from "url:../../static/board.obj";
import bord from "url:../../static/bord.glb";
import businesModel from "url:../../static/businesModel.glb";
import gitModel from "url:../../static/git.glb";
import cssModel from "url:../../static/CSS.glb";
import reactModel from "url:../../static/react.glb";
import pythonModel from "url:../../static/python.glb";
import jsLogo from "url:../../static/jsLogo.glb";
import jsLogoCube from "url:../../static/jsLogoCube.glb";
import linkedin from "url:../../static/linkedin.glb";

// import fontJson from "url:../../static/font.json";
import fontFreehand from "url:../../static/Freehand-Regular.ttf";
import fontJustAnotherHand from "url:../../static/JustAnotherHand-Regular.ttf";
import fontPremanentMarker from "url:../../static/PermanentMarker-Regular.ttf";
// import fontTitle from "url:../../static/titleFont.json";

import backgroundMusic from "url:../../static/background.mp3";
import clickWav from "url:../../static/click.wav";
import particleInWav from "url:../../static/particle-fade-in.wav";
import particleInWav2 from "url:../../static/particle-fade-in-2.wav";
import textFade from "url:../../static/textFade.mp3";
import welcome from "url:../../static/welcome.mp3";
import untitled from "url:../../static/untitled.glb";
import { createThreeExtensionMap } from "../infrastructure/three/threeAssetConfig.js";
import { LoadingUI } from "../infrastructure/ui/loadingUI.js";

const enterButton = document.getElementById("enter");
const loadingContent = document.querySelector(".loadingContent");
const info = document.querySelector(".info");

const loadingManager = new THREE.LoadingManager();
const assetManager = new AssetManager();
new LoadingUI(assetManager);

const mapExtension = createThreeExtensionMap(assetManager, loadingManager);
assetManager.setExtensionMap(mapExtension);
assetManager.setupProgress(loadingManager);

async function startApp() {
  try {
    await assetManager.allLoad({
      models: [
        { name: "heroModel", url: myModel },
        { name: "bilbord", url: bilbord },
        { name: "git", url: gitModel },
        { name: "css", url: cssModel },
        { name: "react", url: reactModel },
        { name: "python", url: pythonModel },
        { name: "jsLogo", url: jsLogo },
        { name: "jsLogoCube", url: jsLogoCube },
        { name: "linkedin", url: linkedin },
        { name: "busines", url: businesModel },
        { name: "board", url: board },
        { name: "bord", url: bord },
        { name: "untitled", url: untitled },
      ],
      audio: [
        { name: "backgroundMusic", url: backgroundMusic },
        { name: "click", url: clickWav },
        { name: "particleIn", url: particleInWav },
        { name: "particleIn2", url: particleInWav2 },
        { name: "textFade", url: textFade },
        { name: "welcome", url: welcome },
      ],
      fonts: [
        { name: "fontJson", url: "/fonts/font.json" },
        { name: "fontFreehand", url: fontFreehand },
        { name: "fontJustAnotherHand", url: fontJustAnotherHand },
        { name: "fontPremanentMarker", url: fontPremanentMarker },
        { name: "fontTitle", url: "/fonts/titleFont.json" },
      ],
    });
    // initScene();
  } catch (error) {
    console.error("Loading error:", error);
  }
}

startApp();

const backAudio = new Audio(backgroundMusic);
backAudio.volume = 0.2;
backAudio.loop = true;

export const ttfLoader = new TTFLoader(loadingManager);
export const loader = new FontLoader(loadingManager);
export const modelLoader = new GLTFLoader(loadingManager);
export const fbxLoader = new FBXLoader(loadingManager);

function launchFullScreen(element) {
  if (element.requestFullScreen) {
    element.requestFullScreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}

enterButton.onclick = () => {
  backAudio.play();
  loadingContent.style.display = "none";
  info.classList.remove("hidden");
  distanceOfCamera(camera, objectArray, scene);
  window.addEventListener("wheel", (e) => {
    moveCamera(e, camera, points);
    distanceOfCamera(camera, objectArray, scene);
  });

  window.addEventListener("touchmove", (e) => {
    moveCamera(e, camera, points);
    distanceOfCamera(camera, objectArray, scene);
  });
  if (window.innerHeight > window.innerWidth)
    launchFullScreen(document.documentElement);
};

let pausedMusic = false;

info.onclick = () => {
  const img = document.querySelector(".info img");
  if (!pausedMusic) {
    backAudio.pause();
    img.src = mute;
    pausedMusic = true;
    return;
  }
  img.src = play;
  backAudio.play();
  pausedMusic = false;
};

const time = new THREE.Clock();

const roadObject = road();

const points = path();

const myPanel = createPanel();
myPanel.scale.set(0, 0, 0);

const washerPanel = clonePanel(
  myPanel.clone(),
  "https://washersoftware.com",
  washerUniforms,
  "washer",
);
washerPanel.rotation.y = -Math.PI / 1.3;
washerPanel.position.set(52, 4, 0);
washerPanel.scale.set(0, 0, 0);

const landaryPanel = clonePanel(
  myPanel.clone(),
  "https://perionicavasic.rs",
  landaryUniforms,
  "landary",
);
landaryPanel.rotation.y = -Math.PI / 1.8;
landaryPanel.position.set(72, 4, 22);
landaryPanel.scale.set(0, 0, 0);

const crazyBurgerPanel = clonePanel(
  myPanel.clone(),
  "https://markovasicdeveloper.github.io/Crazy-Burger/",
  crazyBurgerUniforms,
  "burger",
);
crazyBurgerPanel.rotation.y = -Math.PI / 10;
crazyBurgerPanel.position.set(80, 4, -18);
crazyBurgerPanel.scale.set(0, 0, 0);

const reactPanel = clonePanel(
  myPanel.clone(),
  "https://reactjs.org",
  reactUniforms,
  "technology",
);
reactPanel.rotation.y = -Math.PI / 0.65;
reactPanel.position.set(34, 3, 65);

const cssPanel = clonePanel(
  myPanel.clone(),
  "https://www.w3schools.com/css/",
  cssUniforms,
  "technology",
);
cssPanel.rotation.y = -Math.PI / 0.75;
cssPanel.position.set(72, 3, 71);
cssPanel.scale.set(0, 0, 0);

const pythonPanel = clonePanel(
  myPanel.clone(),
  "https://www.python.org/",
  pythonUniforms,
  "technology",
);
pythonPanel.rotation.y = -Math.PI / 0.6;
pythonPanel.position.set(4, 3, 42);

const washerRing = washerPanel.children[1].children[0].children[0];
const ring = myPanel.children[1].children[0].children[0];
const landaryRing = landaryPanel.children[1].children[0].children[0];
const crazyBurgerRing = crazyBurgerPanel.children[1].children[0].children[0];
const reactPanelRing = reactPanel.children[1].children[0].children[0];
const cssPanelRing = cssPanel.children[1].children[0].children[0];
const pythonPanelRing = pythonPanel.children[1].children[0].children[0];

const ringArray = [
  washerRing,
  ring,
  landaryRing,
  crazyBurgerRing,
  reactPanelRing,
  cssPanelRing,
  pythonPanelRing,
];
const uniformsArray = [
  underwaterUniforms,
  planeUniforms,
  washerUniforms,
  landaryUniforms,
  lightUniforms,
  crazyBurgerUniforms,
  fogUniforms,
  matrixUniforms,
  cssUniforms,
  reactUniforms,
  pythonUniforms,
];

// addText([
//   myPanel,
//   washerPanel,
//   landaryPanel,
//   crazyBurgerPanel,
//   cssPanel,
//   reactPanel,
//   pythonPanel,
// ]);

const { camera, scene, bgCamera, bgScene, renderer } = stage();

const objectArray = [
  myPanel,
  washerPanel,
  landaryPanel,
  crazyBurgerPanel,
  cssPanel,
  reactPanel,
  pythonPanel,
];

scene.add(
  roadObject,
  myPanel,
  washerPanel,
  landaryPanel,
  crazyBurgerPanel,
  reactPanel,
  cssPanel,
  pythonPanel,
);

window.addEventListener("resize", () => onResize(camera, renderer));
window.addEventListener("pointermove", (e) => raycasterHover(e, camera, scene));
window.addEventListener("click", () => raycasterClick(camera, scene));

addTitle(scene);
myName(scene);
loadingModel(scene);
// technologyText(scene);
dracoModel(scene);
myAnimatedModel(myModel, scene);

const geometry = myPanel.children[0].geometry;
const positionAttribute = geometry.getAttribute("position");

const vertex = new THREE.Vector3();

let frame = 1;
console.log(mixer);
function animation() {
  if (mixer) mixer.update(time.getDelta());

  for (let i = 0; i < uniformsArray.length; i++) {
    uniformsArray[i].time.value = time.getElapsedTime();
  }

  for (let i = 0; i < ringArray.length; i++) {
    ringArray[i].scale.set(1 + Math.sin(frame) * 3, 1 + Math.sin(frame) * 3, 1);
  }

  frame += 0.07;

  for (let y = 0; y < 200 + 1; y++) {
    for (let x = 0; x < 300 + 1; x++) {
      const index = x + y * (300 + 1);
      const pos = vertex.fromBufferAttribute(positionAttribute, index);
      const time = (Date.now() * 0.2) / 50;
      pos.z = (Math.sin(0.08 * x + 0.08 * y - time) * 0.03 * x) / 60;
      geometry.attributes.position.setXYZ(index, pos.x, pos.y, pos.z);
    }
  }

  myPanel.children[0].geometry.attributes.position.needsUpdate = true;

  renderer.clear();
  renderer.render(bgScene, bgCamera);
  renderer.render(scene, camera);
  requestAnimationFrame(animation);
}

animation();
