/**
 * Custom error class for asset-related failures.
 * Used to provide contextual information about failed resource loading.
 * @extends Error
 */
export class AssetError extends Error {
  /**
   * @param {string} assetName - The name of the failed asset.
   * @param {string} url - The path where the asset was located.
   * @param {Error|null} [originalError=null] - The underlying technical error (if any).
   */
  constructor(assetName, url, originalError = null) {
    super(`Failed to load asset: "${assetName}" at ${url}`);

    /** @type {string} The name of this error type. */
    this.name = "AssetError";

    /** @type {string} The friendly name of the asset. */
    this.assetName = assetName;

    /** @type {string} The URL of the resource. */
    this.url = url;

    /** @type {Error|null} Technical details or original stack trace. */
    this.details = originalError;
  }
}
