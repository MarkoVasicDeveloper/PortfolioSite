import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import loadedFont from '/static/font.json';
import { panelText } from '../config/text';
import gitModel from '/static/git.glb';
import linkedinModel from '/static/linkedin.glb';
import {httpLink} from '../config/link';

const loader = new FontLoader();
const modelLoader = new GLTFLoader();

export default function addText (panelArray) {

	panelArray.forEach((panel, index) => {
		loader.load(loadedFont, (fontObj) => {
    
	    const textGeometry = new TextGeometry(panelText[index], {
	        height: 0.01,
	        size: 0.4,
	        font: fontObj
	    });

	    const textMaterial = new THREE.MeshStandardMaterial({color: new THREE.Color('#525B68')});
	    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
	    textMesh.position.x = 4;
	    panel.add(textMesh);
		})

		modelLoader.load(gitModel, (model) => {
			model.scene.scale.set(0.2,0.2,0.05);
			model.scene.position.set(4.5, -2.5, 0);
			model.scene.children[0].name = 'link';
			model.scene.children[0].userData.link = httpLink[index];
			model.scene.children[1].name = 'link';
			model.scene.children[1].userData.link = httpLink[index];
			panel.add(model.scene);
		})

		index === 0 ? modelLoader.load(linkedinModel, (model) => {
			model.scene.scale.set(0.2,0.2,0.05);
			model.scene.position.set(6, -2.5, 0);
			model.scene.children[0].name = 'link';
			model.scene.children[0].userData.link = 'https://www.linkedin.com/in/marko-vasic-developer/';
			model.scene.children[1].name = 'link';
			model.scene.children[1].userData.link = 'https://www.linkedin.com/in/marko-vasic-developer/';
			panel.add(model.scene);
		}) : '';

	})
}