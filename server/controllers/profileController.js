const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

class ProfileController {
    async getProfile(req, res) {
        const { nickname } = req.body;
        const errors = validationResult(req).errors;
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        const candidate = await User.findOne({ nickname });
        if (candidate) {
            return res.json({ candidate });
        }
        return res.status(400).json({ message: "A user with this nickname was not found" })
    }

    async updateProfile(req, res) {
        const { linkName, newLinkName, bio } = req.body;
        const errors = validationResult(req).errors;
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        const linkCandidate = await User.findOne({ linkName });
        if (linkCandidate) {
            await User.findOneAndUpdate({ linkName }, { bio, linkName: newLinkName }, { new: true });
            return res.json({ message: "A profile has been updated" })
        }
        return res.status(400).json({ message: "A user with this linkName was not found" })
    }

    async changeProfile(req, res) {
        const { nickname, newNickname, password } = req.body;
        const errors = validationResult(req).errors;
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        const candidate = User.findOne({ nickname });
        if (candidate) {
            const hashPassword = bcrypt.hashSync(password, 7);
            await User.findOneAndUpdate({ nickname }, { nickname: newNickname, password: hashPassword }, { new: true });
            return res.json({ message: 'A user has been changed' })
        }
        return res.status(400).json({ message: 'A user with this nickame was not found' })
    }

    async deleteProfile(req, res) {
        const { nickname } = req.body;
        const errors = validationResult(req).errors;
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        const candidate = await User.findOne({ nickname });
        if (candidate) {
            await User.deleteOne({ nickname });
            return res.json({ message: "A user has been deleted" })
        }
        return res.status(400).json({ message: "A user with this nickname was not found" })
    }

    async loginProfile(req, res) {
        const { nickname, password } = req.body;
        const errors = validationResult(req).errors;
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        const candidate = await User.findOne({ nickname });
        if (candidate) {
            const passwordUser = candidate.password;
            const isLogin = bcrypt.compareSync(password, passwordUser);
            if (isLogin) {
                return res.json({ candidate })
            }
            return res.status(400).json({ message: 'Invalid password' })
        }
        return res.status(400).json({ message: "No user with this name" })
    }
}

module.exports = new ProfileController();