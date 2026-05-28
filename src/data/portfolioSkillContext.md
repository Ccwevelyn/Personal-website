# Portfolio website — projects, narratives, and Evelyn's thinking

This file is auto-generated from the Ccwevelyn site (`npm run sync-skill`).
Use it when visitors ask about projects, ISP leadership/modeling, or my views on my work.

---

# HCI & TouchDesigner (Creative Desktop)

## Silence Love
Section: HCI & TouchDesigner
ID: silence-love

**Format:** TouchDesigner / MediaPipe Gesture Control

**Focus:** Hand-gesture interaction · emotion beyond sound

**Summary:** Multilingual "I love you" flows into a live sign-language gesture—recognized in real time with MediaPipe and expressed without voice.

**Details:**
"I love you" appears across different languages, written in diverse scripts and forms. These expressions gradually gather, forming a shared field of meaning beyond any single voice.

The piece is driven by hand-gesture control: MediaPipe tracks the performer's hands and maps movement to the visual narrative in TouchDesigner. The climax is the sign for "I love you" in sign language—recognized as gesture input, not spoken audio.

This silent articulation does not replace words, but reveals another way of expressing them. Love becomes visible without sound—beyond language, distance, and the limits of hearing.

It is not spoken, yet it is fully understood.


---

## Rainbow Ribbon (Audio Reactive)
Section: HCI & TouchDesigner
ID: rainbow-ribbon

**Format:** TouchDesigner / Audio Reactive

**Focus:** Creative coding foundation

**Summary:** My first TouchDesigner piece. A ribbon responds to music dynamics, marking the beginning of my creative-technology journey.

**Details:**
This is my first TouchDesigner piece — a rainbow ribbon that ripples and dances in response to music, its movement shaped entirely by the rise and fall of the sound itself.

I know this work looks very beginner-level, but because it is my first creation, it carries a special meaning for me, so I decided to place it here.

What I want to say is this:
even the simplest components, when pieced together again and again, can burst into the most romantic colors.


---

# For Mobile (WeChat / App)

## Image-Based English Vocabulary Learning App
Section: For Mobile
ID: english-vocab

**Format:** Expo / Google Vision API

**Focus:** Image learning + translation + TTS

**Summary:** A mobile app that helps users learn English vocabulary through image recognition, translation, and text-to-speech feedback.

**Details:** A mobile app built with Expo that helps users learn English vocabulary through image recognition using Google Vision API, translation, and text-to-speech features.

### README (English Vocab App)

# Vocab App - English Vocabulary Learning

A mobile app built with Expo that helps users learn English vocabulary through image recognition using Google Vision API, translation, and text-to-speech features.

## Features

- **Camera Recognition**: Take photos or select from gallery to identify English words and objects
- **Translation**: Automatic translation from English to Chinese using Google Translate API
- **Text-to-Speech**: Pronunciation playback using Google TTS API
- **Word Management**: Save, organize, and manage learned vocabulary
- **Categories**: Organize words into custom categories
- **Search & Filter**: Find words quickly with search and category filters
- **Dark/Light Theme**: Switch between themes
- **Offline Storage**: All data stored locally using AsyncStorage

## Project Structure

```
vocab-app/
├── App.js                               # Main app component
├── components/
│   └── WordCard.js                      # Reusable word display component
├── constants/
│   ├── colors.js                        # Theme colors and styling
│   └── strings.js                       # App text and translations
├── hooks/
│   └── useTheme.js                      # Theme management hook
├── navigation/
│   └── BottomTabs.js                    # Bottom tab navigation
├── screens/
│   ├── CameraScreen.js                  # Camera and image recognition
│   ├── HomeScreen.js                    # Home dashboard
│   ├── WordbookScreen.js                # Word management
│   └── SettingsScreen.js                # App settings
├── services/
│   ├── visionService.js                 # Google Vision API integration
│   ├── translateService.js              # Google Translate API integration
│   └── ttsService.js                    # Google TTS API integration
└── storage/
    └── wordbookStorage.js               # Local data storage
```

