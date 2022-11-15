import * as THREE from 'three';
import gsap from 'gsap';
import particleFade from '../../static/particle-fade-in.wav';
import textFade from '../../static/textFade.mp3';
import { clips, mixer } from './myASnimatedModel';
import welcome from '../../static/welcome.mp3';

const audio = new Audio(particleFade);
const textAudio = new Audio(textFade);
const welcomeAudio = new Audio(welcome);

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

		if(child.name === 'MyModel' && !child.userData.end) {
			if(dist < 15 && dist > 10) {
				clips.forEach(cl => {
					let action = mixer.clipAction(cl);
					action.stop();
				})
				const clip = THREE.AnimationClip.findByName(clips, 'arm_down_talking');
				const clipHead = THREE.AnimationClip.findByName(clips, 'Wolf3D_HeadAction');
        		const action = mixer.clipAction(clip);
				const actionHead = mixer.clipAction(clipHead);
				actionHead.setLoop(THREE.LoopOnce);
				actionHead.clampWhenFinished = true;
				actionHead.enable = true;
				action.setLoop(THREE.LoopOnce);
				action.clampWhenFinished = true;
				action.enable = true;
				action.play().reset();
				actionHead.play().reset();
				welcomeAudio.volume = 0.3;
				welcomeAudio.play();
				child.userData.end = true;
			}
		}
	})
}