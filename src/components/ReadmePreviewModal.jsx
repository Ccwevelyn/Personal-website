import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MarkdownH1({ children }) {
  return <h1 className="readme-md-h1">{children}</h1>;
}
function MarkdownH2({ children }) {
  return <h2 className="readme-md-h2">{children}</h2>;
}
function MarkdownH3({ children }) {
  return <h3 className="readme-md-h3">{children}</h3>;
}
function MarkdownP({ children }) {
  return <p className="readme-md-p">{children}</p>;
}
function MarkdownUl({ children }) {
  return <ul className="readme-md-ul">{children}</ul>;
}
function MarkdownOl({ children }) {
  return <ol className="readme-md-ol">{children}</ol>;
}
function MarkdownLi({ children }) {
  return <li>{children}</li>;
}
function MarkdownStrong({ children }) {
  return <strong className="readme-md-strong">{children}</strong>;
}
function MarkdownHr() {
  return <hr className="readme-md-hr" />;
}
function MarkdownTable({ children }) {
  return (
    <div className="readme-md-table-wrap">
      <table className="readme-md-table">{children}</table>
    </div>
  );
}
function MarkdownTh({ children }) {
  return <th>{children}</th>;
}
function MarkdownTd({ children }) {
  return <td>{children}</td>;
}
function MarkdownCode({ className, children, ...props }) {
  const inline = !className;
  if (inline) {
    return (
      <code className="readme-md-code-inline" {...props}>
        {children}
      </code>
    );
  }
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}
function MarkdownPre({ children }) {
  return <pre className="readme-md-pre">{children}</pre>;
}

const mdComponents = {
  h1: MarkdownH1,
  h2: MarkdownH2,
  h3: MarkdownH3,
  p: MarkdownP,
  ul: MarkdownUl,
  ol: MarkdownOl,
  li: MarkdownLi,
  strong: MarkdownStrong,
  hr: MarkdownHr,
  table: MarkdownTable,
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: MarkdownTh,
  td: MarkdownTd,
  code: MarkdownCode,
  pre: MarkdownPre,
};

export function ReadmePreviewModal({ open, onClose, markdown, fileName = "README.md" }) {
  if (!open) return null;

  const normalized = markdown.replace(/<br\s*\/?>/gi, "\n\n");

  return (
    <div
      className="readme-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="README preview"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="readme-modal" onClick={(event) => event.stopPropagation()}>
        <div className="readme-modal-titlebar">
          <span className="readme-modal-dots" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          <span className="readme-modal-title">README.md — Preview</span>
          <button type="button" className="readme-modal-close" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="readme-modal-tab">
          <span aria-hidden>▣</span>
          {fileName}
        </div>
        <div className="readme-modal-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
            {normalized}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