## Usage

### Taking Photos and Learning Words

1. Open the app and go to the **Camera** tab
2. Take a photo or select from gallery
3. The app will automatically detect English words and objects
4. View translations and listen to pronunciations
5. Save interesting words to your wordbook

### Managing Your Wordbook

1. Go to the **Wordbook** tab
2. View all your saved words
3. Use search to find specific words
4. Filter by categories (All, Recent, Favorites)
5. Tap words to hear pronunciation
6. Mark words as favorites
7. Delete words you no longer need

### Customizing Settings

1. Go to the **Settings** tab
2. Switch between light and dark themes
3. Enable/disable notifications
4. Configure audio and vibration settings
5. Export/import your data
6. Clear all data if needed



---

## Eat-What Mini Program
Section: For Mobile
ID: eat-what

**Format:** WeChat Mini Program / Gaode Maps (Amap) API

**Focus:** Decision support for daily life

**Summary:** Built from a real daily dilemma. It helps users decide meals via nearby random picks or cuisine-first selection, then distance-based listing.

**Details:**
"What Should I Eat Today?" comes from a very everyday dilemma: when mealtime comes, I still do not know what to eat.

So I built a mini program that helps you decide with location + random options:
1. Either randomly pick one nearby restaurant within 1-5 km.
2. Or use a cuisine wheel to choose a cuisine first, then list restaurants of that cuisine by distance.

All data is powered by the Gaode Maps (高德) nearby-search API. With one request, it returns the restaurant name and full address details.


---

# For Desktop (Software / Web)

## Operating System Simulation: Interactive Command-Line Interface Implemented with Batch Files
Section: For Desktop
ID: os-cli

**Format:** Operating Systems Coursework

**Focus:** CLI simulation and command orchestration

**Summary:** A system simulation assignment integrating common command statements into a batch-file framework to emulate OS-style interaction.

**Details:** This project was an assignment for my Operating Systems course, designed to simulate an OS environment. Its significance lies in integrating common command statements into a batch file framework, enabling an interactive command-line interface with extended functionality.


---

## Exchange Rate Website
Section: For Desktop
ID: exchange-rate

**Format:** Frontend Fundamentals · 100% Hand-Coded

**Focus:** Strong baseline before AI-first workflows

**Summary:** A foundational website built from scratch during my early learning stage. It represents discipline in fundamentals before relying on advanced tooling.

**Special Thoughts:**
You may notice that other projects on my website only include a brief video introducing their functions. However, for this website I created this page to share some of my personal ideals. One of the key differences between this website and others is that it does not rely on AI.

I built this website during the first semester of my sophomore year, aiming to pass the school's selection process for the summer program. The requirement was to complete a currency exchange website. At that time, I spent two months learning everything from scratch—starting with basic HTML, CSS, and JavaScript—and then developed this site.

This project holds special meaning for me. Even though AI is now highly advanced and widely used, I believe it should be seen as a tool to enhance efficiency, not as a substitute for fundamental learning. We cannot bypass the basics and jump directly into AI-based development. That is why I emphasize this website today: in an era dominated by AI, this project represents my commitment to mastering the fundamentals and building a strong foundation.

This website is actually quite simple. It doesn't use any advanced frameworks, and some of its functions might just be basic features stacked together without a clear user target. However, it represents my original intention when I first started learning computer science. That's why it holds extraordinary significance to me.

### README (Exchange Rate Site)

# Project introduction
This is a web page that queries real-time exchange rate conversion through the call api. 
<br>The user can select the country and the amount of the query, and the page will output the query result.

# User instruction
The mini-project is mainly composed of three pages: **light query page**, **dark query page** and **historical query record**.
From the navigation bar, you can select a page to access.
   Comparison      |       Light Mode                                        |       Dark Mode
