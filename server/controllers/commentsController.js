const Comment = require('../models/Comment');
const User = require('../models/User');
const CommentItem = require('../models/CommentItem.js');
const Post = require('../models/Post');


class CommentsController {
    async getComments(req, res) {

        try {
            const userId = req.userId;

            if (userId) {

                const post = req.query.id;

                const comments = await Comment.findOne({ post });

                if (comments) {
                    return res.json({ comments });
                }

                return res.json({ comments: [] })

            }
            return res.json({ message: 'Access error' })
        } catch (e) {
            console.log(e);
        }
    }

    async addComment(req, res) {
        try {
            const userId = req.userId;

            if (userId) {

                const post = req.query.id;

                const { body } = req.query;

                const comments = await Comment.findOne({ post }) || [];

                const commentsList = comments.comments || [];

                const postExemplar = await Post.findById(post);

                const newCommentsCounter = postExemplar.comments + 1;

                const commentBody = new CommentItem(userId, body);

                commentsList.push(commentBody);

                await Comment.findOneAndUpdate(post, { post, comments: commentsList }, { new: true });
                await Post.findByIdAndUpdate(post, { comments: newCommentsCounter }, { new: true });

                return res.json({ message: true })

            }

            return res.json({ message: 'Access error' })
        } catch (e) {
            console.log(e);
        }

    }

    async removeComment(req, res) {
        try {
            const userId = req.userId;

            if (userId) {
                const postId = req.query.id;
                const comment = req.query.comment;

                if (comment) {

                    const post = await Comment.findOne({ post: postId });

                    const comments = post.comments;

                    if (comments) {

                        console.log(comments[0])

                        const postExemplar = await Post.findById(postId);
                        const newCommentsCounter = postExemplar.comments - 1;


                        for (let i=0; i < comments.length; i++){
                            if (comments[i]._id === comment){
                                comments.splice(i , 1)
                            }
                        }

                        console.log(comments);

                        await Comment.findOneAndUpdate({ post: postId }, { comments }, { new: true });
                        await Post.findByIdAndUpdate(postId, {comments: newCommentsCounter}, {new: true})

                        return res.json({ message: true })
                    }

                    return res.json({ message: 'Comments not found' })

                }
                return res.json({ message: 'error id' })
            }

            return res.json({ message: 'Access error' })
        } catch (e) {
            console.log(e);
        }

    }
}


module.exports = new CommentsController();