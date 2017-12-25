hexo.extend.helper.register('recommended_posts', require('./lib/recommend_helper'))

hexo.extend.tag.register('recommended_posts', require('./lib/recommend_tag')(hexo))

hexo.extend.console.register('recommend', 'Downlaod recommended posts from recommendation server', {
    usage: '',
    arguments: []
  }, require('./lib/recommend_console'));