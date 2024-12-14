import colors from 'picocolors';

import { formatError, redactMessage, truncateMessage } from './helpers';
import { LoggerOptions } from './types/logger.options.type';

export class Logger {
  public readonly name: string;
  public readonly colors = colors;
  public readonly options: LoggerOptions;

  constructor(name: string, options: LoggerOptions = {}) {
    this.name = name;
    this.options = options;
  }

  /**
   * Returns a new instance of `Logger` with the same options.
   *
   * @param name - Logger namespace to override.
   * @param options - Logger options to override.
   */
  public extend(name: string, options?: LoggerOptions): Logger {
    options = { ...this.options, ...options };

    return new Logger(name, options);
  }

  /**
   * Logs message with `info` level.
   *
   * @param messages - Messages to log.
   */
  public info(...messages: any[]) {
    const prefix = `${this.createTime()} - ${colors.whiteBright('info')} [${this.name}]`;

    const message = this.normalizeMessages(messages).join(' ');

    console.log(this.formatMessage(`${prefix} ${message}`));
  }

  /**
   * Logs message with `warn` level.
   *
   * @param messages - Messages to log.
   */
  public warn(...messages: any[]) {
    const prefix = `${this.createTime()} - ${colors.cyanBright('warn')} [${this.name}]`;

    const message = this.normalizeMessages(messages).join(' ');

    console.log(this.formatMessage(`${prefix} ${message}`));
  }

  /**
   * Logs message with `error` level.
   *
   * @param messages - Messages to log.
   */
  public error(...messages: any[]) {
    const prefix = `${this.createTime()} - ${colors.magentaBright('error')} [${this.name}]`;

    const message = this.normalizeMessages(messages).join(' ');

    console.log(this.formatMessage(`${prefix} ${message}`));
  }

  private createTime() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  private formatMessage(message: string): string {
    if (this.options.redact) message = redactMessage(message, this.options.redact);
    if (this.options.truncate) message = truncateMessage(message, this.options.truncate);
    if (this.options.lowercase) message = message.toLowerCase();

    return message;
  }

  private normalizeMessages(messages: any[]): string[] {
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
}
