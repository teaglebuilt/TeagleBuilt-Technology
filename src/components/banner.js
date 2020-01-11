import React from "react"
import classes from "../styles/banner.module.sass"
import headshot from "../images/face.jpeg"


const Banner = () => {
    return (
        <>
        <div className={classes.banner}>
            <div className={classes.profile}>
                <img
                    alt="Headshot"
                    className="rounded-lg sm:w-1/3 sm:mx-auto md:w-48 mt-4 md:ml-6"
                    src={headshot}
                />
                <iframe
                className="my-2 xs:mx-auto md:ml-6"
                frameborder="0"
                height="20px"
                src="https://ghbtns.com/github-btn.html?user=teaglebuilt&type=follow&count=true"
                width="170px"
                ></iframe>
            </div>
            <div className={classes.bio}>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting 
                    industry. Lorem Ipsum has been the industry's standard dummy text ever since 
                    the 1500s, when an unknown printer took a galley of type 
                    and scrambled it to make a type specimen book. It has 
                    Lorem Ipsum is simply dummy text of the printing and typesetting 
                    industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type 
                    and scrambled it to make a type specimen book. It has 
                </p>
            </div>
        </div>
        
    </>
    )
}


export default Banner