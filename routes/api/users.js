const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const User = require('../../models/User');

// @route   Post api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Bad request - 400, OK - 200
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // 1. See if user exists (search by email)
      let user = await User.findOne({ email }); // 可简写为{email}

      if (user) {
        // Same format as errors above
        return res
          .status(400)
          .json({ error: [{ msg: 'User already exists' }] });
      }
      // 2. Get users avatar: https://en.gravatar.com/site/implement/images/
      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm',
        }),
        { forceHttps: true }
      );

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // 3. Encrypt password
      const salt = await bcrypt.genSalt(10); // higher, securer

      user.password = await bcrypt.hash(password, salt);

      await user.save(); //save to the db(is a Promise)

      // 4. Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
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
      // Internal Server Error - 500
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
