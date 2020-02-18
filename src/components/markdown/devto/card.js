import React, { useEffect, useState } from "react"
import classes from "../../../styles/devcard.module.sass"
import useDevto from "../../../hooks/useDevtoData"

const DevCard = ({ id }) => {
    const articles = useDevto();
    const [article, setArticle] = useState({})


    useEffect(() => {
        const card = articles.find(
          node => node.node.article_id == `${id}`
        )
        setArticle(card.node)
    })

    return(
        <div className={classes.devcard}>
            <a className={classes.top}>
                <div className={classes.pic}>
                    <img src={article.profile_image} />
                </div>
            </a>
            <a href={classes.bottom}>
                <div className={classes.content}>
                    <h2>{article.title}</h2>
                </div>
                <div className={classes.taglist}>
                    {article.tags.map(tag => {
                        return(
                            <span className={classes.devtag}>{tag}</span>
                        )
                    })}
                </div>
            </a>
        </div>
    )
}

export default DevCard