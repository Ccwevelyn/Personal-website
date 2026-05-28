import { Link } from "react-router-dom";

export function PortfolioButton({ className = "" }) {
  return (
    <Link to="/portfolio" className={`cta-button ${className}`.trim()}>
      View Portfolio
    </Link>
  );
}
