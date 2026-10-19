import { useEffect, useRef } from "react";

/**
 * Full 2D gaze follow: mouse direction → matching frame in gaze.mp4.
 * Uses /interact/gaze-map.json (iris → lookX/lookY) for nearest-frame seek.
 */
export function GazeFollowVideo({
  src = "/interact/gaze.mp4",
  mapUrl = "/interact/gaze-map.json",
  className = "",
}) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const targetT = useRef(0.5);
  const currentT = useRef(0.5);
  const rafRef = useRef(0);
  const readyRef = useRef(false);
  const durationRef = useRef(0);
  const samplesRef = useRef([]);
  const centerTRef = useRef(0.5);

  useEffect(() => {
    let cancelled = false;
    fetch(mapUrl)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled || !data?.samples?.length) return;
        samplesRef.current = data.samples;
        const center = data.samples.reduce(
          (best, s) =>
            s.lookX * s.lookX + s.lookY * s.lookY <
            best.lookX * best.lookX + best.lookY * best.lookY
              ? s
              : best,
          data.samples[0],
        );
        centerTRef.current = center.tNorm;
        if (readyRef.current && durationRef.current > 0) {
          const t = center.tNorm * durationRef.current;
          targetT.current = t;
          currentT.current = t;
        }
      })
      .catch(() => {
        samplesRef.current = [];
      });
    return () => {
      cancelled = true;
    };
  }, [mapUrl]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const markReady = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      durationRef.current = video.duration;
      readyRef.current = true;
      const mid = centerTRef.current * video.duration;
      targetT.current = mid;
      currentT.current = mid;
      try {
        video.currentTime = mid;
      } catch {
        /* ignore */
      }
      video.pause();
    };

    video.addEventListener("loadedmetadata", markReady);
    video.addEventListener("durationchange", markReady);
    if (video.readyState >= 1) markReady();

    const tick = () => {
      const v = videoRef.current;
      const duration = durationRef.current;
      if (v && readyRef.current && duration > 0) {
        const next = currentT.current + (targetT.current - currentT.current) * 0.38;
        currentT.current = next;
        if (Math.abs(v.currentTime - next) > 0.014) {
          try {
            v.currentTime = Math.min(duration - 0.001, Math.max(0, next));
          } catch {
            /* seeking may throw while loading */
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      video.removeEventListener("loadedmetadata", markReady);
      video.removeEventListener("durationchange", markReady);
      cancelAnimationFrame(rafRef.current);
    };
  }, [src]);

  useEffect(() => {
    const onMove = (event) => {
      const duration = durationRef.current;
      const samples = samplesRef.current;
      const wrap = wrapRef.current;
      if (!readyRef.current || duration <= 0 || samples.length === 0 || !wrap) return;

      // Gaze origin = portrait center (not viewport), so looking at her feels natural.
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width * 0.5;
      const cy = rect.top + rect.height * 0.42; // eyes sit slightly above mid
      const reach = Math.max(rect.width, rect.height, window.innerWidth * 0.22) * 0.85;

      let desireX = (event.clientX - cx) / reach;
      let desireY = (event.clientY - cy) / reach;
      // Clamp to unit disk so extremes stay reachable without overshoot.
      const mag = Math.hypot(desireX, desireY);
      if (mag > 1) {
        desireX /= mag;
        desireY /= mag;
      }

      let best = samples[0];
      let bestDist = Infinity;
      for (let i = 0; i < samples.length; i += 1) {
        const s = samples[i];
        const dx = s.lookX - desireX;
        const dy = s.lookY - desireY;
        const d = dx * dx + dy * dy;
        if (d < bestDist) {
          bestDist = d;
          best = s;
        }
      }
      targetT.current = best.tNorm * duration;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={wrapRef} className={`interact-gaze-wrap ${className}`.trim()}>
      <video
        ref={videoRef}
        className="interact-gaze-video"
        src={src}
        muted
        playsInline
        preload="auto"
        aria-label="Portrait gaze follows cursor in every direction"
      />
    </div>
  );
}
