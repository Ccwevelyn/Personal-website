/** Pre-meeting to-do list (Jan 13) — English version of 1_13 ToDoList.pdf */
export const ISP_MEETING_TODO_JAN13 = {
  fileName: "1_13 ToDoList.pdf",
  title: "Pre-Meeting To-Do List — Jan 13",
  blocks: [
    {
      type: "field",
      label: "Purpose",
      value: "Agenda and task checklist prepared before the team meeting",
    },
    {
      type: "field",
      label: "Prepared by",
      value: "Evelyn (Project Manager)",
    },

    { type: "heading", text: "Feature Block Selection" },
    { type: "subheading", text: "Required — choose one from C–F" },
    {
      type: "list",
      items: [
        "Block C: More product attributes and advanced product search",
        "Block D: Configurable products and preliminary inventory management",
        "Block E: Split order and partial shipment",
        "Block F: Multiple vendors (and shops)",
      ],
    },
    {
      type: "list",
      items: [
        "Difficulty ranking (among C–F): C = D > F > E",
        "Practical value ranking: C = F > D > E",
      ],
    },
    { type: "subheading", text: "Additional blocks under consideration" },
    {
      type: "list",
      items: [
        "Block S: Product recommendations — integrate a chatbot / intelligent voice agent",
        "Block T: User-generated content",
        "Block U: Wish list and promotional pricing strategy",
        "Block V: Reports and analytics (enterprise-oriented); purchase history is easier, search history is harder",
        "Block W: Accessibility — aligned with advanced search; user-centered focus",
        "Block X: User experience (UX) design",
        "Block Y: Search engine optimization",
        "Block Z: Web application security",
      ],
    },
    { type: "answer", text: "Action item: Confirm final block selection as a team." },

    { type: "heading", text: "Security Baseline (Discussion Note)" },
    {
      type: "list",
      items: [
        "Basic security requirements (e.g., secure POST handling) must be satisfied and are not treated as an optional block.",
        "Advanced measures (e.g., two-factor authentication, end-to-end encryption) are out of scope for now — prioritize user-facing requirements first.",
        "Platform is not high-transaction-volume — confirm security expectations with supervisor at the meeting.",
      ],
    },

    { type: "heading", text: "Deliverables & Deadlines" },
    { type: "subheading", text: "Team member assignments" },
    {
      type: "list",
      items: [
        "Member A: Complete assigned document sections — due Saturday 18:00",
        "Member E: Own Chapter 4 (System Design) — data modeling (scope to be confirmed), sequence diagram, division-of-labor updates",
      ],
    },
    { type: "subheading", text: "Shared documentation tasks" },
    {
      type: "list",
      items: [
        "Project Work Plan — Introduction: clarify what the team will deliver",
        "Final Report — Introduction: background and motivation (significance / why)",
        "Team Charter — due Saturday 18:00",
        "User Requirements Analysis — confirm accessibility scope by Thursday 18:00; complete documentation by Saturday 18:00",
        "Complete Final Report — Chapter 2",
        "Project Scope",
        "Schedule Plan — due before Saturday 18:00",
        "Charter / technique section → architecture design — due before Saturday 18:00",
        "Dynamic modeling",
        "Interface design (tool reference: Uizard — https://app.uizard.io/)",
      ],
    },

    { type: "heading", text: "Discussion Agenda for This Meeting" },
    {
      type: "list",
      items: [
        "Confirm selected feature blocks (C–F and optional S–Z).",
        "If accessibility is selected: define target user groups and specific needs (feeds user requirements and final report).",
        "If single-vendor model: decide product category (e.g., apparel → virtual try-on as future extension of Block D; electronics as another path).",
        "Team Charter: agree on technology stack and approach.",
        "Finalize division of labor.",
        "Prepare a new document listing scope questions for the next supervisor meeting.",
        "Clarify team policy on AI tool usage and declaration requirements.",
      ],
    },
  ],
};
