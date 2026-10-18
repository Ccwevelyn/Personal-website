/** Pending projects — half-built ideas and stuck points, not shipped claims. */

export const MEET_PARALLEL_PROJECT = {
  id: "meet-parallel",
  title: "Meeting in a Parallel Time",
  titleEn: "Meet Parallel",
  format: "Web · AI persona group chat",
  focus: "Human-in-the-loop · persona learning",
  status: "idea-in-progress",
  pending: true,
  modalType: "pending-meet-parallel",
  mediaLayout: "story-scroll",
  repo: "https://github.com/Ccwevelyn/Meet-parallel",
  summary:
    "A cream, minimal group chat where thirteen classmates keep talking as AI personas. In Rewrite you speak as yourself; those lines are stored in your persona and steer how the AI talks for that seat later. The hard part is reply choice: in real life there is often no tidy rule for who answers whom.",
  poem: [
    "Meeting someone can feel like a grand goodbye — blame thin fate, or unfair luck.",
    "If we had said different words that day, chosen another path, would the ending change?",
    "I would rather keep distance as parallel lines than watch us drift apart with only memories left.",
  ],
  members: [
    { user: "Cheng", nick: "复制粘贴吧黄牌" },
    { user: "Xian", nick: "离离原上草" },
    { user: "Wang", nick: "群之共主" },
    { user: "Lin", nick: "L.ing" },
    { user: "Gao", nick: "话痨用户" },
    { user: "Sev", nick: "小七" },
    { user: "Wu", nick: "伍子軒" },
    { user: "Evelyn", nick: "Looking up at the starry sky" },
    { user: "Morty", nick: "小可" },
    { user: "Chen", nick: "石墨烯" },
    { user: "Kang", nick: "小米康" },
    { user: "Zhang", nick: "Tree" },
    { user: "Bao", nick: "烟火°" },
  ],
  storyBlocks: [
    {
      kind: "text",
      title: "Home",
      body: "The entry page is plain cream with a short poem. From here you pick one of two paths: Watch or Rewrite.",
    },
    {
      kind: "image",
      src: "/portfolio/meet-parallel/01-entry.png",
      caption: "Home · Watch / Rewrite",
    },
    {
      kind: "text",
      title: "Watch",
      body: "Read-only. You sit with the AI group chat, filter by date or member, and cannot send messages.",
    },
    {
      kind: "image",
      src: "/portfolio/meet-parallel/02-watch.png",
      caption: "Watch · observe only",
    },
    {
      kind: "text",
      title: "Rewrite",
      body: "Log in with a fixed account mapped to a WeChat nickname. You take that seat; while you are in, the AI does not speak for you. Every line you send in Rewrite is written into that person’s persona profile — tone, habits, who you reply to, when you speak. Those records feed Rebuild / character summaries, so the AI’s later lines for that seat follow what you actually said, not only the old scrape.",
    },
    {
      kind: "image",
      src: "/portfolio/meet-parallel/03-rewrite.png",
      caption: "Rewrite · human speech recorded into the persona",
    },
    {
      kind: "text",
      title: "Admin",
      body: "Clear the message history, rebuild personas from logged human and AI I/O, generate character summaries, or pause the AI. Rebuild is the step that folds Rewrite speech into the next round of agent prompts.",
    },
    {
      kind: "image",
      src: "/portfolio/meet-parallel/04-admin.png",
      caption: "Admin · tune personas",
    },
    {
      kind: "text",
      title: "Persona editor",
      body: "Each member stores active hours, reply habits, and a long character summary. Sample counts show how much chat was scraped for that person.",
    },
    {
      kind: "image",
      src: "/portfolio/meet-parallel/05-persona-editor.png",
      caption: "Persona · active hours and summary",
    },
    {
      kind: "text",
      title: "Why it stalls — no clean “reason” for who replies",
      body: "In a real group, you often answer someone because you prefer them, or because their last message pulls you in — not because a clock says you are online. Those preferences have no neat formula. Online hours and reply counts help a little, but they miss favoritism, mood, and “I answer A more than B.” That gap sits in conversation structure modeling and participant responsivity (recovering reply-to links and who substantively responds to whom). I tried active-hour weights and reply graphs; they still do not explain the human side well enough to keep the simulation believable, so the project pauses here.",
    },
    {
      kind: "text",
      title: "Why I still want it finished",
      body: "Distilling how someone talks is a way to revisit another room of a shared life. Longer term I want a world where, if a friend cannot come online, the chat still feels like them — and if two people log in together, neither can tell who is AI.",
    },
    {
      kind: "text",
      title: "Open work",
      body: "Stronger models; more one-to-one chats; broader social-web phrasing; RAG from the open web; better reply-to / responsivity modeling beyond online hours; a ~10s AI reply when a human joins; hot news and anime/game topics for members who share those.",
    },
  ],
  details: `Meeting in a Parallel Time (Meet Parallel)

Cream, minimal web UI. Thirteen classmates from a WeChat group keep talking as AI personas. Watch lets you observe; Rewrite lets you log in and take your own seat.

When you speak in Rewrite, those lines are saved into that person’s persona. Rebuild / character summaries pull them into the next prompts, so the AI’s later speech for that seat follows your real wording and habits, not only the original scrape.

Stuck problem: there is often no objective rule for who replies to whom. Preference and “I tend to answer this person after their message” sit outside simple online-hour stats. That is closer to conversation structure modeling and participant responsivity than to a scheduling script. Until that layer is better, the group chat feels off.

Repo: https://github.com/Ccwevelyn/Meet-parallel`,
};

