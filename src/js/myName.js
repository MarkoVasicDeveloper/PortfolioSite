import * as THREE from 'three';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import font from '../../static/JustAnotherHand-Regular.ttf';
import { underwaterFragment } from '../shader/fragment/underwater';
import { underwaterVertex } from '../shader/vertex/underwater';
import { underwaterUniforms } from '../shader/uniforms/uniforms';

const loader = new TTFLoader();

export function myName(scene) {

	loader.load(font, (json) => {
		const readyFont = new FontLoader().parse(json);

		const geometry = new TextGeometry('Marko Vasic', {
			font: readyFont,
			height: 0.01,
		    size: 3.9,
		});

		const material = new THREE.ShaderMaterial({
			fragmentShader: underwaterFragment,
			vertexShader: underwaterVertex,
			uniforms: underwaterUniforms
		});
		const text = new THREE.Mesh(geometry, material);

		text.position.set(88, 1, 0)
		text.rotation.y = -Math.PI / 2;

		scene.add(text);
	})
}