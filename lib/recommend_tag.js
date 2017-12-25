var recommend = require('./recommend')

module.exports = function (hexo) {
    var recommended_posts_config = hexo.config.recommended_posts;
    var internal = recommended_posts_config.internalLinks;
    var external = recommended_posts_config.externalLinks;
    var totalLinks = internal + external;
    return function () {
        var recommended_posts = this.site.data.recommended_posts;
        var links = recommend(recommended_posts, totalLinks, this);
        if (links.length == 0) return "";
        var lists = links.map(link => {
            return '<li><a href="' + link.permalink + '">' + link.title + '</a></li>'
        }).join('');
        return '<div class="recommended_posts"><ul>' + lists +  '</ul></div>';
    }
}




