/**
 * Dedicated UI component for displaying fatal application errors.
 */
export class ErrorUI {
  /**
   * Renders a full-screen error overlay with a restart option.
   * @param {string} message - The error message to display.
   */
  static show(message) {
    if (document.getElementById("error-overlay")) {
      return;
    }

    const overlay = document.createElement("div");
    overlay.id = "error-overlay";

    this._applyOverlayStyles(overlay);
    overlay.innerHTML = this._getHTMLContent(message);

    document.body.appendChild(overlay);
    this._setupRestartButton(overlay);
  }

  /** @private */
  static _applyOverlayStyles(el) {
    Object.assign(el.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      backgroundColor: "#0f0f0f",
      color: "#ff4b2b",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "10000",
      fontFamily: "monospace",
      textAlign: "center",
      padding: "20px",
    });
  }

  /** @private */
  static _getHTMLContent(message) {
    return `
      <div style="border: 2px solid #ff4b2b; padding: 40px; border-radius: 8px; max-width: 80%;">
        <h1 style="margin: 0 0 20px 0; font-size: 2.5rem;">FATAL_ERROR</h1>
        <p style="color: #ccc; margin-bottom: 30px;">${message}</p>
        <button id="restart-btn" style="background: #ff4b2b; color: white; border: none; 
          padding: 15px 30px; cursor: pointer; font-weight: bold; text-transform: uppercase;">
          Restart Experience
        </button>
      </div>`;
  }

  /** @private */
  static _setupRestartButton(parent) {
    const btn = parent.querySelector("#restart-btn");
    btn.addEventListener("click", () => window.location.reload());

    btn.onmouseover = () => {
      btn.style.filter = "brightness(1.2)";
      btn.style.transform = "scale(1.05)";
    };
    btn.onmouseout = () => {
      btn.style.filter = "brightness(1)";
      btn.style.transform = "scale(1)";
    };
    btn.style.transition = "all 0.2s ease";
  }
}
