import * as THREE from 'three';
import roadSphere from '../texture/roadSphere2.png';

export function road() {
	let x = 22.5;
	const roadGroup = new THREE.Group();
        
    for(let i = 0; i < 3; i++) {
        const geometry = new THREE.RingGeometry(15, 25, 30, 4, 0, 6.283185307179586 / 2);
        const material = new THREE.PointsMaterial({
            map: new THREE.TextureLoader().load(roadSphere),
            size: 0.2,
            transparent: true
        });
        const mesh = new THREE.Points(geometry, material);

        mesh.position.x = x;

        mesh.rotation.x = i % 2 === 0 ? - Math.PI / 2 : Math.PI / 2;

        roadGroup.add(mesh);

        x += 40;
    }
    
    const bigGeometry = new THREE.RingGeometry(55, 65, 90, 4, 0, 6.283185307179586 / 2)
    const bigMaterial = new THREE.PointsMaterial({
            map: new THREE.TextureLoader().load(roadSphere),
            size: 0.2,
            transparent: true
        });
    const bigMesh = new THREE.Points(bigGeometry, bigMaterial);

    bigMesh.position.x = 62.5;
    bigMesh.rotation.x = Math.PI / 2;

    roadGroup.add(bigMesh);

    return roadGroup;
}