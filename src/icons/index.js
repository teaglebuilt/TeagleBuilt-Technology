import React from "react";
import Python from "./Python";
import Django from "./Django"
import Slack from "./Slack"


const Icon = props => {
    switch(props.name) {
        case 'Python':
            return <Python {...props} />;
        case 'Django':
            return <Django {...props} />
        case 'Slack':
            return <Slack {...props} />
        default:
            return;
    }
}

export default Icon
