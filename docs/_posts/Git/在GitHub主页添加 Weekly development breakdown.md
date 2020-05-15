---
title: 在 GitHub 主页中添加 📊 Weekly development breakdown (By wakaTIme)
vusse-title: Git gist
date: 2020-05-03
category: Tips
tags:
  - Git
---

[waka-box](https://github.com/matchai/waka-box)官方文档

<!-- more -->

今天在 GitHub 看到一个 [每周不同代码的时间统计](https://github.com/matchai/waka-box)，感觉放在 GitHub 主页挺好，搜了一下也没有教程（因为很少人见过吧），所以总结一下我的使用方法

>感谢 [@sigure](https://www.sigure.xyz/)

## 效果图：

![2020-05-02-20-28-16](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-05-02-20-28-16.png)

![2020-05-02-20-29-02](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-05-02-20-29-02.png)

## 获取 token 以及 wakatime 账户

wakatime 就是一个专门统计写代码时间的一个平台，很多好用的功能都是免费

可以自己每周看一次（自己查看）, 展示在 GitHub 主页中也行（目的）

wakatime 账户用 GitHub 账户登录即可

去 [资料](https://wakatime.com/settings/profile) 里面将下面两个权限　**打开**

![2020-05-02-22-21-24](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-05-02-22-21-24.png)

token 权限给两个就行，workflow 的和 gist 的

## 本地 IDE 绑定

时间统计肯定是要在本地与电脑的写码软件绑定的

所以　wakaTIme 平台提供了与市面上的常见 IDE 的 [插件](https://wakatime.com/plugins)，安装后本地配置一个　[KEY](https://wakatime.com/settings/api-key)　即可

与你的所有 IDE 绑定完成后进入[控制台](https://wakatime.com/dashboard)就会出现下面的统计图

![2020-05-02-23-24-36](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-05-02-23-24-36.png)

现在可以自己查看你的每周 code time 了，统计图还分 IDE 和语言，每周总结一次，成就感满满

## 新名词 Gist

![2020-05-02-20-36-05](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-05-02-20-36-05.png)

项目 README 开始的第一行出现了[Create a new public GitHub Gist](https://gist.github.com/)

[Gist](https://gist.github.com/) 是 Github 的一个子服务。最简单的功能就是分享代码片段，例如把一些小型脚本放到 Gist 方便分享和管理。不同于大型项目使用 repository 进行管理，Gist 就是小型代码片段的分享。类似的服务还有如 Pastebin 和 Pastie, 但明显出生于 Github 的 Gist 更有优势了。
但是 gist 提供的功能不仅限于此。

- gist 能无限制的免费创建私有代码片段，而不被搜索，只有通过浏览器输入其 URL 才能看见。匿名张贴。您不需要拥有 Github 账号就可以使用 Gist。
- gist 具有版本管理功能，像 Github 一样包括历史。可以使用嵌入网页代码功能，会获得一个相应 js 地址，然后如 gist 显示一样显示出内容到网页中
- gist 随同 github 提供了 api 开发接口，可以在本地创建 gist, 可以使用 Git 进行操作。
- gist 提供了包括 markdown 语法在内的大多数“写作风格”, 可以把 Gist 作为一个写作平台使用。
- 可以作为网页收藏夹或者作为云笔记使用。在 chrome 里搜索插件 Gistbox, 然后就可以像云笔记网页剪切一样收藏网页，也可以添加标注和标签便于查找。
- 可以托管一个简单的页面在 Gist 上，例如用纯文本把 HTML-CSS-JS 的代码写为 index.html （不能是 md 文件）, 然后用 bl.ocks 服务将页面渲染出来

大概了解 gist 是个什么东西后

就按照 README 第一步说的创建一个新的公开的 gist  **名字随意**

## 展示在 GitHub homepage

外展时间统计可以让看到的人了解你敲代码的时间放在主页是个不错的选择

开头提到的 https://github.com/matchai/waka-box 就是利用 gist 服务将这个页面放到主页的

因为 GitHub 提供了在主页展示 gist 的功能（展示一个代码片段）

准备一个 gist id （公开的就行，名字随意），再准备上面的 wakatime 的 key，再准备一个 前面说的 token 。

[fork](https://github.com/fengwei2002/wakatime-box) 这个仓库

然后进入 Fork 后的项目这里添加三个 key

![2020-05-04-12-28-41](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-05-04-12-28-41.png)

再添加 gist id 到 `.github` 文件夹下面

再查看一下是否打开 GitHub action

![2020-05-04-12-43-13](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-05-04-12-43-13.png)


数据满一天后就会开始更新到指定的gist中了，当发现action有log后

![2020-05-04-12-45-32](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-05-04-12-45-32.png)

将目标gist展示出来即可