export const THINKING_TWICE_PROJECT = {
  id: "thinking-twice",
  title: "Thinking Twice",
  titleEn: "Think Twice",
  format: "Cursor Skill · decision gate",
  focus: "Pause agency · make humans think again",
  status: "idea-in-progress",
  pending: true,
  modalType: "pending-thinking-twice",
  mediaLayout: "story-scroll",
  summary:
    "Built because full agent autonomy made me lose the plot. It should pause only when a high-impact step needs my tradeoff — and the open problem is that stop timing is still wrong too often.",
  storyBlocks: [
    {
      kind: "text",
      title: "Why it exists",
      body: "I kept handing Codex or Cursor full permission and saying “just do it,” then not knowing what it was doing. I do not want an agent that leads me by the nose. I want one that can stop me — and make me state the choice, the reason, and the risk — before irreversible work runs. The point is reverse pressure to think again, not more busywork.",
    },
    {
      kind: "text",
      title: "What runs today",
      body: "The skill reads the recent thread. If a tradeoff is already clear, a short “ok” is enough. It mirrors the choice by default and only asks one short question when a high-impact step is about to run and nothing in context records why.",
    },
    {
      kind: "image",
      src: "/portfolio/thinking-twice/01-ask.png",
      caption: "1 · Vague ask — hold the code, ask for parts",
    },
    {
      kind: "image",
      src: "/portfolio/thinking-twice/02-clarify.png",
      caption: "2 · You spell the rules — AI mirrors the design",
    },
    {
      kind: "image",
      src: "/portfolio/thinking-twice/03-code.png",
      caption: "3 · After you confirm — first working version",
    },
    {
      kind: "text",
      title: "Problem now — when to interrupt",
      body: "I still do not know a reliable rule for when to stop. Sometimes it pauses when I only needed a draft, and the interrupt feels like extra load. Sometimes it should stop — a real decision is missing — and it keeps going. The stuck point is interrupt timing: useful gate versus noisy gate; human must decide versus AI should just write. Until that calibration is better, the skill is unfinished.",
    },
  ],
  details: `Thinking Twice

Why it exists: full agent runs left me unsure what was happening. I want pauses that force a tradeoff into the open before high-impact work, not an agent that decides for me.

What runs: read the full thread; honor an existing tradeoff; mirror by default; ask one short question only when high-impact work is about to run and context still has no why.

Problem now: interrupt timing. Wrong stops feel like burden; missing stops let the agent runaway. Separating “ask the human” from “just draft” is the open work.

Open work: better stop calibration; clearer split between human decisions and AI drafting; questions that ask intent without growing into a checklist.`,
};

export const PENDING_SECTION = {
  title: "Pending",
  subtitle: "",
  accentClass: "portfolio-block-pending",
  status: "pending",
  projects: [MEET_PARALLEL_PROJECT, THINKING_TWICE_PROJECT],
};
