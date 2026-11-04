import { VIDEO_ESSAY_BUTTON_LABEL } from "./videoEssayMedia";

export function VideoEssayButton({
  className = "",
  label = VIDEO_ESSAY_BUTTON_LABEL,
  onClick,
}) {
  return (
    <button
      type="button"
      className={`cta-button video-essay ${className}`.trim()}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
