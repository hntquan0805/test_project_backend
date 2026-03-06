import { Router } from 'express';
import ScoreController from '../controllers/ScoreController.js';

const router = Router();
const ctrl = new ScoreController();

router.get('/statistics', ctrl.intervalStatistics);
router.get('/all', ctrl.getTotalStudents);
router.get('/top10', ctrl.getTop10Students);
router.get('/:studentId', ctrl.getStudentIdScores);

export default router;