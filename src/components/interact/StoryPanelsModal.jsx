import { useEffect } from "react";
import { StoryPanelsViewer } from "./StoryPanelsViewer";
import { STORY_PANELS_TITLE } from "../storyPanelsMedia";

export function StoryPanelsModal({ open, onClose }) {
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
      className="story-panels-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={STORY_PANELS_TITLE}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div className="story-panels-modal" onClick={(event) => event.stopPropagation()}>
        <div className="story-panels-modal-titlebar">
          <span className="story-panels-modal-dots" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          <span className="story-panels-modal-title">{STORY_PANELS_TITLE}</span>
          <button type="button" className="story-panels-modal-close" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="story-panels-modal-body">
          <StoryPanelsViewer />
        </div>
      </div>
    </div>
  );
}
