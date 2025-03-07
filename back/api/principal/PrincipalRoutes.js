const PrincipalSchema = require('../../models/Principal/PrincipalSchema');
const OfficerListSchema = require('../../models/Admin/OfficersDetailSchema'); // Import OfficerListSchema
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const emailTransporter = require('../../nodemailer');

router.post('/principalregister', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ msg: 'Name, email, password, and role are required' });
  }

  if (password.length < 8) {
    return res.status(400).json({ msg: 'Password should be at least 8 characters long' });
  }

  try {
    const existingUser = await PrincipalSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new PrincipalSchema({ name, email, password: hashedPassword, role });

    const savedUser = await newUser.save();
    if (savedUser) {
      const mailOptions = {
        from: emailTransporter.options.auth.user,
        to: email,
        subject: 'Registration Successful',
        text: 'Thank you for registering. You have successfully signed up!',
      };

      emailTransporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ msg: 'Error sending confirmation email' });
        } else {
          
          return res.status(200).json({ msg: 'User is successfully registered' });
        }
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error saving user to the database' });
  }
});

router.post('/principallogin', async (req, res) => {
  const { email, password, post } = req.body;

  if (!email || !password || !post) {
    return res.status(400).json({ msg: 'Email, password, and post are required' });
  }

  try {
    const principalUser = await PrincipalSchema.findOne({ email });
    if (!principalUser) {
      return res.status(400).json({ msg: 'User not found in Principal database' });
    }

    const officerUser = await OfficerListSchema.findOne({ email });
    if (!officerUser) {
      return res.status(400).json({ msg: 'User not found in Officer database. Please contact Admin' });
    }

    if (officerUser.post !== post) {
      return res.status(400).json({ msg: 'User is not assigned as principal' });
    }

    const isPasswordValid = await bcrypt.compare(password, principalUser.password);
    if (isPasswordValid) {
      return res.status(200).json({ msg: 'You have logged in successfully', email: principalUser.email, name: officerUser.name, role: principalUser.role });
    } else {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error, please try again later' });
  }
});

module.exports = router;
