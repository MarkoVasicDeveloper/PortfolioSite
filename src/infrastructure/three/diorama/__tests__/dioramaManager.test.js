/* eslint-disable max-lines-per-function */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { DioramaManager } from "../dioramaManager";
import { ValidationError } from "../../../../core/errors/error";

vi.mock("../diorama/hero/frogCommands", () => ({
  FrogCommands: {
    SIT_AND_TYPE: { position: [1, 2, 3], animation: "typing" },
  },
}));

function createDeepMockFrog() {
  const mockActionsMap = new Map();
  mockActionsMap.get = vi.fn().mockReturnValue({ name: "mock-action" });

  return {
    name: "HeroFrog",
    animationManager: {
      mixer: {
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      },
      play: vi.fn(),
      stop: vi.fn(),
      actions: mockActionsMap,
    },
  };
}

describe("DioramaManager: Behavioral Routing Engine", function () {
  let mockFrog;

  beforeEach(() => {
    vi.clearAllMocks();
    mockFrog = createDeepMockFrog();
  });

  describe("Constructor Guard Rails", () => {
    it("should throw a ValidationError if initialized without a frog instance", () => {
      expect(() => new DioramaManager(null)).toThrow(ValidationError);
      expect(() => new DioramaManager(undefined)).toThrow(ValidationError);
      expect(() => new DioramaManager("not-an-object")).toThrow(
        ValidationError,
      );
    });

    it("should correctly initialize with default idle states when frog is valid", () => {
      const manager = new DioramaManager(mockFrog);
      expect(manager.frog).toBe(mockFrog);
      expect(manager.currentDiorama).toBeNull();
      expect(manager.currentAction).toBeNull();
    });
  });

  describe("switchDiorama Orchestration", () => {
    it("should successfully instantiate and enter a registered diorama", () => {
      const manager = new DioramaManager(mockFrog);

      manager.switchDiorama("SIT_AND_TYPE");

      expect(manager.currentAction).toBe("SIT_AND_TYPE");
      expect(manager.currentDiorama).toBeDefined();
      expect(
        mockFrog.animationManager.mixer.addEventListener,
      ).toHaveBeenCalledWith("finished", expect.any(Function));
    });

    it("should safely tear down the active diorama before switching to a new state", () => {
      const manager = new DioramaManager(mockFrog);

      manager.switchDiorama("SIT_AND_TYPE");
      expect(manager.currentDiorama).toBeDefined();

      manager.switchDiorama("");

      expect(
        mockFrog.animationManager.mixer.removeEventListener,
      ).toHaveBeenCalledWith("finished", expect.any(Function));
      expect(manager.currentDiorama).toBeNull();
      expect(manager.currentAction).toBeNull();
    });

    it("should bypass redundant instantiation if the requested command is already active", () => {
      const manager = new DioramaManager(mockFrog);

      manager.switchDiorama("SIT_AND_TYPE");
      expect(
        mockFrog.animationManager.mixer.addEventListener,
      ).toHaveBeenCalledTimes(1);

      manager.switchDiorama("SIT_AND_TYPE");
      expect(
        mockFrog.animationManager.mixer.addEventListener,
      ).toHaveBeenCalledTimes(1);
    });

    it("should gracefully clear state and lookups if command key is unregistered or corrupt", () => {
      const manager = new DioramaManager(mockFrog);

      manager.switchDiorama("SIT_AND_TYPE");
      manager.switchDiorama("NON_EXISTENT_ZONE");

      expect(manager.currentDiorama).toBeNull();
      expect(manager.currentAction).toBeNull();
    });
  });

  describe("Teardown and Clear", () => {
    it("should invoke exit lifecycle and reset trackers when clear is called", () => {
      const manager = new DioramaManager(mockFrog);
      manager.switchDiorama("SIT_AND_TYPE");

      manager.clear();

      expect(
        mockFrog.animationManager.mixer.removeEventListener,
      ).toHaveBeenCalledWith("finished", expect.any(Function));
      expect(manager.currentDiorama).toBeNull();
      expect(manager.currentAction).toBeNull();
    });

    it("should execute clear safely even if no diorama is currently active", () => {
      const manager = new DioramaManager(mockFrog);

      expect(() => {
        manager.clear();
      }).not.toThrow();
    });
  });
});
