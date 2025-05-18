const jwt = require('jsonwebtoken');
const captainModel = require('../models/captain.model');
const blacklistTokenModel = require('../models/blacklistToken.model');
const bcrypt = require('bcrypt');

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    const isBlacklisted = await blacklistTokenModel.findOne({token : token});

    // console.log('isBlacklisted', isBlacklisted);

    if(isBlacklisted) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log('decoded', decoded);
        const captain = await captainModel.findById(decoded._id);

        // console.log('captain', captain);

        if(!captain) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }

        req.captain = captain;
        next();
    }
    catch (err) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};