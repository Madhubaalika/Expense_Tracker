const express = require('express');
const router = express.Router();
const expensecontroller = require('../controllers/expensecontroller');

router.route('/expenses').post(expensecontroller.addexpense).get(expensecontroller.allexpenses);
router.route('/expenses/:id').put(expensecontroller.editexpense).delete(expensecontroller.removeexpense);
router.get('/expenses/category', expensecontroller.getExpensesCategorywise);
router.get('/expenses/month-year', expensecontroller.getExpensesMonthYearwise);

module.exports = router;
