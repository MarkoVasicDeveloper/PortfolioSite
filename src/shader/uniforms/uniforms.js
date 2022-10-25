import * as THREE from 'three';
import myPicture from '../../texture/myPicture.jpg';
import { planeHover } from '../../js/raycaster/raycaster';

export const underwaterUniforms = {
    resolution: { value: 1.9268564},
    backgroundAlpha: { value: 0.0},
    rayBrightness: { value: 1.2508424},
    rayColor: { value: { r: 0.0, g: .8, b: 0.10196078431372549}},
    time: { value: 0.0}
}

export const planeUniforms = {
    image: {type: 't', value: new THREE.TextureLoader().load(myPicture)},
    time: {type: 'f', value: 0},
    hover: {type: 'f', value: 0}
}