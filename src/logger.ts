import chalk from 'chalk';

import { LoggerOptions } from './types/logger.options.type';

export class Logger {
  public readonly name: string;
  public readonly options: LoggerOptions;

  constructor(name: string, options?: LoggerOptions) {
    this.name = name;
    this.options = options || {};
  }

  public info(...messages: string[]) {
    const prefix = `${new Date().toLocaleTimeString()} - ${chalk.inverse('info')} [${this.name}]`;
    const message = messages.join(' ');

    console.log(this.formatMessage(`${prefix} ${message}`));
  }

  public warn(...messages: string[]) {
    const prefix = `${new Date().toLocaleTimeString()} - ${chalk.bgCyanBright('warn')} [${this.name}]`;
    const message = messages.join(' ');

    console.log(this.formatMessage(`${prefix} ${message}`));
  }

  public error(...messages: string[]) {
    const prefix = `${new Date().toLocaleTimeString()} - ${chalk.bgMagentaBright('error')} [${this.name}]`;
    const message = messages.join(' ');

    console.log(this.formatMessage(`${prefix} ${message}`));
  }

  private formatMessage(message: string): string {
    if (this.options.maxStringLength) message = this.truncateMessage(message);

    return message;
  }

  private truncateMessage(message: string): string {
    if (message.length < this.options.maxStringLength) return message;

    return message.slice(0, this.options.maxStringLength) + '...';
  }
}
