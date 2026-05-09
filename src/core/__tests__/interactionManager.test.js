import { describe, it, expect, vi, beforeEach } from "vitest";
import * as THREE from "three";
import gsap from "gsap";
import { InteractionManager } from "../interactionManager.js";

vi.mock("gsap", () => ({
  default: { to: vi.fn() },
}));

let camera, scene, soundManager, configs;

beforeEach(() => {
  camera = new THREE.PerspectiveCamera();
  scene = new THREE.Scene();
  soundManager = { play: vi.fn() };
  configs = [
    {
      name: "Project_Icon",
      range: { min: 0, max: 5 },
      sound: "pop",
      duration: 0.5,
    },
  ];
  vi.clearAllMocks();
});

describe("InteractionManager: Setup", () => {
  it("should hide interactive objects on start (scale 0)", () => {
    const mesh = new THREE.Mesh();
    mesh.name = "Project_Icon_01";
    scene.add(mesh);

    new InteractionManager(camera, scene, configs, soundManager);

    expect(mesh.scale.x).toBe(0);
    expect(mesh.userData.isActive).toBe(false);
  });
});

describe("InteractionManager: Distance Logic", () => {
  it("should activate object when camera enters range", () => {
    const mesh = new THREE.Mesh();
    mesh.name = "Project_Icon";
    mesh.position.set(0, 0, 10);
    scene.add(mesh);

    const config = [
      { name: "Project_Icon", range: { min: 0, max: 5 }, duration: 0.5 },
    ];
    const manager = new InteractionManager(camera, scene, config, soundManager);

    camera.position.set(0, 0, 20);
    manager.update();
    expect(mesh.userData.isActive).toBe(false);

    camera.position.set(0, 0, 12);
    manager.update();

    expect(mesh.userData.isActive).toBe(true);
    expect(gsap.to).toHaveBeenCalled();
  });
});

describe("InteractionManager: Side Effects", () => {
  it("should trigger sound and specific animation when activated", () => {
    const mesh = new THREE.Mesh();
    mesh.name = "Icon";
    mesh.userData.config = {
      name: "Icon",
      range: { max: 5 },
      sound: "click",
      duration: 0.8,
    };

    const manager = new InteractionManager(
      camera,
      scene,
      [mesh.userData.config],
      soundManager,
    );

    manager._handleStateChange(mesh, true);

    expect(soundManager.play).toHaveBeenCalledWith("click", 0.4);

    expect(gsap.to).toHaveBeenCalledWith(
      mesh.scale,
      expect.objectContaining({
        x: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      }),
    );
  });
});
