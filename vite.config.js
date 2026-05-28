import { execSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

function safeRead(filePath) {
  try {
    return fs.readFileSync(filePath, "utf-8").trim();
  } catch {
    return "";
  }
}

function loadSkillContext(projectRoot) {
  const skillRoot = path.join(os.homedir(), ".cursor", "skills", "cc-skill");
  const dotSkillPath = path.join(
    os.homedir(),
    ".cursor",
    "skills",
    "dot-skill",
    "skills",
    "relationship",
    "evelyn",
    "SKILL.md",
  );
  const profile = safeRead(path.join(skillRoot, "profile.md"));
  const dotTraits = safeRead(path.join(skillRoot, "dot_skill_traits.md"));
  const dotSkillRaw = safeRead(dotSkillPath);
  const portfolioFromProject = safeRead(
    path.join(projectRoot, "src", "data", "portfolioSkillContext.md"),
  );
  const portfolioFromSkill = safeRead(path.join(skillRoot, "portfolio_website.md"));
  const portfolioWebsite = portfolioFromProject || portfolioFromSkill;
  const keyFromFile = safeRead(path.join(skillRoot, ".deepseek_key"));
  const keyFromEnv = (process.env.DEEPSEEK_API_KEY || "").trim();
  return {
    apiKey: keyFromEnv || keyFromFile,
    profile,
    dotTraits,
    dotSkillRaw,
    portfolioWebsite,
  };
}

function section(text, startMarker, endMarker = "") {
  if (!text) return "";
  const start = text.indexOf(startMarker);
  if (start === -1) return "";
  const from = text.slice(start);
  if (!endMarker) return from.trim();
  const end = from.indexOf(endMarker);
  return (end === -1 ? from : from.slice(0, end)).trim();
}

function buildDotSkillCore(raw) {
  if (!raw) return "";
  const blocks = [
    section(raw, "## Layer 0: Core Relational Rules", "## Layer 1: Relationship Context"),
    section(raw, "### 输出偏好", "---"),
    section(raw, "### Rhythm", "### Example replies"),
    section(raw, "### Conflict style", "### Repair pattern"),
    section(raw, "## 运行规则", ""),
  ].filter(Boolean);
  return blocks.join("\n\n");
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function createChatPlugin(projectRoot) {
  const handler = async (req, res, next) => {
    if (req.url !== "/api/evelyn-chat" || req.method !== "POST") {
      return next();
    }

    try {
      const body = await readJsonBody(req);
      const message = String(body?.message || "").trim();
      const history = Array.isArray(body?.history) ? body.history : [];

      if (!message) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Message is required." }));
        return;
      }

      const { apiKey, profile, dotTraits, dotSkillRaw, portfolioWebsite } = loadSkillContext(projectRoot);
      if (!apiKey) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "DeepSeek API key not found in cc-skill." }));
        return;
      }

      const dotSkillCore = buildDotSkillCore(dotSkillRaw);
      const systemContent = [
        "You are Evelyn (Cui Congwen) speaking in first person.",
        "Style priority: sound like Evelyn's real conversational voice, not a generic assistant.",
        "Do not mention you are an AI.",
        "Reply to concrete points. Avoid report-style over-structuring unless asked.",
        "Default to short, natural responses unless the user asks for depth.",
        "When asked about portfolio projects, ISP, coursework, or this website, answer from the Portfolio website knowledge below. Speak as Evelyn about your own work and reasoning.",
        profile ? `Profile:\n${profile}` : "",
        dotTraits ? `Dot-skill traits:\n${dotTraits}` : "",
        dotSkillCore ? `Dot-skill core rules:\n${dotSkillCore}` : "",
        portfolioWebsite
          ? `Portfolio website knowledge (projects, ISP leadership/modeling, personal views):\n${portfolioWebsite}`
          : "",
      ]
        .filter(Boolean)
        .join("\n\n");

      const historyMessages = history
        .filter((item) => item && (item.role === "user" || item.role === "assistant"))
        .slice(-12)
        .map((item) => ({
          role: item.role,
          content: String(item.text || ""),
        }));

      const payload = {
        model: "deepseek-chat",
        temperature: 0.6,
        max_tokens: 800,
        messages: [
          { role: "system", content: systemContent },
          ...historyMessages,
          { role: "user", content: message },
        ],
      };

      const response = await fetch(DEEPSEEK_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content?.trim();

      if (!response.ok || !reply) {
        res.statusCode = 502;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            error: data?.error?.message || "DeepSeek did not return a valid reply.",
          }),
        );
        return;
      }

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          reply,
          meta: {
            profileLoaded: Boolean(profile),
            dotTraitsLoaded: Boolean(dotTraits),
            dotSkillCoreLoaded: Boolean(dotSkillCore),
            portfolioLoaded: Boolean(portfolioWebsite),
          },
        }),
      );
    } catch (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: `Chat API failed: ${error.message}` }));
    }
  };

  return {
    name: "evelyn-chat-api",
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    createChatPlugin(projectRoot),
    {
      name: "sync-portfolio-skill-on-dev",
      configureServer() {
        if (command !== "serve") return;
        try {
          const script = path.join(projectRoot, "scripts", "build-portfolio-skill-context.mjs");
          if (fs.existsSync(script)) {
            execSync(`node "${script}"`, { cwd: projectRoot, stdio: "inherit" });
          }
        } catch (error) {
          console.warn("[evelyn-chat] portfolio skill sync skipped:", error.message);
        }
      },
    },
  ],
}));
