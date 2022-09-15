const express = require('express');
const path = require('path');
const connectDB = require('../config/db');
const colors = require('colors');
const app = express();

// Connect Database
connectDB();

/** Initialize Middleware
 * If we want the req.body to only be a string, array, or object -> extended false { extended: false }
 */
app.use(express.json());

/** Define Routes
 *Users
 */
app.use('/api/users', require('../routes/api/users'));
app.use('/api/auth', require('../routes/api/auth'));
app.use('/api/profile', require('../routes/api/profile'));
app.use('/api/posts', require('../routes/api/posts'));
app.use('/api/fed', require('../routes/api/fedregister'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`.green.inverse.bold)
);
