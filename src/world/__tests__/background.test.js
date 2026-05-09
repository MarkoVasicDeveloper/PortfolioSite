import { describe, it, expect, vi } from "vitest";
import { Background } from "../background.js";

describe("Background Component", () => {
  const mockShader = { vertex: "v-code", fragment: "f-code" };
  const mockUniforms = { uTime: { value: 0 } };

  it("should initialize with correct material settings for a background", () => {
    const bg = new Background(mockShader, mockUniforms);

    expect(bg.material.depthTest).toBe(false);
    expect(bg.material.depthWrite).toBe(false);
    expect(bg.material.transparent).toBe(true);
    expect(bg.material.vertexShader).toBe("v-code");
  });

  it("should have a geometry that covers the screen (2x2 plane)", () => {
    const bg = new Background(mockShader, mockUniforms);

    expect(bg.geometry.type).toBe("PlaneGeometry");
    expect(bg.geometry.parameters.width).toBe(2);
    expect(bg.geometry.parameters.height).toBe(2);
  });

  it("should properly dispose resources to prevent memory leaks", () => {
    const bg = new Background(mockShader, mockUniforms);

    const geometrySpy = vi.spyOn(bg.geometry, "dispose");
    const materialSpy = vi.spyOn(bg.material, "dispose");

    bg.dispose();

    expect(geometrySpy).toHaveBeenCalled();
    expect(materialSpy).toHaveBeenCalled();
  });
});
