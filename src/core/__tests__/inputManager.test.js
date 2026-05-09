import { describe, it, expect, beforeEach } from "vitest";
import { InputManager } from "../inputManager.js";

describe("InputManager: Wheel Interaction", () => {
  let input;

  beforeEach(() => {
    input = new InputManager();
    return () => input.dispose();
  });

  it("should accumulate deltaY from wheel events with multiplier", () => {
    const wheelEvent = new WheelEvent("wheel", { deltaY: 100 });
    window.dispatchEvent(wheelEvent);

    expect(input.deltaY).toBe(100);

    const secondEvent = new WheelEvent("wheel", { deltaY: -50 });
    window.dispatchEvent(secondEvent);

    expect(input.deltaY).toBe(50);
  });
});

describe("InputManager: Pointer Interaction", () => {
  it("should calculate deltaY based on movement difference", () => {
    const input = new InputManager();

    window.dispatchEvent(new PointerEvent("pointerdown", { clientY: 500 }));

    window.dispatchEvent(new PointerEvent("pointermove", { clientY: 400 }));

    expect(input.deltaY).toBe(200);

    input.dispose();
  });

  it("should NOT accumulate deltaY if pointer is not down", () => {
    const input = new InputManager();

    window.dispatchEvent(new PointerEvent("pointermove", { clientY: 100 }));

    expect(input.deltaY).toBe(0);
    input.dispose();
  });
});

describe("InputManager: Data Consumption", () => {
  it("should return current delta and reset it to zero", () => {
    const input = new InputManager();
    input.deltaY = 500;

    const consumedDelta = input.popDeltaY();

    expect(consumedDelta).toBe(500);
    expect(input.deltaY).toBe(0);
    input.dispose();
  });
});

describe("InputManager: Lifecycle", () => {
  it("should stop listening after dispose is called", () => {
    const input = new InputManager();
    input.dispose();

    const wheelEvent = new WheelEvent("wheel", { deltaY: 100 });
    window.dispatchEvent(wheelEvent);

    expect(input.deltaY).toBe(0);
  });
});
