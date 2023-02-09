const Post = require('../models/Post');

class FeedController {
    async getPosts(req, res) {
        try {
            const response = await Post.find();
            if (response.length > 0) {
                return res.json(response);
            }
            return res.json({ message: 'No posts!' })
        }
        catch (e) {
            console.log(e);
        }
    }
}

module.exports = new FeedController();
