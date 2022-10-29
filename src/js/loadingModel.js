import  * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import jsLogoCube from '../../static/jsLogoCube.glb';
import jsLogo from '../../static/jsLogo.glb';

const loader = new GLTFLoader();
const models = [ jsLogoCube, jsLogo ];
const modelsPosition = [ new THREE.Vector3(125, 0, 10),  new THREE.Vector3(115, 1, 14)];
const modelsScale = [ new THREE.Vector3(20,20,20),  new THREE.Vector3(5,5,5)];
const modelsRotation = [ Math.PI / 1.5, Math.PI / 1.5 ]

export function loadingModel(scene) {

	models.forEach((model,index) => {
	loader.load(model, (glb) => {
		glb.scene.position.set(...modelsPosition[index]);
		glb.scene.scale.set(...modelsScale[index]);
		glb.scene.rotation.y = modelsRotation[index];
		scene.add(glb.scene);
	})
})
}
