/* eslint-disable max-lines-per-function */
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as THREE from "three";
import { FrogCharacter } from "../frogCharacter";

vi.mock("../infrastructure/three/diorama/hero/frogCommands", () => ({
  FrogCommands: {
    SIT_AND_TYPE: { position: [0, 0, 5], animation: "typing" },
  },
}));

describe("FrogCharacter: Core Orchestrator", function () {
  let mockAsset, mockCamera, mockTriggerConfig;

  beforeEach(() => {
    vi.clearAllMocks();

    const mockMesh = new THREE.Mesh(
      new THREE.BoxGeometry(),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 }),
    );
    mockMesh.isMesh = true;

    const mockGroup = new THREE.Group();
    mockGroup.add(mockMesh);

    mockAsset = {
      scene: mockGroup,
      animations: [
        new THREE.AnimationClip("typing", -1, []),
        new THREE.AnimationClip("praying", -1, []),
        new THREE.AnimationClip("idle", -1, []),
      ],
    };

    mockCamera = new THREE.PerspectiveCamera();
    mockCamera.position.set(0, 0, 0);

    mockTriggerConfig = [
      {
        id: "SIT_ZONE",
        position: [0, 0, 5],
        radius: 2,
        command: "SIT_AND_TYPE",
      },
    ];
  });

  describe("Initialization & Cyberpunk Material Optimization", () => {
    it("should optimize mesh materials by dimming colors and setting roughness", () => {
      const frog = new FrogCharacter(mockAsset, mockCamera, mockTriggerConfig);
      const mesh = frog.rawModel.children[0];

      expect(mesh.material.roughness).toBe(0.85);
      expect(mesh.material.color.r).toBeCloseTo(0.3, 2);
    });

    it("should correctly setup root container hierarchy and visibility upon init", () => {
      const frog = new FrogCharacter(mockAsset, mockCamera, mockTriggerConfig);
      expect(frog.container.name).toBe("frogContainer");
      expect(frog.container.children.includes(frog.rawModel)).toBe(true);
      expect(frog.container.visible).toBe(true);
    });
  });

  describe("Scene Manipulation", () => {
    it("should set position and rotation correctly via setupScene", () => {
      const frog = new FrogCharacter(mockAsset, mockCamera, mockTriggerConfig);
      frog.setupScene([10, 20, 30], Math.PI);

      expect(frog.container.position.x).toBe(10);
      expect(frog.container.position.y).toBe(20);
      expect(frog.container.position.z).toBe(30);
      expect(frog.container.quaternion.y).toBeCloseTo(1, 5);
    });
  });

  describe("Proximity Zone Trigger System", () => {
    it("should stay in idle/null zone if camera is outside the trigger radius", () => {
      const frog = new FrogCharacter(mockAsset, mockCamera, mockTriggerConfig);

      const clearSpy = vi.spyOn(frog.dioramaManager, "clear");

      mockCamera.position.set(0, 0, 0);
      frog.update(0.016);

      expect(frog.currentZoneId).toBeNull();
      expect(frog.container.visible).toBe(false);
      expect(clearSpy).toHaveBeenCalled();
    });

    it("should enter zone, activate diorama, and make character visible when camera moves inside radius", () => {
      const frog = new FrogCharacter(mockAsset, mockCamera, mockTriggerConfig);
      const switchSpy = vi.spyOn(frog.dioramaManager, "switchDiorama");

      mockCamera.position.set(0, 0, 4.5);
      frog.update(0.016);

      expect(frog.currentZoneId).toBe("SIT_ZONE");
      expect(frog.container.visible).toBe(true);
      expect(switchSpy).toHaveBeenCalledWith("SIT_AND_TYPE");
    });

    it("should trigger diorama state transition only once when crossing the threshold boundary", () => {
      const frog = new FrogCharacter(mockAsset, mockCamera, mockTriggerConfig);
      const switchSpy = vi.spyOn(frog.dioramaManager, "switchDiorama");

      mockCamera.position.set(0, 0, 4.5);
      frog.update(0.016);

      frog.update(0.016);

      expect(switchSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("Resource Disposal", () => {
    it("should clean up sub-managers and remove container from parent scene upon disposal", () => {
      const frog = new FrogCharacter(mockAsset, mockCamera, mockTriggerConfig);
      const mockParentScene = new THREE.Scene();
      mockParentScene.add(frog.container);

      expect(mockParentScene.children.includes(frog.container)).toBe(true);

      frog.dispose(mockParentScene);

      expect(mockParentScene.children.includes(frog.container)).toBe(false);
      expect(frog.dioramaManager).toBeNull();
      expect(frog.animationManager).toBeNull();
      expect(frog.camera).toBeNull();
      expect(frog.triggerConfig).toBeNull();
    });
  });
});
