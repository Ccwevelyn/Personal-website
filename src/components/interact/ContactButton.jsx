import { Link } from "react-router-dom";

function ContactButtonContent({ label, subLabel }) {
  if (!subLabel) return label;

  return (
    <span className="interact-contact-btn-stack">
      <span>{label}</span>
      <span className="interact-contact-btn-divider" aria-hidden="true" />
      <span className="interact-contact-btn-sub">{subLabel}</span>
    </span>
  );
}

export function ContactButton({
  to = "/#contact",
  label = "Contact Me",
  subLabel = "",
  className = "",
  onClick,
}) {
  const classNames = `interact-contact-btn ${className}`.trim();
  const content = <ContactButtonContent label={label} subLabel={subLabel} />;

  if (typeof onClick === "function") {
    return (
      <button type="button" className={classNames} onClick={onClick}>
        {content}
      </button>
    );
  }

  if (to.startsWith("mailto:") || to.startsWith("http")) {
    return (
      <a className={classNames} href={to}>
        {content}
      </a>
    );
  }

  return (
    <Link className={classNames} to={to}>
      {content}
    </Link>
  );
}
