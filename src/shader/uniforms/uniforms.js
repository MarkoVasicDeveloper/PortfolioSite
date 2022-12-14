import * as THREE from 'three';
import myPicture from '../../texture/myPicture.jpg';
import { planeHover } from '../../js/raycaster/raycaster';
import washerPng from '../../texture/washer.png';
import landaryJpg from '../../texture/landary.jpg';
import crazyBurger from '../../texture/crazyBurger.png';
import css from '../../texture/css.jpg';
import react from '../../texture/react.jpg';
import python from '../../texture/python.jpg';


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

export const cssUniforms = {
    image: {type: 't', value: new THREE.TextureLoader().load(css)},
    time: {type: 'f', value: 0},
    hover: {type: 'f', value: 0}
}

export const reactUniforms = {
    image: {type: 't', value: new THREE.TextureLoader().load(react)},
    time: {type: 'f', value: 0},
    hover: {type: 'f', value: 0}
}

export const pythonUniforms = {
    image: {type: 't', value: new THREE.TextureLoader().load(python)},
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

export const matrixUniforms = {
    color: { value: { r: 0, g: 0.7019607843137254, b: 0.1450980392156863}},
    resolution: { value: { x: 1.946153846153846156, y: 1.936923076923076925}},
    charSize: { value: { x: 0.8769230769230769, y: 0.9384615384615385}},
    charResolution: { value : 7.72425155},
    speed: { value: 18.26450037},
    time: { value: 0}
}