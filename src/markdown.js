import React from "react"
import rehypeReact from "rehype-react"
import { Link } from "./components/link"
import Banner from "./components/markdown/banner"
import ToggleIframe from "./components/markdown/toggleIframe"
import SocialLinks from "./components/markdown/sociallinks"
import Readme from "./components/markdown/github/readme"
import DevCard from "./components/markdown/devto/card"


export const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    a: Link,
    banner: Banner,
    toggleiframe: ToggleIframe,
    sociallinks: SocialLinks,
    githubreadme: Readme,
    devcard: DevCard
  },
}).Compiler
