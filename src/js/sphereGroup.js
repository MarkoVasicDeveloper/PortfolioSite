import * as THREE from 'three';
import { lightVertex } from '../shader/vertex/light';
import { lightFragment } from '../shader/fragment/light';
import { lightUniforms } from '../shader/uniforms/uniforms';
import texture from '../texture/sphereTexture2.jpg';

export function sphereGroup () {
	const geometry = new THREE.SphereGeometry(1, 30, 30);
	const material = new THREE.ShaderMaterial({
		vertexShader: lightVertex,
		fragmentShader: lightFragment,
		uniforms: lightUniforms
	})
	const sphere = new THREE.Mesh(geometry, material);
	sphere.name = 'electric';

	const orbit = new THREE.Object3D();

	const smallSphereGeometry = new THREE.SphereGeometry(0.3, 30, 30);
	const smallSphereMaterial = new THREE.MeshStandardMaterial({
		map: new THREE.TextureLoader().load(texture)
	});
	const smallSphereMesh = new THREE.Mesh(smallSphereGeometry, smallSphereMaterial);
	smallSphereMesh.position.set(3,0,0);

	const secondSphere = smallSphereMesh.clone();
	secondSphere.position.set(0,4,0);

	orbit.add(smallSphereMesh, secondSphere);

	sphere.position.set(15, 2, -25);
	sphere.add(orbit)

	return sphere;
}