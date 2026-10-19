import { Link } from "react-router-dom";

export function ContactButton({ to = "/#contact", label = "Contact Me", className = "" }) {
  const classNames = `interact-contact-btn ${className}`.trim();

  if (to.startsWith("mailto:") || to.startsWith("http")) {
    return (
      <a className={classNames} href={to}>
        {label}
      </a>
    );
  }

  return (
    <Link className={classNames} to={to}>
      {label}
    </Link>
  );
}
