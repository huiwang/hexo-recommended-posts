

# Hexo跨博客文章推荐插件
我们鼓励博主们互惠互利，分享资源，互相推荐彼此文章，为大家的文章找到更多的读者。更多动机请看[开发笔记](https://hui-wang.info/2017/12/22/%E5%AE%89%E5%8F%AF%E6%8E%A8%E8%8D%90%E7%B3%BB%E7%BB%9F%E5%BC%80%E5%8F%91%E7%AC%94%E8%AE%B0%EF%BC%881%EF%BC%89/)。

本插件会为您的文章，从[推荐服务器](https://github.com/huiwang/encore)里，下载若干条推荐文章，其中一部分为博客内部文章，一部分为其他博客的文章。使用该系统合作的博主越多，您的文章出现在他人推荐列表中的机会就越大。

在安装使用之前，您可以体验[实时预览](https://hui-wang.info)。

# 如何使用
1. 安装文章推荐插件：

```
npm install hexo-recommended-posts --save
```
2. 配置插件

在博客根目录的`_config.yml`里添加插件配置：
```
recommended_posts:
  server: https://api.truelaurel.com #后端推荐服务器地址
  timeoutInMillis: 5000 #服务时长，超过此时长，则使用离线推荐模式
  internalLinks: 3 #内部文章数量
  externalLinks: 1 #外部文章数量
```

3. 下载推荐文章列表

当你编辑完新的文章之后，使用如下命令获取推荐列表
```
hexo recommend
```

4. 配置主题

博客主题可以使用本插件提供的Helper `recommended_post(post, site)`来显示推荐文章。下面提供一个配置示例，请根据您的具体需求进行修改

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

如果您是主题的维护者，请在配置完毕之后联系我，我会把您的主题加入到支持推荐文章的主题列表中。

4. 生成博客
下载完列表之后，生成博客，推荐文章将会按照主题的配置加入到相应的页面
```
hexo generate
```
