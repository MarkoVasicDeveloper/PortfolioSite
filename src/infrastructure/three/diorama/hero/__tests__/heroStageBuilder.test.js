/* eslint-disable max-lines-per-function */
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as THREE from "three";
import { HeroStageBuilder } from "../heroStageBuilder";

vi.mock("../../../../config/heroDioram", () => ({
  LIGHT_CONFIG: {
    screenHeightOffset: 1.5,
    targetXOffset: 0.5,
    targetZOffset: -0.5,
    directional: { boxSize: 5, x: 2, y: 10, z: 2 },
  },
}));

function createMockMesh(name) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial(),
  );
  mesh.name = name;
  vi.spyOn(mesh.material, "dispose");
  return mesh;
}

describe("HeroStageBuilder: Material Optimizer & Light Aligner", function () {
  let mockSceneManager, mockModel, builder;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSceneManager = { add: vi.fn() };

    const group = new THREE.Group();
    group.add(createMockMesh("table"));
    group.add(createMockMesh("screen"));

    mockModel = { scene: group };
    builder = new HeroStageBuilder(mockSceneManager, mockModel);
  });

  it("should clean up old materials when optimizing meshes to prevent VRAM leaks", () => {
    const tableMesh = builder.office.scene.children[0];
    const screenMesh = builder.office.scene.children[1];
    const oldTableMaterial = tableMesh.material;
    const oldScreenMaterial = screenMesh.material;

    builder.build();

    expect(oldTableMaterial.dispose).toHaveBeenCalled();
    expect(oldScreenMaterial.dispose).toHaveBeenCalled();
  });

  it("should correctly position lights relative to the screen mesh world space", () => {
    builder.build();

    const neonLightSpy = vi.spyOn(builder.neonBlueLight.position, "set");
    const topLightSpy = vi.spyOn(builder.topLight.position, "set");

    vi.spyOn(builder.officeScene, "getWorldPosition").mockImplementation(
      (vec) => {
        vec.set(0, 10, 0);
        return vec;
      },
    );
    vi.spyOn(
      builder.screenMesh.geometry.boundingBox,
      "getCenter",
    ).mockImplementation((vec) => {
      vec.set(1, 1, 1);
      return vec;
    });
    vi.spyOn(builder.screenMesh, "localToWorld").mockImplementation((vec) => {
      vec.set(1, 11, 1);
      return vec;
    });

    builder.alignLightsToModel();

    expect(neonLightSpy).toHaveBeenCalledWith(1, 11.9, 1.1);
    expect(topLightSpy).toHaveBeenCalledWith(4, 16, 4);
  });

  it("should handle alignLightsToModel safely if called before build", () => {
    expect(() => {
      builder.alignLightsToModel();
    }).not.toThrow();
  });
});
