const INTERNSHIPS = [
  {
    id: "xiaomi",
    org: "Beijing Xiaomi Software Co., Ltd.",
    date: "Jul 2026 to Aug 2026",
    role: "Algorithm Engineer Intern",
    bullets: [
      "Built LangGraph workflows for an enterprise AI Agent covering natural-language parsing, query planning, BI orchestration, metric calculation, evidence review, and report generation. Designed InsightState so plans, evidence, gaps, and conclusions stay visible during a run.",
      "Designed Skill routing and reranking with BM25, embedding/RAG, RRF, and intent gating. For short CLI queries I favored strong single-route evidence when one path was clear, and dual-route consistency when both paths fired. I also helped calibrate retrieval parameters.",
      "Wrote two Smart BI Skill specs covering 33 menus and 351 query templates, with offline checks for query, filter, and drill so the model was less likely to invent answers or open the wrong data.",
      "Built a small NocoBase BI dashboard for orders and sales, customer follow-up, role-based access, and automatic level upgrades, plus Feishu automation to share analysis results. I also studied ReAct and Agent Skill patterns and cleaned up internal docs.",
    ],
  },
  {
    id: "dcn",
    org: "Beijing DCN Orthopaedic Hospital",
    date: "May 2025 to Jul 2025",
    role: "Software Development & Testing Intern",
    bullets: [
      "Worked on a Vue intelligent agent system: interface tweaks, form changes, and data display for clinical screening.",
      "Wrote Python scripts to convert formats, batch-process, and clean inspection data. Designed test cases, checked APIs in Postman, and tracked fixes.",
      "Supported adolescent foot and spinal health screening on site: equipment setup, system troubleshooting, and data collection.",
    ],
  },
  {
    id: "telecom",
    org: "Beijing Telecom Planning and Design Institute Co., Ltd.",
    date: "Jun 2024 to Aug 2024",
    role: "Smart Campus Project Team Intern",
    bullets: [
      "Researched user requirements and smart-campus planning topics, including basic information network architecture, smart-city applications, and top-level campus design.",
      "Collected and preprocessed campus data, cleaned it, and organised structured information for project analysis and documentation.",
    ],
  },
];

export function ExperiencePanel() {
  return (
    <section className="panel experience-panel" aria-label="Education and internships">
      <div className="experience-block">
        <h2 className="experience-block-title">Education</h2>
        <ul className="experience-list">
          <li className="experience-item">
            <div className="experience-item-head">
              <p className="experience-org">Macao Polytechnic University</p>
              <p className="experience-date">Aug 2023 to Jun 2027</p>
            </div>
            <p className="experience-role">Bachelor of Science in Computing</p>
          </li>
          <li className="experience-item">
            <div className="experience-item-head">
              <p className="experience-org">University of Bologna</p>
              <p className="experience-date">Jul 2025</p>
            </div>
            <p className="experience-role">
              International Summer School on Smart Objects and Applications
            </p>
            <p className="experience-meta">
              Selected topics: Security for Smart Objects; Data Prediction; Machine Learning
              and TinyML; Social IoT; Data Visualization and Gamification
            </p>
          </li>
        </ul>
      </div>

      <div className="experience-block">
        <h2 className="experience-block-title">Internships</h2>
        <ol className="internship-timeline" aria-label="Internship timeline">
          {INTERNSHIPS.map((job, index) => (
            <li key={job.id} className="timeline-item" style={{ "--i": index }}>
              <div className="timeline-rail" aria-hidden="true">
                <span className="timeline-dot" />
              </div>
              <div className="timeline-card">
                <p className="timeline-date">{job.date}</p>
                <p className="experience-org">{job.org}</p>
                <p className="experience-role">{job.role}</p>
                <ul className="experience-bullets">
                  {job.bullets.map((bullet) => (
                    <li key={bullet.slice(0, 48)}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="experience-block experience-block-beyond">
        <h2 className="experience-block-title">Beyond class</h2>
        <div className="beyond-grid">
          <article className="beyond-card beyond-card-mentor">
            <p className="beyond-index">01</p>
            <h3 className="beyond-title">Mini-project mentor</h3>
            <p className="beyond-role">
              Image-Based English Vocabulary Learning App
            </p>
            <p className="beyond-body">
              Mentored juniors building{" "}
              <em>Image-Based English Vocabulary Learning App</em> (see Portfolio): wrote the
              tutorial, answered questions, and coached their work.
            </p>
            <p className="beyond-body">
              Many students could not say what was wrong, or where the fault was. I started caring
              more about helping them find and understand the problem themselves.
            </p>
          </article>

          <article className="beyond-card beyond-card-notes">
            <p className="beyond-index">02</p>
            <h3 className="beyond-title">Shared notes platform</h3>
            <p className="beyond-role">
              Been There Notes ·{" "}
              <a
                className="experience-link"
                href="https://beenthere-note.netlify.app/en/"
                target="_blank"
                rel="noreferrer"
              >
                beenthere-note.netlify.app
              </a>
            </p>
            <p className="beyond-body">
              Mentoring pushed me to build Been There Notes: I put my own course notes up, and
              others can upload theirs too. The aim is mutual help for paths I already walked, so
              beginners hit fewer of the same walls. The site also has a contact email if someone
              gets stuck on schoolwork or university life and wants to ask.
            </p>
            <p className="beyond-stat">
              <span>1,000+</span> views
            </p>
          </article>

          <article className="beyond-card beyond-card-tiktok">
            <p className="beyond-index">03</p>
            <h3 className="beyond-title">First impressions on TikTok</h3>
            <p className="beyond-body">
              I opened a TikTok topic on a whim and asked people to join. From their posts,
              writing, avatars, and nicknames I wrote a first impression; most of mine were kind
              on purpose.
            </p>
            <p className="beyond-body beyond-body-emphasis">
              I want to grow this toward systems that can read emotion and offer a bit of relief.
              That is why I care about affective computing, and how conversation can carry care.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
