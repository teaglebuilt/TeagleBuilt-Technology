const meta = require("./meta.json")
const autoprefixer = require("autoprefixer")

require('dotenv').config({
   path: `.env.${process.env.NODE_ENV}`
})


module.exports = {
  siteMetadata: meta,
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        indentedSyntax: true,
        postCssPlugins: [require("tailwindcss")],
        cssLoaderOptions: {
          localIdentName:
            process.env.NODE_ENV == "development"
              ? "[name]-[local]-[hash:8]"
              : "[hash:8]",
        },
      },
    },
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: [`Pacifico`, `Railway`, `Ubuntu`],
        },
      },
    },
    {
      resolve: "gatsby-plugin-use-dark-mode",
      options: {
        classNameDark: "dark-mode",
        classNameLight: "light-mode",
        storageKey: "darkMode",
        minify: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/content/images`,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /static/,
        },
      },
    },
    {
      resolve: `gatsby-source-github`,
      options: {
        key: process.env.GATSBY_GITHUB_API_TOKEN,
        repos: [
          "jupyterlab/jupyterlab",
          "teaglebuilt/gatsby-theme-binder",
          "codemirror/CodeMirror",
        ],
      },
    },
    {
      resolve: `gatsby-source-devto`,
      options: {
        articles: [`257536`],
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        commonmark: true,
        footnotes: true,
        pedantic: true,
        gfm: true,
        plugins: [
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: `language-`,
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          {
            resolve: `gatsby-remark-smartypants`,
            options: {
              dashes: "oldschool",
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 790,
              linkImagesToOriginal: true,
              sizeByPixelDensity: false,
              showCaptions: true,
              quality: 80,
              withWebp: { quality: 80 },
            },
          },
          `gatsby-remark-unwrap-images`,
        ],
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        exclude: ["/tag/*"],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
  
            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
        }`,
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map(edge => {
            return {
              url: site.siteMetadata.siteUrl + edge.node.path,
              changefreq: `daily`,
              priority: 0.7,
            }
          }),
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `teaglebuilt.com`,
        short_name: `teaglebuilt`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#0d3042`,
        display: `standalone`,
        icon: `src/images/code.png`,
      },
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://teaglebuilt.us4.list-manage.com/subscribe/post?u=28970195ea57c7ee89fcdae29&amp;id=d3b1211b62",
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                author
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  title: edge.node.frontmatter.title,
                  description: edge.node.frontmatter.description,
                  categories: edge.node.frontmatter.tags,
                  enclosure: edge.node.frontmatter.featuredImage && {
                    url: siteUrl + featuredImage.publicURL,
                  },
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [
                    { "content:encoded": edge.node.html },
                    { author: meta.email }
                  ],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                        description
                        tags
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "TeagleBuilt Tech RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-152839907-1`,
        head: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: `GTM-T6Q75HP`,
        includeInDevelopment: false,
        defaultDataLayer: { platform: `gatsby` },
      },
    },
    `gatsby-plugin-netlify-cache`,
  ],
}
