const Subscribers = require('../models/Subscribers');
const User = require('../models/User')

class SubscribersController {
    async getSubscribers(req, res) {
        try {
            const userId = req.userId;

            if (userId) {

                const subs = await Subscribers.findOne({ user: userId });

                const subsList = subs.subs;

                
                return res.json({ subs })

            }

            return res.json({ message: false })
        } catch (e) {
            console.log(e);
        }
    }

    async follow(req, res) {
        try {
            const userId = req.userId;

            if (userId) {

                const id = req.query.id;

                const profileToFollow = await Subscribers.findOne({ user: id });

                const subs = profileToFollow.subs;

                if (!subs.includes(userId) && userId !== id) {
                    subs.push(userId);
                }

                await Subscribers.findOneAndUpdate({ user: id }, { subs }, { new: true });

                if (userId !== id) {
                    const subsCount = subs.length;

                    await User.findByIdAndUpdate(id, { subscribers: subsCount })
                }

                return res.json({ message: true })
            }

            return res.json({ message: false });
        } catch (e) {
            console.log(e);
        }
    }

    async unfollow(req, res) {
        try {
            const userId = req.userId;

            if (userId) {

                const id = req.query.id;

                const profileToFollow = await Subscribers.findOne({ user: id });

                const subs = profileToFollow.subs;

                for (let i = 0; i < subs.length; i++) {
                    if (subs[i] == userId && userId !== id) {
                        subs.splice(i, 1);
                    }
                }

                await Subscribers.findOneAndUpdate({ user: id }, { subs }, { new: true })

                if (userId !== id) {
                    const subsCount = subs.length;

                    await User.findByIdAndUpdate(id, { subscribers: subsCount });
                }

                return res.json({ message: true })

            }

            return res.json({ message: false });
        } catch (e) {
            console.log(e);
        }
    }

    async getSubscribersUser(req, res) {

        try {
            const userId = req.userId;

            if (userId) {

                const id = req.query.id;

                const subs = await Subscribers.findOne({ user: id });

                const isFollow = subs.subs.includes(userId);

                return res.json({ subs, follow: isFollow });
            }
            return res.json({ message: false });
        } catch (e) {
            console.log(e);
        }
    }
}


module.exports = new SubscribersController();