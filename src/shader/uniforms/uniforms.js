import * as THREE from 'three';
import myPicture from '../../texture/myPicture.jpg';
import { planeHover } from '../../js/raycaster/raycaster';
import washerPng from '../../texture/washer.png';
import landaryJpg from '../../texture/landary.jpg';
import crazyBurger from '../../texture/crazyBurger.png'


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

export const washerUniforms = {
    image: {type: 't', value: new THREE.TextureLoader().load(washerPng)},
    time: {type: 'f', value: 0},
    hover: {type: 'f', value: 0}
}

export const landaryUniforms = {
    image: {type: 't', value: new THREE.TextureLoader().load(landaryJpg)},
    time: {type: 'f', value: 0},
    hover: {type: 'f', value: 0}
}

export const crazyBurgerUniforms = {
    image: {type: 't', value: new THREE.TextureLoader().load(crazyBurger)},
    time: {type: 'f', value: 0},
    hover: {type: 'f', value: 0}
}

export const lightUniforms = {
    time: {type: 'f', value: 0}
}