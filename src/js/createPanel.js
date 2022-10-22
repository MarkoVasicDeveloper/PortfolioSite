import * as THREE from 'three';
import myPicture from '../texture/myPicture.jpg';
import { ringFragment } from '../shader/fragment/ring';
import { ringVertex } from '../shader/vertex/ring';
import { underwaterUniforms } from '../shader/uniforms/uniforms';

export function createPanel() {
        const myPanelGroup = new THREE.Group();

        const geometry = new THREE.PlaneGeometry(6,4,20,20);
        const material = new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load(myPicture)
        });

        const mesh = new THREE.Mesh(geometry, material);

        const linePoints = [
            new THREE.Vector3(0, 1, 0),
            new THREE.Vector3(0, 4, 0),
        ]

        const lineGeometry = new THREE.BufferGeometry().setFromPoints( linePoints );
        const lineMaterial = new THREE.LineBasicMaterial({color: new THREE.Color('#333333')});
        const lineMesh = new THREE.Line(lineGeometry, lineMaterial);
        lineMesh.position.set(3.5, -5, 0);

        const sphereGeometry = new THREE.SphereGeometry(0.1,10,10);
        const sphereMaterial = new THREE.MeshStandardMaterial({color: new THREE.Color('#333333')});
        const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphereMesh.position.set(0, 4.5, 0);

        const ringGeometry = new THREE.RingGeometry(0.17, 0.2, 20);
        const ringMaterial = new THREE.ShaderMaterial({
            fragmentShader: ringFragment,
            vertexShader: ringVertex,
            uniforms: underwaterUniforms
        });
        const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);

        sphereMesh.add(ringMesh);

        lineMesh.add(sphereMesh);

        myPanelGroup.add(mesh, lineMesh);

        myPanelGroup.position.set(-5, 4, -10);

        return myPanelGroup;
    }