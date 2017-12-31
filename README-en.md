[![npm version](https://badge.fury.io/js/hexo-recommended-posts.svg)](https://badge.fury.io/js/hexo-recommended-posts)
[![Join the chat at https://gitter.im/hexo-recommended-posts/Lobby](https://badges.gitter.im/hexo-recommended-posts/Lobby.svg)](https://gitter.im/hexo-recommended-posts/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[中文](README.md) | [English](README-en.md)

# Hexo Recommended Posts Plugin
This plugin helps to promote your blog with recommended posts. It downloads recommended posts from a [recommendation server(also open sourced)](https://github.com/huiwang/encore). A recommended post list includes not only your own posts but also those from other bloggers using this service.

Before getting stated, you can [live preview](http://hui-wang.info/2017/12/02/%E5%AD%A6%E4%B9%A0%E5%A6%82%E4%BD%95%E5%AD%A6%E4%B9%A0/) results of this plugin.

# Get started

## 1. Install

```
npm install hexo-recommended-posts --save
```

## 2. Downlaod recommended posts

After editing a new post, hit the following command to fetch recommended posts.
```
hexo recommend
```
## 3. Show recommended posts
If you use one of the following themes
- [hexo-theme-freemind](https://github.com/wzpan/hexo-theme-freemind)

You only need to enable the feature in your theme `_config.yml`:

```
# Recommended posts
# Dependency: https://github.com/huiwang/hexo-recommended-posts
recommended_posts:
  enabled: true
```
Otherwise, you can integrate it manually. There are two popular theme rendering engines in Hexo：
- EJS: refer to config in [hexo-theme-freemind](https://github.com/wzpan/hexo-theme-freemind/pull/77/files)
- SWIG：refer to config in [hexo-next-them](https://github.com/iissnan/hexo-theme-next/pull/2054/files)

Please contact me to include your theme in the supported theme list if you are a theme maintainer.
# FAQ
- How to configure the number of internal and external links?

In blog root directory, you can override the default configuration in `_config.yml`
```
recommended_posts:
  server: https://api.truelaurel.com # backend server url
  timeoutInMillis: 5000 # when timeout, switch to offline algorithm
  internalLinks: 3 # internal links in the generated list
  externalLinks: 1 # external links in the generated list
```

- What will happen if I can't connect to the recommendation server?

When the server is not reachable, the plugin keeps the previously downloaded recommendation for existing posts and switches to an offline algorithm for new posts (only internal links are recommended). 

# Thanks
I want to give credits to the following people for their constructive suggestions and prompt testing feedbacks on the plugin.
- [reuixiy](https://reuixiy.github.io/)
- [sd44](http://sd44.github.io/)
