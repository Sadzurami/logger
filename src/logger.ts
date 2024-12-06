import colors from 'picocolors';

import { LoggerOptions } from './types/logger.options.type';

export class Logger {
  public readonly name: string;
  public readonly options: LoggerOptions;

  constructor(name: string, options: LoggerOptions = {}) {
    this.name = name;
    this.options = options;
  }

  public extend(name: string, options?: LoggerOptions): Logger {
    options = { ...this.options, ...options };

    return new Logger(name, options);
  }

  public info(...messages: string[]) {
    const prefix = `${new Date().toLocaleTimeString()} - ${colors.inverse('info')} [${this.name}]`;
    const message = messages.join(' ');

    console.log(this.formatMessage(`${prefix} ${message}`));
  }

  public warn(...messages: string[]) {
    const prefix = `${new Date().toLocaleTimeString()} - ${colors.bgCyanBright('warn')} [${this.name}]`;
    const message = messages.join(' ');

    console.log(this.formatMessage(`${prefix} ${message}`));
  }

  public error(...messages: string[]) {
    const prefix = `${new Date().toLocaleTimeString()} - ${colors.bgMagentaBright('error')} [${this.name}]`;
    const message = messages.join(' ');

    console.log(this.formatMessage(`${prefix} ${message}`));
  }

  private formatMessage(message: string): string {
    if (this.options.redact) message = this.redactMessage(message);
    if (this.options.truncate) message = this.truncateMessage(message);

    return message;
  }

  private redactMessage(message: string): string {
    for (const { pattern, replacement } of this.options.redact) message = message.replace(pattern, replacement);

    return message;
  }

  private truncateMessage(message: string): string {
    if (message.length < this.options.truncate.length) return message;

    const postfix = '...';
    const length = this.options.truncate.length - postfix.length;

    return message.slice(0, length) + postfix;
  }
}
