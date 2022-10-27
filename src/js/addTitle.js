import * as THREE from 'three';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { titleText, titlePosition, titleRotation } from '../config/text';
import loadedFont from '../../static/PermanentMarker-Regular.ttf';

const loader = new TTFLoader();
const fontLoader = new FontLoader();

export function addTitle(scene) {
	titleText.forEach((title, index) => {
			loader.load(loadedFont, (json) => {
				const font = fontLoader.parse(json);
				const textGeometry = new TextGeometry(title, {
		        height: 0.01,
		        size: 2.9,
		        font: font
		    });
			console.log(textGeometry)

		    const textMaterial = new THREE.MeshStandardMaterial({color: new THREE.Color('#525B68')});
		    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
		    textMesh.position.set(...titlePosition[index]);
		    textMesh.rotation.y = titleRotation[index];
		    scene.add(textMesh);
		})
	})
}