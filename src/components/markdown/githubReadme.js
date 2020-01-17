import React from "react"
// import styled from "styled-components"
import classes from "../../styles/layout.module.sass"


class GithubReadme extends React.Component {

    state = {
        loading: true,
        error: false,
        description: "",
        languages: ""
    }

    componentDidMount(){
        this.collectData()
    }

    collectData = async () => {
        const result = await fetch(`https://api.github.com/repos/${this.props.user}/${this.props.repo}`)
        const resultData = await result.json()
        const languages = await fetch(`https://api.github.com/repos/${this.props.user}/${this.props.repo}/languages`)
        const languageData = await languages.json()
        const percentByLang = this.getPercentagePerKey(languageData)
        this.setState({
            description: resultData.description,
            languages: percentByLang
        })
    }

    getPercentagePerKey(languageData) {
        var sum = this.getSum(languageData);
        var langsWithPercentages = {};
        const langs = Object.keys(languageData)
        const values = Object.values(languageData)
        for(var i = 0; i < values.length; i++){
            let val = values[i]
            var percent = (val / sum) * 100;
            langsWithPercentages[langs[i]] = percent
        }
        return langsWithPercentages;
    }

    getSum = (languageData) => {
        let sum = 0;
        const values = Object.values(languageData)
        values.forEach(element => {
            sum += element
        });
        return sum;
    }

    render() {
        const { loading, description, languages } = this.state;
        const { user, repo } = this.props;
        console.log(description, languages)
        return(
            <div className={classes.github_readme}>
                <div className={classes.github_languages}>
                {
                    
                    // Object.keys(languages).map((key, index) => {
                    //     if(key === "Python"){
                    //         console.log(languages[key], languages[index])
                    //         const Language = styled.span`
                    //             background-color: #3277b0;
                    //             width: 100%;
                    //             height: 10px;
                    //             border-top-right-radius: 5px;
                    //             border-top-left-radius: 5px;`
                    //             return(
                    //                 <Language></Language>
                    //             )
                    //     } else if(key === "Shell") {
                    //         const Language = styled.span`
                    //             background-color: #89e051;
                    //             width: 100%;
                    //             height: 10px;
                    //             border-top-right-radius: 5px;
                    //             border-top-left-radius: 5px;`
                    //             return(
                    //                 <Language></Language>
                    //             )
                    //     }
                    // })
                }</div>
                <div className={classes.overview}>
                    <h2>
                        <span><svg
                            width="27px"
                            height="27px"
                            role="img"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg></span>
                            {user}/{repo}
                    </h2>
                    <h3>{description}</h3>
                    
                </div>
                <div className={classes.overview}>
    
                </div>
                <div className={classes.github_body}>
    
                </div>
                <div className={classes.gh_btn_container}>
                    <a className={classes.gh_btn}></a>
                </div>
            </div>
        )
    }
}

export default GithubReadme