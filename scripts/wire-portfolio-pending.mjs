import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(root, "..", "src", "data");
const projectsPath = path.join(dataDir, "portfolioProjects.js");
const pendingPath = path.join(dataDir, "portfolioPending.js");

// --- Update Thinking Twice: skill-grounded copy + screenshots array ---
let pending = fs.readFileSync(pendingPath, "utf8");
pending = pending.replace(
  /export const THINKING_TWICE_PROJECT = \{[\s\S]*?\n\};\n\nexport const PENDING_SECTION/,
  `export const THINKING_TWICE_PROJECT = {
  id: "thinking-twice",
  title: "Thinking Twice",
  titleEn: "Think Twice",
  format: "Cursor Skill · decision guardrail · Pending",
  focus: "Mirror by default · interrupt rarely",
  status: "idea-in-progress",
  pending: true,
  modalType: "pending-thinking-twice",
  screenshots: ["/portfolio/thinking-twice/skill-md.png"],
  summary:
    "Project-local decision guardrail：只在即将高影响执行、且对话里还没有清楚取舍时，轻量打断——默认镜像，很少停手。",
  origin: [
    "起点是把事情全甩给 Codex / Cursor、只说「直接做」之后，经常不知道 AI 在干什么。",
    "想要的是能在对的时刻主动停住自己的 AI——不是失控的全自动。",
  ],
  principles: [
    "Do not judge a single ok — 先读整段最近对话。",
    "Existing tradeoff counts — 已有选择、理由、可接受风险时，短确认即算数。",
    "Mirror by default, interrupt rarely — 多数时候贴一张 Check 然后继续；只有要动手且无取舍才停问一句。",
    "Do not think for the user, and do not make them reread their own words.",
  ],
  built: [
    "仓库内 Cursor Skill（think-twice），不装到 ~/.cursor/skills。",
    "gate.py：输出 [Think Twice Check]；前文已有取舍时短 ok 放行。",
    "challenge.py（可选）：独立反驳，不替人拍板。",
    "decompose.py / journal.py：拆题与决策落盘。",
  ],
  stuck: [
    "停的时机经常不准——有时打断像多出来的负担，并不帮助。",
    "真实需求更细：有时必须人来定；有时 AI 该主动起草、把事往前推。",
    "想要的姿态：反向激励让人再想一次，而不是牵着鼻子走。",
    "目前卡在：有用的打断 vs 吵闹的打断；保留 agency vs 问得太多。",
  ],
  aspiration:
    "不是更多确认弹窗，而是少数几次真正让人清醒的停顿——该你决定时停，该推进时推进。",
  details:
    "Thinking Twice is a project-local Cursor skill: interrupt lightly only when a high-impact action is about to run and the conversation still lacks a clear tradeoff.",
};

export const PENDING_SECTION`,
);
fs.writeFileSync(pendingPath, pending);

// Meet Parallel: no screenshots yet (TBD) — keep screenshots undefined
// Ensure PENDING_SECTION lists both
if (!pending.includes("THINKING_TWICE_PROJECT")) {
  console.error("Thinking Twice missing after rewrite");
  process.exit(1);
}

// --- Reorder portfolioProjects.js ---
let src = fs.readFileSync(projectsPath, "utf8");
if (!src.includes('from "./portfolioPending.js"')) {
  src = src.replace(
    'import { MY_PLAN_README_MARKDOWN } from "./myPlanReadme.js";',
    'import { MY_PLAN_README_MARKDOWN } from "./myPlanReadme.js";\nimport { PENDING_SECTION } from "./portfolioPending.js";',
  );
}

src = src
  .replace(
    /title: "HCI & TouchDesigner",\r?\n\s*subtitle: "Creative Desktop",/,
    'title: "HCI & TouchDesigner",\n    subtitle: "Released",',
  )
  .replace(
    /title: "For Mobile",\r?\n\s*subtitle: "WeChat \/ App",/,
    'title: "WeChat / App",\n    subtitle: "Released",',
  )
  .replace(
    /title: "For Desktop",\r?\n\s*subtitle: "Software \/ Web",/,
    'title: "Software / App",\n    subtitle: "Released",',
  );

const start = src.indexOf("export const PROJECT_SECTIONS = [");
const arrStart = src.indexOf("[", start);
const arrEnd = src.lastIndexOf("];");
const before = src.slice(0, arrStart + 1);
const after = src.slice(arrEnd);
const body = src.slice(arrStart + 1, arrEnd);

const sections = [];
let depth = 0;
let inStr = null;
let esc = false;
let startIdx = -1;
for (let i = 0; i < body.length; i++) {
  const ch = body[i];
  if (inStr) {
    if (esc) {
      esc = false;
      continue;
    }
    if (ch === "\\") {
      esc = true;
      continue;
    }
    if (ch === inStr) inStr = null;
    continue;
  }
  if (ch === '"' || ch === "'" || ch === "`") {
    inStr = ch;
    continue;
  }
  if (ch === "{") {
    if (depth === 0) startIdx = i;
    depth++;
  } else if (ch === "}") {
    depth--;
    if (depth === 0 && startIdx >= 0) {
      sections.push(body.slice(startIdx, i + 1));
      startIdx = -1;
    }
  }
}

if (sections.length !== 3) {
  console.error("Expected 3 sections, got", sections.length);
  process.exit(1);
}

const byTitle = (t) => sections.find((s) => s.includes(`title: "${t}"`));
const soft = byTitle("Software / App");
const wechat = byTitle("WeChat / App");
const hci = byTitle("HCI & TouchDesigner");
if (!soft || !wechat || !hci) {
  console.error("Missing section", { soft: !!soft, wechat: !!wechat, hci: !!hci });
  process.exit(1);
}

const newBody = `\n  ${soft},\n  ${wechat},\n  ${hci},\n  PENDING_SECTION,\n`;
fs.writeFileSync(projectsPath, before + newBody + after);
console.log("OK: Software / App → WeChat / App → HCI → Pending");
