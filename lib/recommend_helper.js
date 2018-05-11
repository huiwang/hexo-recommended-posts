var recommend = require('./recommend');
var extractConfig = require('./recommend_config');

module.exports = function (post, site) {
    var recommended_posts = site.data.recommended_posts;
    var rp_config = extractConfig(this.config);
    var internal = rp_config.internalLinks;
    var external = rp_config.externalLinks;
    var totalLinks = internal + external;
    return recommend(recommended_posts, totalLinks, post, rp_config);
}


