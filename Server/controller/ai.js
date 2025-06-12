
// Gemini Ai Model Setup - 
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });;

const ErrorHandler = require("../utils/ErrorHandler");
const promptModel = require("../model/promptModel");


// Access To the Ai Respose with Trial - 

exports.aiModel = async (req, res, next) => {
    try {
        const updatedToken = req.updatedToken;
        const prompt = req.body.prompt?.toLowerCase();
        // Static prompt handling -
        if (prompt?.includes("your name") || prompt?.includes("who are you")) {

            return res.status(200).json({
                success: true, statusCode: 200, message: "Response successfully",
                htmlContent: "I am Chintu - A large language model"
            })
        };

        // Generate AI response
        const result = await model.generateContent(prompt);
        const htmlContent = result.response.text();

        if (!htmlContent) {
            return next(new ErrorHandler("ai could not genrated res", 400));
        }

        if (req.user?.id) {
            const userId = req.user.id;
            let userHistory = await promptModel.findOne({ userId });

            if (!userHistory) {
                userHistory = await promptModel.create({
                    userId,
                    history: [{
                        question: prompt,
                        answer: htmlContent,
                        createdAt: new Date()
                    }]
                });
            } else {
                userHistory.history.push({
                    question: prompt,
                    answer: htmlContent,
                    createdAt: new Date()
                });
                await userHistory.save();
            }
        }

        // Set updated trial token if needed
        if (updatedToken) { res.cookie("trial_token", updatedToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }) }
        return res.status(200).json({ success: true, statusCode: 200, message: "Bot Response", htmlContent });

    } catch (error) {
        return next(new ErrorHandler(error.message || "Internal Server Error", 500));
    }
};


exports.userHistory = async (req, res, next) => {

    const userId = req.user.id;


    const userData = await promptModel.findOne({ userId });

    if (!userData || !Array.isArray(userData.history)) {
        return res.status(404).json({ success: false, message: "No history found." });
    }

    const sortedHistory = userData.history.sort((a, b) => new Date(b.askedAt) - new Date(a.askedAt));

    res.status(200).json({
        success: true,
        data: sortedHistory,
    });

};










