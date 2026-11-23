# GitHub Explorer: agent guide

## Architecture and file responsibilities

This is a client-only React 17 / TypeScript application using Create React App
(`react-scripts` 4), React Router v5, Axios, and styled-components. Use the
existing stack and locate changes by responsibility:

- `src/index.tsx`: mounts `App` with `ReactDOM.render` inside `React.StrictMode`.
- `src/App.tsx`: composes `BrowserRouter`, the route switch, and `GlobalStyle`.
- `src/routes/index.tsx`: declares the exact `/` dashboard route and
  `/repositories/:repository+` detail route. The repeating parameter accepts
  the slash-separated `owner/name`; preserve it when changing navigation.
- `src/pages/Dashboard/index.tsx`: owns lookup input, errors, repository state,
  localStorage persistence, and links to repository details.
- `src/pages/Repository/index.tsx`: reads the route parameter, requests repository
  metadata and issues, and renders statistics, issue links, and return navigation.
- Each page's adjacent `styles.ts`: owns that page's styled-components. The
  dashboard's `Form` uses its typed `hasError` prop for input error styling.
- `src/styles/global.ts`: owns shared reset, typography, background, and root
  layout; images live in `src/assets/`.
- `src/services/api.ts`: shared unauthenticated Axios client with
  `baseURL: 'https://api.github.com/'`. Keep API requests on this client.

There is no backend or application token setup in this checkout. Live requests
depend on GitHub's public API and its unauthenticated rate limits; network errors
and rate limiting are external limitations when exercising the app.

## Behavior to preserve

- Dashboard submission prevents the default form action. Empty input displays
  `Digite o autor/nome do repositório.` without making a request; lookup failures
  display `Erro na busca por esse repositório.`. Preserve the Portuguese UI copy
  unless the task requests a copy change.
- Lookup sends `GET repos/${newRepo}`. Success appends the returned repository,
  clears the input and error, and renders its name, description, and owner avatar.
  Current input is not trimmed and duplicate repositories are not filtered.
- The list initializes from JSON in localStorage under
  `@GithubExplorer:repositories` and is serialized back whenever it changes.
  Preserve the key and data shape. Parsing currently has no malformed-data guard.
- Repository cards link to `/repositories/${repo.full_name}`. The detail effect
  depends on `params.repository` and separately requests
  `repos/${params.repository}` and `repos/${params.repository}/issues`.
- Details show stars, forks, and open issue counts. Issue anchors use the returned
  `html_url` with no new-tab target; `Voltar` links back to `/`.
  The page currently has no explicit request-error UI or issue pagination.
  Treat changes to these behaviors as explicit feature work.

## Development commands and conventions

Run commands from the repository root with Node.js and Yarn available. Dependencies
are declared in `package.json` and locked in `yarn.lock`; no Node version is pinned
in this checkout. These are existing scripts, not recorded passing checks:

| Command | Purpose and lifecycle |
| --- | --- |
| `yarn install` | Install dependencies; the `prepare` hook runs `yarn run compile`. |
| `yarn start` | Run the Create React App development server. |
| `yarn build` | Create the production bundle with `react-scripts build`. |
| `yarn compile` | Run `tsc`; `tsconfig.json` has `noEmit: true`, so this is type checking. |
| `yarn lint` | Run `gts lint`. |
| `yarn test` | Run `react-scripts test` (normally interactive/watch mode); `pretest` runs compilation first and `posttest` runs linting after a successful test-script exit. |

The test lifecycle is not a one-shot check by default: leave watch mode to reach
`posttest`. For future automated runs, `yarn test --watchAll=false` forwards the
option to the existing runner; account for the current absence of tests.

- `.eslintrc.json` extends GTS and `.prettierrc.js` inherits GTS formatting.
  Match the existing TypeScript style rather than adding competing configuration.
- `.editorconfig` specifies two-space indentation, LF, UTF-8, trimmed trailing
  whitespace, and a final newline.
- `tsconfig.json` enables strict TypeScript, isolated modules, consistent filename
  casing, and no switch fallthrough; its source scope is `src` and compilation
  emits no files. Keep types compatible with those settings.
- Preserve functional components, typed API/state interfaces, and the page
  `index.tsx` / adjacent `styles.ts` organization. Use React Router v5 APIs such as
  `Switch`, `Link`, and `useRouteMatch` rather than newer-version examples.

## Proportional verification

No test files were found in this checkout. The declared React Testing Library,
user-event, jest-dom, and Jest types provide a starting point for focused tests
when future changes affect behavior; mock API responses instead of relying on
live GitHub data. Use compilation and linting for TypeScript changes and a build
for bundling or production integration changes. Do not describe the existing test
script as an established passing suite.

Recommended manual checks for behavior changes (not automated checks):

1. Submit a valid public `owner/name`; verify the card and cleared input/error.
2. Submit empty input and a nonexistent repository; verify validation/error UI.
3. Reload and confirm the repository list persists.
4. Open a card and verify the `owner/name` detail route, metadata, and issue list.
5. Follow an issue link to GitHub and use `Voltar` to return to the dashboard.

For documentation-only edits, cross-check claims against source and configuration,
read the full guide, and run `git diff --check`; installation, application checks,
and browser sessions are unnecessary. Report only checks actually executed.
