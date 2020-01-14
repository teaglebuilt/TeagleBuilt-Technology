import React from "react"
import rehypeReact from "rehype-react"
import Challenge from "./components/challenge"
import { Link } from "./components/link"
import CodeBlock from "./components/codeblock"
import Banner from "./components/banner"
import ToggleIframe from "./components/toggleIframe"


export const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    challenge: Challenge,
    codeblock: CodeBlock,
    a: Link,
    banner: Banner,
    toggleiframe: ToggleIframe
  },
}).Compiler
