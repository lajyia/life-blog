const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');


const numbers = [1,2,3,4,5,6,7,8,9,0];

class RegistrationController {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            return res.json({ users });
        } catch (e) {
            console.log(e)
        }
    }
    async addUser(req, res) {
        try {
            const { password } = req.body;

            const nickname = req.body.nickname.toUpperCase();
            const linkName = req.body.linkName.toUpperCase();

            const errors = validationResult(req).errors;
            if (errors.length > 0) {
                return res.status(400).json({ errors })
            }
            for (let i=0; i < linkName.length; i++){
                for (let j=0; j < numbers.length; j++){
                    if (linkName[0] === numbers[j]){
                        return res.status(400).json({message: "LinkName can't start with a number"})
                    }
                }
            }
            const candidateName = await User.findOne({ nickname });
            const candidateLink = await User.findOne({ linkName });
            if (!candidateLink && !candidateName) {
                const hashPassword = bcrypt.hashSync(password, 7);
                const user = new User({ nickname, linkName, password: hashPassword })
                await user.save();
                return res.status(400).json({ message: 'The user has been created' })
            }
            if (candidateName) {
                return res.status(400).json({ message: 'Nickname is busy' })
            }
            if (candidateLink) {
                return res.status(400).json({ message: 'Link is busy' })
            }
        } catch (e) {
            console.log(e)
        }

    }
}


module.exports = new RegistrationController();