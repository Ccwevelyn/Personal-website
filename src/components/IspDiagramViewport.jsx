import { useCallback, useEffect, useRef, useState } from "react";

const MIN_ZOOM_FACTOR = 1;
const MAX_ZOOM_FACTOR = 2.75;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function clampPan(x, y, scale, viewportW, viewportH, imgW, imgH) {
  const contentW = imgW * scale;
  const contentH = imgH * scale;
  const minX = Math.min(0, viewportW - contentW);
  const minY = Math.min(0, viewportH - contentH);
  const maxX = Math.max(0, viewportW - contentW);
  const maxY = Math.max(0, viewportH - contentH);
  return {
    x: clamp(x, minX, maxX),
    y: clamp(y, minY, maxY),
  };
}

function fitTransform(viewportW, viewportH, imgW, imgH) {
  if (!viewportW || !viewportH || !imgW || !imgH) {
    return { x: 0, y: 0, scale: 1, fitScale: 1 };
  }
  const fitScale = Math.min(viewportW / imgW, viewportH / imgH);
  const contentW = imgW * fitScale;
  const contentH = imgH * fitScale;
  const x = (viewportW - contentW) / 2;
  const y = (viewportH - contentH) / 2;
  return { x, y, scale: fitScale, fitScale };
}

export function IspDiagramViewport({
  src,
  alt,
  className = "",
  variant = "inline",
  onReady,
}) {
  const viewportRef = useRef(null);
  const [imgNatural, setImgNatural] = useState({ w: 0, h: 0 });
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [fitScale, setFitScale] = useState(1);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);

  const applyFit = useCallback(() => {
    const vp = viewportRef.current;
    if (!vp || !imgNatural.w) return;
    const next = fitTransform(vp.clientWidth, vp.clientHeight, imgNatural.w, imgNatural.h);
    setFitScale(next.fitScale);
    setTransform({ x: next.x, y: next.y, scale: next.scale });
    onReady?.();
  }, [imgNatural.w, imgNatural.h, onReady]);

  useEffect(() => {
    applyFit();
    const vp = viewportRef.current;
    if (!vp || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(() => applyFit());
    observer.observe(vp);
    return () => observer.disconnect();
  }, [applyFit]);

  const updateTransform = useCallback(
    (patch) => {
      const vp = viewportRef.current;
      if (!vp || !imgNatural.w) {
        setTransform((prev) => ({ ...prev, ...patch }));
        return;
      }
      setTransform((prev) => {
        const scale = patch.scale ?? prev.scale;
        const panned = clampPan(
          patch.x ?? prev.x,
          patch.y ?? prev.y,
          scale,
          vp.clientWidth,
          vp.clientHeight,
          imgNatural.w,
          imgNatural.h,
        );
        return { ...prev, ...patch, ...panned, scale };
      });
    },
    [imgNatural.w, imgNatural.h],
  );

  const onPointerDown = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    viewportRef.current?.setPointerCapture(event.pointerId);
    setDragging(true);
    dragStart.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      x: transform.x,
      y: transform.y,
    };
  };

  const onPointerMove = (event) => {
    if (!dragging || !dragStart.current) return;
    const dx = event.clientX - dragStart.current.pointerX;
    const dy = event.clientY - dragStart.current.pointerY;
    updateTransform({
      x: dragStart.current.x + dx,
      y: dragStart.current.y + dy,
    });
  };

  const endDrag = (event) => {
    if (!dragging) return;
    setDragging(false);
    dragStart.current = null;
    try {
      viewportRef.current?.releasePointerCapture(event.pointerId);
    } catch {
      /* already released */
    }
  };

  const onWheel = (event) => {
    event.preventDefault();
    const vp = viewportRef.current;
    if (!vp || !imgNatural.w) return;

    const minScale = fitScale * MIN_ZOOM_FACTOR;
    const maxScale = fitScale * MAX_ZOOM_FACTOR;
    const zoomFactor = event.deltaY < 0 ? 1.1 : 1 / 1.1;
    const nextScale = clamp(transform.scale * zoomFactor, minScale, maxScale);

    const rect = vp.getBoundingClientRect();
    const cursorX = event.clientX - rect.left;
    const cursorY = event.clientY - rect.top;
    const ratio = nextScale / transform.scale;
    const nextX = cursorX - (cursorX - transform.x) * ratio;
    const nextY = cursorY - (cursorY - transform.y) * ratio;

    updateTransform({ x: nextX, y: nextY, scale: nextScale });
  };

  const resetView = () => applyFit();

  return (
    <div
      className={`isp-diagram-viewport isp-diagram-viewport--${variant} ${className}${
        dragging ? " isp-diagram-viewport--dragging" : ""
      }`}
      ref={viewportRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onWheel={onWheel}
      role="img"
      aria-label={alt}
    >
      <div
        className="isp-diagram-stage"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
        }}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          onLoad={(event) => {
            const img = event.currentTarget;
            setImgNatural({ w: img.naturalWidth, h: img.naturalHeight });
          }}
        />
      </div>
      <div className="isp-diagram-controls" onPointerDown={(e) => e.stopPropagation()}>
        <button type="button" className="isp-diagram-reset" onClick={resetView}>
          Reset view
        </button>
        <span className="isp-diagram-hint">Drag to pan · Scroll to zoom</span>
      </div>
    </div>
  );
}
