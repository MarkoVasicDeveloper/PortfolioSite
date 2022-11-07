import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { titleText, titlePosition, titleRotation, titleSize } from '../config/text';
import loadedFont from '../../static/PermanentMarker-Regular.ttf';
import { ttfLoader, loader } from './main.js';

export function addTitle(scene) {
	
	titleText.forEach((title, index) => {
			ttfLoader.load(loadedFont, (json) => {
				const font = loader.parse(json);
				const textGeometry = new TextGeometry(title, {
		        height: 0.01,
		        size: titleSize[index],
		        font: font
		    });

		    const textMaterial = new THREE.MeshStandardMaterial({color: new THREE.Color('#525B68')});
		    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
		    textMesh.position.set(...titlePosition[index]);
		    textMesh.rotation.y = titleRotation[index];
		    textMesh.name = 'title';
		    textMesh.scale.set(0,0,0);
		    scene.add(textMesh);
		})
	})
}