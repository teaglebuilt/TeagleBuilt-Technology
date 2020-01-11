const meta = require("./meta.json")
const autoprefixer = require("autoprefixer")

module.exports = {
  siteMetadata: meta,
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        indentedSyntax: true,
        postCssPlugins: [require('tailwindcss')],
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
          families: [`Pacifico`, `Railway`]
        }
      }
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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `challenges`,
        path: `${__dirname}/challenges`,
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
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: `language-`,
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false
            }
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
  ],
}
