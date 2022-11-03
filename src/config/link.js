import * as THREE from 'three';
import gitModel from '../../static/git.glb';
import cssModel from '../../static/CSS.glb';
import reactModel from '../../static/react.glb';
import pythonModel from '../../static/python.glb';

export const httpLink = [
	'https://github.com/MarkoVasicDeveloper',
	'https://github.com/MarkoVasicDeveloper/AplikacijaZaTepihServise-Presentation',
	'https://github.com/MarkoVasicDeveloper/perionica-vasic',
	'https://github.com/MarkoVasicDeveloper/Crazy-Burger',
	'https://github.com/MarkoVasicDeveloper',
	'https://github.com/MarkoVasicDeveloper',
	'https://github.com/MarkoVasicDeveloper'

]

export const planeModels = [
	gitModel, gitModel, gitModel, gitModel, cssModel, reactModel, pythonModel
];

export const scaleModels = [
	new THREE.Vector3(0.2,0.2,0.05),
	new THREE.Vector3(0.2,0.2,0.05),
	new THREE.Vector3(0.2,0.2,0.05),
	new THREE.Vector3(0.2,0.2,0.05),
	new THREE.Vector3(10,10,10),
	new THREE.Vector3(3,3,3),
	new THREE.Vector3(0.8,0.8,0.8),
];

export const modelsPosition = [
	new THREE.Vector3(4.5, -2.5, 0),
	new THREE.Vector3(4.5, -2.5, 0),
	new THREE.Vector3(4.5, -2.5, 0),
	new THREE.Vector3(4.5, -2.5, 0),
	new THREE.Vector3(4.5, -2, 0),
	new THREE.Vector3(4.5, -2, 0),
	new THREE.Vector3(4.7, -2, 0),
];

export const modelsRotation = [
	0,0,0,0, -Math.PI / 2, 0, -Math.PI / 2
];