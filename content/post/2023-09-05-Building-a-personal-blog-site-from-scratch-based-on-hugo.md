---
title:       "Building a personal BlogSite from scratch (based on hugo)"
subtitle:    "teach you how to build your own website"
description: ""
date:        2023-09-04
author:      "SLY"
image:       ""
tags:        ["website", "personal blog"]
categories:  ["OTHER" ]
---


### 1.环境搭建

#### 1）安装Homebrew

brew是一个在 macOS 操作系统上用于管理软件包的包管理器。类似于centos下的yum或者ubuntu下的apt，它允许用户通过命令行安装、更新和管理各种软件工具、库和应用程序。 

前往hb官网，复制下载命令，打开终端进行粘贴（建议能科学上网的使用）：

![image-20230901113705872](/mdimg/image-20230901113705872.png)

安装完成后根据指示，进行系统路径的添加，依次在终端输入它给到你的命令：

![image-20230901113850951](/mdimg/image-20230901113850951.png)

前者是在您的用户目录下的 `.zprofile` 文件中添加一行内容，以确保 Homebrew 在每次启动终端时都能正确设置；后者将立即执行之前添加到 `.zprofile` 文件的内容，将 Homebrew 添加到当前终端会话的路径中。操作完成后输入brew 检查是否安装成功

![image-20230901114044387](/mdimg/image-20230901114044387.png)

至此，hb安装完成。

#### 2）安装Hugo 

打开终端输入命令：

> brew install hugo

![image-20230901114853344](/Users/sunlongyu/Library/Application Support/typora-user-images/image-20230901114853344.png)

### 2.生成博客

使用命令：

> hugo new site personalblog

![image-20230901143644815](/Users/sunlongyu/Library/Application Support/typora-user-images/image-20230901143644815.png)

此时你的电脑中已经生成了文件夹personalblog

### 3.设置主题

前往[hugo官网][https://themes.gohugo.io/],找到自己喜欢的主题，点击后可以看到下载方法，按照要求进行下载

在终端目录下输入命令，就能成功设置主题并在本地运行个人博客:

![image-20230901170559557](/mdimg/image-20230901170559557.png)

### 4.将博客部署到github上

#### 1）新建仓库

前往GitHub上新建一个仓库，注意命名要与github用户名一致

![image-20230903204416874](/mdimg/image-20230903204416874.png)

#### 2）部署
在命令行输入以下指令生成public文件：

> hugo --theme=hugo-theme-cleanwhite --baseUrl="https://sunlongyu.github.io/" --buildDrafts

![image-20230904131833281](/Users/sunlongyu/Library/Application Support/typora-user-images/image-20230904131833281.png)

将本地项目public文件推送到仓库中：

> cd public
>
> git add .
>
> git commit -m "first update"
>
> git remote add origin https://github.com/sunlongyu/sunlongyu.github.io.git
>
> git push -u origin master

![image-20230904135957565](/Users/sunlongyu/Library/Application Support/typora-user-images/image-20230904135957565.png)

仓库更新后就可以访问之前设置的域名进行访问了