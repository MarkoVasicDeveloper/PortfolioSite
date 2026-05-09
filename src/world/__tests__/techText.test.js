import { describe, it, expect, vi } from "vitest";
import * as THREE from "three";
import { TechText } from "../techText.js";

vi.mock("three/examples/jsm/geometries/TextGeometry", () => ({
  TextGeometry: class extends THREE.BufferGeometry {
    constructor() {
      super();
    }
  },
}));

describe("TechText Component", () => {
  const mockFont = {};
  const mockConfig = {
    content: "Flutter / Dart",
    position: [2, 1, 0],
    rotationY: Math.PI / 2,
  };

  it("should apply configuration correctly in the constructor", () => {
    const techText = new TechText(mockConfig, mockFont);

    expect(techText.position.toArray()).toEqual([2, 1, 0]);
    expect(techText.rotation.y).toBe(Math.PI / 2);
    expect(techText.name).toBe("technologyText");
  });

  it("should start with scale (0,0,0) for animation readiness", () => {
    const techText = new TechText(mockConfig, mockFont);

    expect(techText.scale.x).toBe(0);
    expect(techText.scale.y).toBe(0);
    expect(techText.scale.z).toBe(0);
  });

  it("should dispose of geometry and material properly", () => {
    const techText = new TechText(mockConfig, mockFont);

    const geoSpy = vi.spyOn(techText.geometry, "dispose");
    const matSpy = vi.spyOn(techText.material, "dispose");

    techText.dispose();

    expect(geoSpy).toHaveBeenCalledTimes(1);
    expect(matSpy).toHaveBeenCalledTimes(1);
  });
});
