import "dotenv/config";
import express from "express";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

app.get("/api/status", (_req, res) => {
  res.json({ ready: Boolean(client) });
});

app.post("/api/chat", async (req, res) => {
  try {
    if (!client) {
      return res.status(503).json({
        error: "Xaden.Ai needs an API key before it can think. Add OPENAI_API_KEY to your .env file, then restart the server."
      });
    }

    const messages = Array.isArray(req.body.messages) ? req.body.messages : [];
    const safeMessages = messages
      .filter(m => m && ["user", "assistant"].includes(m.role) && typeof m.content === "string")
      .slice(-16)
      .map(m => ({ role: m.role, content: m.content.slice(0, 6000) }));

    if (!safeMessages.length || safeMessages.at(-1).role !== "user") {
      return res.status(400).json({ error: "Send a message to get started." });
    }

    const response = await client.responses.create({
      model: "gpt-6-luna",
      instructions: `You are Xaden.Ai, a helpful, friendly personal AI assistant.
Be clear, accurate, calm, and practical. Help with everyday questions, planning,
writing, brainstorming, explanations, and study support. Use simple language when
helpful. Be honest when you are unsure. Do not claim to have performed actions
outside this chat. Keep answers readable and adapt to the user's tone.`,
      input: safeMessages
    });

    res.json({ reply: response.output_text || "I couldn't create a reply just now. Please try again." });
  } catch (error) {
    console.error("Chat error:", error?.message || error);
    res.status(500).json({ error: "Something went wrong while Xaden.Ai was replying. Please try again." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Xaden.Ai is running at http://localhost:${port}`));
