import React from "react"
import classes from "../../styles/banner.module.sass"
import headshot from "../../images/face.jpeg"


const Banner = ({author}) => {
    return (
        <>
        {/* <div className={classes.share_container}>
            <div className={classes.share_banner}>
                <div className={classes.line}></div>
                <span>
                    <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false">Tweet</a>
                </span>
                <div className={classes.line}></div>
            </div>
        </div> */}
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
                <iframe
                    className="my-2 xs:mx-auto md:ml-6"
                    frameborder="0"
                    height="20px"
                    src="https://ghbtns.com/github-btn.html?user=teaglebuilt&type=follow&count=true"
                    width="170px"
                ></iframe>
            </div>
        </div>
        
    </>
    )
}


export default Banner