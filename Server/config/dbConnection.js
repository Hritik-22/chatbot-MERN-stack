const mongoose = require("mongoose");
const dbConnection = async () => {
    await mongoose.connect(process.env.DB_URL)
        .then((response) => { console.log(`Databese Connected to the server ${response.connection.host}`) })
        .catch(err => console.error(" MongoDB connection error: ", err.message));
};

module.exports = dbConnection();