import { Link } from "react-router-dom";

export function ResearchButton({ className = "" }) {
  return (
    <Link to="/research" className={`cta-button secondary ${className}`.trim()}>
      Research Purpose
    </Link>
  );
}
