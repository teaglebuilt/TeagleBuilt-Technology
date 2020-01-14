import React from "react"
import Icon from "../icons"
import classes from '../styles/layout.module.sass'


class ToggleIframe extends React.Component {

    state = {
        isHidden: true,
    }

    toggleHidden = () => {
        this.setState({
          isHidden: !this.state.isHidden
        })
    }

    render(){
        const { source, type } = this.props;
        return(
            <div className={classes.toggle_iframe}>
                <button onClick={this.toggleHidden}>
                    {type} <Icon name={type} />
                </button>
                {!this.state.isHidden && 
                    <iframe src={source} frameborder="0" 
                    allowfullscreen>
                    </iframe>
                }
            </div>
        )
    }
}

export default ToggleIframe