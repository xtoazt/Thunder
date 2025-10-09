import "dotenv/config";
import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { createServer } from "http";
import wisp from "wisp-server-node";
import { createBareServer } from "@tomphttp/bare-server-node";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";
import fs from "node:fs";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { load } = await import("cheerio");

type Sponser = {
  title: string;
  icon: string;
  url: string;
  discord: string;
};

const LLM7_URL = process.env.LLM7_URL || 'https://api.llm7.io/v1';
const LLM7_API_KEY = process.env.LLM7_API_KEY;

const ALLOWED_MODELS = [
  "google/gemini-2.0-flash-001",
  "deepseek-v3.1",
  "deepseek-reasoning",
  "gemini-2.5-flash-lite",
  "gpt-5-mini"
];

// Initialize OpenAI client only if API keys are available
let openai: OpenAI | null = null;
if (process.env.OPENROUTER_API_KEY || LLM7_API_KEY) {
  openai = new OpenAI({
    baseURL: process.env.OPENROUTER_API_KEY ? "https://openrouter.ai/api/v1" : LLM7_URL,
    apiKey: process.env.OPENROUTER_API_KEY || LLM7_API_KEY || "dummy",
    defaultHeaders: process.env.OPENROUTER_API_KEY ? {
      "HTTP-Referer": "https://thundr.app",
      "X-Title": "Thundr",
    } : {},
  });
}

let sponserFile: Sponser[] = [];
if (fs.existsSync(path.join(__dirname, "sponsers.json"))) {
  sponserFile = JSON.parse(
    fs.readFileSync(path.join(__dirname, "sponsers.json"), "utf8")
  );
}

type ChatPayload = {
  messages: { content: string; role: "user" | "assistant" }[];
  model: string;
};

const bareServer = createBareServer("/bare/");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const serverFactory = (handler: any, _: any) => {
  return createServer()
    .on("request", (req, res) => {
      if (bareServer.shouldRoute(req)) {
        bareServer.routeRequest(req, res);
      } else {
        handler(req, res);
      }
    })
    .on("upgrade", (req, socket, head) => {
      if (bareServer.shouldRoute(req)) {
        bareServer.routeUpgrade(req, socket, head);
      } else {
        // @ts-expect-error
        wisp.routeRequest(req, socket, head);
      }
    });
};

const app = fastify({ logger: false, serverFactory });

app.get("/api/search", async (req, res) => {
  const { query } = req.query as { query: string };
  try {
    const response = await fetch(
      `https://duckduckgo.com/ac/?q=${query}&format=list`
    ).then((apiRes) => apiRes.json());
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.get("/api/sponser", async (_req, res) => {
  if (sponserFile.length > 0) {
    res.send(sponserFile[Math.floor(Math.random() * sponserFile.length)]);
  } else {
    res.send([]);
  }
});

app.get("/api/games", async (_req, res) => {
  try {
    const gamesPath = path.join(__dirname, "public", "assets", "js", "json", "games.json");
    if (fs.existsSync(gamesPath)) {
      const games = JSON.parse(fs.readFileSync(gamesPath, "utf8"));
      res.send(games);
    } else {
      res.send([]);
    }
  } catch (error) {
    console.error("Error loading games:", error);
    res.send([]);
  }
});

app.get("/api/apps", async (_req, res) => {
  try {
    const appsPath = path.join(__dirname, "public", "assets", "js", "json", "apps.json");
    if (fs.existsSync(appsPath)) {
      const apps = JSON.parse(fs.readFileSync(appsPath, "utf8"));
      res.send(apps);
    } else {
      res.send([]);
    }
  } catch (error) {
    console.error("Error loading apps:", error);
    res.send([]);
  }
});

// AI API routes
app.get('/api/ai/models', (_req, res) => {
  const models = [{"id":"deepseek-v3.1","object":"model","created":1759850972,"owned_by":"","modalities":{"input":["text"]}},{"id":"deepseek-reasoning","object":"model","created":1759850972,"owned_by":"","modalities":{"input":["text"]}},{"id":"gemini-2.5-flash-lite","object":"model","created":1759850972,"owned_by":"","modalities":{"input":["text","image"]}},{"id":"gemini-search","object":"model","created":1759850972,"owned_by":"","modalities":{"input":["text","image"]}},{"id":"mistral-small-3.1-24b-instruct-2503","object":"model","created":1759850972,"owned_by":"","modalities":{"input":["text"]}},{"id":"nova-fast","object":"model","created":1759850972,"owned_by":"","modalities":{"input":["text"]}},{"id":"gpt-5-mini","object":"model","created":1759850972,"owned_by":"","modalities":{"input":["text","image"]}},{"id":"gpt-5-nano-2025-08-07","object":"model","created":1759850972,"owned_by":"","modalities":{"input":["text","image"]}},{"id":"gpt-5-chat","object":"model","created":1759850972,"owned_by":"","modalities":{"input":["text","image"]}},{"id":"gpt-o4-mini-2025-04-16","object":"model","created":1759850972,"owned_by":"","modalities":{"input":["text","image"]}},{"id":"qwen2.5-coder-32b-instruct","object":"model","created":1759850972,"owned_by":"","modalities":{"input":["text"]}},{"id":"google/gemini-2.0-flash-001","object":"model","created":1759850972,"owned_by":"google","modalities":{"input":["text"]}}];
  res.send(models);
});

app.post('/api/ai/chat', async (req, res) => {
  try {
    if (!openai) {
      return res.status(500).send({ error: 'AI API key not configured on server' });
    }
    const { model, messages, temperature = 0.7, max_tokens } = req.body as any || {};
    if (!model || !Array.isArray(messages)) {
      return res.status(400).send({ error: 'Invalid payload: { model, messages[] } required' });
    }
    
    if (process.env.OPENROUTER_API_KEY) {
      // Use OpenRouter streaming
      res.raw.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      });

      const chatCompletion = await openai.chat.completions.create({
        messages: messages,
        model: model,
        stream: true,
        temperature: temperature,
      });

      for await (const chunk of chatCompletion) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          res.raw.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      res.raw.write("data: [DONE]\n\n");
      res.raw.end();
    } else {
      // Use LLM7 non-streaming
      const resp = await fetch(`${LLM7_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${LLM7_API_KEY}`
        },
        body: JSON.stringify({ model, messages, temperature, max_tokens })
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) return res.status(resp.status).send(data);
      return res.send(data);
    }
  } catch (e) {
    console.error("AI request failed:", e);
    return res.status(500).send({ error: 'AI request failed' });
  }
});

