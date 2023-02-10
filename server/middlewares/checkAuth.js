const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const checkAuth = (req, res, next) =>{

    const token = (req.headers.authorization || "").split(' ')[1];

    if (token){
        try{
            const decoded = jwt.verify(token, JWT_SECRET);
            
            req.userId = decoded.id

            next();
        }catch(e){
            console.log(e);
            return res.status(400).json({
                message: "Access error"
            })
        }
    }else{
        return res.status(400).json({
            message: "Access error"
        })
    }
}

module.exports = {checkAuth}