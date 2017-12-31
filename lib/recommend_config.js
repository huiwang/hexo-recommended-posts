const default_config =  {
    "server": "https://api.truelaurel.com",
    "timeoutInMillis": 10000,
    "internalLinks": 3,
    "externalLinks": 1
}

module.exports = function extractConfig(env) {
    return Object.assign({}, default_config, env.recommended_posts);
}