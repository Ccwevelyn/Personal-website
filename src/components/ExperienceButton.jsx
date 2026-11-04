import { Link } from "react-router-dom";

export function ExperienceButton({ className = "", label = "View Experience" }) {
  return (
    <Link to="/experience" className={`cta-button secondary ${className}`.trim()}>
      {label}
    </Link>
  );
}
