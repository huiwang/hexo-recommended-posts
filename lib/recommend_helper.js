module.exports = function (post, site) {
    var recommended = site.data.recommended_posts;
    if (recommended === undefined || recommended[post.permalink] === undefined) {
        var recommended_posts_config = this.config.recommended_posts;
        var internal = recommended_posts_config.internalLinks;
        var external = recommended_posts_config.externalLinks;
        return recommendOffline(internal + external, post.prev, post.next, []);
    } else {
        return recommended[post.permalink];
    }
}

function recommendOffline(total, left, right, posts) {
    if (posts.length == total) return posts;

    if (right != undefined) {
        posts.push(right);
        if (posts.length == total) return posts;
    }

    if (left != undefined) {
        posts.unshift(left);
    }

    if (left === undefined && right === undefined)
        return posts;
    else if (left === undefined) {
        return recommendOffline(total, left, right.next, posts);
    } else if (right === undefined) {
        return recommendOffline(total, left.prev, right, posts);
    } else {
        return recommendOffline(total, left.prev, right.next, posts);
    }
}


