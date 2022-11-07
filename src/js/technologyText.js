import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { text, textPosition, textRotation } from '../config/technologyText';
import font from '../../static/font.json';
import { loader } from './main.js';

export function technologyText(scene) {
	text.forEach((technology, index) => {
		loader.load(font, (font) => {
			const textGeometry = new TextGeometry(technology, {
		        height: 0.01,
		        size: 0.5,
		        font: font
		})

		const textMaterial = new THREE.MeshStandardMaterial({color: new THREE.Color('#525B68')});
	    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
	    textMesh.position.set(...textPosition[index]);
	    textMesh.rotation.y = textRotation[index];
	    textMesh.name = 'technologyText';
	    textMesh.scale.set(0,0,0);
	    scene.add(textMesh);
	})
	})
}