import React from "react"
import addToMailchimp from 'gatsby-plugin-mailchimp'
import classes from "../styles/tagbar.module.sass"

export default class NewsLetter extends React.Component {

    state = {
        name: null,
        email: null
    }

    _handleChange =  e => {
        
        this.setState({
            [`${e.target.name}`]: e.target.value,
        })
    }

    _handleSubmit = e => {
        e.preventDefault();
        console.log(this.state.email)
        addToMailchimp(this.state.email, {name: this.state.name})
        .then(({msg, result}) => {
            console.log('msg', `${result}: ${msg}`);
            if( result === 'success'){
                this.setState({
                    name: '',
                    email: ''
                })
            }
            else if (result !== 'success') {
                throw msg;
            }
        })
        .catch(err => alert(err))
    }
    render() {
        return(
            <form onSubmit={this._handleSubmit} className={classes.newsletter}>
                <h1>Newsletter Signup</h1>
                <p>No spam, unsubscribe at any time.</p>
                <div class={classes.info}>
                <input type="text" name="name" onChange={this._handleChange} placeholder="Your Name" />
                <input type="email" name="email" onChange={this._handleChange}  placeholder="Your Email" />
                </div>
                <input type="submit" value="Subscribe" />
            </form> 
        )
    }
}


