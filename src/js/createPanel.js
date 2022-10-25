import * as THREE from 'three';
import myPicture from '../texture/myPicture.jpg';
import { ringFragment } from '../shader/fragment/ring';
import { ringVertex } from '../shader/vertex/ring';
import { underwaterUniforms } from '../shader/uniforms/uniforms';
import { planeUniforms } from '../shader/uniforms/uniforms';
import { planeVertex } from '../shader/vertex/plane';
import { planeFragment } from '../shader/fragment/plane';

export function createPanel() {
        const myPanelGroup = new THREE.Group();

        const geometry = new THREE.PlaneGeometry(6,4,300,200);

        const particles = 301 * 201;
        let index = 0;
        const aRandom = new THREE.BufferAttribute(new Float32Array(particles), 1);
        const aDirection = new THREE.BufferAttribute(new Float32Array(particles), 1);

        function rand(a,b) {
            return a + (b - a) * Math.random();
        }

        for( let i = 0 ; i < 200; i++) {
            for(let j =0; j < 300; j++) {
                aRandom.setXYZ(index, rand(0.1, 0.2));
                aDirection.setXYZ(index, Math.random() > 0.5 ? 1 : -1);
                index++;
            }
        }

        geometry.setAttribute('aRandom', aRandom);
        geometry.setAttribute('aDirection', aDirection);

        const material = new THREE.ShaderMaterial({
            vertexShader: planeVertex,
            fragmentShader: planeFragment,
            uniforms: planeUniforms,
            depthTest: false,
            depthWrite: false
        });
        console.log(geometry)
        const mesh = new THREE.Points(geometry, material);

        mesh.name = 'link';
        mesh.userData.link = 'https://join.skype.com/invite/GC84cpUFYwdI';
        mesh.userData.plane = true;

        mesh.updateMatrixWorld();

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
        sphereMesh.updateMatrixWorld()

        const ringGeometry = new THREE.RingGeometry(0.05, 0.07, 30);
        const ringMaterial = new THREE.MeshStandardMaterial({color: new THREE.Color('#525B68')});
        const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);

        sphereMesh.add(ringMesh);

        lineMesh.add(sphereMesh);

        myPanelGroup.add(mesh, lineMesh);

        myPanelGroup.position.set(-5, 4, -10);

        myPanelGroup.updateMatrixWorld();
        return myPanelGroup;
    }