--------------     | ----------------------                       | ------------------
Country selection  | SELECT from the options                                 |    TYPE your choice (Enter the first letter of the country to automatically associate the country that can be queried.)
  Plot             | Dynamically generated according to the selected country |Static rotation chart showing common country exchange rate movements
   Audio           |Read what the mouse clicks on| Click anywhere on the page to play background music

***

In addition, the query page also has the following functions.
* After the country is selected, the corresponding flag changes.
* Quick query of common exchange rates.
* Feedback on incorrect queries. (eg, In Dark Mode, if the entered country is not exist, and the query will not allowed.)

***

 
 * **Historical query record**
<br>The query records that record the user history, note, do not contain the results of quick queries

### Personal thoughts (Exchange Rate)

You may notice that other projects on my website only include a brief video introducing their functions. However, for this website I created this page to share some of my personal ideals. One of the key differences between this website and others is that it does not rely on AI.

I built this website during the first semester of my sophomore year, aiming to pass the school's selection process for the summer program. The requirement was to complete a currency exchange website. At that time, I spent two months learning everything from scratch—starting with basic HTML, CSS, and JavaScript—and then developed this site.

This project holds special meaning for me. Even though AI is now highly advanced and widely used, I believe it should be seen as a tool to enhance efficiency, not as a substitute for fundamental learning. We cannot bypass the basics and jump directly into AI-based development. That is why I emphasize this website today: in an era dominated by AI, this project represents my commitment to mastering the fundamentals and building a strong foundation.

This website is actually quite simple. It doesn't use any advanced frameworks, and some of its functions might just be basic features stacked together without a clear user target. However, it represents my original intention when I first started learning computer science. That's why it holds extraordinary significance to me.


---

## My Plan
Section: For Desktop
ID: my-plan

**Format:** Web App / DeepSeek API · Local-First

**Focus:** AI planning closed loop with calendar execution

**Summary:** A local-first planner where AI asks one gap at a time, builds daily/weekly/once checklists, and writes them to the calendar—so vague goals become day-by-day action.

**Details:**
My Plan targets a common failure mode: goals stay general, but scheduling them on a calendar is tedious. The app unifies AI-assisted breakdown with a calendar you actually use.

You open AI Planning, answer focused questions (chips or chat), review a checklist split into daily, weekly, and one-off tasks, confirm weekly time slots when needed, then apply everything to the month view. The **Today & tomorrow** screen focuses execution: recurring daily items merge when titles match, with independent checkoffs for each day. Filters such as Diet and General plan help you scan what matters. Data stays local in the browser; DeepSeek powers the AI when configured.

It supports bilingual 中文/EN flows, timeout and JSON fallbacks, and routing for study, weight loss, social, and relationship-style goals—not only fitness.

### README (My Plan)

# My Plan

A **local-first** smart planning web app:  
**AI breaks down your goal → builds an executable checklist → writes to the calendar → you execute day by day**.

---

# Why this project

Many people stall at the same step: the goal stays vague, but putting it on a daily calendar is painful.  
You split steps, estimate time, set priorities, keep adjusting—and procrastination wins.

My Plan closes the loop: **AI planning + calendar execution in one place**—not advice-only, not calendar-only.

- Typical tools: good at *recording* or *thinking*;  
- **My Plan**: AI **thinks one step ahead for you**, then lands the result on the calendar.

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
| Data | **Local-first** in the browser; optional `DEEPSEEK_API_KEY` in `.env.local` | Works without AI key; manual plan + calendar still available |

---

# How AI saves you effort (example: weight loss)

1. AI collects basics first (e.g. height, current weight)—not a random target.  
2. Suggests a healthier range using constraints such as BMI.  
3. Back-solves duration, weekly rhythm, and task intensity.  
4. Writes selections into the calendar so **thinking → doing** has less friction.

AI does not replace you—it **reduces decision cost** and turns planning into actions you can run today.

---

# Highlights

