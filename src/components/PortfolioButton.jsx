import { Link } from "react-router-dom";

export function PortfolioButton({ className = "", label = "View Portfolio" }) {
  return (
    <Link to="/portfolio" className={`cta-button ${className}`.trim()}>
      {label}
    </Link>
  );
}
