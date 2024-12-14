import ansiRegex from 'ansi-regex';

import { RedactMessageOptions } from './types/redact-message.options.type';
import { TruncateMessageOptions } from './types/truncate-message.options.type';

/**
 * Formats an error to string, including the cause if exists.
 */
export function formatError(error: Error): string {
  return `${error.message}${error.cause ? ` (${(error.cause as any).message})` : ''}`;
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

  const length = options.length || process.stdout.columns || 100;
  const ending = options.ending || '...';

  if (message.length <= length) return message.length === length ? message : message + ending;

  let result = '';
  let visible = 0;

  const regex = ansiRegex();

  for (const line of message.split(regex)) {
    if (regex.test(line)) result += line;
    else {
      const slice = line.slice(0, length - visible);

      result += slice;
      visible += slice.length;

      if (visible >= length) break;
    }
  }

  return result + ending;
}