app.post("/api/chat", async (req, res) => {
  const { messages, model } = req.body as ChatPayload;
  
  if (!openai) {
    return res.status(500).send({
      success: false,
      error: "AI API key not configured on server",
    });
  }
  
  if (!messages || !model) {
    return res.status(400).send({
      success: false,
      error: "Missing messages or model",
    });
  }

  if (!ALLOWED_MODELS.includes(model)) {
    console.log("Model not allowed:", model);
    return res.status(400).send({
      success: false,
      error: "Model not allowed",
    });
  }

  try {
    // Set headers for streaming response
    res.raw.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    const chatCompletion = await openai.chat.completions.create({
      messages: messages,
      model: model,
      stream: true,
      temperature: 0.5,
    });

    for await (const chunk of chatCompletion) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        res.raw.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    // End the stream
    res.raw.write("data: [DONE]\n\n");
    res.raw.end();
  } catch (error) {
    console.error("OpenAI API error:", error);
    if (!res.raw.headersSent) {
      res.status(500).send({
        success: false,
        error: "Failed to communicate with AI API",
      });
    } else {
      res.raw.write(
        `data: ${JSON.stringify({ error: "Stream ended unexpectedly" })}\n\n`
      );
      res.raw.end();
    }
  }
});

app.get("/api/title", async (req, res) => {
  const { url } = req.query as { url: string };
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = load(html);
    res.send({
      title: $("title").text(),
    });
  } catch (error) {
    res.send({
      success: false,
      error: error,
    });
  }
});

app.register(fastifyStatic, {
  root: path.join(__dirname, "dist"),
  prefix: "/",
  serve: true,
  wildcard: true,
});

app.setNotFoundHandler((_req, res) => {
  res.sendFile("index.html");
});

const PORT = parseInt(process.env.PORT || "3000");

app.listen({ port: PORT }, (err, address) => {
  if (err) {
    app.log.error(err);
    console.log(err);
    process.exit(1);
  }
  const theme = chalk.hex("#b578ff");
  const host = chalk.hex("b578ff");

  console.log(`Listening to ${chalk.bold(theme("Thundr"))} on:`);
  console.log(`  ${chalk.bold(host("Local System:"))}            ${address}`);
  console.log(`  ${chalk.bold(host("Local System:"))}            http://localhost:${PORT}`);
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
  console.log("SIGTERM signal received: closing HTTP server");
  app.close(() => {
    bareServer.close();
    process.exit(0);
  });
}

