import * as THREE from 'three';
import { fbxLoader } from './main.js';

export let mixer;
export let clips;

export function myAnimatedModel(model, scene) {
    fbxLoader.load(model, (glb) => {
        console.log(glb)
        glb.position.set(15, 1, -25);
        glb.scale.set(0.02,0.02,0.02);
        glb.rotation.y = -Math.PI /5;
        glb.name = 'MyModel';
        scene.add(glb);
        mixer = new THREE.AnimationMixer(glb);
        clips = glb.animations;
        const clip = THREE.AnimationClip.findByName(clips, 'wave');
        
        const action = mixer.clipAction(clip);

        action.play().reset();
    })
}