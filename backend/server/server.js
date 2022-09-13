const express = require('express');
const path = require('path');
const connectDB = require('../config/db');
const colors = require('colors');

const app = express();

// Connect Database
connectDB();

app.get('/api', (req, res) =>
  res.json({
    success: true,
    data: 'Hello there from the server.js file PART 2!'
  })
);

/** Define Routes
 *Users
 */
app.use('/api/users', require('../routes/api/users'));
app.use('/api/auth', require('../routes/api/auth'));
app.use('/api/profile', require('../routes/api/profile'));
app.use('/api/posts', require('../routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`.green.inverse.bold)
);
