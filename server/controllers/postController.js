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

        const title = req.body.title.toUpperCase();

        const isAuth = req.userId;

        try {

            if (!isAuth) {
                return res.status(400).json({ message: 'Access error' });
            }


            const errors = validationResult(req).errors;
            if (errors.length > 0) {
                return res.status(400).json({ errors })
            }

            const post = await Post.findOne({ title });

            if (post) {

                if (post.image) {
                    if (fs.existsSync(post.image.replaceAll('\\', "/")) == true) {

                        let filePath = post.image.replaceAll('\\', "/");

                        fs.unlink(filePath, () => { });
                    }
                }

                await Post.deleteOne({ title });
                return res.json({ message: 'A post is deleted' });
            }

            return res.status(400).json({ message: 'A post undefined' })
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

            const { newBody } = req.body;

            const title = req.body.title.toUpperCase();
            const newTitle = req.body.newTitle.toUpperCase();

            const errors = validationResult(req).errors;
            if (errors.length > 0) {
                return res.status(400).json({ errors })
            }
            const titleCandidate = await Post.findOne({ title });
            if (titleCandidate) {


                const token = jwt.sign({
                    id: isAuth
                }, process.env.JWT_SECRET, { expiresIn: '30d' })


                if (req.file) {

                    if (titleCandidate.image) {

                        if (fs.existsSync(titleCandidate.image.replaceAll('\\', "/")) == true) {
                            let filePath = titleCandidate.image.replaceAll('\\', "/");
                            fs.unlink(filePath, () => { });

                        }
                    }

                    await Post.findOneAndUpdate({ title }, { title: newTitle, body: newBody, image: req.file.path }, { new: true });
                    return res.json({ message: 'A post is updated', token })
                }

                await Post.findOneAndUpdate({ title }, { title: newTitle, body: newBody }, { new: true });
                return res.json({ message: 'A post is updated', token })
            }
            return res.status(400).json({ message: 'A post with this title is not found' })
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
                return res.status(400).json({ message: 'Access error' })
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