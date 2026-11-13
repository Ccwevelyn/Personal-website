import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const ISP_DESIGN_FILE =
  "/docs/writing-sample/COMP3114_Information_System_Project_Design_CUI_Congwen.pdf";

const SAMPLES = [
  {
    id: "anonymization",
    kicker: "COMP4111 Security · literature review",
    title: "Evaluation of Speaker Anonymization on Emotional Speech",
    line: "COMP4111, a Security literature-review assignment.",
    file: "/docs/writing-sample/Writing_Sample-Evaluation_of_Speaker_Anonymization_on_Emotional_Speech-CUI_Congwen.pdf",
  },
  {
    id: "mri",
    kicker: "COMP4299 Final Year Project · Progress Report",
    title: "MRI Synthesis Quality Metrics and Downstream Segmentation",
    line: "A progress-report excerpt from completed final-year project work.",
    file: "/docs/writing-sample/Writing_Sample-MRI_Synthesis_Quality_Metrics_and_Downstream_Segmentation-CUI_Congwen.pdf",
  },
  {
    id: "regression",
    kicker: "COMP3113 Artificial Intelligence · course assignment",
    title: "Linear Regression and Logistic Regression",
    line: "COMP3113, a Year 3 Artificial Intelligence course assignment.",
    file: "/docs/writing-sample/AI_Regression_assignment_CUI_Congwen.pdf",
  },
  {
    id: "xiaomi-porter",
    kicker: "COMP3116 Data Driven Business Management · course assignment",
    title: "Analysis of Data Strategy Supporting Porter's Generic Strategies at Xiaomi",
    line: "Examines how Xiaomi's cost leadership, ecosystem-based differentiation, and potential focus strategies can be supported through data-driven decision making.",
    file: "/docs/writing-sample/COMP3116_Xiaomi_Porter_Data_Strategy_CUI_Congwen.pdf",
  },
  {
    id: "isp-design",
    kicker: "COMP3114 Information System Project · group assignment",
    title: "Information System Project: System Design",
    line: "This PDF is just the third chapter of the document I was responsible for, sections 4.1 to 4.4.",
    file: ISP_DESIGN_FILE,
  },
];

export function WritingPdfModal({ sample, onClose }) {
  useEffect(() => {
    if (!sample) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [sample, onClose]);

  if (!sample) return null;

  return createPortal(
    <div
      className="writing-sample-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="writing-sample-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={sample.title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="writing-sample-dialog-bar">
          <p>{sample.title}</p>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
        <iframe title={sample.title} src={sample.file} />
      </div>
    </div>,
    document.body,
  );
}

export function WritingSampleBlock() {
  const [openId, setOpenId] = useState(null);
  const open = SAMPLES.find((item) => item.id === openId) ?? null;

  return (
    <div className="research-block">
      <ul className="research-writing-grid">
        {SAMPLES.map((item) => (
          <li key={item.id} className="research-writing-card">
            <p className="research-writing-kicker">{item.kicker}</p>
            <h3>{item.title}</h3>
            <p>{item.line}</p>
            <div className="research-writing-actions">
              <button type="button" onClick={() => setOpenId(item.id)}>
                Read
              </button>
              <a href={item.file} download>
                Download
              </a>
            </div>
          </li>
        ))}
      </ul>
      <WritingPdfModal sample={open} onClose={() => setOpenId(null)} />
    </div>
  );
}
