const default_config =  {
    "server": "https://api.truelaurel.com",
    "timeoutInMillis": 10000,
    "internalLinks": 3,
    "externalLinks": 1,
    "fixedNumber": false,
    "autoDisplay": true,
    "excludePattern": [],
    "titleHtml": '<h1>推荐文章<span style="font-size:0.45em; color:gray">（由<a href="https://github.com/huiwang/hexo-recommended-posts">hexo文章推荐插件</a>驱动）</span></h1>'

}

module.exports = function extractConfig(env) {
    return Object.assign({}, default_config, env.recommended_posts);
}