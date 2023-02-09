const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');


class RegistrationController {
    async addUser(req, res){
        const {nickname, linkName, password} = req.body;
        const errors = validationResult(req).errors;
        if (errors.length > 0){
            return res.status(400).json({errors})
        }
        const candidateName = await User.findOne({nickname});
        const candidateLink = await User.findOne({linkName});
        if (!candidateLink && !candidateName){
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({nickname, linkName, password: hashPassword})
            await user.save();
            return res.status(400).json({message: 'The user has been created'})
        }
        if (candidateName){
            return res.status(400).json({message: 'Nickname is busy'})
        }
        if (candidateLink){
            return res.status(400).json({message: 'Link is busy'})
        }
        
    }
}


module.exports = new RegistrationController();