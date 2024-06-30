const expenses = require('../models/expense');
const { Op, fn, col, Sequelize } = require('sequelize');
exports.addexpense = async (req,res) => {
  try {
    const { name,category,amount,date } = req.body;
    const expense = await expenses.create({ name,category,amount,date });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.editexpense = async (req,res) => {
  try {
    const { id } = req.params;
    const { name,category,amount,date } = req.body;
    await expenses.update({ name,category,amount,date },{
      where: { id }
    });
    const updatedexpense = await expenses.findByPk(id);
    res.json(updatedexpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.removeexpense = async (req,res) => {
  try {
    const { id } = req.params;
    await expenses.destroy({ where: { id } });
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.allexpenses = async (req,res) => {
  try {
    const Expense = await expenses.findAll();
    res.json(Expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getExpensesCategorywise = async (req,res) => {
  try {
    const { category } = req.query;
    const Expense = await expenses.findAll({ where: { category } });
    res.json(Expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getExpensesMonthYearwise = async (req,res) => {
  try {
    const { month, year } = req.query;
    const Expense= await expenses.findAll({
      where: {
        [Op.and]: [
          Sequelize.where(fn('YEAR', col('date')), year),
          Sequelize.where(fn('MONTH', col('date')), month)
        ]
      }
    });
    res.json(Expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
