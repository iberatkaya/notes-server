# Notes Server

Notes Server is a REST API built with Express.js and MongoDB using TypeScript.

## Table of contents

- [Installation](#installation)
- [Features](#features)
- [Dependencies](#dependencies)
- [Running Tests](#running-tests)
- [Contributing](#contributing)

## Installation

```
git clone https://github.com/iberatkaya/notes-server.git
npm install
npm run dev
```

## Features

- Create an account.
- Create, edit, and fetch notes.
- Checkout API documentation at `localhost:3000/docs`.

## Dependencies

- [express](https://github.com/expressjs/express) - The Node.js server for handling REST API requests.
- [mongoose](https://github.com/Automattic/mongoose) - The MongoDB object modelling package.
- [passport](https://github.com/jaredhanson/passport) - Used for user authentication.
- [tsoa](https://github.com/lukeautry/tsoa) - Used for documentation generation.
- [express-validator](https://github.com/express-validator/express-validator) - Used for verification.
- [ts-jest](https://github.com/kulshekhar/ts-jest) & [jest](https://github.com/facebook/jest) - Used for testing with TypeScript.
- [supertest](https://github.com/visionmedia/supertest) - Used for API request testing.
- [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) & [eslint](https://github.com/eslint/eslint) - Used for linting.

## Running Tests

```
npm test
```

## Contributing

Contributions, issues and feature requests are welcome! Feel free to check [issues page](https://github.com/iberatkaya/notes-server/issues).
