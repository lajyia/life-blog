const Post = require('../models/Post');
const { validationResult } = require('express-validator');
const User = require('../models/User');


class PostController {
    async deletePost(req, res) {
        const { title } = req.body;
        const errors = validationResult(req).errors;
        if (errors.length > 0){
            return res.status(400).json({errors})
        }
        const titleCandidate = await Post.findOne({ title });
        if (titleCandidate) {
            await Post.deleteOne({ title });
            return res.json({ message: 'A post is deleted' });
        }
        return res.status(400).json({ message: 'A post with this title is not found' })
    }
    async updatePost(req, res) {
        const { title, newBody, newTitle } = req.body;
        const errors = validationResult(req).errors;
        if (errors.length > 0){
            return res.status(400).json({errors})
        }
        const titleCandidate = await Post.findOne({ title });
        if (titleCandidate) {
            await Post.findOneAndUpdate({ title }, { title: newTitle, body: newBody }, { new: true });
            return res.json({ message: 'A post is updated' })
        }
        return res.status(400).json({ message: 'A post with this title is not found' })
    }
    async readPost(req, res) {
        const { title } = req.body;
        const errors = validationResult(req).errors;
        if (errors.length > 0){
            return res.status(400).json({errors})
        }
        const titleCandidate = await Post.findOne({ title });
        if (titleCandidate) {
            const viewed = titleCandidate.viewed + 1;
            const viewedPost = await Post.findOneAndUpdate({ title }, { viewed }, { new: true })
            return res.json({ viewedPost });
        }
        return res.status(400).json({ message: 'A post with this title is not found' })
    }
    async createPost(req, res) {
        const { title, body, author } = req.body;
        const errors = validationResult(req).errors;
        if (errors.length > 0){
            return res.status(400).json({errors})
        }
        const authorCandidate = await User.findOne({nickname: author});
        if (!authorCandidate){
            return res.status(400).json({message: 'No author with this nickname'})
        }
        const titleCandidate = await Post.findOne({ title });
        if (!titleCandidate) {
            const post = new Post({ title, body, author });
            await post.save();
            const authorProfile = await User.findOne({nickname: author});
            const authorPosts = authorProfile.posts;
            authorPosts.push(post);
            console.log(authorPosts);
            await User.findOneAndUpdate({nickname: author}, {posts: authorPosts}, {new: true})
            return res.json({ message: 'The post was created successfully' })
        }
        return res.status(400).json({ message: 'A post with this title already created' })
    }
}

module.exports = new PostController();