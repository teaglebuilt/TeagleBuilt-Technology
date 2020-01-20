const core = require('@actions/core');
const github = require('@actions/github');
const token = process.env.DEV_API_KEY;
import getAll from "./sync"


try {
    const api = "https://dev.to/api";
    const payload = getAll(api, token);
    core.setOutput("articles", payload);
    console.log(`The event payload: ${payload}`);
} catch(error) {
    core.setFailed(error.message);
}