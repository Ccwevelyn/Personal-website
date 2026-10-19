import { Link } from "react-router-dom";
import CircularText from "../CircularText";
import SplitText from "../SplitText";
import { ContactButton } from "./ContactButton";
import { FadeIn } from "./FadeIn";
import {
  INTERACT_PROJECT_FULL,
  INTERACT_PROJECT_PARTIAL,
  PROJECT_CLIFF,
} from "../../data/interactContent";

function ProjectCard({ project }) {
  return (
    <article className="interact-project-card">
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

      <div className="interact-cliff-row">
        <div className="interact-cliff">
          <p className="interact-cliff-kicker">{PROJECT_CLIFF.kicker}</p>
          <SplitText
            tag="h3"
            text={PROJECT_CLIFF.title}
            className="interact-cliff-title"
            effect="rise"
            splitType="chars"
            delay={50}
            duration={1.45}
            staggerFrom="start"
            trigger="view"
            hoverEffect="lift"
            textAlign="left"
            threshold={0.15}
            rootMargin="-60px"
          />
          <FadeIn as="p" className="interact-cliff-body" delay={0.15} y={20}>
            {PROJECT_CLIFF.body}
          </FadeIn>
          <FadeIn className="interact-cliff-actions" delay={0.25} y={16}>
            <ContactButton to={PROJECT_CLIFF.primaryTo} label={PROJECT_CLIFF.primaryLabel} />
            <Link to="/" className="interact-cliff-back">
              ← Back to classic site
            </Link>
          </FadeIn>
        </div>
        <FadeIn className="interact-cliff-figure" delay={0.2} y={24}>
          <img
            src="/interact/cliff-evelyn.png?v=2"
            alt="Evelyn pointing toward the invitation"
            className="interact-cliff-figure-img"
          />
          <Link to="/" className="interact-cliff-circular-link" aria-label="Back to classic site">
            <CircularText
              className="interact-cliff-circular"
              text="BACK TO CLASSIC SITE • "
              onHover="speedUp"
              direction="clockwise"
              spinDuration={18}
              size={108}
              fontSize={10}
              fontWeight={700}
              color="#ffffff"
              ring
              ringColor="rgba(255, 255, 255, 0.55)"
              hoverTilt={12}
              draggable
            >
              <span className="interact-cliff-circular-center" aria-hidden="true">
                ←
              </span>
            </CircularText>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
