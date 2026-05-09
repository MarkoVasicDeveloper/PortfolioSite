import { describe, it, expect, vi, beforeEach } from "vitest";
import * as THREE from "three";
import gsap from "gsap";
import { RaycasterManager } from "../raycasterManager.js";

vi.mock("gsap", () => ({ default: { to: vi.fn() } }));

let camera, scene, soundManager;

beforeEach(() => {
  camera = new THREE.PerspectiveCamera();
  scene = new THREE.Scene();
  soundManager = { play: vi.fn() };
  vi.clearAllMocks();
});

describe("RaycasterManager: Hover Logic", () => {
  it("should set hover state when mouse is over interactive object", () => {
    const manager = new RaycasterManager(camera, scene, soundManager);

    const mockMesh = new THREE.Mesh();
    mockMesh.userData.link = "https://test.dev";

    vi.spyOn(manager.raycaster, "intersectObjects").mockReturnValue([
      { object: mockMesh },
    ]);

    const moveEvent = new PointerEvent("pointermove", {
      clientY: 100,
      clientX: 100,
    });
    window.dispatchEvent(moveEvent);

    expect(manager.hoveredObject).toBe(mockMesh);
    expect(document.body.style.cursor).toBe("pointer");
  });
});

describe("RaycasterManager: Click Action", () => {
  it("should play sound and open link on click", () => {
    const manager = new RaycasterManager(camera, scene, soundManager);

    const mockMesh = new THREE.Mesh();
    mockMesh.userData.link = "https://github.com/test";
    manager.hoveredObject = mockMesh;

    const windowSpy = vi.spyOn(window, "open").mockImplementation(() => {});

    window.dispatchEvent(new MouseEvent("click"));

    expect(soundManager.play).toHaveBeenCalledWith("click");
    expect(windowSpy).toHaveBeenCalledWith(mockMesh.userData.link, "_blank");
  });
});

describe("RaycasterManager: Hover & Visuals", () => {
  it("should update cursor and trigger GSAP for uniforms", () => {
    const manager = new RaycasterManager(camera, scene, soundManager);

    const mockMesh = {
      material: { uniforms: { hover: { value: 0 } } },
      userData: {},
    };

    manager._setHoverState(mockMesh, true);

    expect(document.body.style.cursor).toBe("pointer");

    expect(gsap.to).toHaveBeenCalledWith(
      mockMesh.material.uniforms.hover,
      expect.objectContaining({ value: 1.0, duration: 1 }),
    );
  });

  it("should reset cursor to default when hover ends", () => {
    const manager = new RaycasterManager(camera, scene, soundManager);
    const mockMesh = { material: {}, userData: {} };

    manager._setHoverState(mockMesh, false);

    expect(document.body.style.cursor).toBe("default");
  });
});
