const express = require("express");
const { aiModel, userHistory } = require("../controller/ai");
const { GoogleLogin, profile, logout } = require("../controller/auth");
const asyncHandler = require("../middleware/asyncErrorHandler");
const userAuth = require("../middleware/userAuth");
const router = express.Router();

router.route("/chatbot").post(userAuth, asyncHandler(aiModel));
router.route("/login").post(asyncHandler(GoogleLogin));
router.route("/me").get(userAuth, asyncHandler(profile));
router.route("/history").get(userAuth, asyncHandler(userHistory));
router.route("/logout").post(userAuth, asyncHandler(logout));

module.exports = router;