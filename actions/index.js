const core = require('@actions/core');
const github = require('@actions/github');
const token = process.env.DEV_API_KEY;
import axios, { AxiosResponse } from "axios";
import * as frontmatterParser from "frontmatter";


async function getAll(apiUrl, apiKey) {
    const allPublishedPosts = await axios.get(`${apiUrl}/articles/me/all`, {
        headers: { "api-key": apiKey }
    })
    return allPublishedPosts.data.map(article => {
        const { data: frontmatter, content } = frontmatterParser(
            article.body_markdown
        )
        return {
            ...article,
            content,
            frontmatter,
            fullContent: article.body_markdown
        }
    })
}


try {
    const api = "https://dev.to/api";
    const payload = getAll(api, token);
    core.setOutput("articles", payload);
    console.log(`The event payload: ${payload}`);
} catch(error) {
    core.setFailed(error.message);
}