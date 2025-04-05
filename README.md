# Async Race App

## [Task](https://github.com/rolling-scopes-school/tasks/tree/master/stage2/tasks/async-race)
## [Functional Requirements](https://github.com/rolling-scopes-school/tasks/blob/master/stage2/tasks/async-race/functional-requirements.md)
## [Non Functional Requirements](https://github.com/rolling-scopes-school/tasks/blob/master/stage2/tasks/async-race/non-functional-requirements.md)
## [API Documentation](https://github.com/mikhama/async-race-api)

## Technology Stack:
- SPA
- REST API
- TypeScript
- ESLint
- Prettier
- Husky
- WebPack

## How to run project locally:
1. run `git clone https://github.com/nadyavalin/async-race.git`
2. go to async-race folder
3. run `npm i` for installing necessary node modules
4. run `npm run prepare` for placing Husky into repository
5. run `npm run start` for building project in develop mode or `npm run build` for building project in production mode
6. go to dist folder and run index.html using Live Server

## Available scripts:
- `npm run start` builds project with Webpack in develop mode
- `npm run build` builds project with Webpack in production mode
- `npm run format` formats all files with Prettier
- `npm run ci:format` checks if files are formatted
- `npm run lint` checks ESLint errors
- `npm run lint:fix` fixes ESLint errors that can be fixed automatically
- `npm run prepare` run once for the Husky scripts to be placed in the repository