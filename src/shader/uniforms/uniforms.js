import * as THREE from 'three';
import myPicture from '../../texture/myPicture.jpg';
import { planeHover } from '../../js/raycaster/raycaster';
import washerPng from '../../texture/washer.png';
import landaryJpg from '../../texture/landary.jpg';
import crazyBurger from '../../texture/crazyBurger.png'


export const underwaterUniforms = {
    speed: { value: 2.0},
    scale: { value: 3},
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

export const fogUniforms = {
    time: {type: 'f', value: 0},
    color: {value: {r: 1, g: 1, b: 1}},
    twinkleSpeed: {value: 20},
    speed: { value: 0.0001},
    brightness: { value: 0.0018},
    distfading: { value: 0.2}
}