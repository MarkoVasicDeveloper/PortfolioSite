import { ValidationError } from "./errors/error";
import { Logger } from "./logger";

/**
 * Global Sound Manager.
 * Pure JavaScript implementation, independent of 3D engines.
 */
export class SoundManager {
  constructor() {
    /** @type {Object.<string, HTMLAudioElement>} */
    this.audioCache = {};
    this.isUnlocked = false;
    this.isMuted = false;
    this.preMuteVolume = 1.0;
    this.backgroundMusicKey = null;
    this.masterVolume = 1.0;
  }

  /**
   * Injects pre-loaded audio elements.
   * @param {Object} audioAssets - Audio dictionary from AssetManager.
   */
  setAudioAssets(audioAssets) {
    if (!audioAssets || typeof audioAssets !== 'object') {
      throw new ValidationError("SoundManager", "Invalid audio assets provided.");
    }
    this.audioCache = audioAssets;
  }

  /**
   * Plays a sound effect (SFX).
   * @param {string} key - Asset name.
   * @param {number} volume - Local volume multiplier (0.0 - 1.0).
   */
  play(key, volume = 1.0) {
    const audio = this.audioCache[key];
    if (!audio) {
      Logger.warn("SoundManager", `Sound "${key}" not found.`);
      return;
    }

    if (key === this.backgroundMusicKey) {
      Logger.warn(
        "SoundManager",
        `Tryed to 'play()' background music "${key}". Use 'startBackgroundMusic()' instead.`,
      );
      return;
    }

    const sfx = audio.cloneNode();
    sfx.volume = this._clamp(volume * this.masterVolume, 0, 1);
    sfx.play().catch((e) => {
      if (e.name === "NotAllowedError") {
        return;
      }
      Logger.error("SoundManager", `Playback failed: ${e.message}`);
    });
  }

  /**
   * Starts background music (BGM).
   */
  startBackgroundMusic(key, volume = 0.2) {
    this.backgroundMusicKey = key;
    const backgroundMusic = this.audioCache[key];

    if (backgroundMusic) {
      backgroundMusic.loop = true;
      backgroundMusic.volume = this._clamp(volume * this.masterVolume, 0, 1);

      if (this.isUnlocked) {
        backgroundMusic.play().catch(() => {
          Logger.warn(
            "SoundManager",
            "BGM failed to play even after unlock. Retrying on next interaction.",
          );
          this.isUnlocked = false;
        });
      }
    }
  }

  /**
   * Toggles global mute state.
   */
  toggleMute() {
    this.isMuted = !this.isMuted;

    if (this.isMuted) {
      this.preMuteVolume = this.masterVolume;
      this.setMasterVolume(0);
    } else {
      this.setMasterVolume(this.preMuteVolume);
    }

    return this.isMuted;
  }

  /**
   * Unlocks audio playback for browsers.
   */
  unlock() {
    if (this.isUnlocked) {
      return;
    }
    this.isUnlocked = true;

    if (this.backgroundMusicKey) {
      const backgroundMusic = this.audioCache[this.backgroundMusicKey];
      if (backgroundMusic && backgroundMusic.paused) {
        backgroundMusic
          .play()
          .catch((e) =>
            Logger.warn("SoundManager", `BGM Autoplay failed", ${e}`),
          );
      }
    }
  }

  /**
   * Internal helper to replace THREE.MathUtils.clamp.
   * @private
   */
  _clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  /**
   * Adjusts master volume for all future playbacks.
   */
  setMasterVolume(value) {
    this.masterVolume = this._clamp(value, 0, 1);

    Object.values(this.audioCache).forEach((audio) => {
      const isBGM = audio === this.audioCache[this.backgroundMusicKey];
      audio.volume = isBGM ? this.masterVolume * 0.5 : this.masterVolume;
    });
  }
}
