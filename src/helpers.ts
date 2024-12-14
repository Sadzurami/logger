import ansiRegex from 'ansi-regex';

import { RedactMessageOptions } from './types/redact-message.options.type';
import { TruncateMessageOptions } from './types/truncate-message.options.type';

/**
 * Formats an error to string, including all nested causes.
 */
export function formatError(error: Error): string {
  let message: string = error.message;
  let cause: any = error.cause;

  while (cause) {
    message += ` -> ${cause.message}`;
    cause = cause.cause;
  }

  return message;
}

/**
 * Redacts sensitive information from a message.
 */
export function redactMessage(message: string, options: RedactMessageOptions): string {
  for (const { pattern, replacement } of options) {
    message = message.replace(pattern, replacement);
  }

  return message;
}

/**
 * Truncates a message to a certain length.
 */
export function truncateMessage(message: string, options: TruncateMessageOptions): string {
  if (!options) return message;
  else options = options === true ? {} : options;

  let { ending, length } = options;
  ending = options.ending || '...';

  length = options.length || process.stdout.columns || 100;
  length = Math.max(length - ending.length, 0);

  if (message.length <= length) return message.length === length ? message + ending : message;

  let result = '';
  let visible = 0;

  const regexp = ansiRegex();

  for (const line of message.split(regexp)) {
    if (regexp.test(line)) result += line;
    else {
      const slice = line.slice(0, length - visible);

      result += slice;
      visible += slice.length;

      if (visible >= length) break;
    }
  }

  return result + ending;
}
