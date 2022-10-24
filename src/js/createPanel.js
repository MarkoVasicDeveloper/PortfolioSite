import * as THREE from 'three';
import myPicture from '../texture/myPicture.jpg';
import { ringFragment } from '../shader/fragment/ring';
import { ringVertex } from '../shader/vertex/ring';
import { underwaterUniforms } from '../shader/uniforms/uniforms';

export function createPanel() {
        const myPanelGroup = new THREE.Group();

        const geometry = new THREE.PlaneGeometry(6,4,30,20);
        const material = new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load(myPicture)
        });

        const mesh = new THREE.Mesh(geometry, material);

        mesh.name = 'link';
        mesh.userData.link = 'https://join.skype.com/invite/GC84cpUFYwdI'

        const linePoints = [
            new THREE.Vector3(0, 1.5, 0),
            new THREE.Vector3(0, 4, 0),
        ]

        const lineGeometry = new THREE.BufferGeometry().setFromPoints( linePoints );
        const lineMaterial = new THREE.LineBasicMaterial({color: new THREE.Color('#525B68')});
        const lineMesh = new THREE.Line(lineGeometry, lineMaterial);
        lineMesh.position.set(3.5, -5, 0);

        const sphereGeometry = new THREE.SphereGeometry(0.05,10,10);
        const sphereMaterial = new THREE.MeshStandardMaterial({color: new THREE.Color('#525B68')});
        const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphereMesh.position.set(0, 4.4, 0);

        const ringGeometry = new THREE.RingGeometry(0.07, 0.09, 30);
        const ringMaterial = new THREE.MeshStandardMaterial({color: new THREE.Color('#525B68')});
        const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);

        sphereMesh.add(ringMesh);

        lineMesh.add(sphereMesh);

        myPanelGroup.add(mesh, lineMesh);

        myPanelGroup.position.set(-5, 4, -10);

        return myPanelGroup;
    }