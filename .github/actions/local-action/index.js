const core = require('@actions/core');
const github = require('@actions/github');

try {
    console.log('Hello local action! 👋');
    const stringified = JSON.stringify(github, undefined, 2);
    console.log('GITHUB', stringified);
} catch (error) {
    core.setFailed(error.message);
}
