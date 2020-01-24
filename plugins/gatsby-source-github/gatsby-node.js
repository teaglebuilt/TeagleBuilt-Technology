const fetch = require("node-fetch")
const createNodeHelpers = require('gatsby-node-helpers').default;
const atob = require('atob');
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
            const langs = getPercentagePerKey(languageData)
            const readme = await fetch(`https://api.github.com/repos/${repo}/readme`, {
                headers: {
                    Authorization: `token ${apikey}`
                }
            })
            const readmeHTML = await readme.json()
            const html = atob(readmeHTML.content)
            let newNode = {
                id: createNodeId(`repoNode-${index}`),
                url: `https://github.com/${repo}`,
                name: `${repo}`,
                description: repoData.description,
                languages: langs,
                readme: html,
                internal: {
                    type: 'RepoNode',
                    contentDigest: createContentDigest('repoNode')
                }
            }
            createNode(newNode)
        })
    )
};


const getPercentagePerKey = (languageData) => {
    var sum = getSum(languageData);
    var langsWithPercentages = {};
    const langs = Object.keys(languageData)
    const values = Object.values(languageData)
    for(var i = 0; i < values.length; i++){
        let val = values[i]
        var percent = Math.round((val / sum) * 100);
        langsWithPercentages[langs[i]] = percent
    }
    return langsWithPercentages;
}

const getSum = (languageData) => {
    let sum = 0;
    const values = Object.values(languageData)
    values.forEach(element => {
        sum += element
    });
    return sum;
}
