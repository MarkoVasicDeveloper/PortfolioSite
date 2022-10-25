import * as THREE from 'three';
import { stage } from './stage';
import { onResize } from './onResize';
import { underwaterUniforms, planeUniforms } from '../shader/uniforms/uniforms';
import { road } from './road.js';
import { path } from './path.js';
import { moveCamera } from './moveCamera';
import { createPanel } from './createPanel';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import loadedFont from '/static/font.json';
import addText from './addText';
import { raycasterHover, raycasterClick } from './raycaster/raycaster';
import { pointer } from './raycaster/raycaster';

const time = new THREE.Clock();

const roadObject = road();

const points = path();

const myPanel = createPanel();
const ring = myPanel.children[1].children[0].children[0];

addText([myPanel]);

const { camera, scene, bgCamera, bgScene, renderer } = stage();

scene.add(roadObject, myPanel);

window.addEventListener('resize', () => onResize(camera, renderer));
window.addEventListener('wheel', (e) => moveCamera(e, camera, points));
window.addEventListener('pointermove', (e) => raycasterHover(e, camera, scene));
window.addEventListener('click', (e) => raycasterClick(camera, scene));

const position = myPanel.children[0].geometry.attributes.position.array;

const geometry = myPanel.children[0].geometry;
const positionAttribute = geometry.getAttribute( 'position' );

const vertex = new THREE.Vector3();

let frame = 1;

function animation() {
    underwaterUniforms.time.value = time.getElapsedTime();
    planeUniforms.time.value = time.getElapsedTime();
    
    ring.scale.set(1 + Math.sin(frame) * 3, 1 + Math.sin(frame) * 3, 1);
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