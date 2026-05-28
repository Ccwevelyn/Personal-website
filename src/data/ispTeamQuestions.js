/** Team questions consolidated for supervisor — translated to English from 问题.docx */
export const ISP_TEAM_QUESTIONS = {
  fileName: "ISP-Questions.docx",
  title: "Consolidated Team Questions for Supervisor",
  blocks: [
    { type: "field", label: "Prepared by", value: "Evelyn (Project Manager) — aggregated from all team members" },
    { type: "field", label: "Purpose", value: "Single reference document for supervisor meetings and follow-up" },

    { type: "heading", text: "Report — Submission Format" },
    { type: "subheading", text: "Schedule confirmation" },
    {
      type: "list",
      items: ["Should all submission steps follow the official project schedule?"],
    },
    {
      type: "list",
      items: [
        "Apr 20: Submit soft copy to supervisor by email?",
        "Apr 28: Submit hard copy at the presentation session?",
        "How many hard copies are required? Is a separate copy needed for the panel?",
        "Apr 28: Should we email the supervisor our demo video link, source code, and PPT before/after presentation?",
        "May we send the PPT to the supervisor before the formal presentation for review?",
        "Is a Turnitin report required per the guideline? Should our report keep the AI-detection rate below a specific threshold?",
      ],
    },
    { type: "answer", text: "Apr 20 soft copy by email — Yes (✓)." },
    { type: "answer", text: "Apr 28 hard copy at presentation — Yes (✓)." },
    { type: "answer", text: "Hard copies: one copy to Philip; no separate panel copy required." },
    { type: "answer", text: "PPT may be sent before the formal presentation for review; submitting around Apr 28 is acceptable." },
    { type: "answer", text: "Turnitin report is required; keep AI-detection rate below 30%." },

    { type: "heading", text: "Presentation — Logistics" },
    {
      type: "list",
      items: [
        "What is the required format for uploading the PPT?",
        "Should we send the PPT to the supervisor in advance, or handle it ourselves during the 2 + 10 + 8 minute preparation window?",
        "May we enter the classroom earlier to verify PPT setup and resolve display issues?",
      ],
    },

    { type: "heading", text: "Presentation — Content Structure" },
    {
      type: "list",
      items: [
        "The brief states we must explain how we designed and implemented the project and show how objectives in the System Specification were met. Does “design” mean the full software development design process, or only design plus implementation?",
        "Introduction — 1 minute",
        "Basic functions — demonstration within 2 minutes",
        "Further functions — demonstration",
        "Technical design details for further functions",
        "Conclusion",
      ],
    },

    { type: "heading", text: "Report — Formatting" },
    {
      type: "list",
      items: [
        "Is 1.5 line spacing reasonable? (Including spacing in the risk section.)",
        "Should we avoid blank lines between paragraphs and use indentation instead (e.g., first-line tab)?",
        "Gantt chart: submit separately in soft copy; print on A3 for hard copy — is that acceptable?",
        "Duplex printing? Binding at top-left corner or side binding?",
        "Should the GENAI declaration form be bound and submitted together with the report?",
        "Figure captions in italics — may key information be bolded for emphasis?",
      ],
    },
    { type: "answer", text: "Use consistent paragraph indentation; unify the approach across the report." },
    { type: "answer", text: "Gantt: soft copy separate; A3 print for hard copy is acceptable — fold when submitting." },
    { type: "answer", text: "Duplex printing with side binding." },
    { type: "answer", text: "GENAI form submitted together with the report — Yes." },
    { type: "answer", text: "Bold key information where needed." },

    { type: "heading", text: "Report — Content (Necessity)" },
    { type: "subheading", text: "Structural requirements" },
    {
      type: "list",
      items: [
        "P17: Must we break down each activity in the activity list by assigned team member (requirement analysis, design, implementation, testing owned by different members)?",
        "P25: User requirements are currently one large paragraph. For readability, should we extract content into a list similar to the school’s requirement specification? If yes, should paragraph and list appear together, or is one format enough?",
        "P35: Is a data dictionary required? Our ER diagram does not detail every attribute constraint — is the dictionary redundant?",
        "P44: For common patterns such as screen-reader support, we did not repeat full design detail. Is it reasonable not to document every design element explicitly?",
        "P54: In Security we show partial testing screenshots/results without a long narrative of the testing process, to avoid overwhelming the chapter. Is that acceptable?",
      ],
    },
    { type: "answer", text: "P17: Keep current structure but rename the table as advised." },
    {
      type: "answer",
      text: "P25: A list is preferred if feasible; paragraph plus list together is ideal when possible.",
    },
    { type: "answer", text: "P35: Data dictionary is not redundant — keep current approach." },

    { type: "subheading", text: "Accuracy & narrative focus" },
    {
      type: "list",
      items: [
        "Our product may not be widely known — is an appendix with product introduction appropriate?",
        "P24: Are the current edits to user requirements reasonable and reflective of user needs?",
        "P40: Is the simplified design rationale section acceptable?",
        "Are the two dynamic modeling diagrams reasonable and accurate?",
        "Is the checklist arrangement in the quality chapter logical? Section 6.4 requires further requirements — if T/W topics were already covered earlier, may we omit repetition here?",
        "Could the supervisor review our introduction and conclusion?",
        "For both report and presentation, should we emphasize product highlights, differentiation, and pain-point resolution — or fully cover all block requirements with internal consistency across analysis, design, and further requirements?",
        "What is the approximate quality level of our current draft, and where is the highest-impact room for improvement?",
        "What is the target page count?",
      ],
    },
    { type: "answer", text: "Remove the product introduction appendix — not required." },

    { type: "heading", text: "Report — Internal Team Improvements" },
    {
      type: "list",
      items: [
        "Project risk management — layout and formatting",
        "User-generated content: policy for merchants deleting reviews",
        "Populate sample data for reviews, ratings, and descriptions before recording the demo video",
      ],
    },
  ],
};
