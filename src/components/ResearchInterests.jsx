export function ResearchInterests() {
  return (
    <section className="panel research-panel" aria-labelledby="research-title">
      <div className="second-screen-header">
        <p className="eyebrow">Direction</p>
        <h2 id="research-title">Research Interests</h2>
        <p className="research-kicker">Towards Human-Centered AI</p>
      </div>

      <p className="research-lead">
        I care about systems that read a person&apos;s state first, then decide whether support makes sense. Scores matter; they are not the whole goal.
      </p>

      <ul className="research-threads">
        <li>
          <h3>Affective &amp; Multimodal Sensing</h3>
          <p>Read state from more than self-report, then decide whether to intervene.</p>
          <p className="research-tags">affective computing · multimodal sensing</p>
        </li>
        <li>
          <h3>Assistive &amp; Embodied Support</h3>
          <p>Cut physical effort when people lift, move, or recover under real limits.</p>
          <p className="research-tags">assistive robotics · embodied systems</p>
        </li>
        <li>
          <h3>Human-Agency AI Interaction</h3>
          <p>Guide thinking while the person stays in charge.</p>
          <p className="research-tags">HCI · AI safety</p>
        </li>
      </ul>
    </section>
  );
}
