import * as THREE from 'three';
import { fogUniforms } from '../shader/uniforms/uniforms';
import { fogVertex } from '../shader/vertex/fog';
import { fogFragment } from '../shader/fragment/fog';

export function stage () {

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerWidth, 0.1, 30);
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({antialias: true});
    const bgScene = new THREE.Scene();
    const bgCamera = new THREE.Camera();

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    camera.position.set(0, 3, 0);

    const ambientalLight = new THREE.AmbientLight(0xffffff, 1);

    const directionalLight = new THREE.DirectionalLight('#ffffff', 0.2);
    directionalLight.position.set(2, 4, 1);

    const bgGeometry = new THREE.PlaneGeometry(2,2);
    const bgMaterial = new THREE.ShaderMaterial({
        fragmentShader: fogFragment,
        vertexShader: fogVertex,
        uniforms: fogUniforms,
        transparent: true,
        depthTest: false,
        depthWrite: false
    });
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
    
    bgScene.add(bgMesh);

    renderer.autoClear = false;
    renderer.setClearColor(new THREE.Color('#111111'))
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.body.appendChild(renderer.domElement);
    renderer.setSize(window.innerWidth, window.innerHeight);

    scene.add(camera, ambientalLight, directionalLight)

    return {camera, scene, bgCamera, bgScene, renderer}
}