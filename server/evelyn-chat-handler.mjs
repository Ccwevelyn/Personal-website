import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

function safeRead(filePath) {
  try {
    return fs.readFileSync(filePath, "utf-8").trim();
  } catch {
    return "";
  }
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

export function loadSkillContext(projectRoot) {
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
  const keyFromEnv = (process.env.DEEPSEEK_API_KEY || "").trim();
  const keyFromFile = safeRead(path.join(skillRoot, ".deepseek_key"));
  return {
    apiKey: keyFromEnv || keyFromFile,
    profile,
    dotTraits,
    dotSkillRaw,
    portfolioWebsite,
  };
}

export async function handleEvelynChatRequest({ message, history, projectRoot }) {
  const trimmed = String(message || "").trim();
  if (!trimmed) {
    return { status: 400, body: { error: "Message is required." } };
  }

  const { apiKey, profile, dotTraits, dotSkillRaw, portfolioWebsite } =
    loadSkillContext(projectRoot);
  if (!apiKey) {
    return {
      status: 500,
      body: {
        error:
          "DeepSeek API key not found. Set DEEPSEEK_API_KEY or add ~/.cursor/skills/cc-skill/.deepseek_key",
      },
    };
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

  const historyMessages = (Array.isArray(history) ? history : [])
    .filter((item) => item && (item.role === "user" || item.role === "assistant"))
    .slice(-12)
    .map((item) => ({
      role: item.role,
      content: String(item.text ?? item.content ?? ""),
    }));

  const response = await fetch(DEEPSEEK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
      temperature: 0.6,
      max_tokens: 800,
      messages: [
        { role: "system", content: systemContent },
        ...historyMessages,
        { role: "user", content: trimmed },
      ],
    }),
  });

  const raw = await response.text();
  let data;
  try {
    data = raw ? JSON.parse(raw) : {};
  } catch {
    return {
      status: 502,
      body: { error: "DeepSeek returned a non-JSON response." },
    };
  }

  const reply = data?.choices?.[0]?.message?.content?.trim();
  if (!response.ok || !reply) {
    return {
      status: 502,
      body: {
        error: data?.error?.message || "DeepSeek did not return a valid reply.",
      },
    };
  }

  return {
    status: 200,
    body: {
      reply,
      meta: {
        profileLoaded: Boolean(profile),
        dotTraitsLoaded: Boolean(dotTraits),
        dotSkillCoreLoaded: Boolean(dotSkillCore),
        portfolioLoaded: Boolean(portfolioWebsite),
      },
    },
  };
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

export function getRequestPath(req) {
  const raw = req.url || "";
  try {
    return new URL(raw, "http://vite.local").pathname;
  } catch {
    return raw.split("?")[0] || "";
  }
}

export function createEvelynChatMiddleware(projectRoot) {
  return async (req, res, next) => {
    const pathname = getRequestPath(req);
    if (pathname !== "/api/evelyn-chat") {
      return next();
    }

    if (req.method === "OPTIONS") {
      res.statusCode = 204;
      res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.end();
      return;
    }

    if (req.method !== "POST") {
      res.statusCode = 405;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Method not allowed." }));
      return;
    }

    try {
      const body = await readJsonBody(req);
      const result = await handleEvelynChatRequest({
        message: body?.message,
        history: body?.history,
        projectRoot,
      });
      res.statusCode = result.status;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result.body));
    } catch (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: `Chat API failed: ${error.message}` }));
    }
  };
}