* **General goals**: study, weight loss, social skills, open-ended plans—same pipeline.  
* **AI always thinks one step ahead** before long advice dumps.  
* **Checklist-oriented output** — not vague motivation text.  
* **Weekly items get time slots** before they hit the calendar.  
* **Bilingual consistency** (中文 / EN).  
* **Resilience**: request timeouts, JSON fallbacks, routing (study / weight / social / relationships).

---

# Quick start

```bash
cd My_Plan
npm run start
```

Open the URL shown in the terminal (e.g. `http://localhost:5174`).

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

Create `.env.local` in the project root:

```env
DEEPSEEK_API_KEY=your_key_here
```

Without a key, **manual planning and the calendar still work**; AI features prompt you to configure the key.

---

# Project structure (abbreviated)

```text
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
```

---

# FAQ

* **Stuck on “AI thinking…”** — Confirm the local server is running; hard-refresh (`Ctrl + Shift + R`).  
* **Code changes not visible** — Restart `npm run start`, then hard-refresh.  
* **English UI but old Chinese in a thread** — Past sessions are not auto-translated; start a new AI session.


---

## Information System Project: Online Shopping System
Section: For Desktop
ID: isp-online-shopping

**Format:** Group Coursework / Information Systems

**Focus:** Project Manager · Team Leader

**Role:** Project Manager / Team Leader

**Summary:** Led team planning, task allocation, and mentor coordination while authoring full-cycle ISD documentation—from requirements and architecture to ER modeling and testing.

**Leadership Intro:** Responsible for overall project planning and task allocation. During execution, I identified and resolved conflicts early, coordinated resources and schedule, and maintained continuous alignment with our mentor to keep delivery on track.

**Modeling Intro:** I authored end-to-end information system documentation for our online shopping system—from project planning through requirements, architecture, data design, dynamic behavior, and testing evidence.

**Modeling highlights:**
- Project management: Gantt chart, PDM network, and activity breakdown
- Requirements analysis: customer and vendor flows captured in dynamic models
- System architecture: three-tier design (frontend, backend, database)
- System design: ER diagram and relational data modeling for core entities
- Testing: unit and integration validation aligned with deliverables

#### Division of Labor
Under my leadership, I designed task allocation around each member's strengths—who was strongest in report writing, system design, PMP planning, coding, or presentation—so everyone could contribute where they performed best.

The matrix below is the division plan we committed to at the start. Final delivery stayed highly consistent with this map: work was effectively split across the team, outcomes matched the intended ownership, and each member could drive their own slice with real agency rather than waiting for top-down instructions.

*Task allocation matrix · yellow cells indicate assigned owners per sub-task*

#### Information Communication
When teammates could not attend supervisor meetings, I acted as the team's communication bridge. I captured the mentor's feedback with precision, reframed it into clear action items, and delivered it through structured meeting workbooks so absent members could stay aligned without missing decisions or deadlines.

Each workbook records meeting context, discussion outcomes, and supervisor guidance in a format the team could review asynchronously—turning one-to-one mentor conversations into shared, traceable project memory.

#### Advance Planning & Post-Meeting Reflection
Effective leadership is not only what happens in the room—it is how you prepare before and close the loop after. For every team meeting, I planned the session in advance so our time was intentional, not improvised.

This rhythm—plan before, reflect after—kept our meetings efficient and made accountability natural rather than forced.

**Before meeting:**
- Set a clear time slot and kept the meeting within a realistic window
- Prepared an agenda: what we needed to decide, review, or unblock
- Aligned discussion points with current deliverables and upcoming deadlines
**After meeting:**
- Summarized key decisions, owners, and next steps while they were still fresh
- Sent a concise recap to the team so everyone shared the same understanding
- Made follow-up visible—members could act without relying on memory or side conversations
#### Supervisor Liaison & Issue Consolidation
As project lead, I collected open questions from every teammate, organized them by topic, and drove active communication with our supervisor. Rather than letting concerns scatter across chats, I maintained one consolidated question log so meetings stayed focused and nothing was lost between members.

