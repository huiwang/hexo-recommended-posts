module.exports = function recommend(recommended_posts, total, post) {
    if (recommended_posts === undefined || 
        recommended_posts[post.permalink] === undefined) {
        return recommendOffline(total, post.prev, post.next, []);
    } else {
        return recommended_posts[post.permalink];
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