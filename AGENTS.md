# Agent guide

## Project overview

GitHub Explorer is a React 17 and TypeScript application built with Create React
App (`react-scripts` 4). It uses React Router 5 for navigation, Axios for GitHub
requests, and styled-components for presentation. Dependencies and scripts are
defined in `package.json`; `yarn.lock` is a Yarn v1 lockfile.

## Code map

- `src/index.tsx` mounts the app; `src/App.tsx` wires the browser router and global
  styles.
- `src/pages/Dashboard/index.tsx` looks up repositories by `owner/name`, displays
  search errors and saved repositories, and persists the list in local storage
  under `@GithubExplorer:repositories`.
- `src/pages/Repository/index.tsx` fetches repository details and issues, renders
  stars/forks/open-issue counts, and links to issues on GitHub.
- `src/routes/index.tsx` defines `/` and `/repositories/:repository+`; the latter
  captures repository identifiers containing a slash.
- `src/services/api.ts` exports the shared Axios client with the base URL
  `https://api.github.com/`.
- `src/pages/Dashboard/styles.ts` and `src/pages/Repository/styles.ts` hold
  page-specific styled-components; `src/styles/global.ts` holds global styling.
- `src/assets/` contains the logo and background SVGs.

## Development commands

Run from the repository root using the existing Yarn workflow:

| Command | Existing behavior |
| --- | --- |
| `yarn install` | Installs dependencies; the `prepare` hook runs `yarn run compile`. |
| `yarn start` | Starts the Create React App development server. |
| `yarn build` | Creates a production build with `react-scripts build`. |
| `yarn compile` | Runs `tsc`; `noEmit` makes this a type check, not a build. |
| `yarn lint` | Runs `gts lint`. |
| `yarn test --watchAll=false` | Runs the CRA test runner without watch mode; `pretest` runs compilation and `posttest` runs lint after a successful test run. |

The checkout contains no test files. An available Jest/Testing Library toolchain
does not imply test coverage, and the runner may exit unsuccessfully when no tests
are found. The repository does not declare a supported Node version.

## Conventions and recommended practices

- `tsconfig.json` enables strict checking, consistent filename casing, isolated
  modules, and no switch fallthrough; it targets ES5 and includes `src`.
  Preserve these settings and type API data and component state explicitly.
- `.editorconfig` specifies two-space indentation, LF, UTF-8, trimmed trailing
  whitespace, and a final newline. ESLint and Prettier inherit GTS configuration
  through `.eslintrc.json` and `.prettierrc.js`; follow surrounding formatting.
- Follow the existing functional `React.FC` components, hooks, local interfaces,
  default page exports, and separate `styles.ts` modules.
- Use the shared API client for GitHub requests and React Router links for
  in-app navigation. Preserve the persistence key and Portuguese interface copy
  unless the requested change specifically concerns them.
- Keep changes focused; report legacy toolchain failures rather than upgrading
  dependencies or changing configuration incidentally.

## Verification guidance

- For code changes, run the relevant `yarn compile`, `yarn lint`, and `yarn build`
  checks. Use `yarn test --watchAll=false` when tests are present or added, keeping
  its lifecycle hooks and current lack of coverage in mind.
- For behavior changes, check repository lookup and errors, persistence after
  reload, navigation to details and back, issue links, and affected styling in a
  browser. These are manual checks, not existing automated coverage.
- For documentation-only changes, review paths and commands against the checkout
  and run `git diff --check`; application builds and browser checks are unnecessary.
- Report which checks actually ran and their results, including concrete blockers.
