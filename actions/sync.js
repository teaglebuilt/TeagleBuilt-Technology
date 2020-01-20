import axios, { AxiosResponse } from "axios";
import * as frontmatterParser from "frontmatter";

const apiUrl = "https://dev.to/api";


export async function getAll(apiUrl, apiKey) {
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
