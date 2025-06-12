const fetch = require('node-fetch');
const oauth2Client = require("../utils/googleConfig");
const userModel = require("../model/userModel");
const genrateToken = require("../utils/token");
const ErrorHandler = require("../utils/ErrorHandler");

exports.GoogleLogin = async (req, res, next) => {
    const { code } = req.query;
    if (code) {
        res.clearCookie('trial_token');
    }
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens);

    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    const userInfo = await response.json();
    const { name, email, picture } = userInfo;

    let user = await userModel.findOne({ email });
    if (!user) {
        user = await userModel.create({ name, email, image: picture })
    }

    const token = await genrateToken({ type: "authenticated", id: user._id, email }, process.env.SECRET_TOKEN_KEY);
    res.cookie("auth_Token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
    return res.status(200).json({ success: true, message: "logged in successfully", user })
}

exports.profile = async (req, res, next) => {

    const id = req?.user?.id;
    if (!id) {
        return next(new ErrorHandler("user not authenticated, please login first", 400))
    }
    const userData = await userModel.findById(id);
    if (!userData) {
        return next(new ErrorHandler("User Not Found", 404))
    }
    return res.status(200).json({ success: true, statusCode: 200, message: "user found successfully", user: userData })
}

exports.logout = async (req, res, next) => {
    let { auth_Token } = req.cookies;
    if (auth_Token) {
        res.clearCookie("auth_Token")
    }
    return res.status(200).json({ success: true, statusCode: 200, message: "logout successfully", user: null })
}