I prepared for each supervisor interaction with this document, tracked answers in writing, and fed conclusions back to the team—so alignment with the mentor was continuous, not reactive.

#### Team Motivation & Emotional Support
Beyond schedules and documents, I see leadership as keeping people willing to do their best work. I consistently encouraged teammates through demanding phases, reminded the team why our effort mattered, and offered genuine emotional support when stress ran high.

I believe emotional energy is part of delivery. A motivated team moves faster, communicates better, and produces work they are proud of—and that mindset is something I deliberately bring to every group project I lead.

- Checked in regularly—not only on tasks, but on how people were coping with workload and deadlines
- Used direct, positive language to keep momentum (“we’re close,” “this part is strong,” “let’s push through this together”)
- Recognized contributions publicly so effort felt seen, not invisible
- Stayed approachable when someone was stuck or discouraged, so problems surfaced early instead of silently growing
- Balanced high standards with warmth—pushing for quality without making the team afraid to speak up

#### Project Management
Schedule control artifacts that connected milestones, dependencies, and ownership across the full project lifecycle.

- **PDM — Precedence Diagram Method:** Overview network (click to open detailed diagram with pan & zoom) — ES/EF and LS/LF
- **Gantt Chart (Detailed Schedule):** Overview schedule (click to open detailed chart with pan & zoom) — Initiating through Deployment

#### Requirements Analysis & Dynamic Modeling
Activity diagram modeling customer and vendor swimlanes: browsing, authentication, cart, checkout, order tracking, cancellation, and vendor dashboard flows.

- **Sequential / Activity Diagram:** Customer & vendor workflows with cross-lane interactions

#### System Architecture Design
Three-tier architecture for the online shopping system: HTML/CSS/JavaScript frontend, Node.js with Express backend, and MySQL database. Customers and vendors interact through HTTP request–response; the backend persists data via SQL. Payment Gateway is documented as target architecture only (not implemented in this project).

- **Architecture Diagram:** Actors, frontend (HTML/CSS/JS), backend (Node.js/Express), MySQL, and external payment context

#### Data Modeling (ER Diagram)
Relational schema for products, images, ratings, orders, order items, users, and cart items—with cardinality and foreign-key relationships.

- **Entity–Relationship Diagram:** Core entities, attributes, and relationships (Has, Belong, Contain, Create, Add)

#### Testing
Unit and integration testing documented in the final report, including evidence screenshots and results mapped to functional requirements.



---

# ISP supporting documents (full text from site)

### Meeting Workbook — Jan 17
Source file: Jan17.docx

**Meeting Time:** Jan 17, 12:30 (Original meeting date: Jan 19 — supervisor schedule conflict)
**Location:** A319
**Participant:** Evelyn
**Meeting Recorder:** Evelyn

#### Discussion Points

#### Report

##### Work Completed Last Week
- Group meeting held to discuss job allocation
- Project scope confirmed
- Completed drafting of:
  - Project Charter
  - Project Work Plan
  - Gantt Chart
  - Activity List
  - Work Plan for Next Week
- Final Report — Requirement analysis
- Project — Confirm field constraints for database design; provide different choices with advantages, disadvantages, and our recommendation to the supervisor

#### Supervisor's Key Points

##### Meeting Attendance & Preparation
- Each member must attend weekly face-to-face meetings; absence will affect individual grades (except for rescheduled cases).
- If unable to attend on time, members must report in advance.
- Preparation before meetings is required.
- Ideally, each member reports their own contributions:
  - Personal points to present (counts toward self-motivation grade).
  - Work completed in the past week.
  - Plans for the coming week (and optionally 2–3 weeks ahead).
  - Challenges (technical/communication) and solutions.
- Overall progress report.
- Members who do not report proactively may be questioned during the meeting.

##### Code Usage & Demonstration
- AI assistance in coding is allowed, but code cannot be fully generated by AI. AI usage must be declared in the declaration form.
- Supervisor will not check code details line by line.
- During meetings, supervisor may request demonstration of specific functions with corresponding code.
- Failure to demonstrate reasonably may result in grade deduction.
- If demonstration is weak, supervisor may ask further questions about code implementation.

