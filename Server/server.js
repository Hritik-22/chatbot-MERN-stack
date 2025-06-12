require("dotenv").config();
require("./config/dbConnection");  // DB Connection -
const app = require("./app");

const port = process.env.PORT;
const url = process.env.HOST_URL;


app.listen(port, () => {
    console.log(`your Endpoint url is : ${url}`);
});
