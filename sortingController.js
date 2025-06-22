
import { analyzeAndSort } from '../services/analyze.js';
import Result from '../models/Result.js';

export const sortUser = async (req, res) => {
  const { responses, userName } = req.body;

  if (!responses || !userName) {
    return res.status(400).json({ error: 'Missing data' });
  }

  const result = analyzeAndSort(responses);

  try {
    await Result.create({ userName, responses, ...result });
    res.json(result);
  } catch (error) {
    console.error('Save failed:', error);
    res.status(500).json({ error: 'Failed to save result' });
  }
};

export const getAllResults = async (req, res) => {
  try {
    const results = await Result.find().sort({ createdAt: -1 });
    res.json(results);
  } catch (error) {
    console.error('Fetch failed:', error);
    res.status(500).json({ error: 'Failed to fetch results' });
  }
};
