---
path: "/gatsby_theme_binder"
title: Connecting Gatsby to Jupyter for static code execution
description: Lets power a gatsby wesbite with kernels from jupyter notebooks to execute code and render results with server sent events in markdown components.
type: post
image: ../images/gatsby_theme_binder.jpg
tags:
  - Gatsby
  - Jupyter
date: 2018-06-08 07:00:00
---

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/ff0693nes2p61bm22ct3.jpg)

&nbsp;

<devcard id='257536'></devcard>

Many of us know the great benefits of using gatsby. In 2020, writing your content from markdown is very popular and has many different benefits in terms of SEO, delivery, and performance. None the less, able to integrate react components into your static content written in markdown. We all know this.

Well, we also have seen examples of Gatsby used in the context if SSR. It is a little tricky in Gatsby without the capabilities of using Suspense and Lazy loading. Although, with server sent events, we can empower a gatsby static website with an active kernel from Jupyter Notebooks.

# What is Jupyter

Jupyter Notebooks are commonly used for data science and bring the capability to build notebooks of code with active execution for discovery purposes.

# What is Binder

[MyBinder](https://mybinder.org) is a website that launches a docker image of your repository with the dependencies as a jupyter notebook. For example, I can launch a repository with python and its project dependencies, and open a jupyter notebook with a python2 or 3 kernel and the project dependencies installed from requirements.txt...

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/uixvpqrw9n8wra42wb1e.png)


# Where are you going with all of this?

In [Gatsby Theme Binder](https://github.com/teaglebuilt/gatsby-theme-binder) we can connect to mybinder from server sent events and power our gatsby website with the given kernel your using. Therefore, you can render a remark "markdown" react component that is a text editor, capable of executing code and rendering results just like a shell and cell from jupyter notebooks.


***

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/msckf0778yyo002fjzhd.png)

***


## Reference of Technologies used

You may of heard of jupyterlab. It is a python package that has interface that far exceeds original notebooks with extensible features for customization. Jupyterlab can be extended using NPM packages to their public api.


Below are two NPM packages that I am using to integrate jupyter notebooks into my gatsby site.

<githubreadme user="jupyterlab" repo="jupyterlab"></githubreadme>

***

[JupyterLab - OutputArea](https://github.com/jupyterlab/jupyterlab/tree/master/packages/outputarea)

***

 An interface for interacting with Jupyter, a large project split into packages relative to particular use cases and given functionality.

***

[Jupyterlab - RenderMime](https://github.com/jupyterlab/jupyterlab/tree/master/packages/rendermime-interface)

***

 An interface for interacting with Jupyter, a large project split into packages relative to particular use cases and given functionality

So these two packages above is how I retrieve a given running kernel and interact with it directly through Javascripts [EventSource()](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) class.

The next challenge is how to render the results generated from the kernel. Originally I have used PrismJS and syntax highlighting to display code in my blog. For the purpose of creating interactive code blocks, I dediced to use CodeMirror.

***

[CodeMirror](https://www.npmjs.com/package/codemirror)

 An interface for interacting with Jupyter, a large project split into packages relative to particular use cases and given functionality.


<githubreadme user="codemirror" repo="CodeMirror"></githubreadme>


# How to use it

A base folder is created with two child folders...

```
/whatever you name it
  /code
  /posts

```

/code will hold the code files that you want to render inside your text editor on page load.


Instructions are noted in the readme of the options needed in your gatsby config. One important note is that you will need to import the renderAST component into your page template or layout component and pass in the htmlAST from graphql. This will enable rendering the component in markdown.

To use the component, simply add it to your markdown post with the name of the file and the language

```

<codeblock filename="test" lang="python"></codeblock>

```

### Inspiration

This project was initially inspired by [Min RK](https://github.com/minrk)'s
[Thebelab](https://github.com/minrk/thebelab) package. Then finding [Juniper](https://github.com/ines/juniper). The goal is take this functionality wrapped into a gatsby package that allows for customization and accesibility.


<sociallinks title="Gatsby & Jupyter" path="jupyter&gatsby" description="Integrating kernels from Jupyter into Gatsby with server side events. Interactive code blocks with code execution powered by kernels from jupyter!"></sociallinks>


<banner author="Dillan Teagle"></banner>