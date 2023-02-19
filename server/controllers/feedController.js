const Post = require('../models/Post');

class FeedController {
    async getPosts(req, res) {

        try {

            const isAuth = req.userId;

            if (!isAuth){
                return res.json({message: false});
            }
            
            const response = await Post.find();

            for (let key in response){
                response[key].isLiked = true;
            }

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
