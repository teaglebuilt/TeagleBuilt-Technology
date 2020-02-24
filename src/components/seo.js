import React from "react"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

const SEO = ({ title, description, thumbnail, keywords }) => (
  <StaticQuery
    query={query}
    render={data => {
      const lang = "en"
      const siteMetadata = data.site.siteMetadata
      const pageTitle = title
        ? `${title} · ${siteMetadata.title}`
        : `${siteMetadata.title} · ${siteMetadata.slogan}`
      const pageDesc = description || siteMetadata.description
      const imageSrc = thumbnail && thumbnail.childImageSharp.sizes.src;
      let origin = "";
      if (typeof window !== "undefined") {
        origin = window.location.origin;
      }
      const schemaOrgJSONLD = [
        {
          "@context": "http://schema.org",
          "@type": "WebSite",
          url: 'https://www.teaglebuilt.com',
          title: 'TeagleBuilt Technology',
          alternateName: 'Dillan Teagle Website'
        }
      ];
      const image = origin + imageSrc;
      const meta = [
        {
          name: "description",
          content: pageDesc,
        },
        {
          property: "og:title",
          content: pageTitle,
        },
        {
          property: "og:description",
          content: pageDesc,
        },
        {
          property: "og:type",
          content: `website`,
        },
        {
          property: "og:site_name",
          content: siteMetadata.title,
        },
        {
          property: "og:image:alt",
          content: image.alt,
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:image",
          content: image,
        },
        {
          name: "twitter:creator",
          content: `@${siteMetadata.socialLinks.twitter}`,
        },
        {
          name: "twitter:site",
          content: `@${siteMetadata.socialLinks.twitter}`,
        },
        {
          name: "twitter:title",
          content: pageTitle,
        },
        {
          name: "twitter:description",
          content: pageDesc,
        },
      ]

      return (
        <Helmet
          defer={false}
          title={pageTitle}
          meta={meta}
        >
          {siteMetadata.fonts && (
            <link
              href={`https://fonts.googleapis.com/css?family=${siteMetadata.fonts}`}
              rel="stylesheet"
            />
          )}
          <script type="application/ld+json">
            {JSON.stringify(schemaOrgJSONLD)}
          </script>
        </Helmet>
      )
    }}
  />
)

export default SEO

const query = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        bio
        author
        slogan
        socialLinks {
          twitter
          linkedin
          github
          devto
        }
      }
    }
  }
`
