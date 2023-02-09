const User = require('../models/User');

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
}

module.exports = new ProfileController();