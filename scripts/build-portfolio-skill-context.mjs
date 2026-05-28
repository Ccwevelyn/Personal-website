/**
 * Export portfolio + ISP narratives from the site into cc-skill for Evelyn chat.
 * Run: npm run sync-skill
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { PROJECT_SECTIONS } from "../src/data/portfolioProjects.js";
import { CURRENCY_README_MARKDOWN, CURRENCY_SPECIAL_THOUGHTS } from "../src/data/currencyReadme.js";
import { MY_PLAN_README_MARKDOWN } from "../src/data/myPlanReadme.js";
import { ENGLISH_VOCAB_README_MARKDOWN } from "../src/data/englishVocabReadme.js";
import { ISP_MEETING_TODO_JAN13 } from "../src/data/ispMeetingTodoJan13.js";
import { ISP_TEAM_QUESTIONS } from "../src/data/ispTeamQuestions.js";
import { ISP_WORKBOOK_JAN17 } from "../src/data/ispWorkbookJan17.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outProject = path.join(projectRoot, "src/data/portfolioSkillContext.md");
const outSkill = path.join(os.homedir(), ".cursor", "skills", "cc-skill", "portfolio_website.md");

const SKIP_KEYS = new Set(["screenshots", "screenshotFigures", "video", "image", "src", "wide", "whiteBackground"]);

function workbookToMarkdown(doc) {
  if (!doc) return "";
  const lines = [`### ${doc.title}`, `Source file: ${doc.fileName}`, ""];
  for (const block of doc.blocks || []) {
    if (block.type === "field") {
      lines.push(`**${block.label}:** ${block.value}`);
    } else if (block.type === "heading") {
      lines.push(`\n#### ${block.text}`);
    } else if (block.type === "subheading") {
      lines.push(`\n##### ${block.text}`);
    } else if (block.type === "answer") {
      lines.push(`\n> ${block.text}`);
    } else if (block.type === "list") {
      for (const item of block.items || []) {
        if (typeof item === "string") lines.push(`- ${item}`);
        else if (item?.text) {
          lines.push(`- ${item.text}`);
          for (const child of item.children || []) {
            lines.push(`  - ${typeof child === "string" ? child : child.text}`);
          }
        }
      }
    }
  }
  return lines.join("\n");
}

function serializeValue(key, value, depth = 0) {
  if (value == null || SKIP_KEYS.has(key)) return [];
  const indent = "  ".repeat(depth);
  const lines = [];

  if (typeof value === "string") {
    const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
    if (value.includes("\n")) {
      lines.push(`${indent}**${label}:**`, `${indent}${value.split("\n").join(`\n${indent}`)}`, "");
    } else {
      lines.push(`${indent}**${label}:** ${value}`, "");
    }
    return lines;
  }

  if (Array.isArray(value)) {
    if (value.every((v) => typeof v === "string")) {
      lines.push(`${indent}**${key}:**`);
      for (const item of value) lines.push(`${indent}- ${item}`);
      lines.push("");
      return lines;
    }
    for (const item of value) {
      lines.push(...serializeValue("item", item, depth));
    }
    return lines;
  }

  if (typeof value === "object") {
    if (key === "item" && value.title) {
      lines.push(`${indent}#### ${value.title}`);
      if (value.description) lines.push(`${indent}${value.description}`, "");
      if (value.narrative) lines.push(`${indent}${value.narrative}`, "");
      for (const a of value.artifacts || []) {
        lines.push(`${indent}- **${a.title}:** ${a.caption || a.alt || ""}`);
      }
      if (value.caption) lines.push(`${indent}*${value.caption}*`);
      lines.push("");
      return lines;
    }
    if (key === "leadershipDivision" || key.startsWith("leadership")) {
      const title = value.title || key;
      lines.push(`${indent}#### ${title}`);
      if (value.narrative) lines.push(`${indent}${value.narrative}`, "");
      if (value.closing) lines.push(`${indent}${value.closing}`, "");
      if (value.practices) {
        for (const p of value.practices) lines.push(`${indent}- ${p}`);
        lines.push("");
      }
      if (value.beforeMeeting) {
        lines.push(`${indent}**Before meeting:**`);
        for (const p of value.beforeMeeting) lines.push(`${indent}- ${p}`);
      }
      if (value.afterMeeting) {
        lines.push(`${indent}**After meeting:**`);
        for (const p of value.afterMeeting) lines.push(`${indent}- ${p}`);
      }
      if (value.imageCaption) lines.push(`${indent}*${value.imageCaption}*`, "");
      return lines;
    }
    if (key === "modelingSections") {
      for (const section of value) {
        lines.push(`${indent}#### ${section.title}`);
        if (section.description) lines.push(`${indent}${section.description}`, "");
        for (const a of section.artifacts || []) {
          lines.push(`${indent}- **${a.title}:** ${a.caption || a.alt || ""}`);
        }
        lines.push("");
      }
      return lines;
    }
    for (const [k, v] of Object.entries(value)) {
      lines.push(...serializeValue(k, v, depth + 1));
    }
    return lines;
  }

  return lines;
}

function projectToMarkdown(project, sectionTitle) {
  const lines = [
    `## ${project.title}`,
    `Section: ${sectionTitle}`,
    `ID: ${project.id}`,
    "",
  ];

  const simpleKeys = [
    "format",
    "focus",
    "role",
    "summary",
    "details",
    "specialThoughts",
    "leadershipIntro",
    "modelingIntro",
  ];
  for (const key of simpleKeys) {
    if (project[key]) lines.push(...serializeValue(key, project[key]));
  }

  if (project.modelingHighlights) {
    lines.push("**Modeling highlights:**");
    for (const h of project.modelingHighlights) lines.push(`- ${h}`);
    lines.push("");
  }

  if (project.leadershipDivision) lines.push(...serializeValue("leadershipDivision", project.leadershipDivision));
  if (project.leadershipCommunication) lines.push(...serializeValue("leadershipCommunication", project.leadershipCommunication));
  if (project.leadershipPlanning) lines.push(...serializeValue("leadershipPlanning", project.leadershipPlanning));
  if (project.leadershipSupervisor) lines.push(...serializeValue("leadershipSupervisor", project.leadershipSupervisor));
  if (project.leadershipMotivation) lines.push(...serializeValue("leadershipMotivation", project.leadershipMotivation));
  if (project.modelingSections) lines.push(...serializeValue("modelingSections", project.modelingSections));

  if (project.readmeMarkdown && project.id === "english-vocab") {
    lines.push("### README (English Vocab App)", "", ENGLISH_VOCAB_README_MARKDOWN, "");
  }
  if (project.id === "exchange-rate") {
    lines.push("### README (Exchange Rate Site)", "", CURRENCY_README_MARKDOWN, "");
    lines.push("### Personal thoughts (Exchange Rate)", "", CURRENCY_SPECIAL_THOUGHTS, "");
  }
  if (project.id === "my-plan") {
    lines.push("### README (My Plan)", "", MY_PLAN_README_MARKDOWN, "");
  }

  return lines.join("\n");
}

function buildMarkdown() {
  const parts = [
    "# Portfolio website — projects, narratives, and Evelyn's thinking",
    "",
    "This file is auto-generated from the Ccwevelyn site (`npm run sync-skill`).",
    "Use it when visitors ask about projects, ISP leadership/modeling, or my views on my work.",
    "",
    "---",
    "",
  ];

  for (const section of PROJECT_SECTIONS) {
    parts.push(`# ${section.title} (${section.subtitle})`, "");
    for (const project of section.projects) {
      parts.push(projectToMarkdown(project, section.title), "", "---", "");
    }
  }

  parts.push(
    "# ISP supporting documents (full text from site)",
    "",
    workbookToMarkdown(ISP_WORKBOOK_JAN17),
    "",
    "---",
    "",
    workbookToMarkdown(ISP_MEETING_TODO_JAN13),
    "",
    "---",
    "",
    workbookToMarkdown(ISP_TEAM_QUESTIONS),
    "",
  );

  return parts.join("\n").trim() + "\n";
}

const markdown = buildMarkdown();
fs.mkdirSync(path.dirname(outProject), { recursive: true });
fs.writeFileSync(outProject, markdown, "utf-8");
fs.mkdirSync(path.dirname(outSkill), { recursive: true });
fs.writeFileSync(outSkill, markdown, "utf-8");

console.log(`Wrote ${outProject}`);
console.log(`Wrote ${outSkill}`);
