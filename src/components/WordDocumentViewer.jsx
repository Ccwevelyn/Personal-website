function ListItem({ item, depth = 0 }) {
  if (typeof item === "string") {
    return (
      <li className="word-doc-li" style={{ marginLeft: depth ? `${depth * 1.1}rem` : undefined }}>
        {item}
      </li>
    );
  }

  return (
    <li className="word-doc-li" style={{ marginLeft: depth ? `${depth * 1.1}rem` : undefined }}>
      {item.text}
      {item.children?.length ? (
        <ul className="word-doc-ul">
          {item.children.map((child) => (
            <ListItem key={child} item={child} depth={depth + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function Block({ block }) {
  if (block.type === "field") {
    return (
      <p className="word-doc-field">
        <strong>{block.label}:</strong> {block.value}
      </p>
    );
  }

  if (block.type === "heading") {
    return <p className="word-doc-heading">{block.text}</p>;
  }

  if (block.type === "subheading") {
    return <p className="word-doc-subheading">{block.text}</p>;
  }

  if (block.type === "answer") {
    return <p className="word-doc-answer">{block.text}</p>;
  }

  if (block.type === "list") {
    return (
      <ul className="word-doc-ul word-doc-ul-top">
        {block.items.map((item, index) => (
          <ListItem key={`${typeof item === "string" ? item : item.text}-${index}`} item={item} />
        ))}
      </ul>
    );
  }

  return null;
}

export function WordDocumentViewer({ document: doc }) {
  return (
    <div className="word-doc-app" aria-label={`Word document preview: ${doc.fileName}`}>
      <div className="word-doc-window">
        <div className="word-doc-titlebar">
          <span className="word-doc-dots" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          <span className="word-doc-filename">{doc.fileName}</span>
          <span className="word-doc-app-name">Word</span>
        </div>
        <div className="word-doc-ribbon">
          <span>Home</span>
          <span>Insert</span>
          <span className="active">View</span>
        </div>
        <div className="word-doc-canvas">
          <article className="word-doc-page">
            <h1 className="word-doc-page-title">{doc.title}</h1>
            {doc.blocks.map((block, index) => (
              <Block key={`${block.type}-${index}`} block={block} />
            ))}
          </article>
        </div>
      </div>
    </div>
  );
}
