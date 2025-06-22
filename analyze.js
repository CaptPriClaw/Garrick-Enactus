
import Sentiment from 'sentiment';
const sentiment = new Sentiment();

export function analyzeAndSort(responses) {
  let score = 0;
  let tags = [];

  responses.forEach((r) => {
    const s = sentiment.analyze(r);
    score += s.score;
    const lower = r.toLowerCase();
    if (lower.includes('build') || lower.includes('craft')) tags.push('shilpkaar');
    if (lower.includes('change') || lower.includes('transform')) tags.push('rupaantar');
    if (lower.includes('people')) tags.push('collab');
    if (lower.includes('media')) tags.push('media');
    if (lower.includes('tech') || lower.includes('code')) tags.push('tech');
    if (lower.includes('organize') || lower.includes('plan')) tags.push('ops');
    if (lower.includes('finance') || lower.includes('money')) tags.push('finance');
  });

  const project = tags.filter(t => t === 'shilpkaar').length >= tags.filter(t => t === 'rupaantar').length
    ? 'Shilpkaar' : 'Rupaantar';

  const depScores = {
    Media: tags.filter(t => t === 'media').length,
    Operations: tags.filter(t => t === 'ops').length,
    Collaborations: tags.filter(t => t === 'collab').length,
    Finance: tags.filter(t => t === 'finance').length,
    Technicals: tags.filter(t => t === 'tech').length
  };

  const departments = Object.entries(depScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([k]) => k);

  return {
    project,
    departments,
    reason: `Your responses reflect a tendency toward ${project === 'Shilpkaar' ? 'building and execution' : 'transformation and impact'}, and your skills are best used in ${departments.join(' & ')}.`
  };
}
