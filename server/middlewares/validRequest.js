const validRequest = (req, res, next) =>{
    const newNickname = req.body;
    const password = req.body;

    console.log(newNickname, password);

    next();
}


module.exports = {validRequest}