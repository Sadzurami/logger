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

  const postfix = '...';
  const length = (options === true ? process.stdout.columns : options.length) - postfix.length;

  return message.slice(0, length) + postfix;
}
