---
title: flowchart in markdown 
date: 2020-03-11
tags:
  - markdown
---
>markdown 中使用流程图
<!-- more -->
## flowchart

流程图结构很清晰，每一个节点都衍生出一条线，所以若需要树图之类的还得使用其他工具进行截图

## 流程图节点实现:

MarkDown 中的流程图语法叫 flow, 该语法只有两个注意事项:

- 定义元素
- 连接定义好的元素

定义元素
```markdown
tag=type:content:url
``` 
- tag:标签，用于连接元素时使用，相当于是定义了一个常量
- =:标签定义等式。
- type:该标签的类型。共有 6 种类型如下:
  start 开始 end 结束 operation 流程操作 subroutine 预定子流程 condition 条件判断 input output 输入输出
- content:流程语句中放置的内容
- type: 与 content 之间一定要有一个空格，否则会出问题
- url:指向链接，与流程语句绑定，选填。

## 连接元素

定义好一些变量后开始绘图，而不是边写边定义

使用`-`符号
在代码块标志```后加上 flow 即可:vuepress 中使用:@flowstart @flowend

```markdown
s=start: 开始
e=end: 结束
o=operation: 操作项
s->o->e
```

## end

MarkDown 画流程图一般简单图绘画即可，复杂的还是用 OneNote 或者其他绘画工具再截图比较好
