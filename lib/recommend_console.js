var rp = require('request-promise');
var Promise = require('bluebird');
var fs = require('hexo-fs');
var pathFn = require('path');
var join = pathFn.join;

module.exports = function generateConsole(args) {
  var log = this.log;

  var config = this.config;
  var recommended_posts_config = config.recommended_posts;
  var server = recommended_posts_config.server;
  var timeoutInMillis = recommended_posts_config.timeout;
  var internal = parseInt(recommended_posts_config.internalLinks);
  var external = parseInt(recommended_posts_config.externalLinks);

  var source_dir = this.source_dir;
  var dest_file = '_data/recommended_posts.json';
  var dest = join(source_dir, dest_file);

  var Post = this.model('Post');

  this.load().then(function () {

    Promise.all(Post.map(post => {
      if (post.tags.data.length == 0) {
        log.warn('To have better recommendation, specify tags for ' + post.title);
      }
      return rp({
        method: 'POST',
        baseUrl: server,
        uri: 'posts',
        body: {
          permalink: post.permalink,
          title: post.title,
          tags: post.tags.data.map(tag => tag.name)
        },
        json: true,
        timeout: timeoutInMillis
      }).promise();
    })).map(function (post) {
      return Promise.all([post.permalink, rp({
        baseUrl: server,
        uri: 'recommendation',
        qs: {
          permalink: post.permalink,
          internal: internal,
          external: external
        },
        json: true,
        timeoutInMillis: timeoutInMillis
      }).promise()]);
    }).reduce( function (result, recommendation) {
      result[recommendation[0]]=recommendation[1];
      return result;
    }, {}).then(function (result) {
      return fs.writeFile(dest, JSON.stringify(result));
    }).then(function(){
      log.info("Recommended posts downloaded succesfully to " + dest_file)
    }).catch(function (error) {
      log.info("Unable to download recommendatoin from server", error);
    });
  });

}
