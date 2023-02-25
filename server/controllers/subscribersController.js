const Subscribers = require('../models/Subscribers');
const User = require('../models/User')

class SubscribersController{
    async getSubscribers(req, res){
        const userId = req.userId;

        if (userId){
            const user = await User.findById(userId);
            const nickname = user.nickname;

            const subs = await Subscribers.findOne({nickname});

            return res.json({subs})

        }

        return res.json({message: false})
    }
}


module.exports = new SubscribersController();