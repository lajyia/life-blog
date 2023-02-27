const Post = require('../models/Post');
const User = require('../models/User');

class FeedController {
    async getPosts(req, res) {

        try {

            const isAuth = req.userId;

            if (!isAuth) {
                return res.json({ message: false });
            }

            const user = await User.findById(isAuth);

            const posts = await Post.find();


            try {
                const likedPosts = user.liked;


                for (let key in posts) {
                    for (let i = 0; i < likedPosts.length; i++) {
                        if (likedPosts[i] == posts[key]._id) {
                            posts[key].isLiked = true
                        }
                    }
                }

                if (posts.length > 0) {
                    return res.json({ posts, likedPosts });
                } else {
                    return res.json({ message: 'No posts!' })
                }

            } catch (e) {
                console.log(e);
            }
            if (posts.length > 0) {
                return res.json({ posts});
            } else {
                return res.json({ message: 'No posts!' })
            }

        }
        catch (e) {
            console.log(e);
        }
    }

    async likePost(req, res) {
        try {

            const isAuth = req.userId

            if (isAuth) {
                const idPost = req.query.idPost;

                const post = await Post.findById(idPost);
                const user = await User.findById(isAuth);

                const usersLiked = post.likedUsers;

                const likedPosts = user.liked;

                if (!likedPosts.includes(idPost) && !usersLiked.includes(isAuth)) {
                    likedPosts.push(idPost);
                    usersLiked.push(isAuth);
                }

                await User.findByIdAndUpdate(isAuth, { liked: likedPosts }, { new: true })
                await Post.findByIdAndUpdate(idPost, { likes: post.likes + 1, likedUsers: usersLiked }, { new: true })

            }
            else {
                return res.json({ message: false })
            }

        } catch (e) {
            console.log(e);
        }
    }

    async unlikePost(req, res) {

        try {
            const isAuth = req.userId;

            if (isAuth) {
                const idPost = req.query.idPost

                const post = await Post.findById(idPost);
                const user = await User.findById(isAuth);

                const likedPosts = user.liked;
                const usersLiked = post.likedUsers;

                for (let i = 0; i < likedPosts.length; i++) {
                    if (likedPosts[i] == idPost) {
                        likedPosts.splice(i, 1)
                    }
                }

                for (let i = 0; i < usersLiked.length; i++) {
                    if (usersLiked[i] == isAuth) {
                        usersLiked.splice(i, 1)
                    }
                }


                await User.findByIdAndUpdate(isAuth, { liked: likedPosts }, { new: true })
                await Post.findByIdAndUpdate(idPost, { likes: post.likes - 1, likedUsers: usersLiked }, { new: true })


            }
            return res.json({ message: false })
        } catch (e) {
            console.log(e)
        }
    }

    async getAuthorPosts(req, res) {
        const userId = req.userId;

        if (userId) {

            const user = await User.findById(userId);
            const authorName = user.nickname;

            const likedPosts = user.liked;

            const allPosts = await Post.find();

            const authorPosts = [];

            for (let key in allPosts) {
                if (allPosts[key].author == authorName) {
                    authorPosts.push(allPosts[key]);
                }
            }

            if (authorPosts.length > 0) {

                for (let key in authorPosts) {
                    for (let i = 0; i < likedPosts.length; i++) {
                        if (likedPosts[i] == authorPosts[key]._id) {
                            authorPosts[key].isLiked = true
                        }
                    }
                }

                return res.json({ posts: authorPosts })
            }

            return res.json({ message: 'Posts not found' })

        }
        return res.json({ message: false })
    }

    async getUserInfoById(req, res) {

        const userId = req.userId;

        if (userId) {

            const id = req.query.id.toUpperCase();

            const user = await User.findOne({ linkName: id })

            if (user) {

                const allPosts = await Post.find();

                const authorPosts = [];

                for (let key in allPosts) {
                    if (allPosts[key].author == user.nickname) {
                        authorPosts.push(allPosts[key]);
                    }
                }

                if (authorPosts.length > 0) {

                    for (let key in authorPosts) {

                        const likedUsers = authorPosts[key].likedUsers;

                        for (let i = 0; i < likedUsers.length; i++) {
                            if (likedUsers[i] == userId) {
                                authorPosts[key].isLiked = true
                            }
                        }

                    }
                    user.posts = authorPosts;
                    return res.json({ user });
                }

                return res.json({ user })
            }
        }

        return res.json({ message: false })
    }

    async getProfileById(req, res) {
        const userId = req.userId;

        if (userId) {
            const id = req.query.id;

            const user = await User.findById(id);

            if (user) {
                return res.json(user);
            }

            return res.json({ message: false })
        }
        return res.json({ message: false })
    }
}

module.exports = new FeedController();
