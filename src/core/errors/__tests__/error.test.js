import { describe, it, expect } from "vitest";
import {
  AppError,
  AssetError,
  RenderError,
  ValidationError,
} from "../error.js";

describe("AppError Base Class", () => {
  it("should contain a timestamp and correct name", () => {
    const message = "Test error";
    const context = { userId: 123 };
    const err = new AppError(message, context);

    expect(err.message).toBe(message);
    expect(err.name).toBe("AppError");
    expect(err.context).toEqual(context);
    expect(err.timestamp).toBeDefined();
    expect(new Date(err.timestamp).toISOString()).toBe(err.timestamp);
  });
});

describe("AssetError Logic", () => {
  it("should store asset-specific metadata and inherit from AppError", () => {
    const originalErr = new Error("404 Not Found");
    const err = new AssetError("hero_model", "/assets/hero.glb", originalErr);

    expect(err instanceof AppError).toBe(true);
    expect(err.assetName).toBe("hero_model");
    expect(err.url).toBe("/assets/hero.glb");
    expect(err.message).toContain("hero_model");
  });
});

describe("RenderError Logic", () => {
  it("should format the message with prefix", () => {
    const err = new RenderError("WebGL Context Lost");

    expect(err instanceof AppError).toBe(true);
    expect(err.message).toBe("Render engine error: WebGL Context Lost");
  });
});

describe("ValidationError Logic", () => {
  it("should store the component name correctly", () => {
    const err = new ValidationError("SceneManager", "Canvas is missing");

    expect(err instanceof AppError).toBe(true);
    expect(err.component).toBe("SceneManager");
    expect(err.message).toContain("SceneManager");
  });
});
