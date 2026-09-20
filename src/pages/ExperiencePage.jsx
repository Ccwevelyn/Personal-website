import { Link } from "react-router-dom";
import { ExperiencePanel } from "../components/ExperiencePanel";

export function ExperiencePage() {
  return (
    <main className="experience-page">
      <header className="experience-header portfolio-header">
        <p className="eyebrow">Background</p>
        <h1>Experience</h1>
        <p>Education, internships, and work beyond class.</p>
        <Link to="/" className="text-link">
          ← Back to Home
        </Link>
      </header>

      <ExperiencePanel />
    </main>
  );
}
