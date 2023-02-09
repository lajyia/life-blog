const User = require('../models/User');
const bcrypt = require('bcryptjs');

class ProfileController {
    async getProfile(req, res) {
        res.send('PROFILE');
    }
    async updateProfile(req, res) {
        res.send('profile updated');
    }
    async deleteProfile(req, res) {
        res.send('profile deleted');
    }
    async loginProfile(req, res){
        const {nickname, password} = req.body;
        const candidate = await User.findOne({nickname});
        if (candidate){
            const passwordUser = candidate.password;
            const isLogin = bcrypt.compareSync(password, passwordUser);
            if (isLogin){
                return res.json({candidate})
            }
            return res.status(400).json({message: 'Invalid password'})
        }
        return res.status(400).json({message: "No user with this name"})
    }
}

module.exports = new ProfileController();