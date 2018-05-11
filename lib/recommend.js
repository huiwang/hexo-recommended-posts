module.exports = function recommend(recommended_posts, total, post, config) {
    var posts = filterPosts(recommended_posts, post, config.excludePattern)

    if (config.fixedNumber || posts.length === 0 ) {
        return recommendOffline(total, post.prev, post.next, posts);
    } else {
        return posts
    }
}

function filterPosts(recommended_posts, post, excludePattern) {
    if (recommended_posts === undefined ||
        recommended_posts[post.permalink] === undefined) {
        return [];
    }

    if (excludePattern === undefined || excludePattern.length === 0) {
        return recommended_posts[post.permalink]
    }

    var res_posts = [];
    recommended_posts[post.permalink].forEach( function(p) {
        var pass = true;

        if (excludePattern) {
            for (var i = 0; i < excludePattern.length; i++) {
                var re = new RegExp(excludePattern[i])
                if (re.test(p.permalink)) {
                    pass = false;
                    break;
                }
            }
        }

        if (pass) {
            res_posts.push(p)
        }
    });

    return res_posts;
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