import React from "react"
import ReactMarkdown from "react-markdown/with-html"
import htmlParser from 'react-markdown/plugins/html-parser'
import config from "../../../../config/site"
import classes from "../../../styles/layout.module.sass"
import LanguageGraph from "./languageGraph"
import LanguageStats from "./languageStats"



class GithubReadme extends React.Component {

    state = {
        error: false,
        description: "",
        languages: "",
        readme: "",
        statsOpen: false,
        loading: true
    }

    componentDidMount(){
        this.collectData()
    }

    collectData = async () => {
        const result = await fetch(`https://api.github.com/repos/${this.props.user}/${this.props.repo}`, {
            headers: new Headers({
                Authorization: `token ${config.githubAPIToken}`
            })
        })
        const resultData = await result.json()
        const languages = await fetch(`https://api.github.com/repos/${this.props.user}/${this.props.repo}/languages`, {
            headers: new Headers({
                Authorization: `token ${config.githubAPIToken}`
            })
        })
        const languageData = await languages.json()
        const readme = await fetch(`https://api.github.com/repos/${this.props.user}/${this.props.repo}/readme`, {
            headers: new Headers({
                Authorization: `token ${config.githubAPIToken}`
            })
        })
        const readmeHTML = await readme.json()
        const html = atob(readmeHTML.content)
        const percentByLang = this.getPercentagePerKey(languageData)
        this.setState({
            description: resultData.description,
            url: resultData.html_url,
            languages: percentByLang,
            readme: html,
            loading: false
        })
    }

    getPercentagePerKey(languageData) {
        var sum = this.getSum(languageData);
        var langsWithPercentages = {};
        const langs = Object.keys(languageData)
        const values = Object.values(languageData)
        for(var i = 0; i < values.length; i++){
            let val = values[i]
            var percent = Math.round((val / sum) * 100);
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

    parseHtml = htmlParser({
        isValidNode: node => node.type !== 'image',
        processingInstructions: [/* ... */]
    })

    toggleStats = () => {
        this.setState({
            statsOpen: !this.state.statsOpen
        })
    }


    render() {
        const { description, languages, readme, url } = this.state;
        const { user, repo } = this.props;
        if(!this.state.loading){
            return (
              <div className={classes.github_readme}>
                <div
                  className={classes.github_languages}
                  onClick={this.toggleStats}
                >
                  <LanguageGraph languages={languages} />
                </div>
                <div
                  className={
                    this.state.statsOpen
                      ? classes.language_stats
                      : classes.hidden
                  }
                >
                  <LanguageStats languages={languages} />
                </div>
                <div className={classes.overview}>
                  <h2>
                    <span>
                      <svg
                        width="27px"
                        height="27px"
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                    </span>
                    {user}/{repo}
                  </h2>
                  <h3>{description}</h3>
                </div>
                <div className={classes.github_body}>
                  <ReactMarkdown
                    source={readme}
                    escapeHtml={false}
                    transformImageUri={uri =>
                      uri.startsWith("http")
                        ? uri
                        : `${process.env.IMAGE_BASE_URL}${uri}`
                    }
                  />
                </div>
                <div className={classes.gh_btn_container}>
                  <a href={url} className={classes.gh_btn}>
                    View Repo
                  </a>
                </div>
              </div>
            )
        } else {
            return <div><h1>...loading</h1></div>
        }
    }
}


export default GithubReadme