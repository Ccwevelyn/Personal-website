import { useEffect, useRef, useState } from "react";

const POINTER_SELECTOR =
  'a, button, summary, label[for], select, [role="button"], [role="link"], [role="menuitem"], [role="tab"], input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"], .cursor-pointer';

export function SiteCursor() {
  const cursorRef = useRef(null);
  const pointerRef = useRef(false);
  const [active, setActive] = useState(false);
  const [pointer, setPointer] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    root.classList.add("has-site-cursor");
    setActive(true);

    const onMove = (event) => {
      const el = cursorRef.current;
      if (!el) return;
      el.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };

    const onOver = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const next = Boolean(target.closest(POINTER_SELECTOR));
      if (next === pointerRef.current) return;
      pointerRef.current = next;
      setPointer(next);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      root.classList.remove("has-site-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!active) return null;

  return (
    <div
      ref={cursorRef}
      data-pointer={pointer ? "" : undefined}
      className="site-cursor"
      aria-hidden
    >
      <span className="site-cursor-ring" />
      <span className="site-cursor-dot" />
      <svg className="site-cursor-hand" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="currentColor"
          d="M10.5 3.75a1.125 1.125 0 0 1 2.25 0v4.125h1.5a2.25 2.25 0 0 1 2.122 3.884l-1.106 3.32a2.25 2.25 0 0 1-2.134 1.546H9.75a1.125 1.125 0 0 1-1.061-.942l-1.106-3.32A2.25 2.25 0 0 1 9.75 9h.75V3.75Z"
        />
      </svg>
    </div>
  );
}
