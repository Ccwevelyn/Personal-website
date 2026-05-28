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
        mediaMode: "video-only",
        focus: "Hand-gesture interaction · emotion beyond sound",
        summary:
          "Multilingual \"I love you\" flows into a live sign-language gesture—recognized in real time with MediaPipe and expressed without voice.",
        video: "/portfolio/videos/Video_2.mp4",
        screenshots: [],
        details: `"I love you" appears across different languages, written in diverse scripts and forms. These expressions gradually gather, forming a shared field of meaning beyond any single voice.

The piece is driven by hand-gesture control: MediaPipe tracks the performer's hands and maps movement to the visual narrative in TouchDesigner. The climax is the sign for "I love you" in sign language—recognized as gesture input, not spoken audio.

This silent articulation does not replace words, but reveals another way of expressing them. Love becomes visible without sound—beyond language, distance, and the limits of hearing.

It is not spoken, yet it is fully understood.`,
      },
      {
        id: "rainbow-ribbon",
        title: "Rainbow Ribbon (Audio Reactive)",
        format: "TouchDesigner / Audio Reactive",
        mediaMode: "video-only",
        focus: "Creative coding foundation",
        summary:
          "My first TouchDesigner piece. A ribbon responds to music dynamics, marking the beginning of my creative-technology journey.",
        video: "/portfolio/videos/rainbow_ribbon.mp4",
        screenshots: [],
        details: `This is my first TouchDesigner piece — a rainbow ribbon that ripples and dances in response to music, its movement shaped entirely by the rise and fall of the sound itself.

I know this work looks very beginner-level, but because it is my first creation, it carries a special meaning for me, so I decided to place it here.

What I want to say is this:
even the simplest components, when pieced together again and again, can burst into the most romantic colors.`,
      },
    ],
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
          "A mobile app that helps users learn English vocabulary through image recognition, translation, and text-to-speech feedback.",
        video: "/portfolio/videos/English_learning.mp4",
        mediaMode: "video-only",
        modalType: "english-vocab",
        details:
          "A mobile app built with Expo that helps users learn English vocabulary through image recognition using Google Vision API, translation, and text-to-speech features.",
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
          "Built from a real daily dilemma. It helps users decide meals via nearby random picks or cuisine-first selection, then distance-based listing.",
        video: "/portfolio/videos/wechatApp.mp4",
        mediaLayout: "video-screenshots-split",
        screenshots: ["/portfolio/eat-what/app-screens.png"],
        details: `"What Should I Eat Today?" comes from a very everyday dilemma: when mealtime comes, I still do not know what to eat.

So I built a mini program that helps you decide with location + random options:
1. Either randomly pick one nearby restaurant within 1-5 km.
2. Or use a cuisine wheel to choose a cuisine first, then list restaurants of that cuisine by distance.

All data is powered by the Gaode Maps (高德) nearby-search API. With one request, it returns the restaurant name and full address details.`,
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
          "A system simulation assignment integrating common command statements into a batch-file framework to emulate OS-style interaction.",
        video: "/portfolio/videos/OS.mp4",
        screenshots: ["/portfolio/os/OS_1.png", "/portfolio/os/OS_2.png"],
        details:
          "This project was an assignment for my Operating Systems course, designed to simulate an OS environment. Its significance lies in integrating common command statements into a batch file framework, enabling an interactive command-line interface with extended functionality.",
      },
      {
        id: "exchange-rate",
        title: "Exchange Rate Website",
        format: "Frontend Fundamentals · 100% Hand-Coded",
        focus: "Strong baseline before AI-first workflows",
        summary:
          "A foundational website built from scratch during my early learning stage. It represents discipline in fundamentals before relying on advanced tooling.",
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
          "A local-first planner where AI asks one gap at a time, builds daily/weekly/once checklists, and writes them to the calendar—so vague goals become day-by-day action.",
        video: "/portfolio/videos/my_plan.mp4",
        screenshotLayout: "grid-2x2",
        screenshots: [
          "/portfolio/my-plan/ai-planning-goal.png",
          "/portfolio/my-plan/ai-planning-checklist.png",
          "/portfolio/my-plan/calendar-month.png",
          "/portfolio/my-plan/today-tomorrow.png",
        ],
        readmeMarkdown: MY_PLAN_README_MARKDOWN,
        details: `My Plan targets a common failure mode: goals stay general, but scheduling them on a calendar is tedious. The app unifies AI-assisted breakdown with a calendar you actually use.

You open AI Planning, answer focused questions (chips or chat), review a checklist split into daily, weekly, and one-off tasks, confirm weekly time slots when needed, then apply everything to the month view. The **Today & tomorrow** screen focuses execution: recurring daily items merge when titles match, with independent checkoffs for each day. Filters such as Diet and General plan help you scan what matters. Data stays local in the browser; DeepSeek powers the AI when configured.

It supports bilingual 中文/EN flows, timeout and JSON fallbacks, and routing for study, weight loss, social, and relationship-style goals—not only fitness.`,
      },
      {
        id: "isp-online-shopping",
        title: "Information System Project: Online Shopping System",
        format: "Group Coursework / Information Systems",
        focus: "Project Manager · Team Leader",
        summary:
          "Led team planning, task allocation, and mentor coordination while authoring full-cycle ISD documentation—from requirements and architecture to ER modeling and testing.",
        modalType: "isp-shopping",
        role: "Project Manager / Team Leader",
        leadershipIntro: `Responsible for overall project planning and task allocation. During execution, I identified and resolved conflicts early, coordinated resources and schedule, and maintained continuous alignment with our mentor to keep delivery on track.`,
        leadershipDivision: {
          title: "Division of Labor",
          narrative: `Under my leadership, I designed task allocation around each member's strengths—who was strongest in report writing, system design, PMP planning, coding, or presentation—so everyone could contribute where they performed best.

The matrix below is the division plan we committed to at the start. Final delivery stayed highly consistent with this map: work was effectively split across the team, outcomes matched the intended ownership, and each member could drive their own slice with real agency rather than waiting for top-down instructions.`,
          image: "/portfolio/isp/team-division.png",
          imageAlt:
            "Team task allocation matrix for the online shopping system project, showing category, task, and sub-task ownership across Henry Chen, Andy Fok, Vincent, and Evelyn",
          imageCaption:
            "Task allocation matrix · yellow cells indicate assigned owners per sub-task",
        },
        leadershipCommunication: {
          title: "Information Communication",
          narrative: `When teammates could not attend supervisor meetings, I acted as the team's communication bridge. I captured the mentor's feedback with precision, reframed it into clear action items, and delivered it through structured meeting workbooks so absent members could stay aligned without missing decisions or deadlines.

Each workbook records meeting context, discussion outcomes, and supervisor guidance in a format the team could review asynchronously—turning one-to-one mentor conversations into shared, traceable project memory.`,
          workbookId: "jan17",
        },
        leadershipPlanning: {
          title: "Advance Planning & Post-Meeting Reflection",
          narrative: `Effective leadership is not only what happens in the room—it is how you prepare before and close the loop after. For every team meeting, I planned the session in advance so our time was intentional, not improvised.`,
          beforeMeeting: [
            "Set a clear time slot and kept the meeting within a realistic window",
            "Prepared an agenda: what we needed to decide, review, or unblock",
            "Aligned discussion points with current deliverables and upcoming deadlines",
          ],
          afterMeeting: [
            "Summarized key decisions, owners, and next steps while they were still fresh",
            "Sent a concise recap to the team so everyone shared the same understanding",
            "Made follow-up visible—members could act without relying on memory or side conversations",
          ],
          closing: `This rhythm—plan before, reflect after—kept our meetings efficient and made accountability natural rather than forced.`,
          beforeMeetingDocId: "meeting-todo-jan13",
        },
        leadershipSupervisor: {
          title: "Supervisor Liaison & Issue Consolidation",
          narrative: `As project lead, I collected open questions from every teammate, organized them by topic, and drove active communication with our supervisor. Rather than letting concerns scatter across chats, I maintained one consolidated question log so meetings stayed focused and nothing was lost between members.

I prepared for each supervisor interaction with this document, tracked answers in writing, and fed conclusions back to the team—so alignment with the mentor was continuous, not reactive.`,
          questionsDocId: "team-questions",
        },
        leadershipMotivation: {
          title: "Team Motivation & Emotional Support",
          narrative: `Beyond schedules and documents, I see leadership as keeping people willing to do their best work. I consistently encouraged teammates through demanding phases, reminded the team why our effort mattered, and offered genuine emotional support when stress ran high.`,
          practices: [
            "Checked in regularly—not only on tasks, but on how people were coping with workload and deadlines",
            "Used direct, positive language to keep momentum (“we’re close,” “this part is strong,” “let’s push through this together”)",
            "Recognized contributions publicly so effort felt seen, not invisible",
            "Stayed approachable when someone was stuck or discouraged, so problems surfaced early instead of silently growing",
            "Balanced high standards with warmth—pushing for quality without making the team afraid to speak up",
          ],
          closing: `I believe emotional energy is part of delivery. A motivated team moves faster, communicates better, and produces work they are proud of—and that mindset is something I deliberately bring to every group project I lead.`,
        },
        modelingIntro: `I authored end-to-end information system documentation for our online shopping system—from project planning through requirements, architecture, data design, dynamic behavior, and testing evidence.`,
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
              "Schedule control artifacts that connected milestones, dependencies, and ownership across the full project lifecycle.",
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
              "Activity diagram modeling customer and vendor swimlanes: browsing, authentication, cart, checkout, order tracking, cancellation, and vendor dashboard flows.",
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
              "Three-tier architecture for the online shopping system: HTML/CSS/JavaScript frontend, Node.js with Express backend, and MySQL database. Customers and vendors interact through HTTP request–response; the backend persists data via SQL. Payment Gateway is documented as target architecture only (not implemented in this project).",
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
              "Relational schema for products, images, ratings, orders, order items, users, and cart items—with cardinality and foreign-key relationships.",
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
              "Unit and integration testing documented in the final report, including evidence screenshots and results mapped to functional requirements.",
          },
        ],
      },
    ],
  },
];
