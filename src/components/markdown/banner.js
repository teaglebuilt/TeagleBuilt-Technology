import React from "react"
import classes from "../../styles/banner.module.sass"
import headshot from "../../images/face.jpeg"


const Banner = ({author}) => {
    return (
        <>
        <div className={classes.banner}>
            <div className={classes.profile}>
                <img
                    alt="Headshot"
                    className={classes.profile_pic}
                    src={headshot}
                />
            </div>
            <div className={classes.main_content}>
                <h2 className={classes.profile_name}>{author}</h2>
                <div className={classes.links}>
                        <iframe
                            frameborder="0"
                            height="20px"
                            src="https://ghbtns.com/github-btn.html?user=teaglebuilt&type=follow&count=true"
                            width="170px"
                        ></iframe>
                </div>
            </div>
        </div>
        
    </>
    )
}


export default Banner