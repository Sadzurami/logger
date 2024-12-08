# logger

> Simple logger for my projects

## Install

```sh
npm install @sadzurami/logger
```

## Usage

```ts
import { Logger } from '@sadzurami/logger';

const logger = new Logger('main');

logger.info('Logger is working');
```

## API

### constructor(name: string, options?: LoggerOptions)

Returns a new instance of `Logger`.

- `name` (string) - Logger namespace.
- `options.redact` (object, optional) - Redact message options.
- `options.truncate` (object, optional) - Truncate message options.
- `options.lowercase` (boolean, optional) - Convert message to lowercase.

### instance

#### `.extend(name: string, options?: LoggerOptions): Logger`

Returns a new instance of `Logger` with the same options.

- `name` (string) - Logger namespace to override.
- `options` (object) - Logger options to override.

#### `.info(...messages: any[]): void`

Logs message with `info` level.

- `messages` (...array) - Messages to log.

#### `.warn(...messages: any[]): void`

Logs message with `warn` level.

- `messages` (...array) - Messages to log.

#### `.error(...messages: any[]): void`

Logs message with `error` level.

- `messages` (...array) - Messages to log.

#### instanse.properties

- `name` (string) - Logger namespace.
- `colors` (object) - Logger colors.
- `options` (object) - Logger options.

### Additional functions

#### `formatError(error: Error): string`

Returns formatted error message as string, including cause if exists.

- `error` (Error) - Error to format.

#### `redactMessage(message: string, options: RedactMessageOptions): string`

Returns redacted message by provided patterns.

- `message` (string) - Message to redact.
- `options` (object) - Redact options.

#### `truncateMessage(message: string, options: TruncateMessageOptions): string`

Returns truncated message to specified length.

- `message` (string) - Message to truncate.
- `options` (object) - Truncate options.

## Advanced example

```ts
import { Logger } from '@sadzurami/logger';

const logger = new Logger('main', {
  redact: [
    {
      pattern: /password=(\w+)/g,
      replacement: 'password=***',
    },
    {
      pattern: /Authorization: Bearer (\w+)/g,
      replacement: 'Authorization ***',
    },
  ],
  truncate: { length: 100 },
});

logger.info('Logger is working');

logger.warn('Req: GET /api/v1/users?password=1234567890', new Error('Request error'));

logger.info('Req: GET /api/v2/users?password=1234567890');

logger.info('Res: 200 OK', {
  auth: 'Authorization: Bearer 123',
  users: [
    {
      id: 1,
      name: 'John Doe',
    },
  ],
});
```
