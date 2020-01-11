import React from "react"
import { StaticQuery, graphql } from "gatsby"
import TagBar from "./tagbar"
import SEO from "./seo"
import DarkModeToggle from './darkmode'
import '../styles/index.sass'
import classes from "../styles/layout.module.sass"

const Layout = ({ title, description, children }) => {


  return (
    <StaticQuery
      query={graphql`
        {
          site {
            siteMetadata {
              title
              description
              bio
              twitterUrl
            }
          }
        }
      `}
      render={data => {
        const meta = data.site.siteMetadata
        return (
          <>
          <div className={classes.root}>
            <SEO title={title} description={description} />
            <main className={classes.feed}>
              <header className={classes.web_title}>
                TeagleBuilt Technology
                <span>
                  <DarkModeToggle />
                </span>
              </header>
              <div className={classes.content}>
                {(title || description) && (
                  <header className={classes.header}>
                    {title && <h1 className={classes.title}>{title}</h1>}
                  </header>
                )}
                <div className={classes.root}>
                  {children}
                </div>
              </div>
            </main>
            <TagBar />
          </div>
          
          </>
        )
      }}
    />
  )
}

export default Layout
