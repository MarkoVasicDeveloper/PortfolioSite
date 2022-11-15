import * as THREE from 'three';
import { stage } from './stage';
import { onResize } from './onResize';
import { underwaterUniforms, planeUniforms, washerUniforms, landaryUniforms, lightUniforms, crazyBurgerUniforms, fogUniforms, matrixUniforms, cssUniforms, reactUniforms, pythonUniforms } from '../shader/uniforms/uniforms';
import { road } from './road.js';
import { path } from './path.js';
import { moveCamera } from './moveCamera';
import { createPanel, clonePanel } from './createPanel';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import addText from './addText';
import { raycasterHover, raycasterClick } from './raycaster/raycaster';
import { addTitle } from './addTitle';
import { myName } from './myName';
import { loadingModel, dracoModel } from './loadingModel';
import { technologyText } from './technologyText';
import { distanceOfCamera } from './distanceOfCamera';
import backgroundMusic from '../../static/background.mp3';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import mute from '../../static/mute.png';
import play from '../../static/volume.png';
import { myAnimatedModel, mixer } from './myASnimatedModel';
import myModel from '../../static/untitled.glb';

const backAudio = new Audio(backgroundMusic);
backAudio.volume = 0.2;
backAudio.loop = true;

const loadingManager = new THREE.LoadingManager();

export const ttfLoader = new TTFLoader(loadingManager);
export const loader = new FontLoader(loadingManager);
export const modelLoader = new GLTFLoader(loadingManager);

const progressBar = document.getElementById('progressBar');
const label = document.querySelector('label');
const enterButton = document.getElementById('enter');
const loadingContent = document.querySelector('.loadingContent');
const info = document.querySelector('.info');
const logo = document.querySelector('svg text');

let strokeOfset = 2550;

loadingManager.onProgress = function(url, loaded, total) {
    progressBar.value = (loaded / total) * 100;
    strokeOfset -= ((loaded / total) * 100 * 4);
    if(strokeOfset < 0) strokeOfset = 0;
    logo.style.strokeDashoffset = strokeOfset;
}

loadingManager.onLoad = function(url, loaded, total) {
    enterButton.classList.remove('hidden');
    progressBar.classList.add('hidden');
    label.innerText = 'Ready!';
}

enterButton.onclick = () => {
    backAudio.play();
    loadingContent.style.display = 'none';
    info.classList.remove('hidden');
    distanceOfCamera(camera,objectArray, scene);
    window.addEventListener('wheel', (e) => {moveCamera(e, camera, points); distanceOfCamera(camera,objectArray, scene)});
}

let pausedMusic = false;

info.onclick = () => {
    const img = document.querySelector('.info img');
    if(!pausedMusic) {
        backAudio.pause();
        img.src = mute;
        pausedMusic = true;
        return;
    }
    img.src = play;
    backAudio.play();
    pausedMusic = false;
}

const time = new THREE.Clock();

const roadObject = road();

const points = path();

const myPanel = createPanel();
myPanel.scale.set(0,0,0);

const washerPanel = clonePanel(myPanel.clone(), 'https://washersoftware.com', washerUniforms, 'washer' );
washerPanel.rotation.y = -Math.PI / 1.3;
washerPanel.position.set(52, 4, 0);
washerPanel.scale.set(0,0,0);

const landaryPanel = clonePanel(myPanel.clone(), 'https://perionicavasic.rs', landaryUniforms, 'landary' );
landaryPanel.rotation.y = -Math.PI / 1.8;
landaryPanel.position.set(72, 4, 22);
landaryPanel.scale.set(0,0,0);

const crazyBurgerPanel = clonePanel(myPanel.clone(), 'https://markovasicdeveloper.github.io/Crazy-Burger/', crazyBurgerUniforms, 'burger' );
crazyBurgerPanel.rotation.y = -Math.PI / 10;
crazyBurgerPanel.position.set(80, 4, -18);
crazyBurgerPanel.scale.set(0,0,0);

