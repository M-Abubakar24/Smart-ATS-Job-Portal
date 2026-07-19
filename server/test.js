require("dotenv").config();

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function main() {
  try {
    console.log("API Key Loaded:", !!process.env.OPENROUTER_API_KEY);

    const completion = await openai.chat.completions.create({
      model: "qwen/qwen3-coder:free",
      messages: [
        {
          role: "user",
          content: "Say Hello",
        },
      ],
    });

    console.log(completion.choices[0].message.content);
  } catch (err) {
    console.error(err);
  }
}

main();