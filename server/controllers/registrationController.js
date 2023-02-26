const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const Subscribers = require('../models/Subscribers');


const numbers = ['1','2','3','4','5','6','7','8','9','0'];

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
            const { password } = req.query;

            const nickname = req.query.nickname.toUpperCase();
            const linkName = req.query.linkName.toUpperCase();

            const errors = validationResult(req).errors;
            if (errors.length > 0) {
                console.log(errors);
                return res.status(400).json({ errors })
            }

            for (let i=0; i < linkName.length; i++){
                for (let j=0; j < numbers.length; j++){
                    if (numbers[j] == linkName[0]){
                        return res.status(400).json({message: "Linkname can's start with a number"})
                    }
                }
            }

            const candidateName = await User.findOne({ nickname });
            const candidateLink = await User.findOne({ linkName });
            
            if (!candidateLink && !candidateName) {
                const hashPassword = bcrypt.hashSync(password, 7);
                
                const user = new User({ nickname, linkName, password: hashPassword })
                await user.save();

                const subs = new Subscribers({user: user._id});
                await subs.save();

                return res.json({ message: true })
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
    async checkLinkname(req, res){
        try{

            const linkName = req.query.linkName.toUpperCase();

            const user = await User.findOne({linkName});

            if (user){
                return res.json({message: true})
            }
            return res.json({message: false})

        }catch(e){
            console.log(e)
        }
    }
    async checkLogin(req, res){
        try{
            
            const login = req.query.login.toUpperCase();

            const user = await User.findOne({nickname: login})

            if (user){
                return res.json({message: true})
            }
            return res.json({message: false})

        }catch(e){
            console.log(e);
        }
    }
}


module.exports = new RegistrationController();