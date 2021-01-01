const core = require('@actions/core');
const github = require('@actions/github');
const dotProp = require('dot-prop');
const fs = require('fs-extra');
const semver = require('semver');

(async () => {
    try {
        const {prerelease: releaseIsPrerelease, tag_name: releaseVersion} = github.context.payload.release;
        const releaseVersionWithoutV = releaseVersion.substring(1);
        const packageJson = await fs.readJson('./package.json');
        const packageJsonVersion = dotProp.get(packageJson, 'version', undefined);

        if (!releaseVersion.startsWith('v')) {
            core.setFailed('Release tag does not start with `v`, ie. `v1.2.3`.');
            return;
        }

        if (releaseVersionWithoutV !== packageJsonVersion) {
            core.setFailed(`
                Release version does not match package.json version.
                Release version: ${releaseVersionWithoutV}
                Package.json version: ${packageJsonVersion}
            `);
            return;
        }

        if (!semver.valid(releaseVersionWithoutV)) {
            core.setFailed(`Release and package.json versions are not valid semver.`);
            return;
        }

        const semverPrerelease = semver.prerelease(releaseVersionWithoutV);
        let publishCommand = `yarn publish --new-version ${releaseVersionWithoutV}`;

        if (releaseIsPrerelease && semverPrerelease === null) {
            core.setFailed(
                'Release in GitHub is marked as `pre-release`, but release tag and package.json versions do not follow pre-release format, ie. `1.2.3-beta.1'
            );
            return;
        }

        if (!releaseIsPrerelease && semverPrerelease !== null) {
            core.setFailed(
                'Release tag and package.json versions follow pre-release format, ie. `1.2.3-beta.1, but release in GitHub is not marked as `pre-release`.'
            );
            return;
        }

        if (releaseIsPrerelease && semverPrerelease !== null) {
            publishCommand += ` --tag ${semverPrerelease[0]}`;
        }

        console.log('PUBLISH COMMAND', publishCommand);
        console.log('BUILD COMMAND', buildCommand);
        core.setOutput('publish_command', publishCommand);
    } catch (error) {
        core.setFailed(error.message);
    }
})();
