import React from "react"
import PostCard from "./postcard"



const PostList = ({ posts}) => {
    console.log(posts)
    return(
        <>
        <ul>
          {posts.map(({ node }, index) => (
            <li key={index}>
              <PostCard id={node.id}
                        title={node.frontmatter.title}
                        slug={node.fields.slug}
                        description={node.frontmatter.description}
                        image={node.frontmatter.image.childImageSharp.fluid}
                        tags={node.frontmatter.tags}
              />
            </li>
          ))}
        </ul>
        </>
    )
}

export default PostList