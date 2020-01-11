import React from "react";
import Python from "./Python";


const Icon = props => {
    switch(props.name) {
        case 'Python':
            return <Python {...props} />;
        default:
            return;
    }
}

export default Icon
