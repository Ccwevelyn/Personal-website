import { Link } from "react-router-dom";

export function ResearchButton({ className = "", primary = false }) {
  return (
    <Link
      to="/research"
      className={`cta-button ${primary ? "" : "secondary"} ${className}`.trim()}
    >
      Research Statement
    </Link>
  );
}
