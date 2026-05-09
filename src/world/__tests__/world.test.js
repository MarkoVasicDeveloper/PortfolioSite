import { describe, it, expect, vi, beforeEach } from "vitest";
import * as THREE from "three";

vi.mock("../../config/assets", () => ({
  ASSET_CONFIG: {
    models: [{ name: "drone", transform: { position: [0, 0, 0] } }],
    textures: [],
  },
}));
vi.mock("../../config/configIndex", () => ({
  PANEL_CONFIG: [],
  TITLES_CONFIG: [],
  TECH_TEXT_CONFIG: [],
}));
vi.mock("../../shader/shaderRegistry", () => ({
  SHADER_REGISTRY: {
    road: { vertex: "", fragment: "" },
    fog: { vertex: "", fragment: "" },
    underwater: { vertex: "", fragment: "" },
  },
}));
vi.mock("../../shader/uniforms", () => ({
  SHADER_UNIFORMS: {
    road: { time: { value: 0 } },
    fog: { time: { value: 0 } },
    underwater: { time: { value: 0 } },
  },
}));

const mockComp = function () {
  this.update = vi.fn();
  this.position = this.rotation = this.scale = { set: vi.fn() };
  this.points = [];
  this.dispose = vi.fn();
};

vi.mock("../road", () => ({ Road: vi.fn().mockImplementation(mockComp) }));
vi.mock("../projectPanel", () => ({
  ProjectPanel: vi.fn().mockImplementation(mockComp),
}));
vi.mock("../text3d", () => ({ Text3D: vi.fn().mockImplementation(mockComp) }));
vi.mock("../techText", () => ({
  TechText: vi.fn().mockImplementation(mockComp),
}));
vi.mock("../background", () => ({
  Background: vi.fn().mockImplementation(mockComp),
}));

let World;
let mockSceneManager, mockAssetManager, world;

const setup = () => {
  mockSceneManager = {
    add: vi.fn(),
    addBackground: vi.fn(),
    scene: { remove: vi.fn(), traverse: vi.fn() },
  };
  mockAssetManager = {
    models: { drone: { scene: new THREE.Group() } },
    textures: {},
    fonts: { fontPremanentMarker: {}, fontJson: {}, fontJustAnotherHand: {} },
  };
};

describe("World: Orchestrator", () => {
  beforeEach(async () => {
    if (!World) {
      World = (await import("../world")).World;
    }
    setup();
    world = new World(mockSceneManager, mockAssetManager);
  });

  it("should initialize and setup lights", () => {
    expect(world).toBeDefined();
    const lights = mockSceneManager.add.mock.calls.filter(
      (c) =>
        c[0] instanceof THREE.AmbientLight ||
        c[0] instanceof THREE.DirectionalLight,
    );
    expect(lights.length).toBe(2);
  });

  it("should update components", () => {
    const spy = vi.spyOn(world.road, "update");
    world.update(1.0);
    expect(spy).toHaveBeenCalledWith(1.0);
  });

  it("should create correct number of project panels", () => {
    expect(world.projectPanels.length).toBe(0);
  });

  it("should update shader uniforms", async () => {
    const { SHADER_UNIFORMS } = await import("../../shader/uniforms");
    const time = 5.5;

    world.update(time);

    expect(SHADER_UNIFORMS.road.time.value).toBe(time);
  });
});
