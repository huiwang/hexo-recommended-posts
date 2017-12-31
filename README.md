[![npm version](https://badge.fury.io/js/hexo-recommended-posts.svg)](https://badge.fury.io/js/hexo-recommended-posts)
[![Join the chat at https://gitter.im/hexo-recommended-posts/Lobby](https://badges.gitter.im/hexo-recommended-posts/Lobby.svg)](https://gitter.im/hexo-recommended-posts/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[中文](README.md) | [English](README-en.md)

# Hexo跨博客文章推荐插件
此插件通过文章推荐的方式帮助你推广博客。它从[推荐服务器](https://github.com/huiwang/encore)里获取文章推荐列表，列表里既有你自己的文章，也有使用此服务的其他博主的文章。

在安装使用之前，您可以[实时预览](http://hui-wang.info/2017/12/02/%E5%AD%A6%E4%B9%A0%E5%A6%82%E4%BD%95%E5%AD%A6%E4%B9%A0/)该插件的效果。

# 如何使用
## 1. 安装文章推荐插件：

```
npm install hexo-recommended-posts --save
```

## 2. 下载推荐文章列表

在编辑完新的文章之后，使用如下命令获取推荐列表
```
hexo recommend
```
## 3. 显示推荐文章

如果您使用下面其中一款主题，只需在主题的配置文件里激活推荐文章功能
- [hexo-theme-freemind](https://github.com/wzpan/hexo-theme-freemind)

```
# Recommended posts
# Dependency: https://github.com/huiwang/hexo-recommended-posts
recommended_posts:
  enabled: true
```

否则，您需要自己动手添加主题支持，Hexo有两个比较流行的渲染器：
- EJS ：请参看[hexo-theme-freemind](https://github.com/wzpan/hexo-theme-freemind/pull/77/files)的配置
- SWIG：请参看[hexo-next-them](https://github.com/iissnan/hexo-theme-next/pull/2054/files)的配置

如果您是主题的维护者，请在配置完毕之后联系我，我会把您的主题加入到支持该插件的列表中。

# 常见问题
- 如何自定义推荐文章参数？

可以在博客根目录的`_config.yml`里来覆盖下面的默认配置：
```
recommended_posts:
  server: https://api.truelaurel.com #后端推荐服务器地址
  timeoutInMillis: 5000 #服务时长，超过此时长，则使用离线推荐模式
  internalLinks: 3 #内部文章数量
  externalLinks: 1 #外部文章数量
```

- 当无法连接推荐服务器时，插件如何工作？

当服务器无法使用时，对旧文章，插件会使用原有的推荐列表；对新文章，将使用离线推荐算法推荐内部文章。

# 致谢

我想感谢朋友们对此插件的贡献，谢谢他们极具建设性的意见和快速的测试反馈
- [reuixiy](https://reuixiy.github.io/)
- [sd44](http://sd44.github.io/)
