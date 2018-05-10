var recommend = require('./recommend');
var extractConfig = require('./recommend_config');

module.exports = function (post) {
    var rp_config = extractConfig(this.config);
    if (!rp_config.autoDisplay) return post;

    var rp_data = this.locals.get('data').recommended_posts;
    var internal = rp_config.internalLinks;
    var external = rp_config.externalLinks;
    var totalLinks = internal + external;
    var rps = recommend(rp_data, totalLinks, post, rp_config);
    if (rps.length > 0) {
        var rps_list = rps.map(post => '<li><a href="' + post.permalink + '">' + post.title + '</a></li>').join('');
        var rps_html = '<div>' + rp_config.titleHtml + '<ul>' + rps_list + '</ul></div>'
        post.content += rps_html;
    }
    return post;
}