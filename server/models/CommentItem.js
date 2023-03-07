
class CommentItem{

    user = '';
    body = '';
    _id = Date.now();

    constructor(user, body){
        this.user = user
        this.body = body;
    }
}

module.exports = CommentItem;