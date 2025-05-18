const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const blacklistTokenModel = require('../models/blacklistToken.model');
const bcrypt = require('bcrypt');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    // console.log(token);
    if (!token) {
        return res.status(401).json({
            message :  'Unauthorized'
        })
    }

    const isBlacklisted = await blacklistTokenModel.findOne({token : token});
    // console.log(isBlacklisted);
    if (isBlacklisted) {
        console.log('Token is blacklisted');
        return res.status(401).json({
            message :  'Unauthorized'
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({
                message :  'Unauthorized'
            })
        }

        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message :  'Unauthorized'
        })
    }
}