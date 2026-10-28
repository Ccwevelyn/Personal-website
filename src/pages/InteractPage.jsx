import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatedText } from "../components/interact/AnimatedText";
import { ButterflyField } from "../components/interact/ButterflyField";
import { ContactButton } from "../components/interact/ContactButton";
import { ContactLanyardModal } from "../components/interact/ContactLanyardModal";
import { VideoEssayModal } from "../components/VideoEssayModal";
import { FadeIn } from "../components/interact/FadeIn";
import { GazeFollowVideo } from "../components/interact/GazeFollowVideo";
import { ProjectCliff } from "../components/interact/ProjectCliff";
import {
  MARQUEE_IMAGES,
  RESEARCH_ITEMS,
} from "../data/interactContent";
import "../styles/interact.css";

const INTERACT_SECTIONS = [
  { id: "who", label: "Who" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
];

function scrollToInteractSection(id, { smooth = true } = {}) {
  const node = document.getElementById(id);
  if (!node) return;
  node.scrollIntoView({
    behavior: smooth ? "smooth" : "auto",
    block: "start",
  });
}

function MarqueeSection() {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const row1 = [...MARQUEE_IMAGES.slice(0, 11), ...MARQUEE_IMAGES.slice(0, 11), ...MARQUEE_IMAGES.slice(0, 11)];
  const row2 = [...MARQUEE_IMAGES.slice(11), ...MARQUEE_IMAGES.slice(11), ...MARQUEE_IMAGES.slice(11)];

  useEffect(() => {
    const onScroll = () => {
      const node = sectionRef.current;
      if (!node) return;
      const top = node.getBoundingClientRect().top + window.scrollY;
      const next = (window.scrollY - top + window.innerHeight) * 0.3;
      setOffset(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="interact-marquee" aria-label="Work stream">
      <div
        className="interact-marquee-row"
        style={{ transform: `translateX(${offset - 200}px)`, willChange: "transform" }}
      >
        {row1.map((src, i) => (
          <img key={`r1-${i}`} src={src} alt="" loading="lazy" />
        ))}
      </div>
      <div
        className="interact-marquee-row"
        style={{ transform: `translateX(${-(offset - 200)}px)`, willChange: "transform" }}
      >
        {row2.map((src, i) => (
          <img key={`r2-${i}`} src={src} alt="" loading="lazy" />
        ))}
      </div>
    </section>
  );
}

export function InteractPage() {
  const location = useLocation();
  const [lanyardOpen, setLanyardOpen] = useState(false);
  const [videoEssayOpen, setVideoEssayOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("interact-mode");
    document.body.classList.add("interact-mode");
    return () => {
      document.documentElement.classList.remove("interact-mode");
      document.body.classList.remove("interact-mode");
    };
  }, []);

  // React Router does not scroll to same-page hashes by itself.
  useEffect(() => {
    const id = location.hash.replace(/^#/, "");
    if (!id) return undefined;
    const timer = window.setTimeout(() => {
      scrollToInteractSection(id, { smooth: true });
    }, 40);
    return () => window.clearTimeout(timer);
  }, [location.hash, location.pathname]);

  const onNavSectionClick = (event, id) => {
    event.preventDefault();
    const nextHash = `#${id}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, "", `/atelier${nextHash}`);
    }
    scrollToInteractSection(id, { smooth: true });
  };

  return (
    <div className="interact-page">
      <section className="interact-hero">
        <FadeIn as="nav" className="interact-nav" delay={0} y={-20}>
          {INTERACT_SECTIONS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => onNavSectionClick(event, item.id)}
            >
              {item.label}
            </a>
          ))}
          <Link to="/">Home</Link>
        </FadeIn>

        <div className="interact-hero-heading-wrap">
          <FadeIn as="h1" className="interact-hero-heading" delay={0.15} y={40}>
            Hi, i&apos;m evelyn
          </FadeIn>
        </div>

        <div className="interact-hero-portrait">
          <FadeIn delay={0.6} y={30}>
            <GazeFollowVideo
              src="/interact/gaze.mp4"
              mapUrl="/interact/gaze-map.json?v=3"
            />
          </FadeIn>
        </div>

        <div className="interact-hero-bottom">
          <FadeIn as="p" className="interact-hero-lead" delay={0.35} y={20}>
            sympathy, decisions, and systems people can trust
          </FadeIn>
          <FadeIn className="interact-hero-cta" delay={0.5} y={20}>
            <ContactButton
              label="Video Essay"
              className="interact-contact-btn-secondary"
              onClick={() => setVideoEssayOpen(true)}
            />
            <ContactButton onClick={() => setLanyardOpen(true)} />
          </FadeIn>
        </div>
      </section>

      <ContactLanyardModal
        open={lanyardOpen}
        onClose={() => setLanyardOpen(false)}
      />
      <VideoEssayModal
        open={videoEssayOpen}
        onClose={() => setVideoEssayOpen(false)}
      />

      <MarqueeSection />

      <section id="who" className="interact-about">
        <ButterflyField />

        <div className="interact-about-inner">
          <FadeIn
            as="h2"
            className="interact-section-heading interact-about-heading"
            delay={0}
            y={40}
          >
            <span>Who</span>
            <span>I</span>
            <span>am</span>
          </FadeIn>
          <div className="interact-about-copy">
            <AnimatedText text="I am fascinated by how people and intelligent systems make decisions. Through projects in AI agents, medical imaging, accessibility, and fatigue sensing, I have learned that the hardest problems are rarely technical alone. They emerge when human needs, evidence, and system constraints point in different directions. I study Computer Science to better understand those trade-offs and to build intelligent systems that people can trust, understand, and genuinely benefit from." />
          </div>
          <a
            className="interact-contact-btn"
            href="#research"
            onClick={(event) => onNavSectionClick(event, "research")}
          >
            Research Statement
          </a>
        </div>
      </section>

      <section id="research" className="interact-research">
        <h2 className="interact-research-heading">Research</h2>
        <p className="interact-research-lead">
          The questions I keep returning to — and why they pull me toward CS and agency-preserving AI.
        </p>
        <div className="interact-research-list">
          {RESEARCH_ITEMS.map((item, index) => (
            <FadeIn
              key={item.number}
              className="interact-research-item"
              delay={index * 0.1}
              y={24}
            >
              <p className="interact-research-num">{item.number}</p>
              <div>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <div className="interact-research-cta">
          <Link className="interact-text-link" to="/research">
            Full research statement →
          </Link>
        </div>
      </section>

      <ProjectCliff />

      <footer className="interact-footer interact-footer-solo">
        <p>CUI CONGWEN · EVELYN</p>
      </footer>
    </div>
  );
}
