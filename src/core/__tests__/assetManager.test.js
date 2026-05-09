import { describe, it, expect, vi, beforeEach } from "vitest";
import { AssetManager } from "../assetManager.js";
import { AssetError } from "../errors/error.js";
import { Logger } from "../logger.js";

vi.mock("../logger.js", () => ({
  Logger: { error: vi.fn(), warn: vi.fn() },
}));

describe("AssetManager: Initialization & Routing", () => {
  it("should initialize with empty buckets", () => {
    const manager = new AssetManager();
    expect(manager.models).toEqual({});
    expect(manager.textures).toEqual({});
  });

  it("should route assets to the correct store based on groupKey", async () => {
    const manager = new AssetManager();
    const mockLoader = { load: vi.fn((url, cb) => cb({ isTexture: true })) };

    manager.setExtensionMap({
      png: { loader: mockLoader, store: manager.assets.textures },
    });

    const config = { textures: [{ name: "bg", url: "bg.png" }] };
    await manager.allLoad(config);

    expect(manager.textures.bg).toBeDefined();
    expect(manager.models.bg).toBeUndefined();
  });

  it("should skip unsupported formats and log a warning", async () => {
    const manager = new AssetManager();
    manager.setExtensionMap({});

    const config = { models: [{ name: "virus", url: "virus.exe" }] };
    const results = await manager.allLoad(config);

    expect(results[0]).toBe(null);
    expect(Logger.warn).toHaveBeenCalledWith(
      "AssetManager",
      expect.stringContaining("Unsupported format .exe"),
    );
  });
});

describe("AssetManager: _genericLoad Logic", () => {
  let manager;
  beforeEach(() => {
    manager = new AssetManager();
    vi.clearAllMocks();
  });

  it("should handle texture colorSpace correctly", async () => {
    const store = {};
    const mockTexture = { isTexture: true };
    const mockLoader = { load: vi.fn((url, cb) => cb(mockTexture)) };

    await manager._genericLoad(mockLoader, "test.png", "tex", store);

    expect(mockTexture.colorSpace).toBe("srgb");
    expect(store.tex).toBe(mockTexture);
  });

  it("should reject if the loader is invalid", async () => {
    const invalidLoader = {};
    const loadPromise = manager._genericLoad(invalidLoader, "u", "n", {});
    await expect(loadPromise).rejects.toThrow("Invalid loader");
  });

  it("should reject with AssetError on loader failure", async () => {
    const mockLoader = {
      load: vi.fn((url, cb, prg, errCb) => errCb(new Error("404"))),
    };

    const loadPromise = manager._genericLoad(mockLoader, "b.glb", "x", {});
    await expect(loadPromise).rejects.toThrow(AssetError);
  });
});

describe("AssetManager: Event System", () => {
  it("should dispatch progress events with correct percentage", () => {
    const manager = new AssetManager();
    const mockLM = {};
    const progressSpy = vi.fn();

    manager.addEventListener("assetProgress", progressSpy);
    manager.setupProgress(mockLM);

    mockLM.onProgress("url", 2, 4);

    expect(progressSpy).toHaveBeenCalled();
    const eventDetail = progressSpy.mock.calls[0][0].detail;
    expect(eventDetail).toBe(50);
  });

  it("should dispatch assetLoaded when loading completes", () => {
    const manager = new AssetManager();
    const mockLM = {};
    const loadedSpy = vi.fn();

    manager.addEventListener("assetLoaded", loadedSpy);
    manager.setupProgress(mockLM);

    mockLM.onLoad();

    expect(loadedSpy).toHaveBeenCalled();
  });
});