##### Assessment & Grading
- Report is the most important deliverable.
- Assessors only see the report; all completed work must be documented there.
- Code implementation without proper reporting will not earn marks.
- Supervisor maintains a checklist based on face-to-face meetings to verify functionality implementation.
- Functionality quality is less important than completion, but interface quality and aesthetics must not be ignored.

#### Issues
- One team member has been unreachable.

##### Supervisor's Suggestion
- Include a clause in the Conflict Resolution section of the Team Charter to address how the team should respond if a member becomes unresponsive.
- Keep the member in the project plan for the first month.
- If the member remains absent, formally remove them from the project.
- Describe and document the situation in the Risk Management part of the final report.

---

### Pre-Meeting To-Do List — Jan 13
Source file: 1_13 ToDoList.pdf

**Purpose:** Agenda and task checklist prepared before the team meeting
**Prepared by:** Evelyn (Project Manager)

#### Feature Block Selection

##### Required — choose one from C–F
- Block C: More product attributes and advanced product search
- Block D: Configurable products and preliminary inventory management
- Block E: Split order and partial shipment
- Block F: Multiple vendors (and shops)
- Difficulty ranking (among C–F): C = D > F > E
- Practical value ranking: C = F > D > E

##### Additional blocks under consideration
- Block S: Product recommendations — integrate a chatbot / intelligent voice agent
- Block T: User-generated content
- Block U: Wish list and promotional pricing strategy
- Block V: Reports and analytics (enterprise-oriented); purchase history is easier, search history is harder
- Block W: Accessibility — aligned with advanced search; user-centered focus
- Block X: User experience (UX) design
- Block Y: Search engine optimization
- Block Z: Web application security

> Action item: Confirm final block selection as a team.

#### Security Baseline (Discussion Note)
- Basic security requirements (e.g., secure POST handling) must be satisfied and are not treated as an optional block.
- Advanced measures (e.g., two-factor authentication, end-to-end encryption) are out of scope for now — prioritize user-facing requirements first.
- Platform is not high-transaction-volume — confirm security expectations with supervisor at the meeting.

#### Deliverables & Deadlines

##### Team member assignments
- Member A: Complete assigned document sections — due Saturday 18:00
- Member E: Own Chapter 4 (System Design) — data modeling (scope to be confirmed), sequence diagram, division-of-labor updates

