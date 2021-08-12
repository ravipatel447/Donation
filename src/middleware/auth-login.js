const jwt = require('jsonwebtoken');
const User = require('../model/user');
const auth = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findOne({ _id :decoded._id,'tokens.token':token});
        if(!user){
            req.user.email = '';
        }
        req.user = user;
        next()
    }
    catch(e){
        res.status(401).render('index');
    }
}
module.exports = auth;