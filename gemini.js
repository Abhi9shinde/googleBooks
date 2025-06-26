const { GoogleGenAI } = require("@google/genai");

require("dotenv").config();
GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function getSubTopics(topic) {
  const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: "text/plain",
  };

  const model = "gemini-2.0-flash";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `Divide the topic '${topic}' into 10 detailed sub-topics. Return as a numbered list. Dont explain much just give subtopics`,
        },
      ],
    },
  ];

  const res = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let fullText = "";

  for await (const chunk of res) {
    if (chunk.text) {
      fullText += chunk.text;
    }
  }
  console.log("full text is", fullText);
  return fullText.split("\n").filter((line) => line.trim().length > 3);
}

module.exports = getSubTopics;
