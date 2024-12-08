# logger

> Simple logger for my projects

## Install

```sh
npm install https://github.com/Sadzurami/logger
```

## Usage

`main.ts`

```ts
import { Logger } from '@sadzurami/logger';

const logger = new Logger('main');

logger.info('Logger is working');
```

## API

### constructor(namespace: string, options?: LoggerOptions)

Returns a new instance of `Logger`.

- `namespace` (string) - Namespace of logger.
- `options.redact` (array) - Objects with `pattern` (string | RegExp) and `replacement` (string) keys.
- `options.truncate.length` (number) - Truncate message to specified length.
- `options.lowercase` (boolean) - Convert message to lowercase.

### instance

#### `info(message: string, ...args: any[]): void`

Log message with level `info`.

- `messages` (...array) - messages to log

#### `warn(message: string, ...args: any[]): void`

Log message with level `warn`.

- `messages` (...array) - messages to log

#### `error(message: string, ...args: any[]): void`

Log message with level `error`.

- `messages` (...array) - messages to log

#### instanse.properties

- `name` (string) - Namespace of logger.
- `colors` (object) - Object with colors.
- `options` (LoggerOptions) - Options of logger.

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
