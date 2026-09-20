import { Link } from "react-router-dom";

const EXPLORE_QUESTIONS = [
  {
    id: "sq1",
    text: "When tools can do more and more of the implementation, how deep must my understanding go so I can still live with AI: know what to ask, tell whether a result is right, and decide when to use the model and when to stop?",
  },
  {
    id: "sq2",
    text: "Before an engineering team turns a daily stream of requests into code, what decides those requests in the first place?",
  },
  {
    id: "sq3",
    text: "If an AI built to monitor energy burns more than it helps save, or if handing a slide deck to generative AI costs more in prompting and checking than doing it myself, what is the AI for in that setting?",
  },
  {
    id: "sq4",
    text: "If AI can help draft a paper and another AI help review it, which parts of the process still have to stay mine?",
  },
];

const WHY_CS = [
  {
    id: "why1",
    title: "Depth under the tools",
    text: "Question one lands here. Without real material knowledge I cannot ask well, check a result, or know when to press Stop. Computer Science is how I keep that depth.",
  },
  {
    id: "why2",
    title: "How a need becomes a request",
    text: "Question two is why I want the layer before code: how a human situation turns into the request a team later builds. For me that shaping work is part of CS, alongside implementation.",
  },
  {
    id: "why3",
    title: "Where to stop under limits",
    text: "Question three is about trade-offs. Time, cost, and quality pull against each other. I want to know where to stop under the limits I have. That needs domain knowledge, a feel for LLMs, and judgment about when more model calls stop helping.",
  },
];

const FUTURE_BUILDS = [
  {
    id: "emotion",
    title: "Emotion understanding & healing",
    want: "A device that reads emotion and helps someone understand what they feel, so there can be real relief in a fast life.",
  },
  {
    id: "assistive-arm",
    title: "Effort-saving assistive arm",
    want: "An assistive mechanical arm for delivery workers who lift heavy loads. Adapt to posture in real time so the system cuts effort under real work constraints.",
  },
  {
    id: "agency-agent",
    title: "Agency-preserving Agent / Skill",
    want: "An Agent or Skill that guides thinking on purpose, while the person stays lead.",
  },
];

export function ResearchPage() {
  return (
    <main className="research-page">
      <header className="research-page-header portfolio-header">
        <p className="eyebrow">Direction</p>
        <h1>Research Purpose</h1>
        <p>
          Questions I keep asking, why they pull me toward Computer Science, and systems I want to
          grow toward.
        </p>
        <Link to="/" className="text-link">
          ← Back to Home
        </Link>
      </header>

      <section className="panel research-panel research-panel-detail" aria-labelledby="research-purpose-title">
        <div className="research-block">
          <h2 id="research-purpose-title" className="research-detail-heading">
            What I want to explore
          </h2>
          <p className="research-lead research-block-lead">
            These started as separate doubts from work, class, and study abroad. The first three
            push me toward deeper Computer Science so I can live with AI well. The fourth sits on an
            ethical line: what must stay human when the model is strong.
          </p>

          <ol className="research-study-q-list">
            {EXPLORE_QUESTIONS.map((item, index) => (
              <li key={item.id}>
                <span className="research-study-q-num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="research-study-q-text">{item.text}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="research-block">
          <h2 className="research-detail-heading">Why I study Computer Science</h2>
          <p className="research-lead research-block-lead">
            From the first three questions, I settled on three concrete reasons to study Computer
            Science. The ethics question is different: I want to grow into someone who can help set
            the rules, so I need real depth. I leave it off this list because that aim is still too
            broad to stand as a reason by itself.
          </p>

          <ul className="research-why-list">
            {WHY_CS.map((item) => (
              <li key={item.id} className="research-why-card">
                <h3 className="research-why-title">{item.title}</h3>
                <p className="research-why-text">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="research-block">
          <h2 className="research-detail-heading">Three things I want to build</h2>
          <p className="research-lead research-block-lead">
            After I set aside the purely playful ideas, these are the three I most want ahead.
          </p>

          <ol className="research-build-grid">
            {FUTURE_BUILDS.map((item, index) => (
              <li key={item.id} className="research-want-card">
                <p className="research-question-number">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="research-want-title">{item.title}</h3>
                <p className="research-want-text">{item.want}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
