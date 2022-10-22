import * as THREE from 'three';
import { stage } from './stage';
import { onResize } from './onResize';
import { underwaterUniforms } from '../shader/uniforms/uniforms';
import { road } from './road.js';
import { path } from './path.js';
import { moveCamera } from './moveCamera';
import { createPanel } from './createPanel';

const time = new THREE.Clock();

const roadObject = road();

const points = path();

const myPanel = createPanel();

const { camera, scene, bgCamera, bgScene, renderer } = stage();

scene.add(roadObject, myPanel);

window.addEventListener('resize', () => onResize(camera, renderer));
window.addEventListener('wheel', (e) => moveCamera(e, camera, points));

function animation() {
    underwaterUniforms.time.value = time.getElapsedTime();
    
    renderer.clear();
    renderer.render(bgScene, bgCamera);
    renderer.render(scene, camera);
    requestAnimationFrame( animation );
}

animation();