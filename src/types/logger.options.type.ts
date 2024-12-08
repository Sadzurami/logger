export type LoggerOptions = {
  /**
   * Redact sensitive info from message.
   */
  redact?: { pattern: string | RegExp; replacement: string }[];

  /**
   * Truncate message to certain length.
   */
  truncate?: boolean | { length: number };

  /**
   * Convert message to lowercase.
   */
  lowercase?: boolean;
};
