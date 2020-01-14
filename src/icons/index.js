import React from "react";
import Python from "./Python";
import Django from "./Django"
import Slack from "./Slack"
import Gatsby from "./Gatsby"
import Jupyter from "./Jupyter"
import CodeSandbox from "./CodeSandbox"
import Codepen from "./Codepen"


const Icon = props => {
    switch(props.name) {
        case 'Python':
            return <Python {...props} />;
        case 'Django':
            return <Django {...props} />
        case 'Slack':
            return <Slack {...props} />
        case 'Gatsby':
            return <Gatsby {...props} />
        case 'Jupyter':
            return <Jupyter {...props} />
        case 'Codesandbox':
            return <CodeSandbox {...props} />
        case 'Codepen':
            return <Codepen {...props} />
        default:
            return;
    }
}

export default Icon
