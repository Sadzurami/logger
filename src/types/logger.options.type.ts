import { RedactMessageOptions } from './redact-message.options.type';
import { TruncateMessageOptions } from './truncate-message.options.type';

export type LoggerOptions = {
  /**
   * Redact sensitive info from message.
   */
  redact?: RedactMessageOptions;

  /**
   * Truncate message to certain length.
   *
   * @default true
   */
  truncate?: TruncateMessageOptions;

  /**
   * Convert message to lowercase.
   */
  lowercase?: boolean;
};
