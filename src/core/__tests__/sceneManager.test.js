import { describe, it, expect, vi, beforeEach } from "vitest";
import { SceneManager } from "../sceneManager.js";
import { ValidationError } from "../errors/error.js";

vi.mock("three", async () => {
  const actual = await vi.importActual("three");

  class MockRenderer {
    constructor() {
      this.domElement = document.createElement("canvas");
      this.autoClear = false;
    }
    setSize() {
      return this;
    }
    setPixelRatio() {
      return this;
    }
    setClearColor() {
      return this;
    }
    render() {
      return this;
    }
    clear() {
      return this;
    }
  }

  return {
    ...actual,
    WebGLRenderer: MockRenderer,
  };
});

describe("SceneManager Suite", () => {
  let canvas;

  beforeEach(() => {
    global.innerWidth = 1024;
    global.innerHeight = 768;
    canvas = document.createElement("canvas");
    vi.clearAllMocks();
  });

  describe("Initialization", () => {
    it("should initialize without crashing", () => {
      const sm = new SceneManager(canvas);
      expect(sm.renderer).toBeDefined();
      expect(sm.scene).toBeDefined();
    });

    it("should throw ValidationError if canvas is missing", () => {
      expect(() => new SceneManager(null)).toThrow(ValidationError);
    });
  });

  describe("Window Events", () => {
    it("should update renderer size on resize", () => {
      const sm = new SceneManager(canvas);
      const spy = vi.spyOn(sm.renderer, "setSize");

      global.innerWidth = 500;
      global.innerHeight = 500;
      window.dispatchEvent(new Event("resize"));

      expect(spy).toHaveBeenCalledWith(500, 500);
    });
  });

  describe("Rendering", () => {
    it("should call updateCallback", () => {
      const sm = new SceneManager(canvas);
      const mockCb = vi.fn();
      const renderSpy = vi.spyOn(sm.renderer, "render");

      vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => {});

      sm.render(mockCb);

      expect(renderSpy).toHaveBeenCalled();
      expect(mockCb).toHaveBeenCalled();
    });
  });
});
