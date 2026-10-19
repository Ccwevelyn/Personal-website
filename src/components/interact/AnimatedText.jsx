import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

function Char({ char, index, total, progress }) {
  const start = index / total;
  const end = Math.min(1, (index + 8) / total);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="interact-char-wrap">
      <span className="interact-char-ghost" aria-hidden>
        {char === " " ? "\u00A0" : char}
      </span>
      <motion.span className="interact-char" style={{ opacity }}>
        {char === " " ? "\u00A0" : char}
      </motion.span>
    </span>
  );
}

export function AnimatedText({ text, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = Array.from(text);

  return (
    <p ref={ref} className={`interact-animated-text ${className}`}>
      {chars.map((char, index) => (
        <Char
          key={`${index}-${char}`}
          char={char}
          index={index}
          total={chars.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
}
