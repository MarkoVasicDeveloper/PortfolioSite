import { describe, it, expect, vi } from "vitest";
import * as THREE from "three";
import { Text3D } from "../text3d.js";

vi.mock("three/examples/jsm/geometries/TextGeometry", () => ({
  TextGeometry: class extends THREE.BufferGeometry {
    constructor() {
      super();
    }
  },
}));

const mockFont = {};

describe("Text3D: Standard Mode", () => {
  it("should create a mesh with MeshStandardMaterial by default", () => {
    const options = { color: "#ff0000", size: 0.5 };
    const text = new Text3D("Hello", mockFont, options);

    expect(text.material).toBeInstanceOf(THREE.MeshStandardMaterial);
    expect(text.material.color.getHexString()).toBe("ff0000");
  });

  it("should apply transformations correctly", () => {
    const options = { position: [10, 5, 0], rotationY: Math.PI };
    const text = new Text3D("Test", mockFont, options);

    expect(text.position.x).toBe(10);
    expect(text.rotation.y).toBe(Math.PI);
  });
});

describe("Text3D: Shader Mode", () => {
  it("should create a ShaderMaterial when shaderData is provided", () => {
    const options = {
      shaderData: { vertex: "v-code", fragment: "f-code" },
      uniforms: { uTime: { value: 0 } },
    };

    const text = new Text3D("Shader Text", mockFont, options);

    expect(text.material).toBeInstanceOf(THREE.ShaderMaterial);
    expect(text.material.vertexShader).toBe("v-code");
    expect(text.material.uniforms.uTime).toBeDefined();
  });
});

describe("Text3D: Lifecycle", () => {
  it("should call dispose on geometry and material", () => {
    const text = new Text3D("Bye", mockFont);
    const geoSpy = vi.spyOn(text.geometry, "dispose");
    const matSpy = vi.spyOn(text.material, "dispose");

    text.dispose();

    expect(geoSpy).toHaveBeenCalled();
    expect(matSpy).toHaveBeenCalled();
  });
});
