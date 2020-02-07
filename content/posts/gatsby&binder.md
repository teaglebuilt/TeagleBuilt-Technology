---
path: "/binary_commands_over_tcp"
title: Connecting Gatsby to Jupyter for static code execution
description: Lets power a gatsby wesbite with kernels from jupyter notebooks to execute code and render results with server sent events in markdown components.
type: post
image: ../images/jupyter_gatsby.jpg
tags:
  - Gatsby
  - Jupyter
date: 2018-06-08 07:00:00
---


# Explain yourself!

**ok ok ok**. For those of you who might have been intrieved by the idea that you could integrate jupyter notebooks with a gatsby site, then you are probably wondering why and what that might look like. Well im going to explain my use case and demonstrate it as well!

---

## Reference of Technologies used

You may of heard of jupyterlab. It is a python package that has interface that far exceeds original notebooks with extensible features for customization. Jupyterlab can be extended using NPM packages to their public api.

<githubreadme user="jupyterlab" repo="jupyterlab"></githubreadme>


Below are two NPM packages that I am using to integrate jupyter notebooks into my gatsby site.


*  [JupyterLab - OutputArea](https://github.com/jupyterlab/jupyterlab/tree/master/packages/outputarea)
    -   An interface for interacting with Jupyter, a large project split into packages relative to particular use cases and given functionality.

*  [Jupyterlab - RenderMime](https://github.com/jupyterlab/jupyterlab/tree/master/packages/rendermime-interface)
    -   An interface for interacting with Jupyter, a large project split into  packages relative to particular use cases and given functionality


So these two packages above is how I retrieve a given running kernel and interact with it directly through Javascripts [EventSource()](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)  class.

The next challenge is how to render the results generated from the kernel. Originally I have used PrismJS and syntax highlighting to display code in my blog. For the purpose of creating interactive code blocks, I dediced to use CodeMirror.

*  [CodeMirror](https://www.npmjs.com/package/codemirror)
    -   An interface for interacting with Jupyter, a large project split into packages relative to particular use cases and given functionality.

<githubreadme user="codemirror" repo="CodeMirror"></githubreadme>



<sociallinks title="Gatsby & Jupyter" path="jupyter&gatsby" description="Integrating kernels from Jupyter into Gatsby with server side events. Interactive code blocks with code execution powered by kernels from jupyter!"></sociallinks>


<banner author="Dillan Teagle"></banner>