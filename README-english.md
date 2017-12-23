# Hexo Recommended Posts
This plugin promotes co-participation among bloggers. By recommending posts between blogs, we hope to increase your posts exposure to more readers, which allows to collect more feedbacks from readers and thus improve your blog's quality.

# How it works
This plugin generate a recommended posts list. For instance, you can have three internal links and one external link in the list. The more bloggers participate, the bigger odds you'll have your posts refered by other bloggers.

# Get started
1. Install the plugin
```
npm install hexo-recommended-posts --save
```
2. Add configuration to `_config.yml` in blog root folder：
```
recommended_posts:
  server: http://api.truelaurel.com # backend server url
  timeoutInMillis: 5000 #timeout, empty list returned when timeouts
  internalLinks: 3 # internal links in the generated list
  externalLinks: 1 # external links in the generated list
```

3. Insert the tag `{% recommended_posts %}` in post markdonw to generate the list：
```
---
title: post title
date: 2017-12-22 21:54:35
tags:
- post tage
---
Content
### Recommended posts by [Encore](https://github.com/huiwang/encore)
{% recommended_posts %}
```
