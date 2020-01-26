import React from "react"
import {
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon
  } from "react-share";
import urljoin from "url-join";
import config from "../../../config/site"
import classes from '../../styles/sociallinks.module.sass'


class SocialLinks extends React.Component {

    render() {
        const { title, path, description } = this.props;
        const url = urljoin(config.siteUrl, "/", path)
        return(
            <div className={classes.share_container}>
                <div className={classes.share_banner}>
                    <div className={classes.line}></div>
                    <TwitterShareButton url={url} title={title}>
                        <TwitterIcon square borderRadius={10} size={48} />
                    </TwitterShareButton>
                    <LinkedinShareButton url={url} title={title} description={description}>
                        <LinkedinIcon square borderRadius={10} size={48} />
                    </LinkedinShareButton>
                    <div className={classes.line}></div>
                </div>
        </div> 
        )
    }
  }

  export default SocialLinks