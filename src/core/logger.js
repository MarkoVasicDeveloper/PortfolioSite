/**
 * Centralized logging utility to handle application-wide notifications and errors.
 */
export const Logger = {
  /**
   * Logs a standard error to the console with a timestamp and context.
   * @param {string} context - The module or class where the error occurred (e.g., "AssetManager").
   * @param {string} message - A human-readable description of the error.
   * @param {any} [details=""] - Technical details, objects, or stack traces for debugging.
   */
  error: (context, message, details = "") => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] [${context}] ${message}`, details);
  },

  /**
   * Logs a warning message to the console.
   * @param {string} context - The module or class where the warning occurred.
   * @param {string} message - A description of the potential issue.
   */
  warn: (context, message) => {
    console.warn(`[${context}] ${message}`);
  },
};
