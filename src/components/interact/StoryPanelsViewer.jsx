import { useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import {
  STORY_PANELS_PDF,
  STORY_PANELS_VIEWPORT_WIDTH,
} from "../storyPanelsMedia";

GlobalWorkerOptions.workerSrc = pdfWorker;

function PdfScrollPage({ pdf, pageNumber, maxDisplayWidth }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { rootMargin: "240px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !pdf || !canvasRef.current || maxDisplayWidth <= 0) return undefined;

    let cancelled = false;

    (async () => {
      renderTaskRef.current?.cancel?.();
      try {
        const page = await pdf.getPage(pageNumber);
        if (cancelled) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2.5);
        const base = page.getViewport({ scale: 1 });
        const displayScale = maxDisplayWidth / base.width;
        const renderScale = displayScale * pixelRatio;
        const viewport = page.getViewport({ scale: renderScale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const cssWidth = Math.round(viewport.width / pixelRatio);
        const cssHeight = Math.round(viewport.height / pixelRatio);
        canvas.style.width = `${cssWidth}px`;
        canvas.style.height = `${cssHeight}px`;
        setDisplaySize({ width: cssWidth, height: cssHeight });

        const task = page.render({ canvas, canvasContext: context, viewport });
        renderTaskRef.current = task;
        await task.promise;
      } catch (renderError) {
        if (renderError?.name !== "RenderingCancelledException") {
          console.error(renderError);
        }
      }
    })();

    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel?.();
    };
  }, [visible, pdf, pageNumber, maxDisplayWidth]);

  return (
    <figure
      ref={rootRef}
      className="story-panels-sheet"
      style={
        displaySize.width
          ? { width: displaySize.width, minHeight: displaySize.height || undefined }
          : { width: maxDisplayWidth, minHeight: maxDisplayWidth * 1.35 }
      }
    >
      <canvas ref={canvasRef} className="story-panels-canvas" aria-label={`Page ${pageNumber}`} />
    </figure>
  );
}

export function StoryPanelsViewer() {
  const scrollRef = useRef(null);
  const pdfRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [maxDisplayWidth, setMaxDisplayWidth] = useState(() =>
    Math.min(STORY_PANELS_VIEWPORT_WIDTH, Math.floor(window.innerWidth * 0.46)),
  );

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError("");
      try {
        const pdfUrl = new URL(STORY_PANELS_PDF, window.location.origin).href;
        const pdf = await getDocument({ url: pdfUrl }).promise;
        if (cancelled) {
          pdf.destroy();
          return;
        }
        pdfRef.current = pdf;
        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError.message || "Could not load portfolio PDF.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      pdfRef.current?.destroy?.();
      pdfRef.current = null;
      setPdfDoc(null);
    };
  }, []);

  useEffect(() => {
    const syncWidth = () => {
      const scroll = scrollRef.current;
      if (scroll) {
        const styles = getComputedStyle(scroll);
        const paddingX =
          parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
        setMaxDisplayWidth(Math.max(260, Math.floor(scroll.clientWidth - paddingX)));
        return;
      }
      setMaxDisplayWidth(
        Math.min(STORY_PANELS_VIEWPORT_WIDTH, Math.floor(window.innerWidth * 0.46)),
      );
    };

    syncWidth();
    window.addEventListener("resize", syncWidth);
    const observer = scrollRef.current ? new ResizeObserver(syncWidth) : null;
    if (scrollRef.current) observer.observe(scrollRef.current);

    return () => {
      window.removeEventListener("resize", syncWidth);
      observer?.disconnect();
    };
  }, [loading, totalPages, pdfDoc]);

  return (
    <div className="story-panels-viewer">
      {loading ? (
        <p className="story-panels-status">Loading panels…</p>
      ) : error ? (
        <p className="story-panels-status story-panels-status-error">{error}</p>
      ) : (
        <>
          <div ref={scrollRef} className="story-panels-scroll" tabIndex={0}>
            {pdfDoc &&
              Array.from({ length: totalPages }, (_, index) => (
                <PdfScrollPage
                  key={`page-${index + 1}`}
                  pdf={pdfDoc}
                  pageNumber={index + 1}
                  maxDisplayWidth={maxDisplayWidth}
                />
              ))}
          </div>
          <div className="story-panels-footer">
            <p className="story-panels-counter">{totalPages} pages</p>
            <p className="story-panels-hint">Scroll down</p>
            <a
              className="story-panels-modal-pdf-link"
              href={STORY_PANELS_PDF}
              target="_blank"
              rel="noreferrer"
            >
              Open PDF
            </a>
          </div>
        </>
      )}
    </div>
  );
}
