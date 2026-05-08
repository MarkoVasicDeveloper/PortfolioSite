import { ErrorUI } from "../../infrastructure/ui/errorUI";
import { Logger } from "../logger";
import { AssetError, RenderError, ValidationError } from "./error";

/**
 * Centralized error management system.
 * Implements strategy pattern to handle different error types.
 */
export class ErrorReport {
  /**
   * Predefined strategies for different error types.
   * @private
   */
  static _strategies = new Map([
    [RenderError, (err) => ErrorReport._handleFatal(err)],
    [AssetError, (err) => ErrorReport._handleMinor(err)],
    [ValidationError, (err) => ErrorReport._handleValidation(err)],
  ]);

  /**
   * Initialize global listeners for unhandled rejections and errors.
   */
  static init() {
    window.addEventListener("unhandledrejection", (event) => {
      this.handle(event.reason);
    });

    window.onerror = (message, _source, _lineno, _colno, error) => {
      this.handle(error || new Error(message));
    };
  }

  /**
   * Main entry point for error handling.
   * @param {Error|AppError} error - The error to be processed.
   */
  static handle(error) {
    const context = error.context || "No additional context";
    Logger.error(error.name || "UnknownError", error.message, context);

    for (const [ErrorType, strategy] of this._strategies) {
      if (error instanceof ErrorType) {
        strategy(error);
        return;
      }
    }

    this._handleUnknown(error);
  }

  /** @private */
  static _handleFatal(error) {
    ErrorUI.show(error.message);

    throw error;
  }

  /** @private */
  static _handleMinor(error) {
    Logger.warn(
      "Recovery",
      `Skipping asset: ${error.assetName}. App will continue.`,
    );
  }

  /** @private */
  static _handleValidation(error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(error.context);
    }
  }

  /** @private */
  static _handleUnknown(error) {
    Logger.error("UncaughtException", error.message, error);
  }
}
