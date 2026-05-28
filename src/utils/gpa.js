export function scoreToGradePoint(score) {
  if (score >= 93) return 4.0;
  if (score >= 88) return 3.7;
  if (score >= 83) return 3.3;
  if (score >= 78) return 3.0;
  if (score >= 73) return 2.7;
  if (score >= 68) return 2.3;
  if (score >= 63) return 2.0;
  if (score >= 58) return 1.7;
  if (score >= 53) return 1.3;
  if (score >= 50) return 1.0;
  return 0;
}

export function calcWeightedGpa(rows) {
  const valid = rows.filter((row) => typeof row.final === "number");
  const totalCredits = valid.reduce((sum, row) => sum + row.credit, 0);
  if (!totalCredits) return null;
  const totalPoints = valid.reduce(
    (sum, row) => sum + scoreToGradePoint(row.final) * row.credit,
    0,
  );
  return totalPoints / totalCredits;
}

export function buildTermTrend(rows) {
  const bucket = new Map();
  for (const row of rows) {
    const key = `${row.year}-S${row.sem}`;
    if (!bucket.has(key)) bucket.set(key, []);
    bucket.get(key).push(row);
  }

  const terms = [...bucket.keys()].sort();
  return terms.map((term) => ({
    term,
    value: calcWeightedGpa(bucket.get(term)),
  }));
}
