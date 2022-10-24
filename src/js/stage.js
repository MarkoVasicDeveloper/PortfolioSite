import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {underwaterFragment} from '../shader/fragment/underwater.js';
import { underwaterUniforms } from '../shader/uniforms/uniforms';
import {underwaterVertex} from '../shader/vertex/underwater.js';

export function stage () {

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerWidth, 0.1, 100);
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({antialias: true});
    const bgScene = new THREE.Scene();
    const bgCamera = new THREE.Camera();

    // controls = new OrbitControls( camera, renderer.domElement );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    camera.position.set(0, 3, 0);
    // camera.lookAt(0, 2, -5);
    // controls.update();

    const ambientalLight = new THREE.AmbientLight(0xffffff, 1);

    const directionalLight = new THREE.DirectionalLight('#ffffff', 2);
    directionalLight.position.set(2, 4, 1);

    const bgGeometry = new THREE.PlaneGeometry(2,2);
    const bgMaterial = new THREE.ShaderMaterial({
        fragmentShader: underwaterFragment,
        vertexShader: underwaterVertex,
        uniforms: underwaterUniforms,
        transparent: true,
        depthTest: false,
        depthWrite: false
    });
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
    
    bgScene.add(bgMesh);

    renderer.autoClear = false;
    renderer.shadowMap = true;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.body.appendChild(renderer.domElement);
    renderer.setSize(window.innerWidth, window.innerHeight);

    scene.add(camera, ambientalLight, directionalLight)

    return {camera, scene, bgCamera, bgScene, renderer}
}