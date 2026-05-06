import { Logger } from "../../core/logger";

/**
 * Handles mobile-specific orientation and fullscreen logic.
 */
export class OrientationManager {
  /**
   * Attempts to enter fullscreen and lock orientation to landscape
   * if the device is a mobile phone.
   */
  static async handleMobileOrientation() {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (!isMobile) return;

    try {
      const docElm = document.documentElement;

      if (docElm.requestFullscreen) {
        await docElm.requestFullscreen();
      } else if (docElm.webkitRequestFullscreen) {
        await docElm.webkitRequestFullscreen();
      }

      if (screen.orientation && screen.orientation.lock) {
        await screen.orientation.lock("landscape").catch((err) => {
          Logger.warn("Orientation Manager", err);
        });
      }
    } catch (err) {
      Logger.warn("Orientation Manager", err);
    }
  }
}
