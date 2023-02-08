const Post = require('../models/Post');

class FeedController{
    async getPosts(req, res){
        const response = await Post.find();
        if (response.length > 0){
            return res.json(response);
        }
        return res.json({message: 'No posts!' })
    }
}

module.exports = new FeedController();
