import * as THREE from 'three';
import { stage } from './stage';
import { onResize } from './onResize';
import { underwaterUniforms, planeUniforms, washerUniforms, landaryUniforms, lightUniforms, crazyBurgerUniforms, fogUniforms, matrixUniforms, cssUniforms, reactUniforms, pythonUniforms } from '../shader/uniforms/uniforms';
import { road } from './road.js';
import { path } from './path.js';
import { moveCamera } from './moveCamera';
import { createPanel, clonePanel } from './createPanel';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import loadedFont from '/static/font.json';
import addText from './addText';
import { raycasterHover, raycasterClick } from './raycaster/raycaster';
import { pointer } from './raycaster/raycaster';
import washerPng from '../texture/washer.png';
import { sphereGroup } from './sphereGroup';
import { addTitle } from './addTitle';
import { myName } from './myName';
import { loadingModel, dracoModel } from './loadingModel';
import { technologyText } from './technologyText';
const time = new THREE.Clock();

const roadObject = road();

const points = path();

const sphere = sphereGroup();

const myPanel = createPanel();

const washerPanel = clonePanel(myPanel.clone(), 'https://washersoftware.com', washerUniforms, 'washer' );
washerPanel.rotation.y = -Math.PI / 1.3;
washerPanel.position.set(52, 4, 0);

const landaryPanel = clonePanel(myPanel.clone(), 'https://perionicavasic.rs', landaryUniforms, 'landary' );
landaryPanel.rotation.y = -Math.PI / 1.8;
landaryPanel.position.set(72, 4, 22);

const crazyBurgerPanel = clonePanel(myPanel.clone(), 'https://markovasicdeveloper.github.io/Crazy-Burger/', crazyBurgerUniforms, 'burger' );
crazyBurgerPanel.rotation.y = -Math.PI / 10;
crazyBurgerPanel.position.set(80, 4, -18);

const reactPanel = clonePanel(myPanel.clone(), 'https://reactjs.org', reactUniforms, 'technology' );
reactPanel.rotation.y = -Math.PI / 0.65;
reactPanel.position.set(34, 3, 65);

const cssPanel = clonePanel(myPanel.clone(), 'https://www.w3schools.com/css/', cssUniforms, 'technology' );
cssPanel.rotation.y = -Math.PI / 0.75;
cssPanel.position.set(72, 3, 71);

const pythonPanel = clonePanel(myPanel.clone(), 'https://www.w3schools.com/css/', pythonUniforms, 'technology' );
pythonPanel.rotation.y = -Math.PI / 0.6;
pythonPanel.position.set(4, 3, 42);


const washerRing = washerPanel.children[1].children[0].children[0];
const ring = myPanel.children[1].children[0].children[0];
const landaryRing = landaryPanel.children[1].children[0].children[0];
const crazyBurgerRing = crazyBurgerPanel.children[1].children[0].children[0];
const reactPanelRing = reactPanel.children[1].children[0].children[0];
const cssPanelRing = cssPanel.children[1].children[0].children[0];
const pythonPanelRing = cssPanel.children[1].children[0].children[0];

addText([myPanel, washerPanel, landaryPanel, crazyBurgerPanel, cssPanel, reactPanel, pythonPanel]);

const { camera, scene, bgCamera, bgScene, renderer } = stage();

scene.add(roadObject, myPanel, washerPanel, landaryPanel, sphere, crazyBurgerPanel, reactPanel, cssPanel, pythonPanel);

window.addEventListener('resize', () => onResize(camera, renderer));
window.addEventListener('wheel', (e) => moveCamera(e, camera, points));
window.addEventListener('pointermove', (e) => raycasterHover(e, camera, scene));
window.addEventListener('click', (e) => raycasterClick(camera, scene));

addTitle(scene);
myName(scene);
loadingModel(scene);
technologyText(scene);
dracoModel(scene);

const position = myPanel.children[0].geometry.attributes.position.array;

const geometry = myPanel.children[0].geometry;
const positionAttribute = geometry.getAttribute( 'position' );

const vertex = new THREE.Vector3();

let frame = 1;

function animation() {
    underwaterUniforms.time.value = time.getElapsedTime();
    planeUniforms.time.value = time.getElapsedTime();
    washerUniforms.time.value = time.getElapsedTime();
    landaryUniforms.time.value = time.getElapsedTime();
    lightUniforms.time.value = time.getElapsedTime();
    crazyBurgerUniforms.time.value = time.getElapsedTime();
    fogUniforms.time.value = time.getElapsedTime();
    matrixUniforms.time.value = time.getElapsedTime();
    cssUniforms.time.value = time.getElapsedTime();
    reactUniforms.time.value = time.getElapsedTime();
    pythonUniforms.time.value = time.getElapsedTime();

    sphere.children[0].rotateY(0.2);
    sphere.rotateX(0.05)
    
    ring.scale.set(1 + Math.sin(frame) * 3, 1 + Math.sin(frame) * 3, 1);
    washerRing.scale.set(1 + Math.sin(frame) * 3, 1 + Math.sin(frame) * 3, 1);
    landaryRing.scale.set(1 + Math.sin(frame) * 3, 1 + Math.sin(frame) * 3, 1);
    crazyBurgerRing.scale.set(1 + Math.sin(frame) * 3, 1 + Math.sin(frame) * 3, 1);
    reactPanelRing.scale.set(1 + Math.sin(frame) * 3, 1 + Math.sin(frame) * 3, 1);
    cssPanelRing.scale.set(1 + Math.sin(frame) * 3, 1 + Math.sin(frame) * 3, 1);
    pythonPanelRing.scale.set(1 + Math.sin(frame) * 3, 1 + Math.sin(frame) * 3, 1);

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

    // camera.updateProjectionMatrix();
    renderer.clear();
    renderer.render(bgScene, bgCamera);
    renderer.render(scene, camera);
    requestAnimationFrame( animation );
}

animation();