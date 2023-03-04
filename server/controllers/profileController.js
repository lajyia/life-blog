const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const fs = require('fs');

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
                }, JWT_SECRET, { expiresIn: '30d' })

                return res.json({
                    candidate, token
                })
            }

            return res.json({ message: "Access error" })

        } catch (e) {
            console.log(e);
        }
    }

    async changeProfile(req, res) {

        try {

            const formData = req.body;


            const password = formData.password;
            const nickname = formData.nickname.toUpperCase();
            const linkName = formData.linkname.toUpperCase();
            const bio = formData.bio;
            const image = formData.image;

            if (password.length !== 0 && password.length < 8){
                return res.json({message: `Password can't be smaller 8 letters`})
            }

            const errors = validationResult(req).errors;
            if (errors.length > 0) {
                return res.json({ errors });
            }

            const candidate = await User.findById(req.userId);

            if (candidate) {

                if (numbers.includes(linkName[0])) {
                    return res.json({ message: `Linkname can't start with number` })
                }

                const nicknameCandidate = await User.findOne({ nickname });
                const linknameCandidate = await User.findOne({ linkName });


                if (nicknameCandidate && nicknameCandidate.nickname !== candidate.nickname) {
                    return res.json({ message: 'Nickname is busy' })
                }

                if (linknameCandidate && linknameCandidate.linkName !== candidate.linkName) {
                    return res.json({ message: 'Linkname is busy' })
                }

                let hashPassword;

                if (password.length > 0){
                    hashPassword = bcrypt.hashSync(password, 7);
                }else{
                    hashPassword = candidate.password
                }

                if (req.file) {

                    const name = req.file.filename;

                    await User.findByIdAndUpdate(req.userId, { nickname, password: hashPassword, avatar: name, bio, linkName }, { new: true })

                    if (candidate.avatar) {
                        fs.unlink(`uploads/user/${candidate.avatar}`, () => { });
                    }

                    return res.json({ message: true })
                }
                if (!image) {
                    await User.findByIdAndUpdate(req.userId, { nickname, password: hashPassword, bio, linkName, avatar: '' }, { new: true })
                    return res.json({ message: true })
                } else {
                    await User.findByIdAndUpdate(req.userId, { nickname, password: hashPassword, bio, linkName }, { new: true })
                    return res.json({ message: true })
                }

            }

            return res.json({ message: false })

        } catch (e) {
            console.log(e);
        }
    }

    async deleteProfile(req, res) {

        try {
            const candidate = await User.findById(req.userId);

            if (candidate) {

                if (fs.existsSync(candidate.avatar.replaceAll('\\', "/")) == true) {
                    let filePath = candidate.avatar.replaceAll('\\', "/");

                    fs.unlink(filePath, () => { });
                }

                await User.findByIdAndDelete(candidate._id);

                return res.json({ message: "A user has been deleted" })
            }

            return res.status(400).json({ message: "Access error" })

        } catch (e) {
            console.log(e);
        }
    }

    async loginProfile(req, res) {

        try {
            const { password } = req.query;

            const nickname = req.query.nickname.toUpperCase();

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
                    return res.json({ message: true, token })
                }
                return res.json({ message: false })
            }
            return res.json({ message: 'This user not found' })

        } catch (e) {
            console.log(e)
        }
    }

    async getAvatar(req, res) {
        try {
            const nickname = req.query.nickname.toUpperCase();

            const candidate = await User.findOne({ nickname });

            if (candidate) {

                if (candidate.avatar) {
                    const image = candidate.avatar
                    return res.json({ image });
                }

                return res.json({ image: false })
            }

            return res.json({ image: false })
        } catch (e) {
            console.log(e);
        }

    }

    async isMe(req, res) {
        try {

            const userId = req.userId;

            if (userId) {
                const id = req.query.id.toUpperCase();

                const candidate = await User.findOne({ linkName: id });

                if (candidate) {
                    if (candidate._id == userId) {
                        return res.json({ message: true })
                    }
                    return res.json({ message: false })
                }

                return res.json({ message: 'error' })

            }
            return res.json({ message: 'error' })

        } catch (e) {
            console.log(e);
        }

    }
}

module.exports = new ProfileController();