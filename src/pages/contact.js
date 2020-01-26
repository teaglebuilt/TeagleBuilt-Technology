import React from "react"
import Layout from "../components/layout"
import classes from "../styles/contact.module.sass"


export default () => {
    return(
        <Layout>
            <div className={classes.contact_page}>
                <form className={classes.contact_form} name="contact" method="post" action="/success" data-netlify="true" data-netlify-honeypot="bot-field">
                    <input type="hidden" name="bot-field" />
                    <input type="hidden" name="form-name" value="contact" />
                    <div className={classes.form_field}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div className={classes.form_field}>
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" />
                    </div>
                    <div className={classes.form_field}>
                        <label htmlFor="message">Message</label>
                        <textarea name="message" id="message" rows="6" />
                    </div>
                    <ul>
                        <li>
                            <input type="submit" value="Send Message" />
                        </li>
                        <li>
                            <input type="reset" value="Clear" />
                        </li>
                    </ul>
                </form>
            </div>
        </Layout>
    )
}