const express = require('express');
const router = express.Router();

/** Get Authentication
 * @Route   GET api/Auth
 * @desc    Test Route
 * @access  Public
 */
router.get('/', (req, res) => res.send('Auth Route'));

module.exports = router;
