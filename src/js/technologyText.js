import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { text, textPosition, textRotation } from '../config/technologyText';
import font from '../../static/font.json';

const loader = new FontLoader();
const ttfLoader = new TTFLoader();

export function technologyText(scene) {
	text.forEach((technology, index) => {
		loader.load(font, (font) => {
			// const redyFont = loader.parse(json);

			const textGeometry = new TextGeometry(technology, {
		        height: 0.01,
		        size: 0.5,
		        font: font
		})

		const textMaterial = new THREE.MeshStandardMaterial({color: new THREE.Color('#525B68')});
	    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
	    textMesh.position.set(...textPosition[index]);
	    textMesh.rotation.y = textRotation[index];
	    scene.add(textMesh);
	})
	})
}