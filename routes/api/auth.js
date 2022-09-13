const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { checkSchema, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/** Get Authentication
 * @Route           GET api/auth
 * @desc            Test Route
 * @access          Public
 * @param req.user  From auth middleware that houses the _id of the user
 *
 * Auth is a middleware created in the middleware folder that takes in the jsonwebtoken and pulls the user from the database
 * Therefore this is now a protected route
 * Our token has the ID of the user we want to find
 * ! But we want to exclude showing the password .select('-password)
 *
 */
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/** Post a new user
 * @Route   POST api/auth
 * @desc    Authenticate User & Get Token
 * @access  Public
 *
 * 1. We first use express-validator middleware to check for valid email and password for login
 * 1.2. If there are errors then we use the express-validator middleware as our error handler
 *
 * 2. If a user does exist with the email provided then we continue using bcrypt.compare
 * * bcrypt.compare(plain-text password, encrypted password) -> Compares them to see if they are a match
 * * Reminder that when we saved our password in users.js we salted and encrypted it (user.password) before saving onto the database
 *
 * At the end of the day this function returns our jwt token back to the client
 */
router.post(
  '/',
  checkSchema({
    email: {
      isEmail: {
        errorMessage: 'Please include a valid email'
      }
    },
    password: {
      exists: {
        errorMessage: 'Password is required'
      }
    }
  }),
  async (req, res) => {
    const errors = validationResult(req);
    // !If there are errors, send the express-validator errors array
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // If there's not a user
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // Comparing the encrypted password and the password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      /** JsonWebToken
       * 1. jwt.sign()
       * 2. Protect routes by using middleware -> Use jwt.verify()
       *
       * Every new instance of User will have an _id -> But mongoose uses an abstraction so that we can pull the id just using user.id
       *
       * We're putting our secret in our global config folder -> This means that we have to require('config')
       *
       * We're signing the token, passing in our payload, passing in the secret
       * * In our callback we either get an error or send the token back to the client
       * * The token will look like this: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyMDg5N...
       *
       * Expire time for 1 hour -> 3600s
       *
       * Callback for possible error | token
       */
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
