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
- `options.redact` (array) - Objects with `pattern` (string | RegExp) and `replacement` (string) keys.
- `options.truncate` (boolean | object) - Truncate message to specified length.
- `options.lowercase` (boolean) - Convert message to lowercase.

### instance

#### `.info(...messages: any[]): void`

Logs message with `info` level.

- `messages` (...array) - Messages to log.

#### `.warn(...messages: any[]): void`

Logs message with `warn` level.

- `messages` (...array) - Messages to log.

#### `.error(...messages: any[]): void`

Logs message with `error` level.

- `messages` (...array) - Messages to log.

#### `.extend(name: string, options?: LoggerOptions): Logger`

Returns a new instance of `Logger` with the same options.

- `name` (string) - Logger namespace to override.
- `options` (LoggerOptions) - Logger options to override.

#### instanse.properties

- `name` (string) - Logger namespace.
- `colors` (object) - Object with colors.
- `options` (LoggerOptions) - Logger options.

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
