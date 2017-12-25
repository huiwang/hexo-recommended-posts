[中文](README.md) | [English](README-en.md)

# Acknowledgement
First I want to give credit to [reuixiy](https://reuixiy.github.io/) for his contribution on the plugin including his constructive suggestions and prompt testing feedbacks.

# Hexo Recommended Posts Plugin
Recommended posts to promote your blog with both internal and external links. For more motivations, pleaser refer to [开发笔记(dev notes in English, help to translate?)](https://hui-wang.info/2017/12/22/%E5%AE%89%E5%8F%AF%E6%8E%A8%E8%8D%90%E7%B3%BB%E7%BB%9F%E5%BC%80%E5%8F%91%E7%AC%94%E8%AE%B0%EF%BC%881%EF%BC%89/).

# How it works
The plugin downloads lists of recommended posts from a [recommendation server(also open sourced)](https://github.com/huiwang/encore). Such a list includes both internal and external links.
All links are generated statically in your site. Therefore, there's no extra javascripts. This approch should also make your site more search-engine-friendly.

We believe that we can create deeper and broader connections when we favor co-participation.   

Before getting stated, you can [live preview](https://hui-wang.info) results of this plugin.

# Get started

## 1. Install

```
npm install hexo-recommended-posts --save
```
## 2. Configure

In blog root directory, add the following configurations to `_config.yml`
```
recommended_posts:
  server: https://api.truelaurel.com # backend server url
  timeoutInMillis: 5000 # when timeout, switch to offline algorithm
  internalLinks: 3 # internal links in the generated list
  externalLinks: 1 # external links in the generated list
```

## 3. Downlaod recommended posts

After editing a new post, hit the following command to fetch recommended posts.
```
hexo recommend
```
## 4. Show recommended posts

This plugin provides two options to show the recommended posts.
- By inserting `tag` in post markdown (one single post impacted)
- By rendering with `helper` in theme (entire site covered)

### 4.1. Tag

Insert the tag `{% recommended_posts %}` in post markdown, for instance:
```
---
title: post title
date: 2017-12-22 21:54:35
tags:
- post tage
---
Content
### Recommended posts
{% recommended_posts %}
```

### 4.2. Configure theme

We can use the helper `recommended_post(post, site)` in the theme to render the recommended posts:
```
<div class="recommended_posts">
    <% var recommended_posts = recommended_posts(post, site) %>
    <% if(recommended_posts.length > 0) { %>
    <h3>Recommended Posts</h3>
    <ul>
        <% recommended_posts.forEach(function(link) { %>
            <li><a href="<%= link.permalink %>"><%= link.title %></a></li>
        <% }) %>
    </ul>
    <% } %> 
</div>
```
If you use the famous hexo-next-theme，please refer [here (in swig)](https://github.com/huiwang/hexo-theme-next/commit/08d07dd1d4af174d4532dda00b7dbf9cae701f36)。

Please contact me to include your theme in the supported theme list if you are a theme maintainer.

## 5. Generate 

After downloading the lists, run `generate` to include recommended posts.
```
hexo generate
```

