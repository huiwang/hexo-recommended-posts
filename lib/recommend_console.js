var rp = require('request-promise');
var Promise = require('bluebird');
var fs = require('hexo-fs');
var pathFn = require('path');
var join = pathFn.join;
var extractConfig = require('./recommend_config');


module.exports = function generateConsole(args) {
  var log = this.log;

  var config = this.config;
  var rp_config = extractConfig(config);

  var source_dir = this.source_dir;
  var dest_file = '_data/recommended_posts.json';
  var dest = join(source_dir, dest_file);

  var Post = this.model('Post');

  this.load().then(function () {
    const start = new Date().getTime();

    log.info("Start fetching recommendation with config " + JSON.stringify(rp_config))

    const request_posts = Post.filter(post => post.published).map(post => {
      return {
        title: post.title,
        permalink: post.permalink,
        tags: post.tags.data.map(tag => tag.name),
        updated: post.date.toISOString()
      };
    });

    const request_body = {
      internal: rp_config.internalLinks,
      external: rp_config.externalLinks,
      site: {
        domain: config.url,
        posts: request_posts
      }
    }

    const options = {
      method: 'POST',
      baseUrl: rp_config.server,
      uri: 'recommendation',
      body: request_body,
      json: true
    };

    
    rp(options)
      .then(function (result) {
        return fs.writeFile(dest, JSON.stringify(result));
      })
      .then(function () {
        const end = new Date().getTime();
        log.info("All recommended posts downloaded succesfully to " + dest_file + " in " + (end - start) / 1000 + "s")
      })
      .catch(function (error) {
        log.info("Unable to download recommendatoin from server", error);
      });
  })
}
