import { Link } from "react-router-dom";
import { ContactButton } from "./ContactButton";
import { FadeIn } from "./FadeIn";
import {
  INTERACT_PROJECT_FULL,
  INTERACT_PROJECT_PARTIAL,
  PROJECT_CLIFF,
} from "../../data/interactContent";

function ProjectCard({ project, className = "" }) {
  return (
    <article className={`interact-project-card ${className}`.trim()}>
      <div className="interact-project-top">
        <p className="interact-project-num">{project.number}</p>
        <div className="interact-project-meta">
          <p className="interact-project-cat">{project.category}</p>
          <h3>{project.title}</h3>
          <p className="interact-project-summary">{project.summary}</p>
        </div>
      </div>
      <div className="interact-project-media">
        <div className="interact-project-col-left">
          {project.images.slice(0, 2).map((src) => (
            <img key={src} src={src} alt="" loading="lazy" />
          ))}
        </div>
        <div className="interact-project-col-right">
          {project.images[2] ? <img src={project.images[2]} alt="" loading="lazy" /> : null}
        </div>
      </div>
    </article>
  );
}

export function ProjectCliff() {
  return (
    <section id="projects" className="interact-projects interact-projects-cliff">
      <FadeIn as="h2" className="interact-section-heading" delay={0} y={40}>
        Project
      </FadeIn>

      <div className="interact-projects-stack">
        <FadeIn className="interact-project-full-wrap" delay={0.05} y={24}>
          <ProjectCard project={INTERACT_PROJECT_FULL} />
        </FadeIn>

        <div className="interact-projects-cut interact-projects-cut-three-quarter" aria-hidden="true">
          <div className="interact-projects-cut-stage">
            <ProjectCard project={INTERACT_PROJECT_PARTIAL} />
          </div>
          <div className="interact-projects-cut-edge" />
        </div>
      </div>

      <FadeIn className="interact-cliff" delay={0.1} y={28}>
        <p className="interact-cliff-kicker">{PROJECT_CLIFF.kicker}</p>
        <h3 className="interact-cliff-title">{PROJECT_CLIFF.title}</h3>
        <p className="interact-cliff-body">{PROJECT_CLIFF.body}</p>
        <div className="interact-cliff-actions">
          <ContactButton to={PROJECT_CLIFF.primaryTo} label={PROJECT_CLIFF.primaryLabel} />
          <Link className="interact-text-link interact-cliff-secondary" to={PROJECT_CLIFF.secondaryTo}>
            {PROJECT_CLIFF.secondaryLabel}
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
