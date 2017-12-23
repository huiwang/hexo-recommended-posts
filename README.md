# Hexo跨博客文章推荐插件
本插件鼓励博主们互惠互利，互相推荐彼此文章，为各自的文章找到更多的读者，收集反馈，进而提升博客质量。

# 工作原理
本插件会为你的文章生成，比如说，四条推荐文章，其中三条为博客内部文章，一条为其他博客的文章。使用该系统的合作的博主越多，你的博客出现在他人推荐列表中的机会就越大。

# 如何使用
1. 安装文章推荐插件：
```
npm install hexo-recommended-posts --save
```
2. 配置插件
在博客根目录的`_config.yml`里添加插件配置：
```
recommended_posts:
  server: http://api.truelaurel.com #后端推荐服务器地址
  timeoutInMillis: 5000 #服务时长，超过此时长，则生成空文章列表
  internalLinks: 3 #内部文章数量
  externalLinks: 1 #外部文章数量
```

3. 在文章Markdown里插入标签`{% recommended_posts %}`，生成文章列表：
```
---
title: 示例文章标题
date: 2017-12-22 21:54:35
tags:
- 文章标签
---
示例文章正文
### 以下文章由安可推荐提供
{% recommended_posts %}
```
