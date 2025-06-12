const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const userModel = require("../model/userModel");
const genrateToken = require("../utils/token");


const userAuth = async (req, res, next) => {
    try {
        let updatedToken = null;

        let token = req.cookies.trial_token || req.cookies.auth_Token;

        // Case 1: New user – assign a trial token
        if (!token) {
            token = await genrateToken({ type: "trial", trialCount: 1 }, process.env.SECRET_TOKEN_KEY);
        }

        const decoded = jwt.verify(token, process.env.SECRET_TOKEN_KEY);   // Decode token

        if (decoded.type === "trial") {

            if (decoded.trialCount > 5) {
                return next(new ErrorHandler("Trial limit exceeded. Please log in .", 403));
            }
            // Increment trial count and generate new token-

            let { type, trialCount } = decoded;
            updatedToken = await genrateToken({ type, trialCount: trialCount + 1 }, process.env.SECRET_TOKEN_KEY);
            req.updatedToken = updatedToken;
        }

        // Case 3: Authenticated user
        if (decoded.type === "authenticated") {
            const user = await userModel.findById(decoded.id);
            if (!user) {
                return next(new ErrorHandler("User not found. Please log in first.", 401));
            }
            req.user = user;
        }
        next();

    } catch (error) {
        return next(new ErrorHandler("Invalid or expired token", 401));
    }
}

module.exports = userAuth;