import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ReadmePreviewModal } from "../components/ReadmePreviewModal";
import { IspModelingPanel } from "../components/IspModelingPanel";
import { IspZoomableImage } from "../components/IspZoomableImage";
import { WordDocumentViewer } from "../components/WordDocumentViewer";
import { ISP_MEETING_TODO_JAN13 } from "../data/ispMeetingTodoJan13";
import { ISP_TEAM_QUESTIONS } from "../data/ispTeamQuestions";
import { ISP_WORKBOOK_JAN17 } from "../data/ispWorkbookJan17";
import { PROJECT_SECTIONS } from "../data/portfolioProjects";

const ISP_WORKBOOKS = {
  jan17: ISP_WORKBOOK_JAN17,
  "team-questions": ISP_TEAM_QUESTIONS,
  "meeting-todo-jan13": ISP_MEETING_TODO_JAN13,
};

function ProjectSection({ title, subtitle, projects, accentClass, onOpenProject }) {
  return (
    <section className={`portfolio-block ${accentClass}`} aria-label={title}>
      <div className="portfolio-block-head">
        <p className="tag">{subtitle}</p>
        <h2>{title}</h2>
      </div>

      <div className="portfolio-grid">
        {projects.map((project, index) => (
          <article key={project.id} className="portfolio-card">
            <div className="portfolio-card-body">
              <p className="portfolio-index">{String(index + 1).padStart(2, "0")}</p>
              <h3>{project.title}</h3>
              <div className="portfolio-meta">
                <span>{project.format}</span>
                {project.role ? <span>{project.role}</span> : null}
              </div>
              <p>{project.summary}</p>
              <button
                type="button"
                className="portfolio-open-btn"
                onClick={() => onOpenProject(project)}
              >
                Open Project Detail
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ReadmeLinkButton({ onClick }) {
  return (
    <p className="portfolio-readme-prompt">
      <span>Open</span>
      <button type="button" className="portfolio-readme-btn" onClick={onClick}>
        <span aria-hidden>▣</span>
        README.md
      </button>
      <span>to get detailed information</span>
    </p>
  );
}

function ProjectModal({ project, onClose }) {
  const [shotIndex, setShotIndex] = useState(0);
  const [readmeOpen, setReadmeOpen] = useState(false);
  const [tab, setTab] = useState("intro");

  const isEnglishVocab = project.modalType === "english-vocab";
  const isCurrency = project.modalType === "currency";
  const isIspShopping = project.modalType === "isp-shopping";
  const hasVideo = Boolean(project.video);
  const hasScreenshots = Array.isArray(project.screenshots) && project.screenshots.length > 0;
  const shotGridLayout = project.screenshotLayout === "grid-2x2";
  const videoShotsSplit =
    project.mediaLayout === "video-screenshots-split" && hasVideo && hasScreenshots;
  const hasCarouselShots = hasScreenshots && !shotGridLayout && !videoShotsSplit;
  const shot = hasCarouselShots ? project.screenshots[shotIndex] : null;

  const tabs = isEnglishVocab
    ? [
        { id: "intro", label: "Project introduction" },
        { id: "tutorial", label: "Tutorial" },
      ]
    : isCurrency
      ? [
          { id: "basic", label: "Basic introduction" },
          { id: "thoughts", label: "Special thoughts" },
        ]
      : isIspShopping
        ? [
            { id: "leadership", label: "Leadership" },
            { id: "modeling", label: "Modeling Capability" },
          ]
        : [];

  const activeTab = tabs.some((item) => item.id === tab) ? tab : tabs[0]?.id ?? "intro";

  return (
    <>
      <div className="portfolio-modal-backdrop" role="dialog" aria-modal="true">
        <div className="portfolio-modal">
          <button type="button" className="portfolio-modal-close" onClick={onClose}>
            Close
          </button>
          <header>
            <p className="eyebrow">Project</p>
            <h2>{project.title}</h2>
            <p>{project.summary}</p>
          </header>

          {tabs.length > 0 ? (
            <nav className="portfolio-modal-tabs" aria-label="Project sections">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`portfolio-modal-tab-btn ${activeTab === item.id ? "active" : ""}`}
                  onClick={() => setTab(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          ) : null}

          {isIspShopping && activeTab === "leadership" ? (
            <section className="portfolio-modal-thoughts portfolio-modal-split portfolio-leadership-panel">
              <p className="portfolio-modal-role">
                <span>Role</span> {project.role}
              </p>
              {project.leadershipIntro ? <p>{project.leadershipIntro}</p> : null}
              {project.leadershipDivision ? (
                <div className="portfolio-leadership-block">
                  <h3 className="portfolio-modal-section-title">1. {project.leadershipDivision.title}</h3>
                  <p>{project.leadershipDivision.narrative}</p>
                  {project.leadershipDivision.image ? (
                    <figure className="portfolio-division-figure">
                      <IspZoomableImage
                        src={project.leadershipDivision.image}
                        alt={project.leadershipDivision.imageAlt ?? "Team division of labor"}
                        lightboxPannable
                        whiteBackground
                      >
                        <div className="portfolio-division-frame">
                          <img
                            src={project.leadershipDivision.image}
                            alt=""
                            aria-hidden="true"
                          />
                        </div>
                      </IspZoomableImage>
                      {project.leadershipDivision.imageCaption ? (
                        <figcaption>{project.leadershipDivision.imageCaption}</figcaption>
                      ) : null}
                    </figure>
                  ) : null}
                </div>
              ) : null}
              {project.leadershipCommunication ? (
                <div className="portfolio-leadership-block">
                  <h3 className="portfolio-modal-section-title">
                    2. {project.leadershipCommunication.title}
                  </h3>
                  <p>{project.leadershipCommunication.narrative}</p>
                  {ISP_WORKBOOKS[project.leadershipCommunication.workbookId] ? (
                    <WordDocumentViewer document={ISP_WORKBOOKS[project.leadershipCommunication.workbookId]} />
                  ) : null}
                </div>
              ) : null}
              {project.leadershipPlanning ? (
                <div className="portfolio-leadership-block">
                  <h3 className="portfolio-modal-section-title">3. {project.leadershipPlanning.title}</h3>
                  <p>{project.leadershipPlanning.narrative}</p>
                  <div className="portfolio-leadership-phases">
                    <div>
                      <h4 className="portfolio-leadership-phase-title">Before the meeting</h4>
                      <ul className="portfolio-modal-bullet-list">
                        {project.leadershipPlanning.beforeMeeting.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="portfolio-leadership-phase-title">After the meeting</h4>
                      <ul className="portfolio-modal-bullet-list">
                        {project.leadershipPlanning.afterMeeting.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {ISP_WORKBOOKS[project.leadershipPlanning.beforeMeetingDocId] ? (
                    <div className="portfolio-leadership-doc">
                      <WordDocumentViewer
                        document={ISP_WORKBOOKS[project.leadershipPlanning.beforeMeetingDocId]}
                      />
                    </div>
                  ) : null}
                  {project.leadershipPlanning.closing ? (
                    <p className="portfolio-leadership-closing">{project.leadershipPlanning.closing}</p>
                  ) : null}
                </div>
              ) : null}
              {project.leadershipSupervisor ? (
                <div className="portfolio-leadership-block">
                  <h3 className="portfolio-modal-section-title">4. {project.leadershipSupervisor.title}</h3>
                  <p>{project.leadershipSupervisor.narrative}</p>
                  {ISP_WORKBOOKS[project.leadershipSupervisor.questionsDocId] ? (
                    <WordDocumentViewer document={ISP_WORKBOOKS[project.leadershipSupervisor.questionsDocId]} />
                  ) : null}
                </div>
              ) : null}
              {project.leadershipMotivation ? (
                <div className="portfolio-leadership-block">
                  <h3 className="portfolio-modal-section-title">5. {project.leadershipMotivation.title}</h3>
                  <p>{project.leadershipMotivation.narrative}</p>
                  {Array.isArray(project.leadershipMotivation.practices) &&
                  project.leadershipMotivation.practices.length > 0 ? (
                    <ul className="portfolio-modal-bullet-list portfolio-motivation-list">
                      {project.leadershipMotivation.practices.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {project.leadershipMotivation.closing ? (
                    <p className="portfolio-leadership-closing">{project.leadershipMotivation.closing}</p>
                  ) : null}
                </div>
              ) : null}
            </section>
          ) : isIspShopping && activeTab === "modeling" ? (
            <IspModelingPanel project={project} />
          ) : isCurrency && activeTab === "thoughts" ? (
            <section className="portfolio-modal-thoughts">
              <p>{project.specialThoughts}</p>
            </section>
          ) : isEnglishVocab && activeTab === "intro" ? (
            <>
              <section className="portfolio-modal-section">
                <h3 className="portfolio-modal-section-title">Description</h3>
                <div className="portfolio-modal-text-block">
                  <p className="portfolio-modal-details">{project.details}</p>
                  {project.readmeMarkdown ? (
                    <ReadmeLinkButton onClick={() => setReadmeOpen(true)} />
                  ) : null}
                </div>
              </section>

              <section
                className="portfolio-english-media-split"
                aria-label="Demo video and app screenshots"
              >
                <div className="portfolio-english-media-col">
                  <h3 className="portfolio-modal-section-title">Demo Video</h3>
                  <div className="portfolio-modal-video portfolio-english-video">
                    <video src={project.video} controls preload="metadata" />
                  </div>
                </div>
                <div className="portfolio-english-media-col">
                  <h3 className="portfolio-modal-section-title">Screenshots</h3>
                  <div className="portfolio-english-shots-stack">
                    {project.screenshotFigures?.map((figure) => (
                      <figure key={figure.src} className="portfolio-english-shot">
                        <div className="portfolio-modal-figure-frame">
                          <img src={figure.src} alt={figure.alt} />
                        </div>
                        <figcaption>{figure.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </section>
            </>
          ) : isEnglishVocab && activeTab === "tutorial" ? (
            <section className="portfolio-tutorial-panel" aria-label="Tutorial document">
              <p className="portfolio-tutorial-intro">{project.tutorialIntro}</p>
              <div className="portfolio-tutorial-shell">
                <div className="portfolio-tutorial-chrome">
                  <span />
                  <span />
                  <span />
                  <span className="portfolio-tutorial-doc-title">
                    Document preview · Year 2 Mini-Project.pdf
                  </span>
                </div>
                <iframe
                  title="Year 2 Mini-Project instruction PDF"
                  src={project.tutorialPdf}
                  className="portfolio-tutorial-iframe"
                />
              </div>
            </section>
          ) : (
            <>
              {isCurrency || project.readmeMarkdown ? (
                <section className="portfolio-modal-section">
                  <h3 className="portfolio-modal-section-title">Description</h3>
                  <div className="portfolio-modal-text-block">
                    {project.readmeMarkdown ? (
                      <ReadmeLinkButton onClick={() => setReadmeOpen(true)} />
                    ) : null}
                  </div>
                </section>
              ) : project.details ? (
                <section className="portfolio-modal-text">
                  <h3>Full Description (Original Website Content)</h3>
                  <p>{project.details}</p>
                </section>
              ) : null}

              {videoShotsSplit ? (
                <section
                  className="portfolio-modal-section"
                  aria-label="Demo video and app screenshots"
                >
                  <h3 className="portfolio-modal-section-title">Demo Video & Screenshots</h3>
                  <div className="portfolio-video-shots-split">
                    <div className="portfolio-video-shots-video">
                      <div className="portfolio-modal-video">
                        <video src={project.video} controls preload="metadata" />
                      </div>
                    </div>
                    <div className="portfolio-video-shots-stack">
                      {project.screenshots.map((src, index) => (
                        <img
                          key={src}
                          src={src}
                          alt={`${project.title} screenshot ${index + 1}`}
                          loading="lazy"
                        />
                      ))}
                    </div>
                  </div>
                </section>
              ) : hasVideo ? (
                <section className="portfolio-modal-section">
                  <h3 className="portfolio-modal-section-title">Demo Video</h3>
                  <div className="portfolio-modal-video">
                    <video src={project.video} controls preload="metadata" />
                  </div>
                </section>
              ) : null}

              {hasScreenshots && shotGridLayout && !videoShotsSplit ? (
                <section className="portfolio-modal-section portfolio-modal-screenshots-grid">
                  <h3 className="portfolio-modal-section-title">Screenshots</h3>
                  <div className="portfolio-modal-shots-grid" role="list">
                    {project.screenshots.map((src, index) => (
                      <figure key={src} className="portfolio-modal-shots-grid-cell" role="listitem">
                        <img
                          src={src}
                          alt={`${project.title} screenshot ${index + 1}`}
                          loading="lazy"
                        />
                      </figure>
                    ))}
                  </div>
                </section>
              ) : hasCarouselShots ? (
                <section className="portfolio-modal-section portfolio-modal-carousel">
                  <h3 className="portfolio-modal-section-title">Screenshots</h3>
                  <div className="portfolio-modal-shot-wrap">
                    <img src={shot} alt={`${project.title} screenshot ${shotIndex + 1}`} />
                    <div className="portfolio-modal-shots">
                      {project.screenshots.map((src, index) => (
                        <button
                          key={src}
                          type="button"
                          className={index === shotIndex ? "active" : ""}
                          onClick={() => setShotIndex(index)}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </section>
              ) : null}
            </>
          )}
        </div>
      </div>

      {project.readmeMarkdown ? (
        <ReadmePreviewModal
          open={readmeOpen}
          onClose={() => setReadmeOpen(false)}
          markdown={project.readmeMarkdown}
        />
      ) : null}
    </>
  );
}

export function PortfolioPage() {
  const [activeProjectId, setActiveProjectId] = useState(null);

  const allProjects = useMemo(
    () => PROJECT_SECTIONS.flatMap((section) => section.projects),
    [],
  );
  const activeProject =
    activeProjectId == null
      ? null
      : allProjects.find((project) => project.id === activeProjectId) ?? null;

  return (
    <main className="portfolio-page">
      <header className="portfolio-header">
        <p className="eyebrow">Portfolio</p>
        <h1>Selected Works</h1>
        <p>
          Project videos, README documentation, tutorial PDFs, screenshots, and full descriptions.
        </p>
        <Link to="/" className="text-link">
          ← Back to Home
        </Link>
      </header>

      {PROJECT_SECTIONS.map((section) => (
        <ProjectSection
          key={section.title}
          title={section.title}
          subtitle={section.subtitle}
          projects={section.projects}
          accentClass={section.accentClass}
          onOpenProject={(project) => {
            setActiveProjectId(project.id);
          }}
        />
      ))}

      {activeProject ? (
        <ProjectModal project={activeProject} onClose={() => setActiveProjectId(null)} />
      ) : null}
    </main>
  );
}
