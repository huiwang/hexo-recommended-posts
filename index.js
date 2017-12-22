hexo.extend.generator.register('recommended_posts_uploader', require('./lib/uploader'));
hexo.extend.tag.register('recommended_posts', require('./lib/recommender')(hexo), {async: true});