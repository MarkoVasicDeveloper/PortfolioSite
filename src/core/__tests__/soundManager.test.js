import { describe, it, expect, vi, beforeEach } from "vitest";
import { SoundManager } from "../soundManager.js";
import { ValidationError } from "../errors/error.js";
import { Logger } from "../logger.js";

vi.mock("../logger.js", () => ({
  Logger: { warn: vi.fn(), error: vi.fn() },
}));

const createMockAudio = () => ({
  play: vi.fn().mockResolvedValue(undefined),
  pause: vi.fn(),
  cloneNode: vi.fn().mockImplementation(function () {
    return { ...this };
  }),
  volume: 1,
  loop: false,
  paused: true,
});

describe("SoundManager: Assets", () => {
  it("should throw ValidationError if invalid assets are provided", () => {
    const sm = new SoundManager();
    expect(() => sm.setAudioAssets(null)).toThrow(ValidationError);
    expect(() => sm.setAudioAssets("not an object")).toThrow(ValidationError);
  });

  it("should cache provided audio assets", () => {
    const sm = new SoundManager();
    const assets = { click: createMockAudio() };
    sm.setAudioAssets(assets);
    expect(sm.audioCache.click).toBeDefined();
  });
});

describe("SoundManager: Playback Logic", () => {
  let sm, mockAudio;

  beforeEach(() => {
    sm = new SoundManager();
    mockAudio = createMockAudio();
    sm.setAudioAssets({ click: mockAudio, music: createMockAudio() });
  });

  it("should clone node when playing SFX", () => {
    sm.play("click");
    expect(mockAudio.cloneNode).toHaveBeenCalled();
  });

  it("should warn and skip if trying to play BGM via play()", () => {
    sm.startBackgroundMusic("music");
    sm.play("music");
    expect(Logger.warn).toHaveBeenCalledWith(
      "SoundManager",
      expect.stringContaining("Tryed to 'play()' background music"),
    );
  });

  it("should clamp volume between 0 and 1", () => {
    sm.setMasterVolume(1.5);
    expect(sm.masterVolume).toBe(1);
    sm.setMasterVolume(-0.5);
    expect(sm.masterVolume).toBe(0);
  });
});

describe("SoundManager: State Management", () => {
  it("should toggle mute and restore previous volume", () => {
    const sm = new SoundManager();
    sm.setMasterVolume(0.8);

    sm.toggleMute();
    expect(sm.masterVolume).toBe(0);
    expect(sm.isMuted).toBe(true);

    sm.toggleMute();
    expect(sm.masterVolume).toBe(0.8);
    expect(sm.isMuted).toBe(false);
  });

  it("should start BGM only after unlock is called", () => {
    const sm = new SoundManager();
    const bgm = createMockAudio();
    sm.setAudioAssets({ bgm });

    sm.startBackgroundMusic("bgm");
    expect(bgm.play).not.toHaveBeenCalled();

    sm.unlock();
    expect(bgm.play).toHaveBeenCalled();
    expect(sm.isUnlocked).toBe(true);
  });
});
