import { useEffect } from "react";
import Lanyard from "../Lanyard";

const CARD_FRONT = "/interact/lanyard/card-front.png?v=12";
const CARD_BACK = "/interact/lanyard/card-back.png?v=5";

const CONTACT = {
  emails: ["ccwevelyncambridge@outlook.com", "P2321167@mpu.edu.mo"],
  phone: "+86 18518138586",
  phoneHref: "tel:+8618518138586",
  linkedin: "https://www.linkedin.com/in/congwen-cui",
  linkedinLabel: "LinkedIn",
};

export function ContactLanyardModal({ open, onClose }) {
  useEffect(() => {
    [CARD_FRONT, CARD_BACK].forEach((src) => {
      const image = new Image();
      image.decoding = "async";
      image.src = src;
    });
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="lanyard-modal is-open"
      role="dialog"
      aria-modal="true"
      aria-label="Contact card"
    >
      <button
        type="button"
        className="lanyard-modal-backdrop"
        aria-label="Close contact card"
        onClick={onClose}
      />

      <div className="lanyard-modal-panel">
        <button
          type="button"
          className="lanyard-modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="lanyard-modal-stage">
          <Lanyard
            frontImage={CARD_FRONT}
            backImage={CARD_BACK}
            imageFit="cover"
            orientation="portrait"
            finish="glossy"
            cornerRadius={0.28}
            size={0.68}
            anchor="center"
            strapLength={0.38}
            strapColor="#1a0a22"
            metal="silver"
            gravity={2.8}
            damping={0.82}
            elasticity={0.22}
            breeze={0.18}
            interactive
            intro
          />
        </div>

        <div className="lanyard-modal-links">
          {CONTACT.emails.map((email) => (
            <a key={email} href={`mailto:${email}`}>
              {email}
            </a>
          ))}
          <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">
            {CONTACT.linkedinLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
