import { describe, it, expect, vi, beforeEach } from "vitest";
import * as THREE from "three";
import { ProjectPanel } from "../projectPanel.js";

vi.mock("../../core/logger.js", () => ({
  Logger: { warn: vi.fn(), info: vi.fn() },
}));

vi.mock("three/examples/jsm/geometries/TextGeometry", () => ({
  TextGeometry: class extends THREE.BufferGeometry {
    constructor() {
      super();
    }
  },
}));

const createMockConfig = () => ({
  name: "Portfolio",
  link: "https://marko.vasic",
  text: "Test",
  attachments: [
    {
      modelName: "icon1",
      offset: [1, 1, 1],
      scale: [1, 1, 1],
      link: "/test",
    },
  ],
});

const createMockAssets = () => ({
  fonts: { fontJson: {} },
  iconModels: { icon1: new THREE.Group() },
});

describe("ProjectPanel Structure", () => {
  let config, assets, shader;

  beforeEach(() => {
    config = createMockConfig();
    assets = createMockAssets();
    shader = { vertex: "v", fragment: "f" };
  });

  it("should verify naming and primary mesh", () => {
    const panel = new ProjectPanel(config, shader, {}, assets);
    expect(panel.name).toBe("panel-Portfolio");
    expect(panel.children.find((c) => c.name === "link")).toBeDefined();
  });

  it("should verify attachments and text creation", () => {
    const panel = new ProjectPanel(config, shader, {}, assets);
    const attachment = panel.children.find((c) => c.name === "attachment");
    expect(attachment).toBeDefined();
    expect(attachment.userData.link).toBe("/test");
  });
});

describe("ProjectPanel Life Cycle", () => {
  it("should handle animation updates", () => {
    const panel = new ProjectPanel(
      createMockConfig(),
      { vertex: "v", fragment: "f" },
      {},
      createMockAssets(),
    );
    const initialScale = panel.ring.scale.x;
    panel.update(1.5);
    expect(panel.ring.scale.x).not.toBe(initialScale);
  });

  it("should clean up resources on dispose", () => {
    const panel = new ProjectPanel(
      createMockConfig(),
      { vertex: "v", fragment: "f" },
      {},
      createMockAssets(),
    );
    const spy = vi.spyOn(THREE.Material.prototype, "dispose");
    panel.dispose();
    expect(spy).toHaveBeenCalled();
    expect(panel.children.length).toBe(0);
  });
});
