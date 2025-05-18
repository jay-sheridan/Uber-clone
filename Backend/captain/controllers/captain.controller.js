const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.register = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { fullName, email, password, vehicle } = req.body;

    const existingCaptain = await captainModel.findOne({ email });
    
    if (existingCaptain) {
        return res.status(400).json({
            message: "Captain already exists"
        });
    }

    const hashedPassword = await captainModel.hashPassword(password);
    // console.log(hashedPassword);
    const captain = await captainService.createCaptain({
        fullName,
        email,
        password : hashedPassword,
        vehicle
    });

    const token = captain.generateAuthToken();

    res.status(201).json({
        token,
        captain
    });
};

module.exports.login = async (req, res) => {

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select("+password");

    if (!captain) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const isMatch = await captain.comparePassword(password);
    

    if (!isMatch) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const token = captain.generateAuthToken();

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    res.status(200).json({
        token,
        captain
    });
};

module.exports.profile = async (req, res) => {

    res.status(200).json(
        req.captain
    );

}

module.exports.logout = async (req, res) => {

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    res.clearCookie("token");
    await blacklistTokenModel.create({
        token: token
    });
    res.status(200).json({
        message: "Logged out successfully"
    });
}
