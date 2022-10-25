import * as THREE from 'three';
import { planeUniforms } from '../../shader/uniforms/uniforms';
import gsap from 'gsap';

export const pointer = new THREE.Vector2();

const raycasterInstance = new THREE.Raycaster();

export function raycasterHover(event, camera, scene) {
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	raycasterInstance.setFromCamera( pointer, camera );

	const intersects = raycasterInstance.intersectObjects( scene.children );
	if(intersects.length > 0 && intersects[ 0 ].object.name === 'link') {
		document.body.style.cursor = 'pointer';
	}else {
		document.body.style.cursor = 'default';
	}

	if(intersects.length > 0 && intersects[ 0 ].object.userData.plane){
		// planeUniforms.hover.value = 0.05;
		gsap.to(planeUniforms.hover, {value: 0.05, duration: 2});

	}else {
		gsap.to(planeUniforms.hover, {value: 0, duration: 1});
	}
}

export function raycasterClick(camera, scene) {
	raycasterInstance.setFromCamera( pointer, camera );

	const intersects = raycasterInstance.intersectObjects( scene.children );

	if(intersects.length > 0 && intersects[ 0 ].object.name === 'link') {
		window.open(intersects[ 0 ].object.userData.link, '_blank')
	}
}