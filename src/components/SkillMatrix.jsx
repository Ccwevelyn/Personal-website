import { useMemo, useState } from "react";
import { gradeRows } from "../data/gradeData";

const SKILL_DEFINITIONS = [
  {
    key: "innovation",
    label: "Innovation",
    courseNames: [
      "Web Design and Development",
      "Human Factors and User Interfaces",
      "Advanced Web Development",
      "Artificial Intelligence",
    ],
    interpretation:
      "Scored from courses where we built interfaces, tried new technical ideas, and turned concepts into product-facing design.",
  },
  {
    key: "analysis",
    label: "Analysis",
    courseNames: [
      "Data Driven Business Management",
      "Analytical Data Design and Applications",
      "Data Science and Business Analytics",
      "Database Design",
      "Risk Management in Business",
      "Ethics and Professional Issues in Computing",
    ],
    interpretation:
      "Scored from data courses that ask you to reason from evidence, build models, and make decisions from analysis.",
  },
  {
    key: "documentation",
    label: "Documentation",
    courseNames: [
      "Software Engineering",
      "Project Management",
      "Information System Project",
      "Science Communications",
    ],
    interpretation:
      "Scored from coursework and projects where specs, reports, and other written deliverables were a real part of the grade.",
  },
  {
    key: "communication",
    label: "Communication & Presentation",
    courseNames: [
      "English I",
      "English II",
      "English III",
      "English IV",
      "Interpersonal Relations",
    ],
    interpretation:
      "Covers language fluency, talking with people, and presenting ideas clearly in class and in teams.",
  },
  {
    key: "programming",
    label: "Programming",
    courseNames: [
      "Introduction to Programming",
      "Advanced Programming",
      "Web Design and Development",
      "Advanced Web Development",
      "Database Design",
    ],
    interpretation:
      "Focused on applied coding courses where we built software in projects, not systems theory or AI survey modules.",
  },
  {
    key: "math",
    label: "Computational Ability",
    courseNames: [
      "Calculus",
      "Linear Algebra",
      "Discrete Mathematics",
      "Statistics",
    ],
    interpretation:
      "Scored from core math and discrete math, not computer organization, advanced programming, or data structures and algorithms.",
  },
];

const MODESTY_OFFSETS = {
  innovation: -6,
  analysis: 1,
  documentation: -3,
  communication: -3,
  programming: -8,
  math: -14,
};

function clampScore(score) {
  return Math.max(45, Math.min(92, score));
}

