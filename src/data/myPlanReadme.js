export const MY_PLAN_README_MARKDOWN = `# My Plan

A **local-first** smart planning web app:  
**AI breaks down your goal → builds an executable checklist → writes to the calendar → you execute day by day**.

---

# Why this project

Many people stall at the same step: the goal stays vague, but putting it on a daily calendar is painful.
You split steps, estimate time, set priorities, keep adjusting, and procrastination wins.

My Plan puts AI planning and calendar execution in one place. It is not advice-only, and not calendar-only.

- Typical tools: good at *recording* or *thinking*;
- **My Plan**: AI asks the next useful question, then lands the result on the calendar.

---

# Core surfaces (simulated walkthrough)

| Surface | What you see | What you do |
| ------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **AI Planning modal** | Start/end date, plan days, total hours; history chip (e.g. *I want to lose my weight · 2026-05-29~2026-06-06*) | Leave all four blank → start defaults to today and AI fills the rest; partial fill → AI only completes empty fields |
| **Guided Q&A** | One key question at a time (e.g. *How much weight do you want to lose (kg)?* with 1–2 / 3–4 / 5–6 / 7+ chips) | Tap an option, use the inline field, or type freely in **Chat with AI** (Enter send, Shift+Enter newline) |
| **Action checklist** | Tasks grouped as **daily / weekly / once** with checkmarks (e.g. 16:8 fasting, low-carb meals, 3L water, 7–8h sleep) | Review categories → select items → confirm weekly time slots if needed → **Apply to calendar** |
| **Month calendar** | Full month grid, goal filters (**All · Diet · General plan**), day cells with Plan/Diet tags and *+N more* | Navigate months; focus on days inside the active plan window (e.g. 2026-05-29 – 2026-06-06) |
| **Today & tomorrow** | Merged daily tasks when the same title appears on both days; separate **Today** / **Tomorrow** checkboxes per item; day panels for tasks unique to one date | Check off today vs tomorrow independently; progress shown as *Today 2/2 · Tomorrow 0/2*; jump from **Calendar** in the header |

---

# AI planning vs calendar-only

| Comparison | AI Planning path | Calendar / manual path |
| ---------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Goal input | Natural language (*lose my weight*, study, social, general) | Add tasks yourself |
| Information gap | AI asks **one missing fact at a time** (no repeat loops) | You decide everything upfront |
| Output | Executable checklist: **daily · weekly · once** | Single events or ad-hoc notes |
| Weekly tasks | Pick weekday + time before writing to calendar | You schedule each occurrence manually |
| Language | **中文 / EN** — UI, prompts, and post-processing stay aligned | Same UI; AI session language follows your choice |
| Data | **Local-first** in the browser; optional \`DEEPSEEK_API_KEY\` in \`.env.local\` | Works without AI key; manual plan + calendar still available |

---

# How AI saves you effort (example: weight loss)

1. AI collects basics first (e.g. height, current weight), not a random target.  
2. Suggests a healthier range using constraints such as BMI.  
3. Back-solves duration, weekly rhythm, and task intensity.  
4. Writes selections into the calendar so thinking to doing has less friction.

AI does not replace you. It cuts decision cost and turns planning into actions you can run today.

---

# Highlights

* **General goals**: study, weight loss, social skills, open-ended plans, same pipeline.  
* **AI asks one useful question at a time** before long advice dumps.  
* **Checklist-oriented output**, not vague motivation text.  
* **Weekly items get time slots** before they hit the calendar.  
* **Bilingual consistency** (中文 / EN).  
* **Resilience**: request timeouts, JSON fallbacks, routing (study / weight / social / relationships).

---

# Quick start

\`\`\`bash
cd My_Plan
npm run start
\`\`\`

Open the URL shown in the terminal (e.g. \`http://localhost:5174\`).

### New AI plan

1. Open **AI Plan**, enter a goal (weight loss, exams, social growth, etc.).  
2. Answer step by step (chips, inline fields, or chat).  
3. When the checklist appears, select tasks to keep.  
4. For weekly tasks, confirm day and time.  
5. Click **Apply to calendar**.

### Daily execution

* **Month view** — full schedule and filters.  
* **Today & tomorrow** — merged daily habits with separate checkboxes per day; side panels for day-only tasks.  
* Check off completed items and keep rolling.

---

# Optional AI configuration

Create \`.env.local\` in the project root:

\`\`\`env
DEEPSEEK_API_KEY=your_key_here
\`\`\`

Without a key, **manual planning and the calendar still work**; AI features prompt you to configure the key.

---

# Project structure (abbreviated)

\`\`\`text
My_Plan/
├── server.js          # Static host + AI proxy
├── package.json
└── web/
    ├── app.js         # Main flow: AI chat, checklist, calendar write
    ├── ai-helpers.js  # Post-processing, routing, guardrails
    ├── ai-prompts.js  # Bilingual system prompts
    ├── i18n.js        # Copy / strings
    ├── planner.js     # Task model + local storage
    └── styles.css
\`\`\`

---

# FAQ

* **Stuck on “AI thinking…”** — Confirm the local server is running; hard-refresh (\`Ctrl + Shift + R\`).  
* **Code changes not visible** — Restart \`npm run start\`, then hard-refresh.  
* **English UI but old Chinese in a thread** — Past sessions are not auto-translated; start a new AI session.`;
