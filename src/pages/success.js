import React from 'react';
import Layout from '../components/layout';
import classes from "../styles/contact.module.sass"


const Success = props => (
  <Layout>
    <div className={classes.success_message}>
        <svg viewBox="0 0 76 76" className={classes.success_message_icon}>
            <circle fill="#3DC480" cx="38" cy="38" r="36"/>
            <path fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M17.7,40.9l10.9,10.9l28.7-28.7"/>
        </svg>
        <h1 className={classes.success_message_title}>Message Received</h1>
        <div className={classes.success_message_content}>
            <p>We will respond in approximately 34 minutes</p>
        </div>
    </div>
  </Layout>
);

export default Success;