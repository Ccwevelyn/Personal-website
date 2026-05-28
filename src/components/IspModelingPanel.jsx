import { IspDiagramViewport } from "./IspDiagramViewport";
import { IspZoomableImage } from "./IspZoomableImage";

function ImagePreview({ title, src, previewSrc, alt, caption, wide, whiteBackground }) {
  const frameClass = [
    "isp-modeling-image-frame",
    wide && !previewSrc && "isp-modeling-image-frame--wide",
    previewSrc && "isp-modeling-preview-frame",
    whiteBackground && "isp-modeling-image-frame--white",
  ]
    .filter(Boolean)
    .join(" ");

  const inlinePreview = previewSrc ? (
    <>
      <div className={frameClass}>
        <img src={previewSrc} alt={alt ?? title} />
      </div>
      <p className="isp-zoomable-preview-cta">Click to open detailed chart (pan &amp; zoom)</p>
    </>
  ) : wide ? (
    <IspDiagramViewport src={src} alt={alt ?? title} className={frameClass} variant="inline" />
  ) : (
    <div className={frameClass}>
      <img src={src} alt={alt ?? title} />
    </div>
  );

  return (
    <figure className="isp-modeling-figure">
      <h4 className="isp-modeling-figure-title">{title}</h4>
      <IspZoomableImage
        src={src}
        alt={alt ?? title}
        whiteBackground={whiteBackground}
        pannable={wide}
        previewMode={Boolean(previewSrc)}
      >
        {inlinePreview}
      </IspZoomableImage>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export function IspModelingPanel({ project }) {
  return (
    <section className="isp-modeling-panel" aria-label="Modeling capability artifacts">
      <p className="isp-modeling-intro">{project.modelingIntro ?? project.modeling}</p>
      {Array.isArray(project.modelingHighlights) && project.modelingHighlights.length > 0 ? (
        <ul className="portfolio-modal-bullet-list isp-modeling-highlights">
          {project.modelingHighlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      {project.modelingSections?.map((section) => (
        <div key={section.id} className="isp-modeling-section">
          <h3 className="portfolio-modal-section-title">{section.title}</h3>
          {section.description ? <p className="isp-modeling-section-desc">{section.description}</p> : null}
          <div className="isp-modeling-artifacts">
            {section.artifacts?.map((artifact) => (
              <ImagePreview
                key={artifact.src}
                title={artifact.title}
                src={artifact.src}
                alt={artifact.alt}
                caption={artifact.caption}
                wide={artifact.wide}
                previewSrc={artifact.previewSrc}
                whiteBackground={artifact.whiteBackground}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
