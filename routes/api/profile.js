const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { checkSchema, validationResult } = require('express-validator');

/** Get user profile
 * @Route   GET api/profile/me
 * @desc    Get current user profile
 * @access  Private
 *
 * Any route we want to protect we just add our auth middleware
 *
 * ? .populate(from user | keys) What if we want to populate the name and the avatar from User?
 */
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );
    if (!profile) {
      res.status(400).json({ msg: 'No profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/** Create or update user profile
 * @Route   POST api/profile
 * @desc    Create or Update a user profile
 * @access  Private
 *
 * Not adding checkSchema here
 */
// router.post('/', async (req, res) => {

// })

module.exports = router;
