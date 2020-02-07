const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const _ = require(`lodash`);
const postTemplate = path.resolve("src/templates/post.js")
const tagTemplate = path.resolve("src/templates/tags.js")


function replacePath(pagePath) {
  return pagePath === `/` ? pagePath : pagePath.replace(/\/$/, ``)
}

async function onCreateNode({
  node,
  actions,
  getNode
}) {
  const { createNodeField, createNode, createParentChildLink } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({
      node,
      getNode,
      basePath: "/",
      trailingSlash: false,
    })
    createNodeField({ name: "slug", node, value: slug })
  }
}

exports.onCreateNode = onCreateNode

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              type
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    const posts = result.data.allMarkdownRemark.edges.filter(
      ({ node }) => node.frontmatter.type == "post"
    )
    posts.forEach(({ node }) => {
      createPage({
        path: replacePath(node.fields.slug),
        component: postTemplate,
        context: { slug: node.fields.slug },
      })
      let tags = []
      _.each(posts, edge => {
        if (_.get(edge, `node.frontmatter.tags`)) {
          tags = tags.concat(edge.node.frontmatter.tags);
        }
      })
      tags = _.uniq(tags)

      tags.forEach(tag => {
        createPage({
          path: `/tag/${_.kebabCase(tag)}/`,
          component: tagTemplate,
          context: {
            tag
          }
        });
      });
    })
  })
}
