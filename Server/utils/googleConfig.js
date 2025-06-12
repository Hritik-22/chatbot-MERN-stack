const { google } = require('googleapis');


const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "postmessage" // used if exchanging auth code from frontend directly
);

module.exports = oauth2Client;