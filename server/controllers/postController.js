const Post = require('../models/Post');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

class PostController {
    async deletePost(req, res) {

        try {

            const isAuth = req.userId;

            if (!isAuth) {
                return res.json({ message: false });
            }

            const id = req.query.id;
            const post = await Post.findById(id);

            if (post) {

                if (post.image) {

                    fs.unlink(`uploads/posts/${post.image}`, () => { })
                }

                await Post.findByIdAndDelete(id);
                return res.json({ message: true });
            }

            return res.json({ message: 'A post undefined' })
        }
        catch (e) {
            console.log(e);
        }
    }
    async updatePost(req, res) {

        try {
            const isAuth = req.userId;

            if (!isAuth) {
                return res.status(400).json({ message: 'Access error' })
            }

            const formData = req.body;

            const id = formData.id;

            const newBody = formData.body;

            const newTitle = formData.title.toUpperCase();

            const errors = validationResult(req).errors;
            if (errors.length > 0) {
                return res.json({ errors })
            }

            const titleCandidate = await Post.findById(id);
            if (titleCandidate) {

                const token = jwt.sign({
                    id: isAuth
                }, process.env.JWT_SECRET, { expiresIn: '30d' })


                if (req.file) {

                    if (titleCandidate.image) {
                        fs.unlink(`uploads/posts/${titleCandidate.image}`, () => { })
                    }


                    await Post.findByIdAndUpdate(id, { title: newTitle, body: newBody, image: req.file.filename }, { new: true });
                    return res.json({ message: true, token })
                }
                if (!formData.image) {

                    await Post.findByIdAndUpdate(id, { title: newTitle, body: newBody, image: '' }, { new: true })
                    return res.json({ message: true, token })
                }else{

                    await Post.findByIdAndUpdate(id, { title: newTitle, body: newBody }, { new: true })
                    return res.json({ message: true, token })
                }


            }
            return res.json({ message: 'A post not found' })
        } catch (e) {
            console.log(e);
        }
    }
    async createPost(req, res) {

        try {

            const formData = req.body;

            const body = formData.body;
            const title = formData.title.toUpperCase();

            const errors = validationResult(req).errors;
            if (errors.length > 0) {
                return res.status(400).json({ errors })
            }

            const author = await User.findById(req.userId);

            if (!author) {
                return res.json({ message: 'Access error' })
            }

            const titleCandidate = await Post.findOne({ title });


            if (titleCandidate) {
                return res.json({ message: 'A post with this title already created' })
            }

            const dateVar = new Date();

            const dateMonth = monthNames[dateVar.getMonth()];
            const dateDay = dateVar.getDate();


            const fullDate = dateDay + ' ' + dateMonth;

            const post = new Post({ title, body, author: author.nickname, date: fullDate });


            if (req.file) {

                const name = req.file.filename

                post.image = name
            }

            await post.save();

            const token = jwt.sign({
                id: req.userID
            }, process.env.JWT_SECRET, { expiresIn: '30d' })

            return res.json({ message: true, token })

        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new PostController();