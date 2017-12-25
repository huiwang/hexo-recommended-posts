var recommend = require('./recommend');

module.exports = function (post, site) {
    var recommended_posts = site.data.recommended_posts;
    var recommended_posts_config = this.config.recommended_posts;
    var internal = recommended_posts_config.internalLinks;
    var external = recommended_posts_config.externalLinks;
    var totalLinks = internal + external;
    return recommend(recommended_posts, totalLinks, post);
}


