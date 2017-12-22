var rp = require('request-promise');

module.exports = function (hexo) {
    return function (args) {
        var log = hexo.log;
        var config = hexo.config;
        var recommended_posts_config = config.recommended_posts;

        var server = recommended_posts_config.server;
        var timeoutInMillis = recommended_posts_config.timeout;
        var internal = parseInt(recommended_posts_config.internalLinks);
        var external = parseInt(recommended_posts_config.externalLinks);

        var post = this;

        return rp({
            baseUrl: server,
            uri: 'recommendation',
            qs: {
                permalink: post.permalink,
                internal: internal,
                external: external
            },
            json: true,
            timeoutInMillis: timeoutInMillis
        }).then(function (links) {
            if (links.length == 0) {
                log.warn("No posts recommended by the server for " + post.title);
            } else {
                var items = links.map(link => '<li><a href="' + link.permalink + '">' + link.title + '</a></li>');
                return '<div class="recommended_posts"><ul>' + items.join("\n") + '</ul></div>';
            }
        }).catch(function (err) {
            log.warn("Unable to fetch recommendation from server " + err.message);
        });
    }
}