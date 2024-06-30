const express = require('express');
const bodyparser = require('body-parser');
const expenseroutes = require('./routes/expenseroutes');
const path = require('path');
const app = express();

app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api',expenseroutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}`);
});
