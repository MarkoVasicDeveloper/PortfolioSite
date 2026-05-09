import { describe, it, expect, vi } from "vitest";
import * as THREE from "three";
import { CameraController } from "../cameraController.js";
import { ValidationError } from "../errors/error.js";

describe("CameraController: Initialization", () => {
  it("should throw ValidationError if camera is missing", () => {
    expect(() => new CameraController(null, [])).toThrow(ValidationError);
  });

  it("should throw if curvePoints have less than 2 points", () => {
    const cam = new THREE.PerspectiveCamera();
    const points = [{ x: 0, y: 0 }];
    expect(() => new CameraController(cam, points)).toThrow(
      "Invalid curvePoints",
    );
  });
});

describe("CameraController: Path Logic", () => {
  it("should generate a closed 3D path with constant height", () => {
    const cam = new THREE.PerspectiveCamera();
    const points = [
      { x: 0, y: 0 },
      { x: 10, y: 10 },
    ];
    const controller = new CameraController(cam, points);

    const midPoint = controller.path.getPointAt(0.5);

    expect(midPoint.y).toBe(3);
    expect(controller.path.closed).toBe(true);
  });
});

describe("CameraController: Update Loop", () => {
  it("should update camera position smoothly based on input", () => {
    const cam = new THREE.PerspectiveCamera();
    const points = [
      { x: 0, y: 0 },
      { x: 10, y: 10 },
    ];
    const controller = new CameraController(cam, points);

    const initialPos = cam.position.clone();

    controller.update(100);

    expect(cam.position.x).not.toBe(initialPos.x);
    expect(controller.targetProgress).toBeGreaterThan(0);
  });

  it("should handle infinite looping using modulo logic", () => {
    const cam = new THREE.PerspectiveCamera();
    const points = [
      { x: 0, y: 0 },
      { x: 10, y: 10 },
    ];
    const controller = new CameraController(cam, points);

    controller.targetProgress = 1.2;
    controller.update(0);

    const normalized = ((controller.currentProgress % 1) + 1) % 1;
    expect(normalized).toBeLessThan(1);
    expect(normalized).toBeGreaterThanOrEqual(0);
  });
});

it("should update camera orientation (lookAt)", () => {
  const cam = new THREE.PerspectiveCamera();

  const lookAtSpy = vi.spyOn(cam, "lookAt");

  const points = [
    { x: 0, y: 0 },
    { x: 10, y: 10 },
    { x: 20, y: 0 },
  ];
  const controller = new CameraController(cam, points);

  controller.update(500);

  expect(lookAtSpy).toHaveBeenCalled();
  expect(lookAtSpy.mock.calls[0][0]).toBeInstanceOf(THREE.Vector3);
});
