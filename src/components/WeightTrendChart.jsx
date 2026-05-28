import { useMemo, useRef, useState } from "react";
import { weightRows } from "../data/weightData";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatKg(value) {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)} kg`;
}

function labelDate(item) {
  return `${MONTHS[item.month - 1]} ${item.day}`;
}

export function WeightTrendChart({ embedded = false }) {
  const trend = weightRows;
  const wrapRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const width = 700;
  const height = 280;
  const pad = { top: 24, right: 24, bottom: 54, left: 54 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;

  const minValue = Math.min(...trend.map((item) => item.changeKg));
  const yMin = Math.floor((minValue - 2) / 10) * 10;
  const yMax = 2;

  const yTicks = [];
  for (let tick = 0; tick >= yMin; tick -= 10) {
    yTicks.push(tick);
  }

  const x = (idx) =>
    trend.length > 1 ? pad.left + (idx / (trend.length - 1)) * innerW : width / 2;
  const y = (value) => pad.top + ((yMax - value) / (yMax - yMin)) * innerH;
  const points = trend.map((item, idx) => `${x(idx)},${y(item.changeKg)}`).join(" ");

  const best = trend.reduce((acc, item) => (item.changeKg < acc.changeKg ? item : acc), trend[0]);
  const latest = trend[trend.length - 1];
  const totalLoss = trend[0].changeKg - latest.changeKg;

  const tickIndexes = [0, 0.2, 0.4, 0.6, 0.8, 1]
    .map((ratio) => Math.round(ratio * (trend.length - 1)))
    .filter((idx, i, arr) => arr.indexOf(idx) === i);
  const pointPositions = useMemo(
    () => trend.map((item, idx) => ({ x: x(idx), y: y(item.changeKg) })),
    [trend],
  );
  const hoveredPoint = hoverIndex == null ? null : trend[hoverIndex];

  const handleMove = (event) => {
    const wrapEl = wrapRef.current;
    if (!wrapEl) return;
    const rect = wrapEl.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const svgX = (localX / rect.width) * width;
    let nearestIndex = 0;
    let minDistance = Number.POSITIVE_INFINITY;
    pointPositions.forEach((point, idx) => {
      const distance = Math.abs(point.x - svgX);
      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = idx;
      }
    });
    setHoverIndex(nearestIndex);
    setHoverPos({
      x: localX,
      y: (pointPositions[nearestIndex].y / height) * rect.height,
    });
  };

  const content = (
    <>
      <div className="second-screen-header">
        <p className="eyebrow">Weight Trend</p>
        <h2 id="weight-title">Body Weight Change Curve</h2>
      </div>

      <div className="growth-metrics growth-metrics-single">
        <article>
          <p>Total Reduction</p>
          <strong>{formatKg(totalLoss)}</strong>
        </article>
      </div>

      <div
        className="chart-wrap chart-wrap-interactive"
        ref={wrapRef}
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIndex(null)}
      >
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Body weight change trend line">
          {yTicks.map((tick) => (
            <line
              key={tick}
              x1={pad.left}
              y1={y(tick)}
              x2={width - pad.right}
              y2={y(tick)}
              stroke="rgba(255,255,255,0.15)"
              strokeDasharray="4 8"
            />
          ))}
          <line
            x1={pad.left}
            y1={height - pad.bottom}
            x2={width - pad.right}
            y2={height - pad.bottom}
            stroke="rgba(254,131,198,0.6)"
          />
          <line
            x1={pad.left}
            y1={pad.top}
            x2={pad.left}
            y2={height - pad.bottom}
            stroke="rgba(254,131,198,0.6)"
          />
          <polyline points={points} fill="none" stroke="url(#weightTrendGradient)" strokeWidth="3.6" />
          <defs>
            <linearGradient id="weightTrendGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fa4eab" />
              <stop offset="100%" stopColor="#4de8ff" />
            </linearGradient>
          </defs>

          {tickIndexes.map((idx) => (
            <text key={`x-${idx}`} x={x(idx)} y={height - 20} textAnchor="middle" fontSize="11" fill="#d4d4dd">
              {labelDate(trend[idx])}
            </text>
          ))}

          {trend.map((item, idx) => {
            const isBest = item === best;
            const isLatest = idx === trend.length - 1;
            const isHover = hoverIndex === idx;
            if (!isBest && !isLatest && !isHover) return null;
            return (
              <g key={`${item.month}-${item.day}`}>
                <circle cx={x(idx)} cy={y(item.changeKg)} r={isHover ? "6.5" : "5.5"} fill="#fff2f9" />
                <text x={x(idx)} y={y(item.changeKg) - 12} textAnchor="middle" fontSize="11" fill="#f9bfdc">
                  {item.changeKg.toFixed(1)}
                </text>
              </g>
            );
          })}
        </svg>
        {hoveredPoint ? (
          <div
            className="chart-hover-tip"
            style={{
              left: `${hoverPos.x + 14}px`,
              top: `${Math.max(8, hoverPos.y - 46)}px`,
            }}
          >
            <strong>{labelDate(hoveredPoint)}</strong>
            <span>{formatKg(hoveredPoint.changeKg)}</span>
          </div>
        ) : null}
      </div>

    </>
  );

  if (embedded) {
    return (
      <div className="trend-embedded" aria-labelledby="weight-title">
        {content}
      </div>
    );
  }

  return (
    <section className="panel growth-panel" aria-labelledby="weight-title">
      {content}
    </section>
  );
}
