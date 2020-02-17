const fetch = require("node-fetch")
const queryString = require("query-string")


exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }, options) => {
   const { createNode } = actions
   delete options.plugins
   const { articles } = options;
   await Promise.all(articles.map(async (article, index) => {
       const response = await fetch(`https://dev.to/api/articles/${article}`)
       const result = await response.json()
       let newNode = {
         id: createNodeId(`devArticle-${index}`),
         title: result.title,
         description: result.description,
         cover_image: result.cover_image,
         social_image: result.social_image,
         slug: result.slug,
         comments_count: result.comments_count,
         positive_reactions_count: result.positive_reactions_count,
         published_timestamp: result.published_timestamp,
         tags: result.tags,
         body_html: result.body_html,
         profile_image: result.profile_image,
         internal: {
           type: "devArticleNode",
           contentDigest: createContentDigest("devArticleNode"),
         },
       }
       createNode(newNode)
   }))
}