const reactPanel = clonePanel(myPanel.clone(), 'https://reactjs.org', reactUniforms, 'technology' );
reactPanel.rotation.y = -Math.PI / 0.65;
reactPanel.position.set(34, 3, 65);

const cssPanel = clonePanel(myPanel.clone(), 'https://www.w3schools.com/css/', cssUniforms, 'technology' );
cssPanel.rotation.y = -Math.PI / 0.75;
cssPanel.position.set(72, 3, 71);
cssPanel.scale.set(0,0,0);

const pythonPanel = clonePanel(myPanel.clone(), 'https://www.python.org/', pythonUniforms, 'technology' );
pythonPanel.rotation.y = -Math.PI / 0.6;
pythonPanel.position.set(4, 3, 42);

const washerRing = washerPanel.children[1].children[0].children[0];
const ring = myPanel.children[1].children[0].children[0];
const landaryRing = landaryPanel.children[1].children[0].children[0];
const crazyBurgerRing = crazyBurgerPanel.children[1].children[0].children[0];
const reactPanelRing = reactPanel.children[1].children[0].children[0];
const cssPanelRing = cssPanel.children[1].children[0].children[0];
const pythonPanelRing = pythonPanel.children[1].children[0].children[0];

const ringArray = [washerRing, ring, landaryRing, crazyBurgerRing, reactPanelRing, cssPanelRing, pythonPanelRing];
const uniformsArray = [underwaterUniforms, planeUniforms, washerUniforms, landaryUniforms, lightUniforms, crazyBurgerUniforms, fogUniforms, matrixUniforms, cssUniforms, reactUniforms, pythonUniforms];

addText([myPanel, washerPanel, landaryPanel, crazyBurgerPanel, cssPanel, reactPanel, pythonPanel]);

const { camera, scene, bgCamera, bgScene, renderer } = stage();

const objectArray = [myPanel, washerPanel, landaryPanel, crazyBurgerPanel, cssPanel, reactPanel, pythonPanel];

scene.add(roadObject, myPanel, washerPanel, landaryPanel, crazyBurgerPanel, reactPanel, cssPanel, pythonPanel);

window.addEventListener('resize', () => onResize(camera, renderer));
window.addEventListener('pointermove', (e) => raycasterHover(e, camera, scene));
window.addEventListener('click', (e) => raycasterClick(camera, scene));

addTitle(scene);
myName(scene);
loadingModel(scene);
technologyText(scene);
dracoModel(scene);
myAnimatedModel(myModel, scene);

const position = myPanel.children[0].geometry.attributes.position.array;

const geometry = myPanel.children[0].geometry;
const positionAttribute = geometry.getAttribute( 'position' );

const vertex = new THREE.Vector3();

let frame = 1;
console.log(mixer)
function animation() {
    if(mixer) mixer.update(time.getDelta())
    
    for(let i = 0; i < uniformsArray.length; i++) {
        uniformsArray[i].time.value = time.getElapsedTime();
    }
    
    for(let i = 0; i < ringArray.length; i++) {
        ringArray[i].scale.set(1 + Math.sin(frame) * 3, 1 + Math.sin(frame) * 3, 1);
    }

    frame += 0.07;

    for (let y=0; y<200+1; y++) {
        for (let x=0; x<300+1; x++) {
            const index = x + y * (300+1);
            const pos = vertex.fromBufferAttribute( positionAttribute, index );
            const time = Date.now() * 0.2 / 50;
            pos.z = Math.sin(0.08 * x + 0.08 * y - time) * 0.03 * x / 60;
            geometry.attributes.position.setXYZ( index, pos.x, pos.y, pos.z );
        }
    }
    
    myPanel.children[0].geometry.attributes.position.needsUpdate = true;

    renderer.clear();
    renderer.render(bgScene, bgCamera);
    renderer.render(scene, camera);
    requestAnimationFrame( animation );
}

animation();