// Streaming AI endpoint (simplified)
import { buildContext } from "../packages/ai-core/memory.js";

export default function handler(req, res) {
  res.setHeader("Content-Type", "text/plain");

  const { prompt = "", sessionId = "main" } = req.body || {};

  const context = buildContext(sessionId);

  const text = generate(prompt, context);

  let i = 0;
  const interval = setInterval(() => {
    if (i >= text.length) {
      clearInterval(interval);
      res.end();
      return;
    }

    res.write(text[i]);
    i++;
  }, 15);
}

function generate(prompt, context) {
  return `AI STREAM MODE\nPrompt: ${prompt}\nContext lines: ${context.split("\n").length}\nResponse: This is a streaming Cursor-style AI response.`;
}