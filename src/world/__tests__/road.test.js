import { describe, it, expect, vi, beforeEach } from "vitest";
import * as THREE from "three";
import { Road } from "../road.js";

vi.mock("../shader/shaderRegistry", () => ({
  SHADER_REGISTRY: {
    road: { vertex: "v-shader", fragment: "f-shader" },
  },
}));

vi.mock("../shader/uniforms", () => ({
  SHADER_UNIFORMS: {
    road: { time: { value: 0 } },
  },
}));

describe("Road Component", () => {
  let mockSceneManager;
  beforeEach(() => {
    mockSceneManager = {
      add: vi.fn(),
      scene: { remove: vi.fn() },
    };
  });

  describe("Path Generation", () => {
    it("should generate a significant number of points for the camera path", () => {
      const road = new Road(mockSceneManager);

      expect(road.points.length).toBeGreaterThan(1800);
      expect(road.points[0]).toBeInstanceOf(THREE.Vector2);
    });
  });

  describe("Visuals and Shaders", () => {
    it("should create 4 road segments (3 small, 1 big)", () => {
      const road = new Road(mockSceneManager);

      expect(road.materials.length).toBe(4);
      expect(road.group.children.length).toBe(4);
    });

    it("should update all material uniforms on tick", () => {
      const road = new Road(mockSceneManager);
      const testTime = 123.456;
      road.update(testTime);

      road.materials.forEach((mat) => {
        expect(mat.uniforms.time.value).toBe(testTime);
      });
    });
  });

  describe("Resource Management", () => {
    it("should dispose geometries and remove group from scene", () => {
      const road = new Road(mockSceneManager);
      const group = road.group;
      const geometrySpy = vi.spyOn(group.children[0].geometry, "dispose");
      road.dispose();

      expect(geometrySpy).toHaveBeenCalled();
      expect(mockSceneManager.scene.remove).toHaveBeenCalledWith(group);
      expect(road.points.length).toBe(0);
    });
  });
});
