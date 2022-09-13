const express = require('express');
const router = express.Router();
const { checkSchema, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const gravatar = require('gravatar');

const User = require('../../models/User');

/** Post a new user
 * @Route   POST api/users
 * @desc    Register User
 * @access  Public
 *
 * Need a name, email, password
 *
 * Adding express-validator -> Using .not().isEmpty to make sure that the name is there and not empty
 *
 * ! Edit: Actually these are good errors because this is the creation not the login for these users
 * ! NEED TO CHANGE THESE ERROR MESSAGES AFTER THIS IS DONE FOR SECURITY REASONS -> Please include a valid name email, and password
 * 
 *  checkSchema('name', 'Name is required').not().isEmpty(),
    checkSchema('email', 'Please include a valid email').isEmail(),
    checkSchema(
      'password',
      'Please enter a password with 8 or more characters'
    ).isLength({ min: 8 })
 */
router.post(
  '/',
  checkSchema({
    name: {
      notEmpty: {
        errorMessage: 'Name is required'
      }
    },
    email: {
      isEmail: {
        errorMessage: 'Please include a valid email'
      }
    },
    password: {
      isLength: {
        errorMessage: 'Please enter a password with 8 or more characters',
        options: { min: 8 }
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

    const { name, email, password } = req.body;

    try {
      // Look for user -> Do they already exist?
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Get User Gravatar -> This can change to a static image
      const avatar = gravatar.url(email, {
        // Options -> Default Size | Rating (No nsfw) | Default Image
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      /** New instance of User
       * Not saving a new user just yet, just creating an instance of a user
       */
      user = new User({
        name,
        email,
        avatar,
        password
      });

      /** Encrypt Password
       * Using 10 rounds of salt
       *
       * Taking the password from the new instance of user and hashing the password -> Pass String | salt
       *
       * * Then we save the user in the database
       */
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

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
