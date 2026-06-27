import { describe, it, expect, vi, beforeEach } from "vitest";
import * as THREE from "three";

vi.mock("../../config/assets", () => ({
  ASSET_CONFIG: {
    models: [
      { name: "frog", transform: { position: [0, 0, 0] } },
      { name: "office", transform: { position: [1, 1, 1] } },
    ],
    textures: [],
  },
}));

vi.mock("../../config/configIndex", () => ({
  PANEL_CONFIG: [],
  TITLES_CONFIG: [],
  TECH_TEXT_CONFIG: [],
}));
vi.mock("../../config/frogTriggerConfig", () => ({ FROG_TRIGGER_CONFIG: {} }));
vi.mock("../../shader/shaderRegistry", () => ({
  SHADER_REGISTRY: { road: {}, fog: {} },
}));
vi.mock("../../shader/uniforms", () => ({
  SHADER_UNIFORMS: { road: { time: { value: 0 } } },
}));

const mockComp = function () {
  this.update = vi.fn();
  this.dispose = vi.fn();
  this.position = this.rotation = this.scale = { set: vi.fn() };
  this.points = [new THREE.Vector3()];
};

vi.mock("../road", () => ({ Road: vi.fn().mockImplementation(mockComp) }));
vi.mock("../projectPanel", () => ({
  ProjectPanel: vi.fn().mockImplementation(mockComp),
}));
vi.mock("../background", () => ({
  Background: vi.fn().mockImplementation(mockComp),
}));
vi.mock("../textManager", () => ({
  TextManager: vi.fn().mockImplementation(mockComp),
}));

vi.mock("../frogCharacter", () => ({
  FrogCharacter: vi.fn().mockImplementation(function () {
    this.container = new THREE.Group();
    this.update = vi.fn();
    this.dispose = vi.fn();
    this.currentZoneId = "start_zone";
  }),
}));

vi.mock("../../infrastructure/three/diorama/hero/heroStageBuilder", () => ({
  HeroStageBuilder: vi.fn().mockImplementation(function () {
    this.build = vi.fn();
    this.alignLightsToModel = vi.fn();
    this.officeScene = { visible: true };
    this.neonBlueLight = { visible: true };
    this.topLight = { visible: true };
  }),
}));

let World;
let mockSceneManager, mockAssetManager, world;

function createMockSceneManager() {
  return {
    add: vi.fn(),
    addBackground: vi.fn(),
    scene: {
      traverse: vi.fn((callback) => {
        callback({
          isMesh: true,
          geometry: { dispose: vi.fn() },
          material: { dispose: vi.fn() },
        });
      }),
    },
  };
}

describe("World: Orchestrator", () => {
  beforeEach(async () => {
    if (!World) {
      World = (await import("../world")).World;
    }
    mockSceneManager = createMockSceneManager();
    mockAssetManager = {
      models: { frog: new THREE.Group(), office: new THREE.Group() },
      textures: {},
    };
    world = new World(mockSceneManager, mockAssetManager);
  });

  it("should initialize components and lights correctly", () => {
    expect(world).toBeDefined();
    expect(mockSceneManager.add).toHaveBeenCalled();
  });

  it("should toggle office visibility when frog changes zones", () => {
    world.update(0.1);
    expect(world.stageBuilder.officeScene.visible).toBe(false);

    world.frog.currentZoneId = "main_zone";
    world.update(0.2);

    expect(world.stageBuilder.officeScene.visible).toBe(true);
  });

  it("should properly dispose all WebGL resources", () => {
    const roadDisposeSpy = vi.spyOn(world.road, "dispose");
    const bgDisposeSpy = vi.spyOn(world.fogBackground, "dispose");
    const frogDisposeSpy = vi.spyOn(world.frog, "dispose");

    world.dispose();

    expect(roadDisposeSpy).toHaveBeenCalled();
    expect(bgDisposeSpy).toHaveBeenCalled();
    expect(frogDisposeSpy).toHaveBeenCalled();
    expect(mockSceneManager.scene.traverse).toHaveBeenCalled();
  });

  it("should not crash if an expected asset is missing", () => {
    mockAssetManager.models = {};
    expect(() => {
      new World(mockSceneManager, mockAssetManager);
    }).not.toThrow();
  });
});
