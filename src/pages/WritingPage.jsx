import { Link } from "react-router-dom";
import { WritingSampleBlock } from "../components/WritingSampleBlock";

export function WritingPage() {
  return (
    <main className="research-page">
      <header className="research-page-header portfolio-header">
        <p className="eyebrow">Writing</p>
        <h1 id="writing-demo-title">Writing Sample</h1>
        <p>
          Coursework, project reports, and notes I want read as writing. The research statement
          stays the direction. These are the texts.
        </p>
        <nav className="research-back-nav" aria-label="Page navigation">
          <Link to="/" className="text-link">
            ← Back to Home
          </Link>
          <Link to="/atelier#research" className="text-link">
            ← Back to Atelier
          </Link>
        </nav>
      </header>

      <section className="panel research-panel research-panel-detail" aria-labelledby="writing-demo-title">
        <WritingSampleBlock />
      </section>
    </main>
  );
}
