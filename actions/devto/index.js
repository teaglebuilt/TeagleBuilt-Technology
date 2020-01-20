const core = require('@actions/core');
const github = require('@actions/github');
import getAll from "./sync"


try {
  // `who-to-greet` input defined in action metadata file
  const api = "https://dev.to/api";
  const token = core.getInput('token')
  const payload = getAll(api, token)
  core.setOutput("articles", payload);
  // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
