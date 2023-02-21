const Post = require('../models/Post');
const User = require('../models/User');

class FeedController {
    async getPosts(req, res) {

        try {

            const isAuth = req.userId;

            if (!isAuth){
                return res.json({message: false});
            }
            
            const user = await User.findById(isAuth);

            const likedPosts = user.liked;

            const posts = await Post.find();

            for (let key in posts){
                for (let i=0; i < likedPosts.length; i++){
                    if (likedPosts[i] == posts[key]._id){
                        posts[key].isLiked = true
                    }
                }
            }

            if (posts.length > 0) {
                return res.json({posts, likedPosts});
            }
            return res.json({ message: 'No posts!' })
        }
        catch (e) {
            console.log(e);
        }
    }

    async likePost(req, res){
        try{

            const isAuth = req.userId

            if(isAuth){
                const idPost = req.query.idPost;

                const post = await Post.findById(idPost);
                const user = await User.findById(isAuth);

                const likedPosts = user.liked;
                const updateLiked = post.likes + 1

                likedPosts.push(idPost);

                await User.findByIdAndUpdate(isAuth, {liked: likedPosts}, { new: true })
                await Post.findByIdAndUpdate(idPost, {likes: updateLiked}, { new: true })

            }
            else{
                return res.json({message: false})
            }

        }catch(e){
            console.log(e);
        }
    }

    async unlikePost(req, res){

        try{
            const isAuth = req.userId;

            if (isAuth){
                const idPost = req.query.idPost

                const post = await Post.findById(idPost);
                const user = await User.findById(isAuth);

                const likedPosts = user.liked;
                const updateLiked = post.likes - 1

                const newLikedPosts = [];

                for (let i =0; i < likedPosts.length; i++){
                    if (likedPosts[i] == idPost){
                        newLikedPosts.push(likedPosts[i]);
                    }    
                }

                likedPosts.push(idPost);

                await User.findByIdAndUpdate(isAuth, {liked: newLikedPosts}, { new: true })
                await Post.findByIdAndUpdate(idPost, {likes: updateLiked}, { new: true })
            }
            return res.json({message: false})
        }catch(e){
            console.log(e)
        }
    }
}

module.exports = new FeedController();
