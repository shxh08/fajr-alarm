// generate-lines.js
const fs = require("fs");
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

const SYSTEM_PROMPT = `
You are a **merciless Islamic reckoning system** …
⚠️ Important: Instead of writing one big speech, REPHRASE everything slightly differently this time,
and produce **50 individual terrifying lines**, each unique.
Output ONLY a JSON array of strings.
`;

async function generateLines() {
  const res = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",  // Updated model
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: "Generate 50 unique terrifying lines now." }
    ],
    temperature: 1.0
  });

  const text = res.choices[0].message.content;

  let lines;
  try {
    lines = JSON.parse(text);
  } catch {
    console.error("❌ AI output not valid JSON, raw text below:");
    console.log(text);
    return;
  }

  fs.writeFileSync("lines.json", JSON.stringify(lines, null, 2));
  console.log(`✅ Saved ${lines.length} lines to lines.json`);
}

generateLines();
