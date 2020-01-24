import React from "React"
import axios from "axios"
import classes from "../../../styles/layout.module.sass"

class DevPost extends React.Component {
    state = {
        author: "",
        avatar: null,
        title: "",
        tags: []
    }

    componentDidMount(){
        this.updateDevPost();
    }

    updateDevPost = async () => {
        const articles = await axios.get(`https://dev.to/api/articles?${this.props.user}`, {
            headers: {
              "cache-control": "no-cache",
              pragma: "no-cache",
              accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
              "accept-encoding": "gzip, deflate, br",
              "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
              "upgrade-insecure-requests": 1
            }
        });
        const response = await articles.json()
        console.log(response)
    }

    render() {
        const { user } = this.props;
        return(
            <div className={classes.dev_card}>
                DEV CARD
            </div>
        )
    }
}

export default DevPost