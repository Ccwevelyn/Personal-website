export function VideoEssayButton({ className = "", onClick }) {
  return (
    <button
      type="button"
      className={`cta-button video-essay ${className}`.trim()}
      onClick={onClick}
    >
      Video Essay
    </button>
  );
}
