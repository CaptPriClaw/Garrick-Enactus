
import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  responses: { type: [String], required: true },
  project: { type: String, required: true },
  departments: { type: [String], required: true },
  reason: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Result', ResultSchema);
