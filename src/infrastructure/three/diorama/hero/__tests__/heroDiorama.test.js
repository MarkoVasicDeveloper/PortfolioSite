/* eslint-disable max-lines-per-function */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { HeroDiorama } from "../heroDiorama";
import { ErrorReport } from "../../../../../core/errors/errorReport";

vi.mock("../interruptPool", () => ({
  INTERRUPT_POOL: [
    [{ name: "karate_punch" }, { name: "karate_kick" }],
    [{ name: "salute" }],
  ],
}));

vi.mock("../../../../core/errors/errorReport", () => ({
  ErrorReport: {
    handle: () => {},
  },
}));

function createMockFrog() {
  const actionsMap = new Map([
    ["karate_punch", { name: "karate_punch_action" }],
    ["karate_kick", { name: "karate_kick_action" }],
    ["salute", { name: "salute_action" }],
  ]);

  return {
    animationManager: {
      mixer: {
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      },
      play: vi.fn(),
      stop: vi.fn(),
      actions: actionsMap,
    },
  };
}

describe("HeroDiorama: Finite State Machine & Animation Orchestrator", function () {
  let mockFrog, config, diorama;

  beforeEach(() => {
    vi.clearAllMocks();
    mockFrog = createMockFrog();
    config = { position: [0, 0, 0], rotation: [0, 0, 0] };
    diorama = new HeroDiorama(mockFrog, config);
  });

  it("should subscribe to animation mixer events on enter and unsubscribe on exit", () => {
    diorama.enter();
    expect(
      mockFrog.animationManager.mixer.addEventListener,
    ).toHaveBeenCalledWith("finished", diorama.onFinishedBound);

    diorama.exit();
    expect(
      mockFrog.animationManager.mixer.removeEventListener,
    ).toHaveBeenCalledWith("finished", diorama.onFinishedBound);
  });

  it("should progress through steps within the same active sequence when animated finishes", () => {
    diorama.enter();
    expect(mockFrog.animationManager.play).toHaveBeenLastCalledWith(
      { name: "karate_punch" },
      0.3,
    );

    const expectedAction =
      mockFrog.animationManager.actions.get("karate_punch");
    diorama._onFinished({ action: expectedAction });

    expect(diorama.sequenceIndex).toBe(1);
    expect(mockFrog.animationManager.play).toHaveBeenLastCalledWith(
      { name: "karate_kick" },
      0.3,
    );
  });

  it("should loop to the next pool sequence template when current sequence is fully completed", () => {
    diorama.enter();

    diorama._onFinished({
      action: mockFrog.animationManager.actions.get("karate_punch"),
    });
    diorama._onFinished({
      action: mockFrog.animationManager.actions.get("karate_kick"),
    });

    expect(diorama.poolIndex).toBe(0);
    expect(diorama.sequenceIndex).toBe(0);
    expect(mockFrog.animationManager.play).toHaveBeenLastCalledWith(
      { name: "salute" },
      0.3,
    );
  });

  it("should gracefully report validation error and not crash if animation template is corrupted", () => {
    const errorSpy = vi
      .spyOn(ErrorReport, "handle")
      .mockImplementation(() => {});

    diorama.poolIndex = 999;
    diorama.enter();

    expect(errorSpy).toHaveBeenCalled();
    expect(diorama.activeSequence).toEqual([]);

    errorSpy.mockRestore();
  });
});
