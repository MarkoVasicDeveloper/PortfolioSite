import * as THREE from 'three';
import { planeUniforms, washerUniforms, landaryUniforms, crazyBurgerUniforms } from '../../shader/uniforms/uniforms';
import gsap from 'gsap';
import { cameraLookAt } from '../moveCamera';

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

	if(intersects.length > 0 && intersects[ 0 ].object.userData.myPlane){
		gsap.to(planeUniforms.hover, {value: 0.05, duration: 1});

	}else {
		gsap.to(planeUniforms.hover, {value: 0, duration: 1});
	}

	if(intersects.length > 0 && intersects[ 0 ].object.userData.panel === 'washer'){
		gsap.to(washerUniforms.hover, {value: 0.05, duration: 1});

	}else {
		gsap.to(washerUniforms.hover, {value: 0, duration: 1});
	}

	if(intersects.length > 0 && intersects[ 0 ].object.userData.panel === 'landary'){
		gsap.to(landaryUniforms.hover, {value: 0.05, duration: 1});

	}else {
		gsap.to(landaryUniforms.hover, {value: 0, duration: 1});
	}

	if(intersects.length > 0 && intersects[ 0 ].object.userData.panel === 'burger'){
		gsap.to(crazyBurgerUniforms.hover, {value: 0.05, duration: 1});

	}else {
		gsap.to(crazyBurgerUniforms.hover, {value: 0, duration: 1});
	}

	if(intersects.length > 0 && intersects[ 0 ].object.name === 'electric'){
		// intersects[ 0 ].object.material.wireframe = true;
			// function shake () {
		// 	camera.lookAt(cameraLookAt[0], Math.random() / 100 + cameraLookAt[1],cameraLookAt[2]);
		// 	console.log('shake');
		// }
		// shakeInteraval = setInterval(function(){
		// 	camera.lookAt(cameraLookAt[0], Math.random() / 100 + cameraLookAt[1],cameraLookAt[2])}
		// 	, 20);
		// shakeInteraval = setInterval(() => shake(), 20);	}else {
		// clearInterval(shakeInteraval);
		// window.clearInterval(window.shakeInteraval);
		// if(window.shakeInteraval != undefined && window.shakeInteraval != 'undefined'){
		//     window.clearInterval(window.shakeInteraval);
		//     console.log(window.shakeInteraval);
		// }
	}
}

export function raycasterClick(camera, scene) {
	raycasterInstance.setFromCamera( pointer, camera );

	const intersects = raycasterInstance.intersectObjects( scene.children );

	if(intersects.length > 0 && intersects[ 0 ].object.name === 'link') {
		window.open(intersects[ 0 ].object.userData.link, '_blank')
	}
}