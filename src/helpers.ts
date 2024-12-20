import ansiRegex from 'ansi-regex';

import { RedactMessageOptions } from './types/redact-message.options.type';
import { TruncateMessageOptions } from './types/truncate-message.options.type';

/**
 * Formats an error to string, including all nested causes.
 *
 * @param error - Error to format.
 * @returns Formatted error message.
 */
export function formatError(error: Error): string {
  let message: string = error.message;
  let cause: any = error.cause;

  while (cause instanceof Error && cause.message) {
    message += ` -> ${cause.message}`;
    cause = cause.cause;
  }

  return message;
}

/**
 * Redacts sensitive information from a message.
 *
 * @param message - Message to redact.
 * @param options - Redact options.
 */
export function redactMessage(message: string, options: RedactMessageOptions): string {
  for (const { pattern, replacement } of options) {
    message = message.replace(pattern, replacement);
  }

  return message;
}

/**
 * Truncates a message to a certain visible length.
 *
 * Considers ANSI escape codes and truncates the message properly.
 *
 * @param message - Message to truncate.
 * @param options - Truncate options.
 */
export function truncateMessage(message: string, options: TruncateMessageOptions): string {
  if (!options) return message;
  else options = options === true ? {} : options;

  let { ending, length } = options;
  ending = options.ending || '...';

  length = options.length || process.stdout.columns || 100;
  length = Math.max(length - ending.length, 0);

  if (length === 0) return '';
  if (message.length < length) return message;

  const plain = message.replace(ansiRegex(), '');
  if (plain.length < length) return message;

  const diffs = message.length - plain.length;
  const result = message.slice(0, length + diffs);

  return result.replace(ansiRegex(), '').length <= length ? result + ending : result;
}

/**
 * Normalizes messages entries to strings.
 *
 * Converts objects to JSON, errors to formatted strings.
 *
 * @param messages - Messages to normalize.
 * @returns Normalized messages.
 */
export function normalizeMessages(messages: any[]): string[] {
  const entries: string[] = [];

  for (const message of messages) {
    if (message instanceof Error) {
      entries.push(formatError(message));
      continue;
    }

    if (typeof message === 'object') {
      entries.push(JSON.stringify(message));
      continue;
    }

    entries.push(message);
  }

  return entries;
}
