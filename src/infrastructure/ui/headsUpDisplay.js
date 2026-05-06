// HudUI.js
import volumeIcon from "url:../../../static/volume.png";
import muteIcon from "url:../../../static/mute.png";

/**
 * Handles the persistent UI elements during the experience.
 */
export class HudUI {
  /**
   * @param {Object} soundManager - The sound manager instance.
   */
  constructor(soundManager) {
    this.soundManager = soundManager;
    this.muteIconElement = document.querySelector(".info img");
    this.isMuted = false;

    this.icons = {
      play: volumeIcon,
      mute: muteIcon,
    };

    this._init();
  }

  /**
   * Initializes the HUD interaction.
   */
  _init() {
    if (this.muteIconElement) {
      this.muteIconElement.src = this.icons.play;
      this.muteIconElement.onclick = () => this.toggleMute();
    }
  }

  /**
   * Toggles the global sound state and updates the UI icon.
   */
  toggleMute() {
    this.isMuted = !this.isMuted;

    if (this.muteIconElement instanceof HTMLImageElement) {
      this.muteIconElement.src = this.isMuted
        ? this.icons.mute
        : this.icons.play;
    }

    if (typeof this.soundManager.toggleMute === "function") {
      this.soundManager.toggleMute();
    }
  }

  /**
   * Shows the HUD elements.
   */
  show() {
    const infoContainer = document.querySelector(".info");
    if (infoContainer) {
      infoContainer.classList.remove("hidden");
    }
  }
}
