const fetch = require("node-fetch")
const createNodeHelpers = require('gatsby-node-helpers').default;

const { createNodeFactory, generateNodeId } = createNodeHelpers({
    typePrefix: 'repos'
});

const RepoNode = createNodeFactory('RepoNode');

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }, configOptions ) => {
    const { createNode } = actions
    delete configOptions.plugins
    const apikey = configOptions.key
    const repos = configOptions.repos
    const fetchedRepos = []
    await Promise.all(
        repos.map(async (repo, index) => {
            const response = await fetch(`https://api.github.com/repos/${repo}`, {
                headers: {
                    Authorization: `token ${apikey}`
                }
            })
            const repoData = await response.json()
            const languages = await fetch(`https://api.github.com/repos/${repo}/languages`, {
                headers: {
                    Authorization: `token ${apikey}`
                }
            })
            const languageData = await languages.json()
            const readme = await fetch(`https://api.github.com/repos/${repo}/readme`, {
                headers: {
                    Authorization: `token ${apikey}`
                }
            })
            const readmeHTML = await readme.json()
            let newNode = {
                id: createNodeId(`repoNode-${index}`),
                url: `https://github.com/${repo}`,
                name: `${repo}`,
                description: repoData.description,
                languages: languageData,
                readme: readmeHTML.content,
                internal: {
                    type: 'RepoNode',
                    contentDigest: createContentDigest('repoNode')
                }
            }
            createNode(newNode)
        })
    )
};