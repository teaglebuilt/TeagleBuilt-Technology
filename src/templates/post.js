import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import { renderAst } from "../markdown"
import Layout from "../components/layout"
import classes from '../styles/layout.module.sass'
import '../styles/index.sass'



const Template = ({ data, pageContext }) => {
  const { markdownRemark } = data
  const { frontmatter, htmlAst } = markdownRemark
  const { title, description, tags } = frontmatter
  const html = renderAst(htmlAst)

  return (
    <>
    <Layout title={title}>
      <SEO keywords={[tags]} title={title} description={description} />
      <div className={classes.markdown}>
        {html}
      </div>
    </Layout>
    </>
  )
}

export default Template

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      frontmatter {
        title
        description
        tags
        date
      }
    }
  }
`
