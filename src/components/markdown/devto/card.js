import React, { useEffect, useState } from "react"
import classes from "../../../styles/devcard.module.sass"
import useDevto from "../../../hooks/useDevtoData"

const DevCard = ({ id }) => {
    const articles = useDevto();
    const [article, setArticle] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const card = articles.find(
          node => node.node.article_id == `${id}`
        )
        setArticle(card.node)
        setLoading(false)
    })

    if(loading){
        return <h1>...Loading DevTo Article</h1>
    } else {
        return (
            <div className={classes.devcard}>
                <a className={classes.top}>
                    <div className={classes.pic}>
                        <img src={article.profile_image} />
                    </div>
                </a>
                <a className={classes.bottom}>
                    <div className={classes.content}>
                        <h2>{article.title}</h2>
                        <h3>{article.username} - Likes: {article.positive_reactions_count} - Comments: {article.comments_count}</h3>
                        <div className={classes.taglist}>
                            {article.tags.map(tag => {
                                return (
                                    <span className={classes.devtag}>#{tag}</span>
                                )
                            })}
                        </div>
                    </div>
                </a>
            </div>
        )
    }
}

export default DevCard