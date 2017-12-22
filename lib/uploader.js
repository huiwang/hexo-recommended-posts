var rp = require('request-promise');

module.exports = function (locals) {
    var log = this.log;
    var config = this.config;
    var recommended_posts_config = config.recommended_posts;

    var server = recommended_posts_config.server;
    var timeoutInMillis = recommended_posts_config.timeout;

    locals.posts.forEach(post => {
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
        }).then(function (body) {
            log.info('Post ' + post.title + ' uploaded to recommendation server')
        }).catch(function (err) {
            log.warn('Unable to upload post ' + post.title + ' to recommendation sever ' + err.message);
        });
    });
}