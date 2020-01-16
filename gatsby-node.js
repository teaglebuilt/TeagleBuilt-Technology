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
  getNode,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) {
  const { createNodeField, createNode, createParentChildLink } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({
      node,
      getNode,
      basePath: "posts",
      trailingSlash: false,
    })
    createNodeField({ name: "slug", node, value: slug })
  } else if (node.extension === "py") {
    // Load the contents of the Python file and make it available via GraphQL
    // https://www.gatsbyjs.org/docs/creating-a-transformer-plugin/
    const content = await loadNodeContent(node)
    const contentDigest = createContentDigest(content)
    const id = createNodeId(`${node.id}-code`)
    const internal = { type: "Code", contentDigest }
    const codeNode = {
      id,
      parent: node.id,
      children: [],
      code: content,
      name: node.name,
      internal,
    }
    createNode(codeNode)
    createParentChildLink({ parent: node, child: codeNode })
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
          console.log(tags);
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
