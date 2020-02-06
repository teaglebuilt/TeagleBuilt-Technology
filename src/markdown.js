import React from "react"
import rehypeReact from "rehype-react"
import { Link } from "./components/link"
import Banner from "./components/markdown/banner"
import ToggleIframe from "./components/markdown/toggleIframe"
import GithubReadme from "./components/markdown/github/githubReadme"
import SocialLinks from "./components/markdown/sociallinks"


export const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    a: Link,
    banner: Banner,
    toggleiframe: ToggleIframe,
    githubreadme: GithubReadme,
    sociallinks: SocialLinks
  },
}).Compiler
