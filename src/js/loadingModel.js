import  * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import jsLogoCube from '../../static/jsLogoCube.glb';
import jsLogo from '../../static/jsLogo.glb';
import manModel from '../../static/businesModel.glb';
import { matrixVertex } from '../shader/vertex/matrix';
import { matrixFragment } from '../shader/fragment/matrix';
import { matrixUniforms } from '../shader/uniforms/uniforms';

const loader = new GLTFLoader();
const models = [ jsLogoCube, jsLogo];
const modelsPosition = [ new THREE.Vector3(125, 0, 10), 
						new THREE.Vector3(115, 1, 14)
						];

const modelsScale = [ new THREE.Vector3(20,20,20),
					  new THREE.Vector3(5,5,5)];
const modelsRotation = [ Math.PI / 1.5, Math.PI / 1.5 ];

export function loadingModel(scene) {

	models.forEach((model,index) => {
	loader.load(model, (glb) => {
		glb.scene.position.set(...modelsPosition[index]);
		glb.scene.scale.set(...modelsScale[index]);
		glb.scene.rotation.y = modelsRotation[index];
		scene.add(glb.scene);
	});
})
}

export function dracoModel (scene) {
	loader.load(manModel, (draco) => {
		draco.scene.position.set(96, 0, 60);
		draco.scene.scale.set(2,2,2);
		draco.scene.rotation.y = Math.PI / 2;
		draco.scene.children[0].material = new THREE.ShaderMaterial({
			vertexShader: matrixVertex,
			fragmentShader: matrixFragment,
			uniforms: matrixUniforms
		})
		scene.add(draco.scene);
	})
}