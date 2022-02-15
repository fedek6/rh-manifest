
* `npx create-nx-workspace@latest --preset=core` bootstrap empty workspace.
* `nx g npm-package simple` create a package.
* `nx [script] [package]` run script in package.
* `nx graph` run browser window with dependency graph.
* `nx run-many --target=test --all` run script in parallel.
* `nx run-many --target=build --projects=app1,app` run selected packages.
* `nx affected --target=test` affected by current PR.