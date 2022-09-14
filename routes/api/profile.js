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
 * Not adding checkSchema here, but I would require title(advocate, lawyer, etc...) and interests (DOT, FDA, etc...) for a stretch feature
 *
 * We can get the user from req.user.id -> We can do this because of our logic in users.js routes/api (JWT token)
 */
router.post('/', auth, async (req, res) => {
  //! Add Error handling later for required fields

  const {
    company,
    website,
    location,
    bio,
    title,
    interests,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = req.body;

  // Build Profile Object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (title) profileFields.title = title;

  if (interests) {
    // Turning the interests into an array -> splitting string into an array by comma -> Map through the new array and trim the interests
    profileFields.interests = interests
      .split(',')
      .map((interest) => interest.trim());
  }

  // Build Social Media Object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update profile if there is a profile -> Find the User | set profile fields | new: true (gives me the object after update is applied)
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    // Create profile -> If there was no profile
    profile = new Profile(profileFields);
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

/** Get all profiles
 * @Route   GET api/profile
 * @desc    Get all profiles
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/** Profile By UserID
 * @Route   GET api/profile/user/:user_id
 * @desc    Get profile by User ID
 * @access  Public
 */
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    /**
     * What if there's a correct string for UserID but no user is found? It'll just send 'Server Error' -> We can catch that by using the error handler below
     * if (err.kind == 'ObjectId) {return res.status(400).json({ msg: 'Profile Not Found' });}
     */
    res.status(500).send('Server Error');
  }
});

/** Profile By UserID
 * @Route   DELETE api/profile
 * @desc    Delete Profile, User, and Posts
 * @access  Private
 *
 * We want to access the token because we want to access the req.user.id therefore we need to decrypt it
 */
router.delete('/', auth, async (req, res) => {
  try {
    //TODO - Remove Users Posts

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Remove User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/** Add Profile Experiences
 * @Route   PUT api/profile/experience
 * @desc    Add profile experiences
 * @access  Private
 *
 * We want to access the token because we want to access the req.user.id therefore we need to decrypt it
 *
 * Need validation -> On the front end we're going to be filling this in with a form -> But we're skipping checkSchema for now
 */
router.put('/experience', auth, async (req, res) => {
  const { title, company, location, from, to, current, description } = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // This is an array and we're going to push using unshift() -> This pushes new items into the array from the beginning instead of appending to the end
    profile.experience.unshift(newExp);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
