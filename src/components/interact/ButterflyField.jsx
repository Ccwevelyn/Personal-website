const SIDE_VIDEOS = [
  {
    id: "butterfly",
    src: "https://v1.pinimg.com/videos/iht/expMp4/33/01/79/330179c2d27efc1715d01af8e3590583_720w.mp4",
    className: "interact-side-video interact-side-video-left",
    label: "Butterfly motion background",
  },
  {
    id: "flower",
    src: "https://v1.pinimg.com/videos/iht/expMp4/5d/98/e8/5d98e83757e5ae60e47370a0705b2302_720w.mp4",
    className: "interact-side-video interact-side-video-right",
    label: "Flower growth background",
  },
];

export function ButterflyField() {
  return (
    <div className="interact-butterfly-field" aria-hidden="true">
      {SIDE_VIDEOS.map((item) => (
        <div key={item.id} className={item.className}>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={item.label}
            src={item.src}
          />
        </div>
      ))}
    </div>
  );
}
