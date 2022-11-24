import * as THREE from 'three';
import gsap from 'gsap';
import particleFade from '../../static/particle-fade-in.wav';
import textFade from '../../static/textFade.mp3';
import { clips, mixer } from './myASnimatedModel';

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

		if(child.name === 'MyModel' && !child.userData.end) {
			if(dist < 15 && dist > 10) {
				clips.forEach(cl => {
					let action = mixer.clipAction(cl);
					action.setLoop(THREE.LoopOnce);
					action.clampWhenFinished = true;
					action.enable = true;
					action.stop();
				})
				const clip = THREE.AnimationClip.findByName(clips, 'counting');
				const clipDance = THREE.AnimationClip.findByName(clips, 'dancing');
				const clipHipHop = THREE.AnimationClip.findByName(clips, 'hip_hop');
				const clipGang = THREE.AnimationClip.findByName(clips, 'gamgan');
				const clipHouseDancing = THREE.AnimationClip.findByName(clips, 'house_dancing');
				const clipSoulDancing = THREE.AnimationClip.findByName(clips, 'soul_dancing');
				const clipSoulDancing2 = THREE.AnimationClip.findByName(clips, 'soul_dancing_2');
				const clipSpin = THREE.AnimationClip.findByName(clips, 'spin');
				const clipIdle = THREE.AnimationClip.findByName(clips, 'idle');

        		const action = mixer.clipAction(clip);
				const actionDance = mixer.clipAction(clipDance);
				const actionHipHop = mixer.clipAction(clipHipHop);
				const actionHouseDancing = mixer.clipAction(clipHouseDancing);
				const actionSoulDancing = mixer.clipAction(clipSoulDancing);
				const actionSoulDancing2 = mixer.clipAction(clipSoulDancing2);
				const actionGang = mixer.clipAction(clipGang);
				const actionSpin = mixer.clipAction(clipSpin);
				const actionIdle = mixer.clipAction(clipIdle);
				
				action.play().reset();

				mixer.addEventListener('finished', (e) => {
					clips.forEach(cl => {
						let action = mixer.clipAction(cl);
						action.stop();
					})

					switch (e.action._clip.name) {
						case 'counting':
							actionDance.play();
							break;
						case 'dancing':
							actionHipHop.play();
							break;
						case 'hip_hop':
							actionHouseDancing.play();
							break;
						case 'house_dancing':
							actionSoulDancing.play();
							break;
						case 'soul_dancing':
							actionSoulDancing2.play();
							break;
						case 'soul_dancing_2':
							actionGang.play();
							break;
						case 'gamgan':
							actionSpin.play();
							break;
						case 'spin':
							actionIdle.play();
							break;
						case 'idle':
							actionDance.play();
							break;
						default:
							break;
					}
				})
				child.userData.end = true;
			}
		}
	})
}