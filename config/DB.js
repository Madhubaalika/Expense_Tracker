const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expensetracker', 'root', 'Madhu@14', {
  host:'localhost',
  dialect:'mysql'
});

sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Error:' + err));

module.exports = sequelize;
