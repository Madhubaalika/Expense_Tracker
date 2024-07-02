const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('freedb_expensetracker', 'freedb_app-user', 'Yb7$n@5!H38$*jz', {
  host:'sql.freedb.tech',
  dialect:'mysql'
});

sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Error:' + err));

module.exports = sequelize;
