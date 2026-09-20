import { buildTermTrend } from "../utils/gpa";

function fmt(value) {
  return value == null ? "-" : value.toFixed(2);
}

/** Official summary metrics for the growth panel (not recomputed from per-term chips). */
const GPA_SUMMARY = {
  lowest: 2.9,
  current: 3.53,
  highest: 3.9,
  ranking: "6/49",
};

export function GrowthTrendChart({ rows, embedded = false }) {
  const trend = buildTermTrend(rows).filter((item) => item.value != null);
  const width = 700;
  const height = 280;
  const pad = { top: 24, right: 24, bottom: 54, left: 54 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const min = 1.5;
  const max = 4.0;

  const x = (idx) =>
    trend.length > 1 ? pad.left + (idx / (trend.length - 1)) * innerW : width / 2;
  const y = (v) => pad.top + ((max - v) / (max - min)) * innerH;
  const points = trend.map((item, idx) => `${x(idx)},${y(item.value)}`).join(" ");

  const content = (
    <>
      <div className="second-screen-header">
        <p className="eyebrow">Growth Trend</p>
        <h2 id="growth-title">Academic Growth Curve (GPA)</h2>
        <p className="growth-ranking">Ranking · {GPA_SUMMARY.ranking}</p>
      </div>

      <div className="growth-metrics growth-metrics-inline growth-metrics-gpa" aria-label="GPA summary">
        <article>
          <p>Current</p>
          <strong>{fmt(GPA_SUMMARY.current)}</strong>
        </article>
        <article>
          <p>Rise</p>
          <strong>
            {fmt(GPA_SUMMARY.lowest)} → {fmt(GPA_SUMMARY.highest)}
          </strong>
        </article>
      </div>

      <div className="chart-wrap">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Semester GPA trend line">
          {[2.0, 2.5, 3.0, 3.5, 4.0].map((tick) => (
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
          <polyline points={points} fill="none" stroke="url(#trendGradient)" strokeWidth="3.6" />
          <defs>
            <linearGradient id="trendGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fa4eab" />
              <stop offset="100%" stopColor="#4de8ff" />
            </linearGradient>
          </defs>
          {trend.map((item, idx) => (
            <g key={item.term}>
              <circle cx={x(idx)} cy={y(item.value)} r="5.5" fill="#fff2f9" />
              <text x={x(idx)} y={height - 20} textAnchor="middle" fontSize="11" fill="#d4d4dd">
                {item.term}
              </text>
              <text x={x(idx)} y={y(item.value) - 12} textAnchor="middle" fontSize="11" fill="#f9bfdc">
                {item.value.toFixed(2)}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </>
  );

  if (embedded) {
    return (
      <div className="trend-embedded" aria-labelledby="growth-title">
        {content}
      </div>
    );
  }

  return (
    <section className="panel growth-panel" aria-labelledby="growth-title">
      {content}
    </section>
  );
}
