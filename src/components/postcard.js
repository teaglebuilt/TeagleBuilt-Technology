import React from "react"
import { Link } from "../components/link"
import Img from "gatsby-image";
import Icon from "../icons"
import { slugify } from "../utils/slugger";
import classes from "../styles/postcard.module.sass"

const PostCard = ({title, description, tags, slug, id, image}) => {
    
    return (
        <section key={slug} className={classes.chapter}>
            <h2 className={classes.chapter_title}>
              <Link to={slug}>{title}</Link>
            </h2>
            <Link to={slug}>
              <Img fluid={image} className={classes.postcard_image} />
            </Link>
            <p className={classes.chapterDesc}>
              <Link to={slug}>{description}</Link>
            </p>
            <ul className={classes.tag_container}>
              {tags.map(tag => (
                  <li key={id}>
                  <Link to={`/tag/${slugify(tag)}`}>
                    <span className={classes.post_tag}>
                      <Icon name={tag} />
                      <span className={classes.tag_title}>{tag}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
    )
}

export default PostCard