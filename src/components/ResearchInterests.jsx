export function ResearchInterests() {
  return (
    <section className="panel research-panel" aria-labelledby="research-title">
      <div className="second-screen-header">
        <p className="eyebrow">Direction</p>
        <h2 id="research-title">Research Interests</h2>
        <p className="research-kicker">Towards Human-Centered AI</p>
      </div>

      <p className="research-lead">
        I care about systems that read a person&apos;s state first, then decide whether support,
        feedback, or intervention makes sense. Model scores matter; they are not the whole goal.
        These three threads are also how I want to grow the skill to ship products that stay useful
        in real work and daily life.
      </p>

      <ul className="research-threads">
        <li>
          <h3>Affective &amp; Multimodal Sensing</h3>
          <p>
            Use multimodal signals so we do not lean only on self-report, then give small adaptive
            feedback.
          </p>
          <p className="research-tags">
            affective computing · multimodal sensing · wearable · adaptive intervention
          </p>
        </li>
        <li>
          <h3>Assistive &amp; Embodied Support</h3>
          <p>
            An assistive arm for delivery workers who lift heavy loads: adapt to posture in real
            time so the system actually cuts effort under real constraints.
          </p>
          <p className="research-tags">
            assistive robotics · wearable computing · adaptive systems · posture
          </p>
        </li>
        <li>
          <h3>Human-Agency AI Interaction</h3>
          <p>
            Build agents and skills that guide thinking while the person stays in charge, with clear
            boundaries.
          </p>
          <p className="research-tags">
            HCI · human-centered AI reasoning · AI safety · model behavior
          </p>
        </li>
      </ul>
    </section>
  );
}
