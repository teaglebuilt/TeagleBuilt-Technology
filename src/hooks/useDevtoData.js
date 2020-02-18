import { graphql, useStaticQuery } from "gatsby"



const useDevto = () => {
    const data = useStaticQuery(graphql`
      query {
        allDevArticleNode {
          edges {
            node {
              id
              article_id
              slug
              social_image
              tags
              title
              positive_reactions_count
              published_timestamp
              description
              cover_image
              profile_image
              comments_count
              body_html
              username
            }
          }
        }
      }
    `)
    return data.allDevArticleNode.edges
}

export default useDevto