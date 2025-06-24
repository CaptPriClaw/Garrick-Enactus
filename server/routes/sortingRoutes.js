const express = require('express');
const router = express.Router();
const sentiment = require('sentiment');

router.post('/', (req, res) => {
  const { name, answers } = req.body;

  if (!name || !answers || answers.length < 5) {
    return res.status(400).json({ error: 'Please provide name and 5 answers.' });
  }

  const analyzer = new sentiment();
  let score = 0;

  answers.forEach((ans) => {
    const result = analyzer.analyze(ans);
    score += result.score;
  });

  const project = score >= 0 ? 'Shilpkaar' : 'Rupaantar';

  // Dummy logic to assign departments (replace with better NLP later)
  const departments = score % 2 === 0
    ? ['Media', 'Operations']
    : ['Finance', 'Technicals'];

  const justification = `Based on your sentiment score (${score}), you're aligned with Project ${project} and best fit for ${departments.join(' & ')} departments.`;

  res.json({ name, project, departments, justification });
});

module.exports = router;
