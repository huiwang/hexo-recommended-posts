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

    log.info("Start fetching recommendation with config " +  JSON.stringify(rp_config))
    Promise.all(Post.filter(post => post.published).map(post => {
      if (post.tags.data.length == 0) {
        log.warn('To have better recommendation, specify tags for ' + post.title);
      }
      return rp({
        method: 'POST',
        baseUrl: rp_config.server,
        uri: 'posts',
        body: {
          permalink: post.permalink,
          title: post.title,
          tags: post.tags.data.map(tag => tag.name)
        },
        json: true,
        timeout: rp_config.timeoutInMillis
      }).promise();
    })).map(function (post) {
      log.info("Uploaded post to server " + post.permalink)
      return Promise.all([post.permalink, rp({
        baseUrl: rp_config.server,
        uri: 'recommendation',
        qs: {
          permalink: post.permalink,
          internal: rp_config.internalLinks,
          external: rp_config.externalLinks
        },
        json: true,
        timeoutInMillis: rp_config.timeoutInMillis
      }).promise()]);
    }).reduce(function (result, recommendation) {
      log.info("Downloaded recommended posts for " + recommendation[0])
      result[recommendation[0]] = recommendation[1];
      return result;
    }, {}).then(function (result) {
      return fs.writeFile(dest, JSON.stringify(result));
    }).then(function () {
      const end = new Date().getTime();
      log.info("All recommended posts downloaded succesfully to " + dest_file + " in " + (end - start)/1000 + "s")
    }).catch(function (error) {
      log.info("Unable to download recommendatoin from server", error);
    });
  });

}
