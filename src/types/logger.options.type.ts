export type LoggerOptions = {
  /**
   * Convert the message to lowercase.
   *
   */
  lowercase?: boolean;

  /**
   * Truncate the message to a certain length.
   *
   */
  truncate?: { length: number };

  /**
   * Redact sensitive info from the message.
   *
   */
  redact?: { pattern: string | RegExp; replacement: string }[];
};
