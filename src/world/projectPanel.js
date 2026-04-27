import * as THREE from "three";
import { Logger } from "../core/logger";

const SHARED_GEOMETRY = new THREE.PlaneGeometry(6, 4, 300, 200);
const count = SHARED_GEOMETRY.attributes.position.count;
const aRandom = new THREE.BufferAttribute(new Float32Array(count), 1);
const aDirection = new THREE.BufferAttribute(new Float32Array(count), 1);

for (let i = 0; i < count; i++) {
  aRandom.setXYZ(i, Math.random() * 0.1 + 0.1);
  aDirection.setXYZ(i, Math.random() > 0.5 ? 1 : -1);
}

SHARED_GEOMETRY.setAttribute("aRandom", aRandom);
SHARED_GEOMETRY.setAttribute("aDirection", aDirection);

export class ProjectPanel extends THREE.Group {
  constructor(config, shaderData, uniform, assetManager) {
    super();
    this.name = `panel-${config.id}`;

    this.ring = null;

    if (config.attachments && Array.isArray(config.attachments)) {
      config.attachments.forEach((attachConfig) => {
        this._createAttachment(attachConfig, assetManager);
      });
    }
    this._build(config, shaderData, uniform);
  }

  _createAttachment(attachConfig, assetManager) {
    const asset = assetManager.models[attachConfig.modelName];
    if (!asset) {
      Logger.warn(
        "Project panel",
        `Model ${attachConfig.modelName} nof found!`,
      );
      return;
    }

    const model = asset.scene ? asset.scene.clone() : asset.clone();

    const [px, py, pz] = attachConfig.offset;
    model.position.set(px, py, pz);

    const [sx, sy, sz] = attachConfig.scale;
    model.scale.set(sx, sy, sz);

    if (attachConfig.rotation) {
      const [rx, ry, rz] = attachConfig.rotation;
      model.rotation.set(rx, ry, rz);
    }

    model.userData.link = attachConfig.link;
    model.name = "attachment";

    this.add(model);
  }

  _build(config, shaderData, uniforms) {
    const material = new THREE.ShaderMaterial({
      vertexShader: shaderData.vertex,
      fragmentShader: shaderData.fragment,
      uniforms: uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    const mesh = new THREE.Points(SHARED_GEOMETRY, material);

    mesh.name = "link";
    mesh.userData.link = config.link;

    this.add(mesh);

    this._createDecorations();
  }

  _createDecorations() {
    const linePoints = [
      new THREE.Vector3(0, 1.5, 0),
      new THREE.Vector3(0, 4, 0),
    ];
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
    const lineMaterial = new THREE.LineBasicMaterial({ color: "#525B68" });

    const lineMesh = new THREE.Line(lineGeometry, lineMaterial);
    lineMesh.position.set(3.5, -5, 0);

    const sphereGeometry = new THREE.SphereGeometry(0.05, 10, 10);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: "#525B68" });
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereMesh.position.set(0, 4.4, 0);

    const ringGeometry = new THREE.RingGeometry(0.05, 0.07, 30);
    const ringMaterial = new THREE.MeshStandardMaterial({ color: "#525B68" });
    this.ring = new THREE.Mesh(ringGeometry, ringMaterial);

    sphereMesh.add(this.ring);
    lineMesh.add(sphereMesh);
    this.add(lineMesh);
  }

  update(elapsedTime) {
    if (this.ring) {
      const s = 1 + Math.sin(elapsedTime * 3) * 3;
      this.ring.scale.set(s, s, 1);
    }
  }
}
