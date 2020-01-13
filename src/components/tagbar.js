import React from "react";
import { Link, graphql, StaticQuery } from "gatsby";
import Icon from "../icons"
import NewsLetter from "./newsletter"
import { kebabCase } from "lodash";
import classes from "../styles/tagbar.module.sass"


const TagBar = () => (
  <div className={classes.tag_container}>
    <StaticQuery
      query={taglistquery}
      render={data => (
        <ul className={classes.tag_list}>
          {data.allMarkdownRemark.group.map(node => (
            <li className={classes.tag} key={node.fieldValue}>
              <Icon name={node.fieldValue} />
              <Link
                className="text-gray-600 text-sm italic"
                to={`/tag/${kebabCase(node.fieldValue)}`}
              >
                {node.fieldValue}
              </Link>
            </li>
          ))}
        </ul>
      )}
    />
    <NewsLetter />
  </div>
)


export default TagBar

const taglistquery = graphql`
query {
  allMarkdownRemark(limit: 2000) {
    group(field: frontmatter___tags) {
      fieldValue
      totalCount
    }
  }
}
`;