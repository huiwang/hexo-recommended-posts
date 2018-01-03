hexo.extend.helper.register('recommended_posts', require('./lib/recommend_helper'));
hexo.extend.filter.register('after_post_render', require('./lib/recommend_filter'));
hexo.extend.console.register('recommend', 'Downlaod recommended posts from recommendation server', {
    usage: '',
    arguments: []
  }, require('./lib/recommend_console'));