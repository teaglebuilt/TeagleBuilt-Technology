import React from "react"
import rehypeReact from "rehype-react"
import Challenge from "./components/challenge"
import { Link } from "./components/link"
import CodeBlock from "./components/codeblock"
import Banner from "./components/markdown/banner"
import ToggleIframe from "./components/markdown/toggleIframe"
import GithubReadme from "./components/markdown/githubReadme"


export const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    challenge: Challenge,
    codeblock: CodeBlock,
    a: Link,
    banner: Banner,
    toggleiframe: ToggleIframe,
    githubreadme: GithubReadme,
  },
}).Compiler