export function SkillMatrix() {
  const [activeSkillKey, setActiveSkillKey] = useState(null);
  const skills = useMemo(() => {
    return SKILL_DEFINITIONS.map((definition) => {
      const evidenceRows = gradeRows.filter((row) =>
        definition.courseNames.includes(row.courseName),
      );
      const avgRaw =
        evidenceRows.length > 0
          ? Math.round(
              evidenceRows.reduce((sum, row) => sum + row.final, 0) / evidenceRows.length,
            )
          : 0;
      const adjusted = clampScore(
        avgRaw + (MODESTY_OFFSETS[definition.key] ?? -8),
      );

      let status = "Conservative-Developing";
      if (adjusted >= 88) status = "Conservative-Strong";
      else if (adjusted >= 80) status = "Conservative-Steady";

      return {
        ...definition,
        score: adjusted,
        status,
        rawScore: avgRaw,
        evidenceRows,
      };
    });
  }, []);

  const size = 460;
  const center = size / 2;
  const radius = 126;
  const levelCount = 4;
  const angleStep = (Math.PI * 2) / skills.length;
  const startAngle = -Math.PI / 2;
  const labelRadius = radius + 30;
  const labelEdgePadding = 16;

  const axisPoint = (index, r) => {
    const angle = startAngle + angleStep * index;
    return {
      x: center + Math.cos(angle) * r,
      y: center + Math.sin(angle) * r,
    };
  };

  const dataPolygon = skills.map((skill, index) => {
    const point = axisPoint(index, (skill.score / 100) * radius);
    return `${point.x},${point.y}`;
  }).join(" ");
  const activeSkill = useMemo(
    () => skills.find((skill) => skill.key === activeSkillKey) ?? null,
    [activeSkillKey, skills],
  );

  return (
    <section className="panel skill-panel" aria-labelledby="matrix-title">
      <div className="second-screen-header">
        <p className="eyebrow">Capability Matrix</p>
        <h2 id="matrix-title">Capability Radar</h2>
        <p className="skill-scoring-note">
          Self-evaluation: I combine sharp data insight with fast learning, execute independently
          with high efficiency, and collaborate and lead smoothly in team settings. I stay
          resilient under challenge, bring overseas exchange experience and an engineering mindset,
          and keep user needs at the center when designing lightweight, inclusive, and ethically
          aware solutions. With a formal computer science background and product perspective, I use
          AI tools to empower real industries and explore the expanding possibilities of human-AI
          collaboration.
        </p>
      </div>
      <div className="radar-layout">
        <div className="radar-wrap">
          <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Capability radar chart">
            {Array.from({ length: levelCount }).map((_, levelIdx) => {
              const r = (radius / levelCount) * (levelIdx + 1);
              const levelPolygon = skills.map((_, axisIdx) => {
                const point = axisPoint(axisIdx, r);
                return `${point.x},${point.y}`;
              }).join(" ");
              return (
                <polygon
                  key={`level-${r}`}
                  points={levelPolygon}
                  fill="none"
                  stroke="rgba(255,255,255,0.16)"
                />
              );
            })}
            {skills.map((skill, axisIdx) => {
              const edge = axisPoint(axisIdx, radius);
              return (
                <line
                  key={`axis-${skill.key}`}
                  x1={center}
                  y1={center}
                  x2={edge.x}
                  y2={edge.y}
                  stroke="rgba(255,255,255,0.2)"
                />
              );
            })}
            <polygon
              points={dataPolygon}
              fill="rgba(254,131,198,0.26)"
              stroke="url(#radarGradient)"
              strokeWidth="2.2"
            />
            {skills.map((skill, idx) => {
              const point = axisPoint(idx, (skill.score / 100) * radius);
              const labelPoint = axisPoint(idx, labelRadius);
              const isActive = activeSkillKey === skill.key;
              const angle = startAngle + angleStep * idx;
              const cos = Math.cos(angle);
              const sin = Math.sin(angle);
              const estimatedWidth = skill.label.length * 5.4;
              const textAnchor = Math.abs(cos) < 0.22 ? "middle" : cos > 0 ? "start" : "end";
              let labelX = labelPoint.x;
              if (textAnchor === "start") {
                labelX = Math.min(labelX, size - labelEdgePadding - estimatedWidth);
              } else if (textAnchor === "end") {
                labelX = Math.max(labelX, labelEdgePadding + estimatedWidth);
              } else {
                const half = estimatedWidth / 2;
                labelX = Math.max(
                  labelEdgePadding + half,
                  Math.min(labelX, size - labelEdgePadding - half),
                );
              }
              const labelY = Math.max(
                labelEdgePadding,
                Math.min(
                  labelPoint.y + (Math.abs(sin) < 0.22 ? 0 : sin > 0 ? 5 : -5),
                  size - labelEdgePadding,
                ),
              );
              return (
                <g
                  key={`point-${skill.key}`}
                  className="radar-interactive-node"
                  onMouseEnter={() => setActiveSkillKey(skill.key)}
                  onMouseLeave={() => setActiveSkillKey(null)}
                  onFocus={() => setActiveSkillKey(skill.key)}
                  onBlur={() => setActiveSkillKey(null)}
                  onClick={() => setActiveSkillKey((current) => (current === skill.key ? null : skill.key))}
                  tabIndex={0}
                  role="button"
                  aria-label={`Show ${skill.label} details`}
                >
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={isActive ? "7.2" : "5.2"}
                    fill={isActive ? "#4de8ff" : "#fff2f9"}
                  />
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor={textAnchor}
                    alignmentBaseline="middle"
                    fontSize="10.5"
                    fill={isActive ? "#4de8ff" : "#d4d4dd"}
                  >
                    {skill.label}
                  </text>
                </g>
              );
            })}
            <defs>
              <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fa4eab" />
                <stop offset="100%" stopColor="#4de8ff" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        {activeSkill ? (
          <article className="skill-hover-panel" aria-live="polite">
            <div className="skill-head">
              <h3>{activeSkill.label}</h3>
              <span>
                {activeSkill.score} · {activeSkill.status}
              </span>
            </div>
            <p className="skill-raw-score">Raw evidence score: {activeSkill.rawScore}</p>
            <p>{activeSkill.interpretation}</p>
            <ul className="skill-evidence-list">
              {activeSkill.evidenceRows.map((row) => (
                <li key={`${activeSkill.key}-${row.courseName}`}>
                  <span>{row.courseName}</span>
                  <strong>{row.final}</strong>
                </li>
              ))}
            </ul>
          </article>
        ) : (
          <p className="skill-hover-placeholder">Hover a radar point to reveal the capability detail.</p>
        )}
      </div>
    </section>
  );
}
