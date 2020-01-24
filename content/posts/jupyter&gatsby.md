---
title: "Gatsby & Jupyter"
description: Integrating kernels from Jupyter into Gatsby with server side events. Interactive code blocks with code execution powered by kernels from jupyter!
image: ../images/jupyter_gatsby.jpg
type: post
tags:
  - Gatsby
  - Jupyter
  - Python
id: 1
date: 2018-10-23 07:00:00
---

# Explain yourself!

**ok ok ok**. For those of you who might have been intrieved by the idea that you could integrate jupyter notebooks with a gatsby site, then you are probably wondering why and what that might look like. Well im going to explain my use case and demonstrate it as well!

---

## Reference of Technologies used

You may of heard of jupyterlab. It is a python package that has interface that far exceeds original notebooks with extensible features for customization. Jupyterlab can be extended using NPM packages to their public api.

<githubreadme user="jupyterlab" repository="jupyterlab"></githubreadme>


Below are two NPM packages that I am using to integrate jupyter notebooks into my gatsby site.


*  [JupyterLab - OutputArea](https://github.com/jupyterlab/jupyterlab/tree/master/packages/outputarea)
    -   An interface for interacting with Jupyter, a large project split into packages relative to particular use cases and given functionality.

*  [Jupyterlab - RenderMime](https://github.com/jupyterlab/jupyterlab/tree/master/packages/rendermime-interface)
    -   An interface for interacting with Jupyter, a large project split into  packages relative to particular use cases and given functionality


So these two packages above is how I retrieve a given running kernel and interact with it directly through Javascripts [EventSource()](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)  class.

The next challenge is how to render the results generated from the kernel. Originally I have used PrismJS and syntax highlighting to display code in my blog. For the purpose of creating interactive code blocks, I dediced to use CodeMirror.

*  [CodeMirror](https://www.npmjs.com/package/codemirror)
    -   An interface for interacting with Jupyter, a large project split into packages relative to particular use cases and given functionality.

<githubreadme user="codemirror" repository="CodeMirror"></githubreadme>



The only downside right now is the first visit to the website, it will take some time to render the first result because it has to build and launch the docker container to run and return the results. Although, from then on, the kernel is stored in local storage and can quickly render results back to the user.

This is perfect for creating a series of coding challenges, tutorials, etc...


<challenge id="1" title="test">

Below is a demonstration of rendering results from a jupyter kernel. Please complete the simple challenge below. **click run code when finished.**

  <codeblock source="exc_01_01_01">
  </codeblock>
  
</challenge>

## Credit

This project was inspired by

<githubreadme user="minrk" repository="thebelab"></githubreadme>

<sociallinks title="Gatsby & Jupyter" path="jupyter&gatsby" description="Integrating kernels from Jupyter into Gatsby with server side events. Interactive code blocks with code execution powered by kernels from jupyter!"></sociallinks>


<banner author="Dillan Teagle"></banner>