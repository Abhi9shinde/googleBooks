const { google } = require("googleapis");

require("dotenv").config();
let credentials = require("./credentials.json");

async function writeSheet(data) {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  const values = data.map((b) => [b.title, b.summary, b.available]);

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: "Sheet1!A2",
    valueInputOption: "RAW",
    resource: { values },
  });
}

module.exports = writeSheet;
