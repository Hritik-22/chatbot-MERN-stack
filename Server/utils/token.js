const jwt = require("jsonwebtoken");

const genrateToken = (user, secretKey) => {
    let token = jwt.sign(user, secretKey, { expiresIn: "7d" })
    return token;
}
module.exports = genrateToken;
