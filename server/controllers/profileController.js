const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const numbers = [0, 1, 2, 3, 5, 6, 7, 8, 9];
const JWT_SECRET = process.env.JWT_SECRET;

class ProfileController {
    async getProfile(req, res) {
        try {
            const candidate = await User.findById(req.userId);

            if (candidate) {

                const name = candidate.nickname.toUpperCase();
                const posts = await Post.find({ author: name });

                candidate.posts.push(posts);

                const token = jwt.sign({
                    id: candidate._id
                }, process.env.JWT_SECRET, { expiresIn: '30d' })

                return res.json({
                    candidate, token
                })

            }

            return res.status(400).json({ message: "Access error" })

        } catch (e) {
            console.log(e);
        }
    }

    async updateProfile(req, res) {
        try {
            const newLinkName = req.body.newLinkName.toUpperCase();
            const bio = req.body.bio.toUpperCase();

            const errors = validationResult(req).errors;
            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            for (let i = 0; i < newLinkName.length; i++) {
                for (let j = 0; j < numbers.length; j++) {
                    if (newLinkName[0] === numbers[j]) {
                        return res.status(400).json({ message: "LinkName can't start with a number" })
                    }
                }
            }
            const linkCandidate = await User.findById(req.userId);

            if (linkCandidate) {

                await User.findByIdAndUpdate(req.userId, { bio, linkName: newLinkName }, { new: true })

                const token = jwt.sign({
                    id: linkCandidate._id
                }, process.env.JWT_SECRET, { expiresIn: '30d' })

                return res.json({ message: "A profile has been updated", token })
            }
            return res.status(400).json({ message: "Access error" })

        } catch (e) {
            console.log(e)
        }
    }

    async changeProfile(req, res) {
        try {
            const { password } = req.body;

            const newNickname = req.body.newNickname.toUpperCase();

            const errors = validationResult(req).errors;
            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            const candidate = User.findById(req.userId);

            if (candidate) {

                const hashPassword = bcrypt.hashSync(password, 7);

                await User.findByIdAndUpdate(req.userId, { nickname: newNickname, password: hashPassword }, { new: true })

                const token = jwt.sign({
                    id: candidate._id
                }, process.env.JWT_SECRET, { expiresIn: '30d' })

                return res.json({ message: 'A user has been changed', token })
            }

            return res.status(400).json({ message: 'Access error' })

        } catch (e) {
            console.log(e);
        }
    }

    async deleteProfile(req, res) {

        try {
            const candidate = await User.findById(req.userId);

            if (candidate) {
                await User.deleteOne({ _id: candidate._id });

                return res.json({ message: "A user has been deleted" })
            }

            return res.status(400).json({ message: "Access error" })

        } catch (e) {
            console.log(e);
        }
    }

    async loginProfile(req, res) {

        try {
            const { password } = req.body;

            const nickname = req.body.nickname.toUpperCase();

            const errors = validationResult(req).errors;
            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }
            const candidate = await User.findOne({ nickname });
            if (candidate) {
                const passwordUser = candidate.password;
                const isLogin = bcrypt.compareSync(password, passwordUser);

                const token = jwt.sign({
                    id: candidate._id,
                }, JWT_SECRET, { expiresIn: '30d' })

                if (isLogin) {
                    return res.json({ token })
                }
                return res.status(400).json({ message: 'Invalid password' })
            }
            return res.status(400).json({ message: "No user with this name" })

        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new ProfileController();