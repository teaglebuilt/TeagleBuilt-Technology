const fetch = require("node-fetch")
const createNodeHelpers = require('gatsby-node-helpers').default;

const { createNodeFactory, generateNodeId } = createNodeHelpers({
    typePrefix: 'repos'
});

const RepoNode = createNodeFactory('RepoNode');

exports.sourceNodes = async ({ actions }, configOptions ) => {
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
            let gitRepo = {
                url: `https://github.com/${repo}`,
                description: repoData.description,
                languages: languageData,
                readme: readmeHTML.content
            }
            console.log(gitRepo)
            const repoNode = await RepoNode(gitRepo)
            await createNode(repoNode)
            // fetchedRepos.push(gitRepo)
            // const githubRepo = RepoNode(node)
            // createNode(githubRepo)
        })
    )
};



// exports.sourceNodes = async (
//     { actions, createNodeId, createContentDigest }, configOptions
// ) => {
//     const { createNode } = actions
//     const options = { ...configOptions }
//     await options.repos.forEach((repo, index, createNodeId, createContentDigest) => {
//         const data = githubData(repo, options, index, createNodeId, createContentDigest)
//         console.log(data)
//     })
// }


// const githubData = async (repo, options, createNodeId, createContentDigest, index) => {
//     console.log(repo, options);
//     const param = queryString.stringify(repo)
//     const response = await fetch(`https://api.github.com/repos/${repo}`, {
//         headers: {
//             Authorization: `token ${options.key}`
//         }
//     })
//     const result = await response.json()
//     const languages = await fetch(`https://api.github.com/repos/${repo}/languages`, {
//         headers: {
//             Authorization: `token ${options.key}`
//         }
//     })
//     const languageData = await languages.json()
//     const readme = await fetch(`https://api.github.com/repos/${repo}/readme`, {
//         headers: {
//             Authorization: `token ${options.key}`
//         }
//     })
//     const readmeHTML = await readme.json()
//     const data = {
//         url: `https://github.com/${repo}`,
//         description: result.description,
//         languages: languageData,
//         readme: readmeHTML
//     }
//     const node = {
//         id: createNodeId(`Github-${index}`),
//         internal: {
//             type: "GithubRepo",
//             contentDigest: createContentDigest(data),
//         }
//     }
// }