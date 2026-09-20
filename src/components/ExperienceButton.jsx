import { Link } from "react-router-dom";

export function ExperienceButton({ className = "" }) {
  return (
    <Link to="/experience" className={`cta-button secondary ${className}`.trim()}>
      View Experience
    </Link>
  );
}