##### Shared documentation tasks
- Project Work Plan — Introduction: clarify what the team will deliver
- Final Report — Introduction: background and motivation (significance / why)
- Team Charter — due Saturday 18:00
- User Requirements Analysis — confirm accessibility scope by Thursday 18:00; complete documentation by Saturday 18:00
- Complete Final Report — Chapter 2
- Project Scope
- Schedule Plan — due before Saturday 18:00
- Charter / technique section → architecture design — due before Saturday 18:00
- Dynamic modeling
- Interface design (tool reference: Uizard — https://app.uizard.io/)

#### Discussion Agenda for This Meeting
- Confirm selected feature blocks (C–F and optional S–Z).
- If accessibility is selected: define target user groups and specific needs (feeds user requirements and final report).
- If single-vendor model: decide product category (e.g., apparel → virtual try-on as future extension of Block D; electronics as another path).
- Team Charter: agree on technology stack and approach.
- Finalize division of labor.
- Prepare a new document listing scope questions for the next supervisor meeting.
- Clarify team policy on AI tool usage and declaration requirements.

---

### Consolidated Team Questions for Supervisor
Source file: ISP-Questions.docx

**Prepared by:** Evelyn (Project Manager) — aggregated from all team members
**Purpose:** Single reference document for supervisor meetings and follow-up

#### Report — Submission Format

##### Schedule confirmation
- Should all submission steps follow the official project schedule?
- Apr 20: Submit soft copy to supervisor by email?
- Apr 28: Submit hard copy at the presentation session?
- How many hard copies are required? Is a separate copy needed for the panel?
- Apr 28: Should we email the supervisor our demo video link, source code, and PPT before/after presentation?
- May we send the PPT to the supervisor before the formal presentation for review?
- Is a Turnitin report required per the guideline? Should our report keep the AI-detection rate below a specific threshold?

> Apr 20 soft copy by email — Yes (✓).

> Apr 28 hard copy at presentation — Yes (✓).

> Hard copies: one copy to Philip; no separate panel copy required.

> PPT may be sent before the formal presentation for review; submitting around Apr 28 is acceptable.

> Turnitin report is required; keep AI-detection rate below 30%.

#### Presentation — Logistics
- What is the required format for uploading the PPT?
- Should we send the PPT to the supervisor in advance, or handle it ourselves during the 2 + 10 + 8 minute preparation window?
- May we enter the classroom earlier to verify PPT setup and resolve display issues?

#### Presentation — Content Structure
- The brief states we must explain how we designed and implemented the project and show how objectives in the System Specification were met. Does “design” mean the full software development design process, or only design plus implementation?
- Introduction — 1 minute
- Basic functions — demonstration within 2 minutes
- Further functions — demonstration
- Technical design details for further functions
- Conclusion

#### Report — Formatting
- Is 1.5 line spacing reasonable? (Including spacing in the risk section.)
- Should we avoid blank lines between paragraphs and use indentation instead (e.g., first-line tab)?
- Gantt chart: submit separately in soft copy; print on A3 for hard copy — is that acceptable?
- Duplex printing? Binding at top-left corner or side binding?
- Should the GENAI declaration form be bound and submitted together with the report?
- Figure captions in italics — may key information be bolded for emphasis?

> Use consistent paragraph indentation; unify the approach across the report.

> Gantt: soft copy separate; A3 print for hard copy is acceptable — fold when submitting.

> Duplex printing with side binding.

> GENAI form submitted together with the report — Yes.

> Bold key information where needed.

#### Report — Content (Necessity)

##### Structural requirements
- P17: Must we break down each activity in the activity list by assigned team member (requirement analysis, design, implementation, testing owned by different members)?
- P25: User requirements are currently one large paragraph. For readability, should we extract content into a list similar to the school’s requirement specification? If yes, should paragraph and list appear together, or is one format enough?
- P35: Is a data dictionary required? Our ER diagram does not detail every attribute constraint — is the dictionary redundant?
- P44: For common patterns such as screen-reader support, we did not repeat full design detail. Is it reasonable not to document every design element explicitly?
- P54: In Security we show partial testing screenshots/results without a long narrative of the testing process, to avoid overwhelming the chapter. Is that acceptable?

> P17: Keep current structure but rename the table as advised.

> P25: A list is preferred if feasible; paragraph plus list together is ideal when possible.

> P35: Data dictionary is not redundant — keep current approach.

##### Accuracy & narrative focus
- Our product may not be widely known — is an appendix with product introduction appropriate?
- P24: Are the current edits to user requirements reasonable and reflective of user needs?
- P40: Is the simplified design rationale section acceptable?
- Are the two dynamic modeling diagrams reasonable and accurate?
- Is the checklist arrangement in the quality chapter logical? Section 6.4 requires further requirements — if T/W topics were already covered earlier, may we omit repetition here?
- Could the supervisor review our introduction and conclusion?
- For both report and presentation, should we emphasize product highlights, differentiation, and pain-point resolution — or fully cover all block requirements with internal consistency across analysis, design, and further requirements?
- What is the approximate quality level of our current draft, and where is the highest-impact room for improvement?
- What is the target page count?

> Remove the product introduction appendix — not required.

#### Report — Internal Team Improvements
- Project risk management — layout and formatting
- User-generated content: policy for merchants deleting reviews
- Populate sample data for reviews, ratings, and descriptions before recording the demo video
