import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IspDiagramViewport } from "./IspDiagramViewport";

export function IspZoomableImage({
  src,
  alt,
  children,
  whiteBackground,
  pannable,
  previewMode,
  lightboxPannable,
}) {
  const openPannableViewer = lightboxPannable ?? pannable;
  const [open, setOpen] = useState(false);
  const label = alt || "Project diagram";

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const lightbox =
    open &&
    createPortal(
      <div
        className="isp-image-lightbox"
        role="dialog"
        aria-modal="true"
        aria-label={`${label} — enlarged`}
        onClick={() => setOpen(false)}
      >
        <div className="isp-image-lightbox-toolbar" onClick={(event) => event.stopPropagation()}>
          <span className="isp-image-lightbox-title">{label}</span>
          <button type="button" className="isp-image-lightbox-close" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
        <div className="isp-image-lightbox-stage" onClick={(event) => event.stopPropagation()}>
          {openPannableViewer ? (
            <IspDiagramViewport
              src={src}
              alt={label}
              variant="lightbox"
              className={whiteBackground ? "isp-modeling-image-frame--white" : ""}
            />
          ) : (
            <div
              className={`isp-image-lightbox-scroll${whiteBackground ? " isp-image-lightbox-scroll--white" : ""}`}
            >
              <img src={src} alt={label} className="isp-image-lightbox-img" />
            </div>
          )}
        </div>
        <p className="isp-image-lightbox-hint">
          {openPannableViewer ? "Drag to pan · Scroll to zoom · " : "Scroll to explore · "}
          Esc or click outside to close
        </p>
      </div>,
      document.body,
    );

  if (lightboxPannable) {
    return (
      <>
        <button
          type="button"
          className="isp-zoomable-trigger"
          onClick={() => setOpen(true)}
          aria-label={`Enlarge image: ${label}`}
          title="Click to enlarge"
        >
          {children}
        </button>
        {lightbox}
      </>
    );
  }

  if (pannable && previewMode) {
    return (
      <>
        <div className="isp-zoomable-pannable">
          <button
            type="button"
            className="isp-zoomable-preview-host"
            onClick={() => setOpen(true)}
            aria-label={`Open detailed chart: ${label}`}
          >
            {children}
          </button>
        </div>
        {lightbox}
      </>
    );
  }

  if (pannable) {
    return (
      <>
        <div className="isp-zoomable-pannable">
          {children}
          <button
            type="button"
            className="isp-zoomable-open-btn"
            onClick={() => setOpen(true)}
            aria-label={`Open full viewer: ${label}`}
          >
            Open full viewer
          </button>
        </div>
        {lightbox}
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        className="isp-zoomable-trigger"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge image: ${label}`}
        title="Click to enlarge"
      >
        {children}
      </button>
      {lightbox}
    </>
  );
}
