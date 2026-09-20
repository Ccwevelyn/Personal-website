import {
  ENGLISH_VOCAB_README_MARKDOWN,
  ENGLISH_VOCAB_TUTORIAL_INTRO,
  ENGLISH_VOCAB_TUTORIAL_PDF,
} from "./englishVocabReadme.js";
import { CURRENCY_README_MARKDOWN, CURRENCY_SPECIAL_THOUGHTS } from "./currencyReadme.js";
import { MY_PLAN_README_MARKDOWN } from "./myPlanReadme.js";

export const PROJECT_SECTIONS = [
  {
    title: "HCI & TouchDesigner",
    subtitle: "Creative Desktop",
    accentClass: "portfolio-block-pink",
    projects: [
      {
        id: "silence-love",
        title: "Silence Love",
        format: "TouchDesigner / MediaPipe Gesture Control",
        focus: "Hand-gesture interaction · emotion beyond sound",
        summary:
          "Multilingual \"I love you\" lines gather into a live sign-language gesture, read in real time with MediaPipe and shown without voice.",
        video: "/portfolio/videos/Video_2.mp4",
        details: `"I love you" shows up in many languages and scripts. In the piece those phrases gather into one shared visual field.

MediaPipe tracks the performer's hands and drives the TouchDesigner visuals. The climax is the sign-language "I love you" gesture, read as input instead of speech.

I wanted a version of that sentence you can see without hearing it.`,
      },
      {
        id: "rainbow-ribbon",
        title: "Rainbow Ribbon (Audio Reactive)",
        format: "TouchDesigner / Audio Reactive",
        focus: "Creative coding foundation",
        summary:
          "My first TouchDesigner piece: a ribbon that moves with the music. I keep it as a starting point, not as a polished demo.",
        video: "/portfolio/videos/rainbow_ribbon.mp4",
        details: `This is my first TouchDesigner piece: a rainbow ribbon that moves with the music.

It looks beginner-level, and it is. I still keep it here because it was my starting point.

What I care about is simpler: small parts, stacked carefully, can still make something that feels warm.`,
      },    ],
  },
  {
    title: "For Mobile",
    subtitle: "WeChat / App",
    accentClass: "portfolio-block-cyan",
    projects: [
      {
        id: "english-vocab",
        title: "Image-Based English Vocabulary Learning App",
        format: "Expo / Google Vision API",
        focus: "Image learning + translation + TTS",
        summary:
          "Expo app for learning English words from photos: Google Vision for recognition, plus translation and text-to-speech.",
        video: "/portfolio/videos/English_learning.mp4",
        modalType: "english-vocab",
        details:
          "An Expo mobile app for English vocabulary. You photograph an object, Google Vision reads the word, then the app translates and speaks it aloud.",
        readmeMarkdown: ENGLISH_VOCAB_README_MARKDOWN,
        tutorialIntro: ENGLISH_VOCAB_TUTORIAL_INTRO,
        tutorialPdf: ENGLISH_VOCAB_TUTORIAL_PDF,
        screenshotFigures: [
          {
            src: "/portfolio/screenshots/english-vocab-camera.png",
            alt: "Camera Recognition: ready state, live camera, and detected words with translation and pronunciation",
            caption: "Camera · recognition flow",
          },
          {
            src: "/portfolio/screenshots/english-vocab-wordbook.png",
            alt: "My Wordbook: filters, search, difficulty tags, and word cards",
            caption: "Wordbook · search, filters, and saved words",
          },
        ],
      },
      {
        id: "eat-what",
        title: "Eat-What Mini Program",
        format: "WeChat Mini Program / Gaode Maps (Amap) API",
        focus: "Decision support for daily life",
        summary:
          "Built for a daily problem: I often do not know what to eat. Nearby random picks or a cuisine wheel, then restaurants listed by distance.",
        video: "/portfolio/videos/wechatApp.mp4",
        mediaLayout: "video-screenshots-split",
        screenshots: ["/portfolio/eat-what/app-screens.png"],
        details: `"What Should I Eat Today?" comes from a very everyday problem: when mealtime comes, I still do not know what to eat.

So I built a mini program that helps you decide with location and random options:
1. Randomly pick one nearby restaurant within 1-5 km.
2. Or spin a cuisine wheel first, then list restaurants of that cuisine by distance.

Restaurant names and addresses come from the Gaode Maps (高德) nearby-search API in one request.`,
      },
    ],
  },
  {
    title: "For Desktop",
    subtitle: "Software / Web",
    accentClass: "portfolio-block-violet",
    projects: [
      {
        id: "os-cli",
        title:
          "Operating System Simulation: Interactive Command-Line Interface Implemented with Batch Files",
        format: "Operating Systems Coursework",
        focus: "CLI simulation and command orchestration",
        summary:
          "Operating Systems coursework: common commands packed into a batch-file setup for an interactive CLI.",
        video: "/portfolio/videos/OS.mp4",
        screenshots: ["/portfolio/os/OS_1.png", "/portfolio/os/OS_2.png"],
        details:
          "Coursework for Operating Systems. I packed common commands into a batch-file setup so you get an interactive CLI with a few extra features.",
      },
      {
        id: "exchange-rate",
        title: "Exchange Rate Website",
        format: "Frontend Fundamentals · 100% Hand-Coded",
        focus: "Strong baseline before AI-first workflows",
        summary:
          "Early coursework site I built by hand in HTML, CSS, and JavaScript, before I leaned on heavier tooling.",
        video: "/portfolio/videos/Currency_exchange.mp4",
        modalType: "currency",
        screenshots: [
          "/portfolio/currency/Currency1.png",
          "/portfolio/currency/Currency2.png",
          "/portfolio/currency/Currency3.png",
        ],
        readmeMarkdown: CURRENCY_README_MARKDOWN,
        specialThoughts: CURRENCY_SPECIAL_THOUGHTS,
      },
      {
        id: "my-plan",
        title: "My Plan",
        format: "Web App / DeepSeek API · Local-First",
        focus: "AI planning closed loop with calendar execution",
        summary:
          "Local-first planner: AI asks one gap at a time, builds daily/weekly/once checklists, and writes them to the calendar so vague goals become day-by-day tasks.",
        video: "/portfolio/videos/my_plan.mp4",
        screenshotLayout: "grid-2x2",
        screenshots: [
          "/portfolio/my-plan/ai-planning-goal.png",
          "/portfolio/my-plan/ai-planning-checklist.png",
          "/portfolio/my-plan/calendar-month.png",
          "/portfolio/my-plan/today-tomorrow.png",
        ],
        readmeMarkdown: MY_PLAN_README_MARKDOWN,
        details: `My Plan is for when goals stay vague and putting them on a calendar feels like busywork. It pairs AI breakdown with a calendar you can actually open.

You start AI Planning, answer short questions (chips or chat), review a checklist of daily, weekly, and one-off tasks, confirm weekly slots if needed, then push everything onto the month view. Today & tomorrow is for doing the work: matching daily titles merge, and each day keeps its own checkoffs. Filters like Diet and General plan help you scan. Data stays in the browser; DeepSeek runs the AI when you set a key.

Flows work in 中文 and English, with timeouts and JSON fallbacks, and routes for study, weight loss, social, and relationship-style goals, not only fitness.`,
      },
      {
        id: "isp-online-shopping",
        title: "Information System Project: Online Shopping System",
        format: "Group Coursework / Information Systems",
        focus: "Project Manager · Team Leader",
        summary:
          "Led planning, task allocation, and mentor coordination, and wrote ISD docs from requirements and architecture through ER modeling and testing.",
        modalType: "isp-shopping",
        role: "Project Manager / Team Leader",
        leadershipIntro: `I owned overall planning and task allocation. When conflicts showed up, I tried to catch them early, rebalance people and deadlines, and keep our mentor in the loop so delivery stayed on track.`,
        leadershipDivision: {
          title: "Division of Labor",
          narrative: `I assigned work around what each person did best: report writing, system design, PMP planning, coding, or presentation.

The matrix below is the plan we agreed at the start. Final delivery stayed close to it. People owned their slices instead of waiting for constant top-down instructions.`,
          image: "/portfolio/isp/team-division.png",
          imageAlt:
            "Team task allocation matrix for the online shopping system project, showing category, task, and sub-task ownership across Henry Chen, Andy Fok, Vincent, and Evelyn",
          imageCaption:
            "Task allocation matrix · yellow cells indicate assigned owners per sub-task",
        },
        leadershipCommunication: {
          title: "Information Communication",
          narrative: `When teammates missed supervisor meetings, I took notes, turned feedback into action items, and put them in meeting workbooks so people who were absent could catch up.

Each workbook keeps meeting context, decisions, and supervisor notes in one place the team can read later.`,
          workbookId: "jan17",
        },
        leadershipPlanning: {
          title: "Advance Planning & Post-Meeting Reflection",
          narrative: `For team meetings I planned ahead so we were not improvising the whole hour.`,
          beforeMeeting: [
            "Set a clear time slot and kept the meeting within a realistic window",
            "Prepared an agenda: what we needed to decide, review, or unblock",
            "Aligned discussion points with current deliverables and upcoming deadlines",
          ],
          afterMeeting: [
            "Summarized key decisions, owners, and next steps while they were still fresh",
            "Sent a concise recap to the team so everyone shared the same understanding",
            "Made follow-up visible so members could act without relying on memory or side chats",
          ],
          closing: `Planning before and writing a short recap after made meetings shorter and follow-up clearer.`,
          beforeMeetingDocId: "meeting-todo-jan13",
        },
        leadershipSupervisor: {
          title: "Supervisor Liaison & Issue Consolidation",
          narrative: `I gathered open questions from everyone, sorted them by topic, and brought one list to the supervisor so meetings stayed focused.

I prepared from that document, wrote down answers, and sent conclusions back to the team.`,
          questionsDocId: "team-questions",
        },
        leadershipMotivation: {
          title: "Team Motivation & Emotional Support",
          narrative: `I also tried to keep people willing to do hard work: encourage them through rough weeks, remind us why the project mattered, and check in when stress was high.`,
          practices: [
            "Checked in regularly, not only on tasks, but on how people were coping with workload and deadlines",
            "Used direct, positive language to keep momentum (“we’re close,” “this part is strong,” “let’s push through this together”)",
            "Recognized contributions publicly so effort felt seen",
            "Stayed approachable when someone was stuck or discouraged, so problems surfaced early",
            "Kept standards high without making the team afraid to speak up",
          ],
          closing: `A team that feels supported usually ships faster and talks more honestly. I try to bring that into group projects I lead.`,
        },
        modelingIntro: `I wrote the information system docs end to end: planning, requirements, architecture, data design, dynamic behavior, and testing evidence.`,
        modelingHighlights: [
          "Project management: Gantt chart, PDM network, and activity breakdown",
          "Requirements analysis: customer and vendor flows captured in dynamic models",
          "System architecture: three-tier design (frontend, backend, database)",
          "System design: ER diagram and relational data modeling for core entities",
          "Testing: unit and integration validation aligned with deliverables",
        ],
        modelingSections: [
          {
            id: "project-management",
            title: "Project Management",
            description:
              "Schedule artifacts that tied milestones, dependencies, and ownership across the project.",
            artifacts: [
              {
                type: "image",
                title: "PDM — Precedence Diagram Method",
                previewSrc: "/portfolio/isp/modeling/pdm-preview.png",
                src: "/portfolio/isp/modeling/pdm.png",
                alt: "PDM network diagram with activity IDs, durations, and early/late start-finish times for the ISP project",
                caption:
                  "Overview network (click to open detailed diagram with pan & zoom) — ES/EF and LS/LF",
                wide: true,
              },
              {
                type: "image",
                title: "Gantt Chart (Detailed Schedule)",
                previewSrc: "/portfolio/isp/modeling/gantt-preview.png",
                src: "/portfolio/isp/modeling/gantt.png",
                alt: "Gantt chart with task hierarchy, timeline bars, dependencies, and team assignments for the ISP project",
                caption:
                  "Overview schedule (click to open detailed chart with pan & zoom) — Initiating through Deployment",
                wide: true,
              },
            ],
          },
          {
            id: "requirements-dynamic",
            title: "Requirements Analysis & Dynamic Modeling",
            description:
              "Activity diagram for customer and vendor swimlanes: browsing, authentication, cart, checkout, order tracking, cancellation, and vendor dashboard flows.",
            artifacts: [
              {
                type: "image",
                title: "Sequential / Activity Diagram",
                src: "/portfolio/isp/modeling/sequential-diagram.png",
                alt: "UML activity diagram with Customer and Vendor swimlanes for the online shopping system",
                caption: "Customer & vendor workflows with cross-lane interactions",
              },
            ],
          },
          {
            id: "architecture-design",
            title: "System Architecture Design",
            description:
              "Three-tier architecture: HTML/CSS/JavaScript frontend, Node.js with Express backend, and MySQL. Customers and vendors talk over HTTP; the backend stores data with SQL. Payment Gateway is target architecture only and was not built in this project.",
            artifacts: [
              {
                type: "image",
                title: "Architecture Diagram",
                src: "/portfolio/isp/modeling/architecture-design.png",
                alt: "System architecture diagram showing Customers, Vendor, Frontend, Backend, Database, and Payment Gateway with HTTP and SQL flows",
                caption:
                  "Actors, frontend (HTML/CSS/JS), backend (Node.js/Express), MySQL, and external payment context",
                whiteBackground: true,
              },
            ],
          },
          {
            id: "data-modeling",
            title: "Data Modeling (ER Diagram)",
            description:
              "Relational schema for products, images, ratings, orders, order items, users, and cart items, with cardinality and foreign keys.",
            artifacts: [
              {
                type: "image",
                title: "Entity–Relationship Diagram",
                src: "/portfolio/isp/modeling/er-diagram.png",
                alt: "ER diagram for Products, Users, Order, Order_items, Cart_items, ProductImg, and Product_ratings",
                caption: "Core entities, attributes, and relationships (Has, Belong, Contain, Create, Add)",
              },
            ],
          },
          {
            id: "testing",
            title: "Testing",
            description:
              "Unit and integration testing in the final report, with screenshots and results mapped to functional requirements.",
          },
        ],
      },
    ],
  },
];
