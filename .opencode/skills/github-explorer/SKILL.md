---
name: github-explorer
description: Use when working on github-explorer to understand the React repository search app, its commands, GitHub API flow, and conventions to preserve.
---

# GitHub Explorer

## Stack and commands

- This is a Create React App project using react-scripts 4, React 17, TypeScript, styled-components, react-router-dom 5, and axios.
- Run commands from the repository root: `yarn start` for development, `yarn test` for the existing test runner, `yarn lint` for gts linting, and `yarn compile` for TypeScript checking. `yarn build` creates the production build.
- The test script has `pretest` (compile) and `posttest` (lint) hooks. Keep the existing package scripts and toolchain.

## Search and repository flow

- `src/pages/Dashboard/index.tsx` handles the `/` page. The form accepts `owner/name` and requests `repos/${newRepo}` through the axios client in `src/services/api.ts`.
- A successful search appends the repository to the list and clears the input and error. The list is restored from and saved to localStorage under `@GithubExplorer:repositories` as JSON.
- `src/routes/index.tsx` maps `/repositories/:repository+` to `src/pages/Repository/index.tsx`; keep the route parameter capable of capturing the slash in `owner/name`.
- The repository page requests `repos/${params.repository}` and `repos/${params.repository}/issues`, displays stars, forks, and open issues, and links each issue to its GitHub `html_url`.
- The API base is `https://api.github.com/` with no authentication header. Keep requests unauthenticated and never commit a token or secret.

## Conventions and boundaries

- Preserve the Portuguese UI copy and existing search validation and error messages.
- Page-specific styled-components live in `styles.ts` beside each page. Follow the existing gts lint and formatting configuration in `.eslintrc.json` and `.prettierrc.js`.
- Do not eject Create React App or replace its toolchain. Do not change the search, localStorage, routing, or issue flow unless explicitly asked.
