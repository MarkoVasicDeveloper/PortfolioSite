import gsap from 'gsap';
import particleFade from '../../static/particle-fade-in.wav';
import textFade from '../../static/textFade.mp3';

const audio = new Audio(particleFade);
const textAudio = new Audio(textFade);

export function distanceOfCamera (camera, objectArray, scene) {

	scene.traverse((child) => {
		const dist = camera.position.distanceTo(child.position);
		
		if(child.name === 'panel'){
			if(dist < 30) {
				if(child.scale.x === 0) audio.play();
				gsap.to(child.scale, { duration: 1.7, x: 1, y: 1, z: 1});
				
			} else {
				gsap.to(child.scale, { duration: .7, x: 0, y: 0, z: 0});
			}
		}

		if(child.name === 'title'){
			if(dist < 30) {
				if(child.scale.x === 0) textAudio.play();
				gsap.to(child.scale, { duration: 1.7, x: 1, y: 1, z: 1});
			} else {
				gsap.to(child.scale, { duration: .7, x: 0, y: 0, z: 0});
			}
		}

		if(child.name === 'technologyText'){
			if(dist < 30 && dist > 10) {
				if(child.scale.x === 0) textAudio.play();
				gsap.to(child.scale, { duration: 1.7, x: 1, y: 1, z: 1});
			}else {
				gsap.to(child.scale, { duration: .7, x: 0, y: 0, z: 0});
			}
		}
	})
}