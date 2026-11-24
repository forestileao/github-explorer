# github-explorer

## CI

The Semaphore pipeline at [`.semaphore/semaphore.yml`](.semaphore/semaphore.yml)
runs a single production-build smoke check on an `e1-standard-2` Linux agent with
`ubuntu2404`. It checks out the triggering revision, selects Node.js `16.20.2`
using `sem-version node 16.20.2`, and installs Yarn Classic `1.22.22` using
`npm install --global yarn@1.22.22`. These versions preserve compatibility with
the existing `react-scripts` `4.0.1` build.

The job then runs:

```sh
yarn install --frozen-lockfile --non-interactive
CI=true yarn build
```

Installation preserves the existing `prepare` lifecycle (`yarn run compile`),
which type-checks with `tsconfig.json` and `noEmit`. The build produces
`build/index.html` and compiled assets. Installation or build failures fail the
job; no application secrets or deployment steps are required.

To activate CI, connect this GitHub repository to a Semaphore project, select
`.semaphore/semaphore.yml` as its pipeline, and enable the desired triggers in
Semaphore. These are external project setup steps; committing the YAML alone
does not activate CI.
