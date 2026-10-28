import { VIDEO_ESSAY_BUTTON_LABEL } from "./videoEssayMedia";

export function VideoEssayButton({ className = "", onClick }) {
  return (
    <button
      type="button"
      className={`cta-button video-essay ${className}`.trim()}
      onClick={onClick}
    >
      {VIDEO_ESSAY_BUTTON_LABEL}
    </button>
  );
}
