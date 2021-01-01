const core = require('@actions/core');
const github = require('@actions/github');
const dotProp = require('dot-prop');
const fs = require('fs-extra');

(async () => {
    try {
        const stringified = JSON.stringify(github, undefined, 2);
        console.log('GITHUB', stringified);

        const {draft, prerelease, tag_name} = github.context.payload.release;
        console.log('DRAFT', draft);
        console.log('PRERELEASE', prerelease);
        console.log('TAG', tag_name);

        const packageJson = await fs.readJson('./package.json');
        const version = dotProp.get(packageJson, 'version', undefined);
        const build = dotProp.get(packageJson, 'scripts.build', undefined);
        console.log('VERSION', version);
        console.log('BUILD', build);
    } catch (error) {
        core.setFailed(error.message);
    }
})();
