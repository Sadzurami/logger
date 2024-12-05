export type LoggerOptions = {
  /**
   * Truncate the message to a certain length.
   *
   */
  truncate?: number;

  /**
   * Redact sensitive info from the message.
   *
   */
  redact?: { pattern: string | RegExp; replacement: string }[];
};
