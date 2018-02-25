import { Router } from 'express';
import * as LoansController from '../controllers/loans.controller';
const router = new Router();

// Get all Posts
router.route('/loans').get(LoansController.getLoans);
router.route('/loansdb').get(LoansController.getLoansFromDb);

export default router;
