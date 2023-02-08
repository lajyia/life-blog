const Post = require('../models/Post');

class PostController {
    async deletePost(req, res) {
        const {title} = req.body;
        const titleCandidate = await Post.findOne({title});
        if (titleCandidate){
            await Post.deleteOne({title});
            return res.json({message: 'A post is deleted'});
        }
        return res.status(400).json({message: 'A post with this title is not found'})
    }
    async updatePost(req, res) {
        const {title, newBody, newTitle} = req.body;
        console.log(req.body)
        const titleCandidate = await Post.findOne({title});
        if (titleCandidate){
            await Post.findOneAndUpdate({title}, {title: newTitle, body: newBody}, {new: true});
            return res.json({message: 'A post is updated'})
        }
        return res.status(400).json({message: 'A post with this title is not found'})
    }
    async readPost(req, res) {
        const {title} = req.body;
        const titleCandidate = await Post.findOne({title});
        if (titleCandidate){
            return res.json({titleCandidate});
        }
        return res.status(400).json({message: 'A post with this title is not found'})
    }
    async createPost(req, res) {
        const { title, body } = req.body;
        const titleCandidate = await Post.findOne({ title });
        if (!titleCandidate) {
            const post = new Post({ title, body});
            await post.save();
            return res.json({ message: 'The post was created successfully' })
        }
        return res.status(400).json({message: 'A post with this title already created'})
    }
}

module.exports = new PostController();