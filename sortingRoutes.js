
import express from 'express';
import { sortUser, getAllResults } from '../controllers/sortingController.js';

const router = express.Router();

router.post('/', sortUser);
router.get('/all', getAllResults);

export default router;
