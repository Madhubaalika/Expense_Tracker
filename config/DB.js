const { Sequelize } = require('sequelize');
const pass=require('../config/pass');
const sequelize = new Sequelize('expensetracker', 'root',pass, {
  host:'localhost',
  dialect:'mysql'
});

sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Error:' + err));

module.exports = sequelize;
