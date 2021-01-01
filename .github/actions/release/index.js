const core = require('@actions/core');
const github = require('@actions/github');
const dotProp = require('dot-prop');
const fs = require('fs-extra');
const semver = require('semver');

(async () => {
    try {
        const {draft, prerelease, tag_name: releaseVersion} = github.context.payload.release;
        const releaseVersionWithoutV = releaseVersion.substring(1);
        const packageJson = await fs.readJson('./package.json');
        const packageJsonVersion = dotProp.get(packageJson, 'version', undefined);
        const packageJsonBuildScript = dotProp.get(packageJson, 'scripts.build', undefined);

        if (!releaseVersion.startsWith('v')) {
            core.setFailed('Release tag does not start with `v`, ie. `v1.2.3`.');
        }

        if (releaseVersionWithoutV !== packageJsonVersion) {
            core.setFailed(`
                Release version does not match package.json version.
                Release version: ${releaseVersionWithoutV}
                Package.json version: ${packageJsonVersion}
            `);
        }

        if (!semver.valid(releaseVersionWithoutV)) {
            core.setFailed(`Release / Package.json version is not valid semver.`);
        }

        const prereleaseTag = semver.prerelease(releaseVersionWithoutV);
        let tag = '';

        if (prereleaseTag !== null) {
            tag = ` --tag ${prereleaseTag[0]}`;
        }

        const command = `yarn publish --new-version ${releaseVersionWithoutV}${tag}`;
        console.log('COMMAND', command);
        core.setOutput('command', command);
    } catch (error) {
        core.setFailed(error.message);
    }
})();
