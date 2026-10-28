import { useEffect, useRef } from "react";
import {
  VIDEO_ESSAY_POSTER,
  VIDEO_ESSAY_SRC,
  VIDEO_ESSAY_TITLE,
} from "./videoEssayMedia";

export function VideoEssayModal({ open, onClose }) {
  const videoRef = useRef(null);

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
      const node = videoRef.current;
      if (node) {
        node.pause();
        node.currentTime = 0;
      }
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="video-essay-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={VIDEO_ESSAY_TITLE}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div className="video-essay-modal" onClick={(event) => event.stopPropagation()}>
        <div className="video-essay-modal-titlebar">
          <span className="video-essay-modal-dots" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          <span className="video-essay-modal-title">{VIDEO_ESSAY_TITLE}</span>
          <button type="button" className="video-essay-modal-close" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="video-essay-modal-body">
          <video
            ref={videoRef}
            className="video-essay-player"
            src={VIDEO_ESSAY_SRC}
            poster={VIDEO_ESSAY_POSTER}
            controls
            playsInline
            preload="metadata"
          >
            Your browser does not support embedded video.
          </video>
        </div>
      </div>
    </div>
  );
}
