import React from "react"
import styled from "styled-components"
import classes from "../../../styles/layout.module.sass"

const LanguageStats = (languages) => {
  return (
    <ol className={classes.percentages}>
      {Object.entries(languages).map(key => {
        if (key[0] === "Python") {
          const LanguageColor = styled.span`
            background-color: #3572a5;
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 5px;
          `
          return (
            <li className={classes.percent_li}>
              <p className={classes.percent}>
                <LanguageColor></LanguageColor>
                <span>{key[0]}</span>
                <span>{`${key[1]}%`}</span>
              </p>
            </li>
          )
        } else if (key[0] === "Shell") {
          const LanguageColor = styled.span`
            background-color: #89e051;
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 5px;
          `
          return (
            <li className={classes.percent_li}>
              <p className={classes.percent}>
                <LanguageColor></LanguageColor>
                <span>{key[0]}</span>
                <span>{`${key[1]}%`}</span>
              </p>
            </li>
          )
        } else if (key[0] === "Vue") {
          const LanguageColor = styled.span`
            background-color: #3fb381;
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 5px;
          `
          return (
            <li className={classes.percent_li}>
              <p className={classes.percent}>
                <LanguageColor></LanguageColor>
                <span>{key[0]}</span>
                <span>{`${key[1]}%`}</span>
              </p>
            </li>
          )
        } else if (key[0] === "JavaScript") {
          const LanguageColor = styled.span`
            background-color: #e9d64d;
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 5px;
          `
          return (
            <li className={classes.percent_li}>
              <p className={classes.percent}>
                <LanguageColor></LanguageColor>
                <span>{key[0]}</span>
                <span>{`${key[1]}%`}</span>
              </p>
            </li>
          )
        } else if (key[0] === "Makefile") {
          const LanguageColor = styled.span`
            background-color: #427919;
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 5px;
          `
          return (
            <li className={classes.percent_li}>
              <p className={classes.percent}>
                <LanguageColor></LanguageColor>
                <span>{key[0]}</span>
                <span>{`${key[1]}%`}</span>
              </p>
            </li>
          )
        } else if (key[0] === "HTML") {
          const LanguageColor = styled.span`
            background-color: #de4b24;
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 5px;
          `
          return (
            <li className={classes.percent_li}>
              <p className={classes.percent}>
                <LanguageColor></LanguageColor>
                <span>{key[0]}</span>
                <span>{`${key[1]}%`}</span>
              </p>
            </li>
          )
        } else if (key[0] === "Dockerfile") {
          const LanguageColor = styled.span`
            background-color: #2c3e50;
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 5px;
          `
          return (
            <li className={classes.percent_li}>
              <p className={classes.percent}>
                <LanguageColor></LanguageColor>
                <span>{key[0]}</span>
                <span>{`${key[1]}%`}</span>
              </p>
            </li>
          )
        } else if (key[0] === "RobotFramework") {
          const LanguageColor = styled.span`
            background-color: #d44d4a;
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 5px;
          `
          return (
            <li className={classes.percent_li}>
              <p className={classes.percent}>
                <LanguageColor></LanguageColor>
                <span>{key[0]}</span>
                <span>{`${key[1]}%`}</span>
              </p>
            </li>
          )
        } else if (key[0] === "CSS") {
          const LanguageColor = styled.span`
            background-color: #563e76;
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 5px;
          `
          return (
            <li className={classes.percent_li}>
              <p className={classes.percent}>
                <LanguageColor></LanguageColor>
                <span>{key[0]}</span>
                <span>{`${key[1]}%`}</span>
              </p>
            </li>
          )
        } else if (key[0] === "Vim script") {
          const LanguageColor = styled.span`
            background-color: #199f4b;
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 5px;
          `
          return (
            <li className={classes.percent_li}>
              <p className={classes.percent}>
                <LanguageColor></LanguageColor>
                <span>{key[0]}</span>
                <span>{`${key[1]}%`}</span>
              </p>
            </li>
          )
        } else {
          const LanguageColor = styled.span`
            background-color: #ededed;
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 5px;
          `
          return (
            <li className={classes.percent_li}>
              <p className={classes.percent}>
                <LanguageColor></LanguageColor>
                <span>{key[0]}</span>
                <span>{`${key[1]}%`}</span>
              </p>
            </li>
          )
        }
      })}
    </ol>
  )
}

export default LanguageStats
