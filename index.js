import express from "express";
import http from "node:http";
import { createBareServer } from "@tomphttp/bare-server-node";
import cors from "cors";
import path from "node:path";
import { hostname } from "node:os";
import chalk from "chalk";
// Optional: Node 18+ has global fetch

const LLM7_URL = process.env.LLM7_URL || 'https://api.llm7.io/v1';
const LLM7_API_KEY = process.env.LLM7_API_KEY;

const server = http.createServer();
const app = express(server);
const __dirname = process.cwd();
const bareServer = createBareServer("/bare/");
const PORT = process.env.PORT || 8080;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(__dirname + "/public", {
  maxAge: '1h',
  etag: true,
  lastModified: true
}));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/public/index.html"));
});

app.get("/search", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/public/search.html"));
});

app.get("/a", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/public/apps.html"));
});

app.get("/g", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/public/games.html"));
});

app.get(["/settings","/settings/","/settings/general"], (req, res) => {
  res.sendFile(path.join(process.cwd(), "/public/settings/general.html"));
});

app.get("/ai", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/public/ai.html"));
});

// AI API routes
app.get('/api/ai/models', (req, res) => {
  // Static models list provided by user
  const models = [{"id":"deepseek-v3.1","object":"model","created":1759850972,"owned_by":"","modalities":{"input":["text"]}},{"id":"deepseek-reasoning","object":"model","created":1759850972,"owned_by":"","modalities":{"input":["text"]}},{"id":"gemini-2.5-flash-lite","object":"model","created":1759850972,"owned_by":"","modalities":{"input":["text","image"]}},{"id":"gemini-search","object":"model","created":1759850972,"owned_by":"","modalities":{"input":["text","image"]}},{"id":"mistral-small-3.1-24b-instruct-2503","object":"model","created":1759850972,"owned_by":"","modalities":{"input":["text"]}},{"id":"nova-fast","object":"model","created":1759850972,"owned_by":"","modalities":{"input":["text"]}},{"id":"gpt-5-mini","object":"model","created":1759850972,"owned_by":"","modalities":{"input":["text","image"]}},{"id":"gpt-5-nano-2025-08-07","object":"model","created":1759850972,"owned_by":"","modalities":{"input":["text","image"]}},{"id":"gpt-5-chat","object":"model","created":1759850972,"owned_by":"","modalities":{"input":["text","image"]}},{"id":"gpt-o4-mini-2025-04-16","object":"model","created":1759850972,"owned_by":"","modalities":{"input":["text","image"]}},{"id":"qwen2.5-coder-32b-instruct","object":"model","created":1759850972,"owned_by":"","modalities":{"input":["text"]}},{"id":"roblox-rp","object":"model","created":1759850972,"owned_by":"","modalities":{"input":["text"]}},{"id":"bidara","object":"model","created":1759850972,"owned_by":"","modalities":{"input":["text","image"]}},{"id":"rtist","object":"model","created":1759850972,"owned_by":"","modalities":{"input":["text"]}},{"id":"mistral-small-2503","object":"model","created":1759850972,"owned_by":"mistral","modalities":{"input":["text"]}},{"id":"open-mixtral-8x7b","object":"model","created":1759850972,"owned_by":"mistral","modalities":{"input":["text"]}},{"id":"deepseek-ai/DeepSeek-R1-0528","object":"model","created":1759850972,"owned_by":"nebulablock","modalities":{"input":["text"]}},{"id":"deepseek-v3-0324","object":"model","created":1759850972,"owned_by":"nebulablock","modalities":{"input":["text"]}},{"id":"deepseek-r1","object":"model","created":1759850972,"owned_by":"nebulablock","modalities":{"input":["text"]}},{"id":"l3.3-ms-nevoria-70b","object":"model","created":1759850972,"owned_by":"nebulablock","modalities":{"input":["text"]}},{"id":"l3-70b-euryale-v2.1","object":"model","created":1759850972,"owned_by":"nebulablock","modalities":{"input":["text"]}},{"id":"l3-8b-stheno-v3.2","object":"model","created":1759850972,"owned_by":"nebulablock","modalities":{"input":["text"]}},{"id":"llama-3.1-8b-instruct","object":"model","created":1759850972,"owned_by":"nebius","modalities":{"input":["text"]}},{"id":"gemma-2-2b-it","object":"model","created":1759850972,"owned_by":"nebius","modalities":{"input":["text"]}}];
  res.json(models);
});

app.post('/api/ai/chat', async (req, res) => {
  try {
    if (!LLM7_API_KEY) {
      return res.status(500).json({ error: 'LLM7_API_KEY not set on server' });
    }
    const { model, messages, temperature = 0.7, max_tokens } = req.body || {};
    if (!model || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid payload: { model, messages[] } required' });
    }
    const resp = await fetch(`${LLM7_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${LLM7_API_KEY}`
      },
      body: JSON.stringify({ model, messages, temperature, max_tokens })
    });
    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) return res.status(resp.status).json(data);
    return res.json(data);
  } catch (e) {
    return res.status(500).json({ error: 'AI request failed' });
  }
});

app.get("/404", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/public/err/404.html"));
});

app.use((req, res, next) => {
  res.status(404).redirect("/404");
});

server.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.on("listening", () => {
  const address = server.address();
  const theme = chalk.hex("#b578ff");
  const host = chalk.hex("b578ff");

  console.log(`Listening to ${chalk.bold(theme("Thundr"))} on:`);

  console.log(
    `  ${chalk.bold(host("Local System:"))}            http://${address.family === "IPv6" ? `[${address.address}]` : address.address}${address.port === 80 ? "" : ":" + chalk.bold(address.port)}`,
  );

  console.log(
    `  ${chalk.bold(host("Local System:"))}            http://localhost${address.port === 8080 ? "" : ":" + chalk.bold(address.port)}`,
  );

  try {
    console.log(
      `  ${chalk.bold(host("On Your Network:"))}  http://${address.ip()}${address.port === 8080 ? "" : ":" + chalk.bold(address.port)}`,
    );
  } catch (err) { }

  if (process.env.REPL_SLUG && process.env.REPL_OWNER) {
    console.log(
      `  ${chalk.bold(host("Replit:"))}           https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`,
    );
  }

  if (process.env.HOSTNAME && process.env.GITPOD_WORKSPACE_CLUSTER_HOST) {
    console.log(
      `  ${chalk.bold(host("Gitpod:"))}           https://${PORT}-${process.env.HOSTNAME}.${process.env.GITPOD_WORKSPACE_CLUSTER_HOST}`,
    );
  }

  if (process.env.CODESPACE_NAME && process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN) {
    console.log(
      `  ${chalk.bold(host("Github Codespaces:"))}           https://${process.env.CODESPACE_NAME}-${address.port === 80 ? "" : "" + address.port}.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`,
    );
  }
});

server.listen({
  port: PORT,
  backlog: 100
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    bareServer.close();
    process.exit(0);
  });
}
