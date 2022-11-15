import * as THREE from 'three';
import { modelLoader } from './main.js';

export let mixer;
export let clips;

export function myAnimatedModel(model, scene) {
    modelLoader.load(model, (glb) => {
        glb.scene.position.set(15, 1, -23);
        glb.scene.scale.set(1.9,1.9,1.9);
        glb.scene.rotation.y = -Math.PI /5;
        glb.scene.name = 'MyModel';
        console.log(glb)
        scene.add(glb.scene);
        mixer = new THREE.AnimationMixer(glb.scene);
        clips = glb.animations;
        const clip = THREE.AnimationClip.findByName(clips, 'Hand');
        const action = mixer.clipAction(clip);
        action.play();
    })
}