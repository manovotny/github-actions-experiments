# github-actions-experiments

> A repo to experiment with GitHub Actions. 🧪

This repository contains snippets / recipes / guides or references to other actions I have found or figured out myself in my own adoption of GitHub Actions. I am sharing them here in case someone else finds them useful too.

Examples are isolated to keep them clear and concise, but you can [use them together into a single workflow](/.github/workflows/test.yml).

You can also [view real results](https://github.com/manovotny/github-actions-experiments/actions) of the actions below, which are setup to run as realtime examples within this respiratory.

-   [Cache node_modules](#cache-node_modules)
-   [Cancel Running Workflows](#cancel-running-workflows)
-   [GitHub Releases for Automated Package Publishing](#github-releases-for-automated-package-publishing)
-   [Local Actions](#local-actions)
-   [Image Optimization](#image-optimization)
-   [Read and Use Node Version from .nvmrc File](#read-and-use-node-version-from-nvmrc-file)
-   [Read and Use Yarn Version from .yvmrc File](#read-and-use-yarn-version-from-yvmrc-file)

## Cache node_modules

One of the longest running steps in your GitHub Actions workflow is likely downloading and installing dependencies. Wouldn't it be great if you could skip that and reuse previously installed dependencies if none of the dependencies have changed?!

You totally can by saving previously installed dependencies and reusing them, if they haven't changed.

-   [Example Code](/.github/workflows/cache-node-modules.yml)

## Cancel Running Workflows

Say you have some GitHub Actions hooked up run on pull request. Thinkings like linting, testing, etc. that could take a while to run. But then you push new changes while the previous commits as still being processed. It'd be nice if the previous run could be cancelled and just start over with the new changes instead if waiting for the "old" code to finish processing, wouldn't it?! Yes. Yes it would.

This is exactly what [styfle/cancel-workflow-action](https://github.com/marketplace/actions/cancel-workflow-action) does. Super handy.

## GitHub Releases for Automated Package Publishing

There are so many ways to publish packages using GitHub Actions, but I found drawbacks with many of the existing ones in the GitHub Marketplace, so I decided to write my own.

If publishing packages via GitHub Releases sounds appealing to you, check out [manovotny/github-releases-for-automated-package-publishing](https://github.com/marketplace/actions/github-releases-for-automated-package-publishing). It gives you a lot of flexibility in your workflow in how to publish your package.

-   [Example Code](/.github/workflows/local-action.yml)

## Local Actions

Not all GitHub Actions need to be or should be published to the [GitHub Marketplace](https://github.com/marketplace). You might have something very specific to your project or something you want to keep secret 🤫 , so you don't want to publish it, but you want to still leverage the power of GitHub Actions in your repository.

Fear not! You can write your own GitHub Action, locally within your project's repository, and reference it in workflows.

-   [Example Code: Creating a local action within your project repository](/.github/actions/local-action)
-   [Example Code: Referencing local action in your workflow](/.github/workflows/local-action.yml)

## Image Optimization

There are [tons](https://www.npmjs.com/search?q=keywords%3Aoptimization%20image) of image optimizion libraries out there, but many of them require manual workflows, custom server middleware, on-the-fly browser compression (ie. not ideal for performance), [cumbersome cross platform build setups with yet more non-JavaScript dependencies](https://github.com/manovotny/manovotny.com/pull/78) (such as [ImageMagic](https://imagemagick.org/index.php), [ImageOptim](https://imageoptim.com/mac), [JPEGMini](https://www.jpegmini.com/), etc.) to get the best image optimization quality.

There has to be a better way... And now there is!

The [calibreapp/image-actions](https://github.com/marketplace/actions/image-actions) GitHub Action abstracts all that setup and pain away with a single workflow. Set it and forget it and don't look back! 😅

-   [Example Code](/.github/workflows/local-action.yml)
-   [Example Pull Request]() - TODO: ADD LINK TO EXAMPLE PR

## Read and Use Node Version from .nvmrc File

[nvm](https://github.com/nvm-sh/nvm) is a popular way to manage consistent node versions when working with teams. Wouldn't it be nice if your GitHub Actions could use the same version instead of copy / pasting the versions in multiple places and keeping them all in sync?

You can! Have your GitHub Actions read and use the version specified in the project's `.nvmrc` file.

-   [Example Code](/.github/workflows/nvm.yml)

## Read and Use Yarn Version from .yvmrc File

[yvm](https://github.com/nvm-sh/nvm) is a popular way to manage consistent yarn versions when working with teams. Wouldn't it be nice if your GitHub Actions could use the same version instead of copy / pasting the versions in multiple places and keeping them all in sync?

You can! Have your GitHub Actions read and use the version specified in the project's `.yvmrc` file.

-   [Example Code](/.github/workflows/yvm.yml)
