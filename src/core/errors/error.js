/**
 * Base error class for the application.
 * Extends the native Error to include context and timestamps.
 */
export class AppError extends Error {
  /**
   * @param {string} message - Human-readable description of the error.
   * @param {Object} [context={}] - Additional metadata related to the error.
   */
  constructor(message, context = {}) {
    super(message);
    /** @type {string} The name of the error class. */
    this.name = this.constructor.name;
    /** @type {Object} Metadata context. */
    this.context = context;
    /** @type {string} ISO timestamp of when the error occurred. */
    this.timestamp = new Date().toISOString();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Error thrown when an asset (model, texture, audio) fails to load.
 */
export class AssetError extends AppError {
  /**
   * @param {string} assetName - The identifier of the asset.
   * @param {string} url - The source path of the asset.
   * @param {Error|null} [originalError=null] - The underlying error from the loader.
   */
  constructor(assetName, url, originalError = null) {
    super(`Failed to load asset: "${assetName}"`, { url, originalError });

    /** @type {string} */
    this.assetName = assetName;
    /** @type {string} */
    this.url = url;
  }
}

/**
 * Error related to WebGL, Canvas, or Three.js rendering issues.
 */
export class RenderError extends AppError {
  /**
   * @param {string} message - Specific rendering failure message.
   * @param {Object} [context={}] - Graphics state or element context.
   */
  constructor(message, context = {}) {
    super(`Render engine error: ${message}`, context);
  }
}

/**
 * Error thrown when business logic or component requirements are not met.
 * Use this for missing dependencies or invalid parameters.
 */
export class ValidationError extends AppError {
  /**
   * @param {string} component - The name of the module/class where validation failed.
   * @param {string} issue - Description of what was expected vs what was received.
   */
  constructor(component, issue) {
    super(`Validation error in ${component}: ${issue}`);
    /** @type {string} */
    this.component = component;
  }
}
