
const express = require("express");
const app = express();
app.use(express.json());

//  CORS setup - 
const cors = require("cors");
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173", credentials: true }));


const cookieParser = require("cookie-parser");
app.use(cookieParser());

const showError = require("./middleware/ErrorShow");
const router = require("./routes/backend");

app.use("/api/v1", router);
app.use(showError);

module.exports = app;