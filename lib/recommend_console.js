const https = require('https');
const url = require('url');
const fs = require('hexo-fs');
const pathFn = require('path');
const join = pathFn.join;
const extractConfig = require('./recommend_config');

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

    const request_body = JSON.stringify({
      internal: rp_config.internalLinks,
      external: rp_config.externalLinks,
      site: {
        domain: config.url,
        posts: request_posts
      }
    });

    const options = {
      hostname: url.parse(rp_config.server).hostname,
      method: 'POST',
      path: '/recommendation',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(request_body)
      }
    };
    var result = "";
    const req = https.request(options, response => {
      response.on("data", d => {
        result += d;
      })
      response.on("end", () => {
        fs.writeFile(dest, result);
        const end = new Date().getTime();
        const duration = (end - start) / 1000;
        log.info("All recommended posts downloaded succesfully to " + dest_file + " in " + duration + "s")
      })
    });
    req.on("error", error => log.info("Unable to download recommendatoin from server", error));
    req.write(request_body);
    req.end();
  })
}
