# github-actions-experiments

> A repo to experiment with GitHub Actions. 🧪

This repository contains snippets / recipes / guides or references to other actions I have found or figured out myself in my own adoption of GitHub Actions. I am sharing them here in case someone else finds them useful too.

Examples are isolated to keep them clear and concise, but you can totally use them together into a single workflow.

-   [Cache node_modules](#cache-node_modules)
-   [Cancel Running Workflows](#cancel-running-workflow)
-   [GitHub Releases for Automated Package Publishing](#github-releases-for-automated-package-publishing)
-   [Local Actions](#local-actions)
-   [Read and Use Node Version from .nvmrc File](#read-and-use-node-version-from-.nvmrc-file)
-   [Read and Use Yarn Version from .yvmrc File](#read-and-use-yarn-version-from-.yvmrc-file)

## Caching node_modules

One of the longest running steps in your GitHub Actions workflow is likely downloading and installing dependencies. Wouldn't it be great if you could skip that and reuse previously installed dependencies if none of the dependencies have changed?!

You totally can by saving previously installed dependencies and reusing them, if they haven't changed.

-   [Example](/.github/workflows/cache-node-modules.yml)

## Cancel Running Workflows

Say you have some GitHub Actions hooked up run on pull request. Thinkings like linting, testing, etc. that could take a while to run. But then you push new changes while the previous commits as still being processed. It'd be nice if the previous run could be cancelled and just start over with the new changes instead if waiting for the "old" code to finish processing, wouldn't it?! Yes. Yes it would.

This is exactly what [styfle/cancel-workflow-action](https://github.com/marketplace/actions/cancel-workflow-action) does. Super handy.

## GitHub Releases for Automated Package Publishing

There are so many ways to publish packages using GitHub Actions, but I found drawbacks with many of the existing ones in the GitHub Marketplace, so I decided to write my own.

If publishing packages via GitHub Releases sounds appealing to you, check out [manovotny/github-releases-for-automated-package-publishing](https://github.com/marketplace/actions/github-releases-for-automated-package-publishing). It gives you a lot of flexibility in your workflow in how to publish your package.

-   [Example](/.github/workflows/local-action.yml)

## Local Actions

Not all GitHub Actions need to be or should be published to the [GitHub Marketplace](https://github.com/marketplace). You might have something very specific to your project or something you want to keep secret 🤫 , so you don't want to publish it, but you want to still leverage the power of GitHub Actions in your repository.

Fear not! You can write your own GitHub Action, locally within your project's repository, and reference it in workflows.

-   [Example: Creating a local action within your project repository](/.github/actions/local-action)
-   [Example: Referencing local action in your workflow](/.github/workflows/local-action.yml)

## Read and Use Node Version from .nvmrc File

[nvm](https://github.com/nvm-sh/nvm) is a popular way to manage consistent node versions when working with teams. Wouldn't it be nice if your GitHub Actions could use the same version instead of copy / pasting the versions in multiple places and keeping them all in sync?

You can! Have your GitHub Actions read and use the version specified in the project's `.nvmrc` file.

-   [Example](/.github/workflows/nvm.yml)

## Read and Use Yarn Version from .yvmrc File

[yvm](https://github.com/nvm-sh/nvm) is a popular way to manage consistent yarn versions when working with teams. Wouldn't it be nice if your GitHub Actions could use the same version instead of copy / pasting the versions in multiple places and keeping them all in sync?

You can! Have your GitHub Actions read and use the version specified in the project's `.yvmrc` file.

-   [Example](/.github/workflows/yvm.yml)
