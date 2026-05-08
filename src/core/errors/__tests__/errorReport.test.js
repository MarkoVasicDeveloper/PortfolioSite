import { describe, it, expect, vi, beforeEach } from "vitest";
import { ErrorReport } from "../errorReport.js";
import { RenderError, AssetError } from "../error.js";
import { ErrorUI } from "../../../infrastructure/ui/errorUI.js";
import { Logger } from "../../logger.js";

vi.mock("../../../infrastructure/ui/errorUI.js", () => ({
  ErrorUI: { show: vi.fn() },
}));

vi.mock("../../logger.js", () => ({
  Logger: { error: vi.fn(), warn: vi.fn() },
}));

describe("ErrorReport Logic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should delegate RenderError to ErrorUI.show (Fatal)", () => {
    const error = new RenderError("GPU Crash");

    try {
      ErrorReport.handle(error);
    } catch {
      /* empty */
    }

    expect(ErrorUI.show).toHaveBeenCalledWith(error.message);
    expect(Logger.error).toHaveBeenCalled();
  });

  it("should delegate AssetError to Logger.warn (Minor)", () => {
    const error = new AssetError("icon.png", "/path");
    ErrorReport.handle(error);

    expect(ErrorUI.show).not.toHaveBeenCalled();
    expect(Logger.warn).toHaveBeenCalled();
  });
});

describe("ErrorReport Global Listeners", () => {
  it("should trigger handle on window error event", () => {
    const handleSpy = vi
      .spyOn(ErrorReport, "handle")
      .mockImplementation(() => {});

    ErrorReport.init();

    if (window.onerror) {
      window.onerror("Fake error", "test.js", 1, 1, new Error("Global crash"));
    }

    expect(handleSpy).toHaveBeenCalled();

    handleSpy.mockRestore();
    window.onerror = null;
  });

  it("should trigger handle on unhandled rejection", () => {
    const handleSpy = vi
      .spyOn(ErrorReport, "handle")
      .mockImplementation(() => {});

    const promiseEvent = new PromiseRejectionEvent("unhandledrejection", {
      promise: new Promise(() => {}),
      reason: new Error("Async crash"),
    });

    window.dispatchEvent(promiseEvent);

    expect(handleSpy).toHaveBeenCalled();
    handleSpy.mockRestore();
  });
});
